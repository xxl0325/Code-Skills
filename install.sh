#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="${HOME}/.cc-switch/skills"

SKILLS=(
  flow-init
  flow-trace
  flow-discuss
  flow-research
  flow-design
  flow-review
  flow-plan
  flow-auto
  flow-build
  flow-verify
  flow-ship
  flow-next
)

LEGACY_SKILLS=(
  flow-shared
  flow-close
  flow-test
)

mkdir -p "$DEST_DIR"

for skill in "${SKILLS[@]}"; do
  src="$ROOT_DIR/$skill"
  dest="$DEST_DIR/$skill"

  if [[ ! -d "$src" ]]; then
    echo "Missing source directory: $src" >&2
    exit 1
  fi

  if [[ -e "$dest" ]]; then
    echo "Replacing existing $dest"
    rm -rf "$dest"
  fi

  echo "Installing $skill -> $DEST_DIR"
  cp -R "$src" "$DEST_DIR/"
done

for skill in "${LEGACY_SKILLS[@]}"; do
  dest="$DEST_DIR/$skill"
  if [[ -e "$dest" ]]; then
    echo "Removing legacy $dest"
    rm -rf "$dest"
  fi
done

echo
echo "Installed Flow Skills to: $DEST_DIR"
echo "Restart Codex or start a new session if the skills do not appear immediately."
