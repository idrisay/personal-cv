#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Deploy personal-cv to Cloudflare Pages
#
# USAGE
#   bash deploy.sh            # preview deployment
#   bash deploy.sh --prod     # production deployment
#
# PREREQUISITES
#   1. Node.js ≥ 18 installed
#   2. wrangler authenticated:  npx wrangler login
#   3. Cloudflare Pages project created (first deploy auto-creates it)
# =============================================================================
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROD="${1:-}"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   personal-cv  →  Cloudflare Pages   ║"
echo "╚══════════════════════════════════════╝"
echo ""

cd "$SCRIPT_DIR"

echo "▸ Installing dependencies..."
npm install --silent

echo "▸ Building static export (next build)..."
npm run build

if [[ ! -d "$SCRIPT_DIR/out" ]]; then
  echo "✗ Build failed — 'out/' directory not found."
  exit 1
fi
echo "  ✓ Build complete → out/"
echo ""

if [[ "$PROD" == "--prod" ]]; then
  echo "▸ Deploying to PRODUCTION..."
  npx wrangler pages deploy out --project-name=personal-cv --commit-dirty=true --branch=main
else
  echo "▸ Deploying PREVIEW..."
  npx wrangler pages deploy out --project-name=personal-cv --commit-dirty=true
fi

echo ""
echo "✓ Done. Check the URL printed above by Wrangler."
echo ""
