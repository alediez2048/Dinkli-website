# Brief

Reorient Dinkli (marketing site + pitch deck in this repo) around: **a full-stack pickleball platform whose top feature is AI game analysis.** Dinkli brings custom camera equipment to games, records them, runs YOLO object detection on every game to track each player's performance, and delivers every player a custom video with performance recommendations. Game stats and the player's rating move up or down based on the analysis. Booking (courts, open play, clinics, leagues, payments, memberships, ratings, no-show accountability, court admin tools) stays and must not be undersold.

Decisions from the brainstorming conversation (2026-10-16):
- Players are the landing-page hero; courts are hosting partners (new `/courts` page + rewritten pitch deck).
- "Record & Analyze" is a paid per-game add-on on top of booking.
- Product is in beta; copy sells it confidently in present tense. No fabricated metrics, testimonials or accuracy claims.
- Structure: rewrite `index.html` player-first, add `courts/index.html`, rewrite `pitch-deck/index.html`.
- Keep the neubrutalism design system and the black/green ticker.
- AI visuals are designed SVG illustrations in the site's style. The user switched to this on 2026-10-16, replacing user-supplied mockups.
- YOLO named in technical sections only; rating is the "Dinkli Rating"; plan docs excluded from deploy.
