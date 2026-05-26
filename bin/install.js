#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const skillDirs = [
  "flow-init",
  "flow-trace",
  "flow-discuss",
  "flow-research",
  "flow-design",
  "flow-review",
  "flow-plan",
  "flow-auto",
  "flow-build",
  "flow-verify",
  "flow-ship",
  "flow-next"
];

const legacyDirs = [
  "flow-shared",
  "flow-close",
  "flow-test"
];

function usage() {
  console.log(`Flow Skills installer

Usage:
  flow-skills install [--force] [--no-backup] [--dest <dir>]
  flow-skills --check
  flow-skills --help

Options:
  --force       Kept for compatibility. Existing installed directories are always replaced.
  --no-backup   Kept for compatibility. Backups are no longer created.
  --dest <dir>  Install into a custom skills directory.

Default destination:
  ~/.cc-switch/skills
`);
}

function parseArgs(argv) {
  const opts = {
    command: "install",
    force: false,
    backup: false,
    dest: null,
    check: false,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "install") opts.command = "install";
    else if (arg === "--force") opts.force = true;
    else if (arg === "--no-backup") opts.backup = false;
    else if (arg === "--check") opts.check = true;
    else if (arg === "--help" || arg === "-h") opts.help = true;
    else if (arg === "--dest") {
      const value = argv[i + 1];
      if (!value) throw new Error("--dest requires a directory path");
      opts.dest = resolve(value);
      i += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return opts;
}

function defaultDest() {
  return resolve(process.env.HOME ?? process.cwd(), ".cc-switch", "skills");
}

function ensureSourceTree() {
  const missing = [];

  for (const dir of skillDirs) {
    const src = join(rootDir, dir);
    if (!existsSync(src) || !statSync(src).isDirectory()) {
      missing.push(dir);
      continue;
    }

    const skillFile = join(src, "SKILL.md");
    if (!existsSync(skillFile)) missing.push(`${dir}/SKILL.md`);
  }

  if (missing.length > 0) {
    throw new Error(`Invalid package. Missing required files:\n- ${missing.join("\n- ")}`);
  }
}

function install(opts) {
  ensureSourceTree();

  const destDir = opts.dest ?? defaultDest();
  mkdirSync(destDir, { recursive: true });

  for (const dir of skillDirs) {
    const src = join(rootDir, dir);
    const dest = join(destDir, dir);

    if (existsSync(dest)) {
      console.log(`Replacing existing ${dest}`);
      rmSync(dest, { recursive: true, force: true });
    }

    console.log(`Installing ${dir} -> ${destDir}`);
    cpSync(src, dest, { recursive: true });
  }

  for (const dir of legacyDirs) {
    const dest = join(destDir, dir);
    if (!existsSync(dest)) continue;

    console.log(`Removing legacy ${dest}`);
    rmSync(dest, { recursive: true, force: true });
  }

  console.log("");
  console.log(`Installed Flow Skills to: ${destDir}`);
  console.log("Restart Codex or start a new session if the skills do not appear immediately.");
}

function check() {
  ensureSourceTree();
  console.log("Flow Skills package check passed.");
}

try {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    usage();
    process.exit(0);
  }
  if (opts.check) {
    check();
    process.exit(0);
  }
  install(opts);
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
