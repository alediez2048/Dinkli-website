#!/usr/bin/env bash
# Copy the publishable site into _site/, leaving internal docs and tooling out of the deploy.
# Uses a tar pipe rather than rsync: macOS's openrsync stalls on large files.
set -euo pipefail
cd "$(dirname "$0")/.."

rm -rf _site
mkdir _site

tar -cf - \
  --exclude='./.git' \
  --exclude='./.github' \
  --exclude='./.gitignore' \
  --exclude='.DS_Store' \
  --exclude='./docs' \
  --exclude='./scripts' \
  --exclude='./node_modules' \
  --exclude='./_site' \
  --exclude='./.shot' \
  --exclude='*.md' \
  --exclude='./Dinkli Screenshots' \
  --exclude='./app.json' \
  --exclude='./eas.json' \
  --exclude='./package.json' \
  --exclude='./package-lock.json' \
  --exclude='./start-server.sh' \
  --exclude='./css/connectors.css' \
  --exclude='./css/interactions.css' \
  --exclude='./css/navigation.css' \
  --exclude='./css/simple-nav.css' \
  --exclude='./css/sticky.css' \
  . | tar -xf - -C _site

python3 scripts/make_404.py

echo "Built _site/ ($(find _site -type f | wc -l | tr -d ' ') files)"
