#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEST_DIR="${CODEX_HOME:-$HOME/.codex}/skills"
STAMP="$(date +%Y%m%d%H%M%S)"

SKILLS=(
  flow-init
  flow-discuss
  flow-research
  flow-design
  flow-review
  flow-plan
  flow-auto
  flow-build
  flow-verify
  flow-ship
  flow-close
  flow-next
  flow-shared
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
    backup="$dest.backup.$STAMP"
    echo "Backing up existing $dest -> $backup"
    mv "$dest" "$backup"
  fi

  echo "Installing $skill -> $DEST_DIR"
  cp -R "$src" "$DEST_DIR/"
done

echo
echo "Installed Flow Skills to: $DEST_DIR"
echo "Restart Codex or start a new session if the skills do not appear immediately."
