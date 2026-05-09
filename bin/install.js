#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, renameSync, rmSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const skillDirs = [
  "flow-init",
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
  "flow-close"
];

function usage() {
  console.log(`Flow Skills installer

Usage:
  flow-skills install [--force] [--no-backup] [--dest <dir>]
  flow-skills --check
  flow-skills --help

Options:
  --force       Replace existing installed directories.
  --no-backup   When used with --force, delete existing directories instead of backing them up.
  --dest <dir>  Install into a custom skills directory.

Default destination:
  $CODEX_HOME/skills if CODEX_HOME is set, otherwise ~/.codex/skills
`);
}

function parseArgs(argv) {
  const opts = {
    command: "install",
    force: false,
    backup: true,
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
  const codexHome = process.env.CODEX_HOME;
  return codexHome ? join(codexHome, "skills") : join(homedir(), ".codex", "skills");
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

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate()),
    pad(d.getHours()),
    pad(d.getMinutes()),
    pad(d.getSeconds())
  ].join("");
}

function install(opts) {
  ensureSourceTree();

  const destDir = opts.dest ?? defaultDest();
  mkdirSync(destDir, { recursive: true });

  const stamp = timestamp();

  for (const dir of skillDirs) {
    const src = join(rootDir, dir);
    const dest = join(destDir, dir);

    if (existsSync(dest)) {
      if (!opts.force) {
        throw new Error(
          `Destination already exists: ${dest}\n` +
            "Re-run with --force to replace existing skills, or choose --dest <dir>."
        );
      }

      if (opts.backup) {
        const backup = `${dest}.backup.${stamp}`;
        console.log(`Backing up ${dest} -> ${backup}`);
        renameSync(dest, backup);
      } else {
        console.log(`Removing existing ${dest}`);
        rmSync(dest, { recursive: true, force: true });
      }
    }

    console.log(`Installing ${dir} -> ${destDir}`);
    cpSync(src, dest, { recursive: true });
  }

  if (opts.force) {
    for (const dir of legacyDirs) {
      const dest = join(destDir, dir);
      if (!existsSync(dest)) continue;

      if (opts.backup) {
        const backup = `${dest}.backup.${stamp}`;
        console.log(`Backing up legacy ${dest} -> ${backup}`);
        renameSync(dest, backup);
      } else {
        console.log(`Removing legacy ${dest}`);
        rmSync(dest, { recursive: true, force: true });
      }
    }
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
