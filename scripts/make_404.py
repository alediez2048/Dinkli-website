#!/usr/bin/env python3
"""Generate _site/404.html from the pitch deck.

GitHub Pages has no rewrite rules, so the Netlify-style
`/pitch-deck/*  /pitch-deck/index.html  200` cannot be used. The root 404.html
is the only wildcard Pages serves, so it doubles as the deck for per-prospect
share links like /pitch-deck/riverside-courts; every other unknown path gets a
plain not-found message instead.
"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent.parent
src = root / "pitch-deck" / "index.html"
dst = root / "_site" / "404.html"

html = src.read_text()

# Served from an arbitrary depth, so the deck's ../ asset paths have to be absolute.
html = html.replace('"../', '"/')

# The deck snippet reads the last path segment, which is safe under /pitch-deck/ but
# not on a catch-all that answers every unknown URL -- /typo would log slug "typo".
# Anchor it to the share-link shape so only real deck URLs report a hit.
seg_old = 'var seg = location.pathname.replace(/\\/+$/, "").split("/").pop();'
seg_new = ('var seg = (/^\\/pitch-deck\\/([a-z0-9][a-z0-9-]{0,38})$/'
           '.exec(location.pathname.replace(/\\/+$/, "")) || [])[1];')
if html.count(seg_old) != 1:
    sys.exit("deck tracking snippet not found as expected in " + str(src))
html = html.replace(seg_old, seg_new, 1)

# Nothing here should be indexed, and the canonical URL belongs to /pitch-deck/ only.
html = re.sub(r'\s*<link rel="canonical"[^>]*>', "", html, count=1)

guard = """
    <meta name="robots" content="noindex">
    <style>html.deck-404 body{display:none}</style>
    <script>
    (function () {
      var path = location.pathname.replace(/\\/+$/, "");
      if (/^\\/pitch-deck\\/[a-z0-9][a-z0-9-]{0,38}$/.test(path)) return;
      var el = document.documentElement;
      el.className += " deck-404";
      document.addEventListener("DOMContentLoaded", function () {
        document.title = "Page not found | Dinkli";
        document.body.className = "";
        document.body.innerHTML =
          '<main style="max-width:32rem;margin:0 auto;padding:6rem 1.5rem;text-align:center;' +
          'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif">' +
          '<h1 style="margin:0 0 .75rem;font-size:2rem">Page not found</h1>' +
          '<p style="margin:0 0 1.5rem;color:#555">That link does not point anywhere on dinkli.com.</p>' +
          '<a href="/" style="color:#0a7">Back to Dinkli</a></main>';
        el.className = el.className.replace(/\\s*deck-404\\b/, "");
      });
    })();
    </script>
</head>"""

if html.count("</head>") != 1:
    sys.exit("unexpected </head> count in " + str(src))
html = html.replace("</head>", guard.lstrip("\n"), 1)

dst.write_text(html)
print("Generated _site/404.html from pitch-deck/index.html")
