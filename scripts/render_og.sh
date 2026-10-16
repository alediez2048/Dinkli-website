#!/usr/bin/env bash
# Render images/og/dinkli-og.png (1200x630) from the hero illustration using local headless Chrome.
# Link-preview crawlers don't accept SVG og:image, so the PNG is rendered once and committed.
set -euo pipefail
cd "$(dirname "$0")/.."
REPO="$(pwd)"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
OUT="$REPO/images/og/dinkli-og.png"
PAGE="$(mktemp -d)/og.html"

mkdir -p "$REPO/images/og"
cat > "$PAGE" <<HTML
<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; background: #FFFFFF; font-family: -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
         display: grid; grid-template-columns: 430px 1fr; gap: 36px; padding: 44px; border: 12px solid #000; }
  .copy { display: flex; flex-direction: column; justify-content: center; gap: 22px; }
  .logo { width: 96px; height: 96px; border-radius: 50%; box-shadow: 8px 8px 0 #00FF00; }
  h1 { font-size: 58px; line-height: 1.02; text-transform: uppercase; letter-spacing: -1px; }
  h1 span { background: #00FF00; padding: 0 6px; }
  p { font-size: 24px; font-weight: 600; color: #333; }
  .art { align-self: center; border: 6px solid #000; box-shadow: 14px 14px 0 #00FF00; }
  .art img { display: block; width: 100%; }
</style></head><body>
  <div class="copy">
    <img class="logo" src="file://$REPO/images/logos/dinkli-logo.png" alt="">
    <h1>The best booking experience in <span>pickleball.</span></h1>
    <p>Booking platform + AI cameras, installed at your courts.</p>
  </div>
  <div class="art"><img src="file://$REPO/images/photos/court-tracking.jpg" alt=""></div>
</body></html>
HTML

"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --allow-file-access-from-files --window-size=1200,630 --screenshot="$OUT" "file://$PAGE" >/dev/null 2>&1
echo "Wrote $OUT"
sips -g pixelWidth -g pixelHeight "$OUT" | tail -2
