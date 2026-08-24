#!/usr/bin/env bash
# =============================================================================
# generate-cv-pdf.sh — regenerate public/Idris-Ay-CV.pdf from the /resume route
#
# The PDF is just the ATS résumé page printed to A4 by headless Chrome, so it
# can never drift from src/data/cv.ts. Run it after changing CV content.
#
# USAGE:  bash scripts/generate-cv-pdf.sh
# =============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
PORT="${PORT:-4399}"

cd "$ROOT"

[[ -x "$CHROME" ]] || { echo "✗ Chrome not found at: $CHROME (set CHROME=…)"; exit 1; }

echo "▸ Building static export..."
npm run build >/dev/null

echo "▸ Serving out/ on :$PORT..."
python3 -m http.server "$PORT" --directory out >/dev/null 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT
sleep 1

print_pdf() {  # $1 = route, $2 = output filename
  echo "▸ Printing $1 to $2..."
  "$CHROME" --headless --disable-gpu --no-pdf-header-footer \
    --virtual-time-budget=6000 \
    --print-to-pdf="$ROOT/public/$2" \
    "http://localhost:$PORT$1" 2>/dev/null
  echo "  ✓ public/$2 ($(du -h "$ROOT/public/$2" | cut -f1))"
}

# One PDF per language — the DE download button points at the DE file.
print_pdf "/resume/"    "Idris-Ay-CV.pdf"
print_pdf "/resume/de/" "Idris-Ay-CV-DE.pdf"

echo ""
echo "✓ Both CVs regenerated."
echo "  Re-run 'npm run build' (or deploy.sh) to copy them into out/."
