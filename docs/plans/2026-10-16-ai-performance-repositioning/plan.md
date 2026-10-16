# Plan — Dinkli AI performance repositioning

Tier: Standard · Mode: revision · Size: L · Run dir: `docs/plans/2026-10-16-ai-performance-repositioning/`
Inputs: [`brief.md`](brief.md), [`research.md`](research.md) (sections `## codebase`, `## web-domain`).

## Summary

Rewrite the static Dinkli site (GitHub Pages, vanilla HTML/CSS/JS, no build) so it sells **a full-stack pickleball platform whose headline feature is AI game film.** Dinkli's crew brings a camera rig to the game, computer vision (YOLO object detection plus multi-object tracking) follows every player and the ball, and each player gets a personal video with coaching notes, per-game stats and a **Dinkli Rating** that moves after every analyzed game.

The work produces four things:

1. `index.html` rewritten for players.
2. A new `courts/index.html` for hosting partners.
3. `pitch-deck/index.html` rewritten for court hosts.
4. A working Formspree lead form, privacy-policy additions for video, refreshed SEO, and a deploy step that keeps internal docs off dinkli.com.

All AI visuals are **designed SVG illustrations** built in this repo in the site's own style (Phase 3). One PNG is rendered from them for social sharing.

## Decisions

- **LOCKED: players are the hero of `index.html`, and courts are hosting partners on `courts/index.html` and in the pitch deck.** Because the user chose "C — both". Rejected: operator-only (the old positioning) and player-only (that loses the court supply side).
- **LOCKED: "Record & Analyze" is a paid per-game add-on to any booked game.** Because of user answer B. Rejected: bundled into every booking, and Dinkli-run sessions only.
- **LOCKED: confident present-tense copy for a beta product, with no invented numbers, testimonials, "first/only" claims or accuracy percentages.** Because the user wants to sell it as ready. The FTC (Operation AI Comply, 2024-09-25) says there is no AI exemption from existing law, and PB Vision and DUPR already ship AI ratings from video (dupr.com, 2026-04-13), so "first" would be false. Rejected: "beta" labels everywhere (the user's call), and numeric performance claims (legal risk).
- **LOCKED: booking is presented as a full platform, not an afterthought.** It gets its own grid card set and a full section with app screenshots. Because the user said "let's not undersell the booking capability".
- **LOCKED: AI visuals are designed SVG illustrations, stored as standalone files in `images/illustrations/` and referenced with `<img>` (or `<use>` for the icon sprite)** (see *Illustration set*). Because the user chose designed illustrations on 2026-10-16, replacing the earlier user-supplied mockups. Standalone files rather than inline SVG, because the same art is reused on `/`, `/courts/` and `/pitch-deck/`, and the browser caches it. Rejected: inline SVG (duplicated across 3 pages), AI-generated photos (generic, off-brand), user mockups (superseded).
- **LOCKED: the social share image is a PNG rendered once from the hero illustration with local headless Chrome (`scripts/render_og.sh`) and committed.** Because most link-preview crawlers don't accept SVG `og:image`. Rejected: an SVG og:image (no previews), a CI render step (adds Chrome to the deploy).
- **LOCKED: YOLO is named only in How It Works, the FAQ, the courts page and the deck. Headlines say "AI" or "computer vision".** Because the user picked the recommended option, and Ultralytics YOLO needs an Enterprise licence for commercial SaaS (ultralytics.com/license), so the brand shouldn't hinge on one model.
- **LOCKED: the rating is called the "Dinkli Rating", with a one-line note that it isn't affiliated with DUPR.** Because the user picked the recommended option, and DUPR calls itself the official source of record.
- **LOCKED: the deploy publishes a filtered `_site/` copy that excludes `docs/`, `scripts/`, `*.md`, `Dinkli Screenshots/`, `app.json`, `eas.json` and `package*.json`.** Because the user picked the recommended option, and the current workflow uploads the whole repo root (`.github/workflows/pages.yml`, `path: '.'`).
- **LOCKED: the copy and privacy policy describe a no-audio, no-face-recognition system that identifies players through their booking, with consent captured at booking and on-court signage.** Because Texas Bus. & Com. Code §503.001 requires notice and consent for face geometry and is enforced by the AG (Meta $1.4B, Google $1.375B). This is a product promise the user must confirm is true before launch (see Risks).
- (assumed — not in brief) **Formspree form `xldqpalz` is reused.** It's found in commit `9a95826`, and `js/main.js:41-100` currently writes only to localStorage. Every form posts with a hidden `source` field (`player-booking`, `court-host`).
- (assumed — not in brief) **No price number is shown.** Pricing reads "Record & Analyze — added per game at checkout". Changing that later is a one-line copy edit.
- (assumed — not in brief) **Footer links to the missing `terms-of-service.html`, `terms/`, `accessibility/` and `support/` are removed** rather than replaced with stub pages.
- (assumed — not in brief) **The privacy policy promises deletion of raw game video 90 days after the player video is delivered.** Derived stats and the rating stay for the life of the account. This is flagged for legal review.
- (assumed — not in brief) **The pitch deck keeps 11 slides,** so the rail and numbering in `js/pitch-deck.js` keep working. Slide 4 keeps the Playtomic review screenshots as evidence of booking pain.

## Illustration set

All files go in `images/illustrations/`, as hand-authored SVG with no external references.

**Style rules for every file:**
- Colors are limited to `#000000`, `#FFFFFF`, `#00FF00`, `#F5F5F5` and `#333333`, matching the tokens in `css/style.css:6-33`.
- Outlines are 4–6px black strokes. Shadows are hard offset rectangles, never blur.
- Text uses `font-family: 'Space Grotesk', system-ui, sans-serif`. SVG loaded through `<img>` can't fetch web fonts, so layout must survive the fallback.
- Players are faceless geometric figures (a capsule body and a plain circle head) to match the no-face-recognition promise.
- Every number shown is visibly sample data, and the HTML `<figcaption>` says "Example". There are no percentages or accuracy and confidence scores. Detection labels read `PLAYER 1`–`PLAYER 4` and `BALL`.
- Optional motion uses CSS `@keyframes` inside the SVG's own `<style>`: box outlines pulse, and the ball trail's `stroke-dashoffset` moves. It's wrapped in `@media (prefers-reduced-motion: no-preference)`.
- Each file is under 60 KB.

| File | viewBox | Shows | Used in |
|---|---|---|---|
| `court-detection.svg` | `0 0 1600 1000` | Perspective court: green surface, black lines, white kitchen and net. Four players, each in a 4px green-and-black bounding box with a black label chip `PLAYER n`. The ball has a `BALL` box and a dashed arc trail. HUD: `● REC` top-left, `TRACKING 4 PLAYERS · 1 BALL` bottom bar | index hero, courts hero, deck slide 1, OG render |
| `game-film-phone.svg` | `0 0 390 844` | Phone frame. The video pane shows a mini court with boxes, then a scrubber with 4 green highlight markers, then a "Your highlights" list of 3 clips (`Third-shot drop · 02:14`, …) | index `#game-film`, courts §4, deck slide 5 |
| `coaching-notes-phone.svg` | `0 0 390 844` | Phone frame. A "Coaching notes" list of 4 cards, each with a black timestamp chip and a one-line tip. The first card is green ("Hold the kitchen line after your third shot") | index `#game-film`, deck slide 5 |
| `rating-phone.svg` | `0 0 390 844` | Phone frame. "Dinkli Rating" with a large `4.12` and a green chip `▲ 0.06`. Stat rows: kitchen time ▲, unforced errors ▼, third-shot drops ▲, rallies won ▲, shown as counts or arrows, not %. Plus a sparkline of the last 6 games, going up and down | index `#rating`, deck slide 7 |
| `camera-rig.svg` | `0 0 800 800` | Tripod camera rig at a court corner, with a dashed field-of-view wedge over the court and a Dinkli-green rig case | courts §3, deck slide 6 |
| `icons.svg` | sprite | `<symbol>` ids `i-book`, `i-rig`, `i-detect`, `i-analyze`, `i-deliver`, each 64×64 with 4px strokes | the 5 How It Works steps on index, courts and deck, via `<svg><use href="…/icons.svg#i-detect"/></svg>` |
| `../og/dinkli-og.png` | 1200×630 PNG | `court-detection.svg` on a white canvas with the Dinkli logo and the line "AI game film for every player" | `og:image` and `twitter:image` on all pages |

Markup pattern: `<figure class="ai-shot ai-shot--phone"><img src="images/illustrations/rating-phone.svg" alt="Example Dinkli Rating screen showing the rating rising after a game" width="390" height="844" loading="lazy"><figcaption class="ai-shot__label">Example</figcaption></figure>`. The hero image is not lazy-loaded.

## Setup & commands

- Run locally with `npm start`, which serves http-server on :8000. You can also use `python3 -m http.server 8000`.
- To check the site, run `python3 scripts/check_site.py`. Phase 1 creates it. It exits non-zero on broken local `href`/`src` (case-sensitive), missing `#anchor` targets, or banned claim words.
- To re-render the share image: `bash scripts/render_og.sh`. It uses `/Applications/Google Chrome.app` headless and writes `images/og/dinkli-og.png`.
- To check the deploy filter locally: `bash scripts/build_site.sh && ls _site`.
- For visual checks, open `/`, `/courts/` and `/pitch-deck/` at widths of 375, 768 and 1280 px, and print-preview the deck.
- Branch: do the work on `feature/ai-repositioning`. Merging to `main` deploys.

## Phases

### Phase 1 — Deploy hygiene + site checker · S

- `scripts/build_site.sh`: copy the repo into `_site/` with a `tar` pipe (macOS openrsync stalls on large files, found during Phase 1), keeping `CNAME` and excluding `.git`, `.github`, `.gitignore`, `docs`, `scripts`, `node_modules`, `_site`, `*.md`, `Dinkli Screenshots`, `app.json`, `eas.json`, `package.json`, `package-lock.json`, `start-server.sh`, `css/connectors.css`, `css/interactions.css`, `css/navigation.css`, `css/simple-nav.css` and `css/sticky.css`.
- `.github/workflows/pages.yml`: add a `Build site` step (`bash scripts/build_site.sh`) before `upload-pages-artifact`, and change `path: '.'` to `path: '_site'`.
- `.gitignore`: add `_site/`.
- `scripts/check_site.py` (standard library only, `html.parser`) walks every `*.html` that `build_site.sh` would ship. Before checking a path it runs `urllib.parse.unquote` on it and strips any `?query` or `#frag`.
  - **Paths:** every relative `href`/`src` must resolve to a file. Case is checked one directory level at a time against `os.listdir`, so untracked new files pass and wrong case fails.
  - **SVG copy:** it also runs the banned-claims regex over the `<text>` nodes of every `images/illustrations/*.svg`, and fails if any of those files is over 60 KB or isn't valid XML.
  - **Anchors:** every `href="#x"` and `page#x` must point at an existing `id`.
  - **Banned claims:** it runs a case-insensitive regex over **text nodes only**, skipping `<script>`, `<style>` and attributes: `\b(the )?first (ai|platform|pickleball|to)\b|\bonly (platform|one|tool)\b|\bno other\b|#1\b|\d+(\.\d+)?\s?%|\bguaranteed\b|\baccura(te|cy)\b|DUPR-certified`. The word boundaries matter: "inaccurate" in the privacy rights list must not match.
- Fix the live 404 at `pitch-deck/index.html:208`: change `game-listings.PNG` to `game-listings.png`, which is how git tracks it.
- In `privacy-policy.html:106` and the same line in `privacy/index.html`, reword "is 100% secure" to "is completely secure".
- Replace the stale footer blurb "Pickleball without all the hassle. Guaranteed pickleball playtime…" on `contact.html:95`, `privacy-policy.html:159`, `privacy/index.html:159`, `delete-account.html:165` and `delete-account/index.html:165`. The new text is "The full-stack pickleball platform with AI game film." Without this, the old blurb trips the banned-claims check.
- Remove the dead footer links (`index.html:437-440`, plus the contact, privacy and delete-account footers).
- **Tests:**
  - `check_site.py` passes on the current tree once the footer links are removed.
  - Adding a deliberate `<img src="images/nope.png">` makes it fail.
  - `_site/` contains neither `docs/` nor `README.md`.
- **Accept:** `bash scripts/build_site.sh && python3 scripts/check_site.py && test ! -e _site/docs && test -f _site/CNAME && test -f _site/css/marquee.css`

### Phase 2 — Shared plumbing: form, JS fixes, CSS components · M

- `js/main.js`: replace the waitlist handler (`:41-100`) and the contact `mailto` handler (`:105-135`) with one handler for `form[data-formspree]`.
  - It sends `fetch('https://formspree.io/f/xldqpalz', {method:'POST', body:new FormData(form), headers:{Accept:'application/json'}})`.
  - Success and error text go into the form's `[data-form-message]` element.
  - The button is disabled while sending, and nothing is written to localStorage.
  - `contact.html:62`: give the form `data-formspree`, a hidden `source=contact` and a `<p data-form-message>`. Its fields already carry `name` attributes. Without this, the form would submit natively as a GET and messages would be lost once the mailto handler is gone.
  - Fix the smooth-scroll handler (`:27-35`) so it skips `href="#"` and missing targets, which currently makes `querySelector('#')` throw.
- `css/components.css`: add the new sections at the end, before the mobile override block at `:1584`, so later mobile rules still apply.
  - `.grid-5` for the 5-step flow: 5 columns, 2 at ≤1024px, 1 at ≤768px.
  - `.feature-hero-card` (spans 2 columns, `.card-green`).
  - `.ai-shot` / `.ai-shot--phone` / `.ai-shot--wide` frames: `<figure>` with a 4px border, an 8px hard shadow, `img{display:block;width:100%;height:auto}`, and a small black `.ai-shot__label` chip. `--phone` caps the width at 320px.
  - `.step-icon` (64px, `fill:none; stroke:currentColor`) for the sprite icons.
  - `.coach-note` (timestamp chip + note).
  - `.rating-card` (rating number, ▲/▼ delta chip, stat rows).
  - `.tech-callout` (black box, green mono label, used for the YOLO explanation).
  - Use the existing tokens only (`css/style.css:6-33`), with no new colors. The ▼ chip uses black on white, not red.
- Add `.ai-shot`, `.rating-card` and `.coach-note` to the IntersectionObserver selector list in `main.js` so they get the slide-up reveal.
- **Tests:**
  - Submitting `#booking-form` on the local server shows a success message, and the Network tab shows a 200 from formspree.io.
  - Submitting with no network shows the error text.
  - Submitting `contact.html`'s form posts `source=contact`.
  - Clicking a footer `href="#"` social link throws no console error.
- **Accept:** `python3 scripts/check_site.py` passes. A manual form submit appears in the Formspree dashboard with `source=player-booking`.

### Phase 3 — Illustration set · M

Build every file in *Illustration set* in this order: `icons.svg`, `court-detection.svg`, the three phone SVGs, `camera-rig.svg`. Then build `scripts/render_og.sh` and `images/og/dinkli-og.png`.

- Phone SVGs share one frame: a 390×844 rounded rect, an 8px black stroke, a notch and a 12px hard shadow. To keep the files standalone, it's copied into each file rather than referenced.
- `scripts/render_og.sh` writes a temp HTML page into `$TMPDIR`: a 1200×630 white canvas with the tagline, plus `dinkli-logo.png` and `court-detection.svg` referenced by **absolute** `file://$REPO/images/...` paths, because relative paths break from `$TMPDIR` and runs `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --hide-scrollbars --window-size=1200,630 --screenshot=images/og/dinkli-og.png file://…`.
- Add a temporary review page at `docs/illustrations-preview.html`, which never deploys because `docs/` is excluded. It shows every SVG on white and on `#F5F5F5`, at 100% and 50% scale, plus the icon sprite. Review all of them there before any page uses them.
- **Tests:**
  - Every SVG parses with `python3 -c "import sys,xml.dom.minidom as m;[m.parse(f) for f in sys.argv[1:]]" images/illustrations/*.svg`.
  - Each SVG is under 60 KB (`check_site.py`).
  - `images/og/dinkli-og.png` is exactly 1200×630 (`sips -g pixelWidth -g pixelHeight images/og/dinkli-og.png`).
  - With "Reduce motion" turned on in macOS, the preview page shows no animation.
  - At 50% scale the labels `PLAYER 1` and `BALL` are still legible.
- **Accept:** the parse command and `python3 scripts/check_site.py` pass, and the preview page has been reviewed visually.

### Phase 4 — Homepage, top half (hero → How it works) · M

`index.html`. The ids `#how-it-works`, `#features`, `#pricing`, `#faq` and `#waitlist` stay. A new `#game-film` and `#rating` are added. Nav (desktop `:50-76` and mobile overlay): How It Works · Game Film · Platform · Pricing · FAQ · **For Courts** (`courts/`) · Contact.

1. **Hero** (`:79-105`). H1: "Every game. **Recorded.** Analyzed. Rated." Sub-line: "Dinkli is the full-stack pickleball platform — book courts, open play, clinics and leagues, and add AI game film to any match. Our crew brings the cameras. You get your personal video, stats and Dinkli Rating."
   - CTAs: **Book a recorded game** (`#waitlist`) and **See how it works** (`#how-it-works`).
   - The image becomes `.ai-shot--wide` with `images/illustrations/court-detection.svg`, not lazy-loaded and with no "Example" label.
   - mascot-1 stays.
2. **Ticker ×2** (`:108-128` and `:392-412`): the same 8 items in each half — AI Game Film · Court Booking · Player Tracking · Memberships · Dinkli Rating · Open Play · Coaching Notes · Leagues & Clinics.
3. **Platform grid** (`#value-props`, `:131-171`). Title: "One platform, every part of your game."
   - `.feature-hero-card` **AI Game Film** spans 2 columns.
   - Then Court Booking, Payments & Memberships, Dinkli Rating, Skill-Matched Play (with no-show accountability), and Court Tools.
   - mascot-2 stays.
4. **How the AI works** (`#how-it-works`, `:174-204`), switched to `.grid-5`. Each step gets a `.step-icon` from `icons.svg` (`i-book`, `i-rig`, `i-detect`, `i-analyze`, `i-deliver`):
   1. **Book** — reserve and add Record & Analyze.
   2. **We set up** — Dinkli's crew mounts the camera rig courtside.
   3. **Detect** — YOLO object detection finds every player, paddle and ball in every frame, and tracking links them across the whole game.
   4. **Analyze** — positioning, kitchen play, shot selection, errors and rally outcomes for each player.
   5. **Deliver** — your video, stats and rating update in the app.
   - Underneath, a `.tech-callout`: "No audio. No face recognition. Players are matched to tracks through their booking." mascot-3 stays.
- **Tests:**
  - At 375px the hero H1 wraps without horizontal scroll.
  - The 5 steps stack as 1 column at 375px, 2 at 768px and 5 at 1280px.
  - Both ticker halves have identical items, so the loop has no visible jump.
- **Accept:** `python3 scripts/check_site.py`, plus a visual check at the three widths.

### Phase 5 — Homepage, bottom half (film → footer, meta) · M

`index.html`.

5. **Your game film** (new `section#game-film`, after how-it-works).
   - Two `.ai-shot--phone` figures (`game-film-phone.svg`, `coaching-notes-phone.svg`) beside three sample `.coach-note` items. These are labeled as an *example* report, not as real users. Example note: "02:14 — You're drifting back after the third shot. Hold the kitchen line."
   - Copy explains that every player on court gets their own cut.
6. **Stats & Dinkli Rating** (new `section#rating`). An `.ai-shot--phone` `rating-phone.svg` figure sits next to a `.rating-card` example that shows a rating with a ▲ delta and stat rows (kitchen time, unforced errors, third-shot drops, rally win share), at least one with ▲ and one with ▼. Copy says "Your Dinkli Rating moves up or down after every analyzed game" and explains what moves it, plus the note "The Dinkli Rating is Dinkli's own rating and isn't affiliated with DUPR."
7. **Full platform** (`#features`, `:207-246`). Title: "Built to run your whole pickleball life." Keep all 6 screenshots, and rewrite the captions to cover courts, open play, clinics, leagues, memberships, passes, payments, reservations and profiles.
8. **Pricing** (`#pricing`, `:249-287`), as two cards:
   - **Book** — courts, open play, clinics and leagues, with memberships and passes.
   - **Record & Analyze** (`.card-green`, badge text "Add-on", replacing "Most popular", which is an unbacked claim) — the camera crew and rig, the personal video, coaching notes, stats and Dinkli Rating update. Price line: "Added per game at checkout."
   - mascot-4 stays.
9. **FAQ** (`#faq`), with 8 items:
   - How does the camera setup work?
   - What is YOLO, in plain English?
   - What about other players on court?
   - Is audio recorded?
   - How fast do I get my video?
   - How does the Dinkli Rating work?
   - Is this DUPR?
   - Can I still just book a court?
   - The "how fast" answer is: "After your game is processed, the app notifies you when your video is ready." There's no time promise. mascot-5 stays.
10. **CTA** (`#waitlist`, `:339-368`). Heading: "Book a recorded game". The fields are name, email, preferred court/area, and a select for "Record & Analyze?" (yes/maybe). The form gets `data-formspree`, a hidden `source=player-booking`, and an inline-style cleanup. **Location** heading: "Now recording games in Austin".
11. **Footer** (`:415-448`). New blurb, a "For Courts" link, © 2026, and the trailing comment after `</html>` removed.
12. **Head** (`:1-46`):
   - `<title>`: "Dinkli — AI Game Film + Pickleball Booking".
   - Rewrite the description and keywords.
   - The og/twitter image becomes `https://www.dinkli.com/images/og/dinkli-og.png` (1200×630, width and height declared).
   - Add `<link rel="canonical" href="https://www.dinkli.com/">`.
   - Add JSON-LD `Organization` + `WebSite` blocks. No `AggregateRating`.
- **Tests:**
  - All 8 FAQ items toggle, and opening one closes the others.
  - The form posts with `source=player-booking`.
  - `check_site.py` finds `#game-film` and `#rating` from the nav.
  - The JSON-LD passes `python3 -c "import json,re,sys;[json.loads(m) for m in re.findall(r'<script type=\"application/ld\+json\">(.*?)</script>', open('index.html').read(), re.S)]"`.
- **Accept:** `python3 scripts/check_site.py`, plus the manual FAQ and form check.

### Phase 6 — `courts/index.html` (hosting partners) · M

A new page that reuses the sticky nav and footer markup from `index.html` with `../` paths. It links `../css/style.css`, `../css/components.css` and `../css/marquee.css`, plus `../js/main.js`. Sections:

1. **Hero:** uses `../images/illustrations/court-detection.svg`. "Host the games players come back to film." Sub-line: "The full booking and operations platform, with AI game film built into every booking."  Buttons: Become a host court (`#host-form`) and View the court deck (`../pitch-deck/`).
2. **What hosts get:** booking, payments, memberships, open play, clinics, leagues, ratings, no-show accountability, and admin tools.
3. **Recording without the hardware:** Dinkli's crew brings, mounts and removes the rig, so there's no install and no equipment purchase. It shows `camera-rig.svg` and includes a `.tech-callout` on YOLO detection and tracking.
4. **Why it matters for the court:** shows `game-film-phone.svg`. A premium add-on players pay for, a reason to return, and shareable video that carries the court's name. No numbers.
5. **Host pilot:** one recurring session or league for 30 days, recorded and analyzed.
6. **Courts FAQ:** space and mounting, Wi-Fi/power, signage and player consent, who owns the footage, and revenue on add-ons ("we agree a share during the pilot").
7. **Form:** `#host-form`, `data-formspree`, hidden `source=court-host`, with fields name, court/facility, email and courts count.

- `contact.html`: rewrite the meta description, intro and footer blurb for players and courts. Make the visible email and the delivery address agree, using `alediez2408@gmail.com` unless the user says `support@dinkli.com` is live (assumed). Remove the "within 24-48 hours" promise.
- Also link "For Courts" from `contact.html`, `privacy-policy.html`, `privacy/index.html`, `delete-account.html` and `delete-account/index.html`.
- **Tests:**
  - `/courts/` loads with CSS on the local server.
  - The mobile menu opens and closes.
  - The form posts `source=court-host`.
  - `check_site.py` resolves every `../` path.
- **Accept:** `python3 scripts/check_site.py`, plus a manual check at 375 and 1280 px.

### Phase 7 — Pitch deck rewrite for court hosts · M

`pitch-deck/index.html` keeps 11 `section.deck-slide` elements with ids `slide-1` to `slide-11`, and the rail labels are updated to match:

| # | Label | Content |
|---|---|---|
| 01 | Thesis | "Every game recorded. Every player improving. Your courts at the center." `court-detection.svg` |
| 02 | Platform | Full-stack platform: booking, payments, memberships, programs, ratings, admin |
| 03 | Problem | Booking tools are interchangeable, and players get nothing back from playing |
| 04 | Signal | Keep the Playtomic review wall (booking pain), and add: "AI video apps exist, but players film and upload themselves. Dinkli brings the crew and plugs into booking." No competitor names, because research.md has no primary data on their hardware model |
| 05 | AI Game Film | Personal video + coaching notes, using `game-film-phone.svg` and `coaching-notes-phone.svg` |
| 06 | How it works | The 5 steps with sprite icons, `camera-rig.svg`, a YOLO detection + tracking callout and the no audio / no face recognition note |
| 07 | Product | `rating-phone.svg` plus existing `Dinkli-Games.PNG` and `Dinkli-Membership.png` |
| 08 | Value | For courts: premium add-on, retention, and shareable branded video |
| 09 | Model | SaaS for the platform + Record & Analyze per-game add-on, shared with the host court + optional booking take rate |
| 10 | Rollout | 30-day host pilot: one session or league, crew on site, review at day 30 |
| 11 | Ask | Become a founding host court → `../courts/#host-form` |

- Update `<title>`, meta and og (`../images/og/dinkli-og.png`, absolute URL) and the canonical `https://www.dinkli.com/pitch-deck/`.
- Don't add any direct children to `.deck-shell` other than `.slide-rail` and `.deck-slide`. Commit `fc016b6` grid pins depend on that.
- New image blocks reuse the existing deck classes (`phone-stage`, `insight-card`). Any new CSS goes in `css/pitch-deck.css` before the `@media print` block at `:706`.
- **Tests:**
  - Arrow keys move through all 11 slides, and the active dot follows the scroll.
  - Print preview gives 11 pages with no slide split across pages.
  - At 680px the rail collapses as it does today.
- **Accept:** `python3 scripts/check_site.py`, plus a manual print preview.

### Phase 8 — Privacy, SEO files, README · S

- `privacy-policy.html` and `privacy/index.html` must be edited identically: they are duplicates apart from `../` prefixes. Add a section titled "Game Recording & AI Analysis" covering:
  - what is recorded (video of booked Record & Analyze games, no audio);
  - how it's processed (automated computer-vision detection and tracking of players and the ball, with no facial recognition);
  - how players are identified (through their booking);
  - consent (captured at booking, with signage on recorded courts) and a note on other people on court;
  - who sees the video (the player's own clips, plus the host court in aggregate);
  - retention (raw video deleted 90 days after delivery);
  - deletion requests through `delete-account.html`;
  - and an update to "Information We Collect" (`:47-70`).
- Add the date "Last updated: October 2026" and an HTML comment `<!-- LEGAL REVIEW REQUIRED before recording launches -->`.
- `delete-account.html` and `delete-account/index.html`: add "game video and performance data" to the list of data that gets deleted.
- Add `robots.txt` (allow all, with the sitemap line) and `sitemap.xml` (`/`, `/courts/`, `/pitch-deck/`, `/contact.html`, `/privacy-policy.html`) at the root.
- `README.md`: new About section and feature list (AI game film first, then the full booking platform), structure (`courts/`, `images/illustrations/`, `images/og/`, `scripts/`), how to re-render the OG image, the deploy filter, and the `check_site.py` command.
- `WEBSITE_PLAN.md` gets a one-line pointer at the top: "Superseded by docs/plans/2026-10-16-ai-performance-repositioning/plan.md."
- **Tests:**
  - A diff of `privacy-policy.html` against `privacy/index.html` shows only path-prefix differences (`diff <(sed 's#\.\./##g' privacy/index.html) privacy-policy.html` is empty).
  - `sitemap.xml` parses with `python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse('sitemap.xml')"`.
- **Accept:** both commands above, plus `python3 scripts/check_site.py`.

### Phase 9 — Final verification + release · S

- Delete nothing in `docs/`. `docs/illustrations-preview.html` stays for future art changes.
- Do a full manual pass of `/`, `/courts/` and `/pitch-deck/` at 375, 768 and 1280 px:
  - illustrations are crisp at every width;
  - the console shows no errors;
  - both forms are submitted once;
  - print-preview the deck and confirm the SVGs print.
- Paste `https://www.dinkli.com/` into a link-preview tester after deploy, to confirm `dinkli-og.png` shows.
- Open a PR from `feature/ai-repositioning` to `main`. After merging, confirm in the Pages run log that `_site` was uploaded.
- **Tests:**
  - `bash scripts/build_site.sh && test -f _site/images/illustrations/court-detection.svg && test -f _site/images/og/dinkli-og.png && test ! -e _site/docs`
  - `python3 scripts/check_site.py`
- **Accept:** both tests pass, the live site is checked, and `curl -s -o /dev/null -w '%{http_code}' https://www.dinkli.com/docs/plans/` prints `404`.

## Risks

- **Product promises in the copy must be true before launch.** That covers no audio, no face recognition, consent at booking, signage and 90-day deletion. If the beta records audio or uses faces to identify players, the privacy page and FAQ become false statements, and that's exposure under Texas §503.001. The user confirms this before Phase 9 merges.
- **Illustration quality is the main visual risk** now that there's no user art. Phase 3 is placed before any page work, and the preview page lets the user approve the art before it spreads to 3 pages.
- **YOLO licensing.** Commercial use of Ultralytics YOLO needs an Enterprise licence, or the system has to go open source under AGPL-3.0. The site copy survives a model swap because of the naming decision, but the deck invites diligence questions.
- **Service promises.** The copy avoids turnaround times and retention beyond 90 days. If the user wants a promise like "video within 48 hours", it has to match what the beta can actually deliver.
- **The Formspree form `xldqpalz` may be inactive** or belong to a different account. Phase 2 fails visibly if so, and the user then supplies a new ID (a one-line change in `main.js`).

## Non-goals

- Building the camera, computer-vision or rating system.
- Changes to the mobile app.
- Terms of Service.
- Any analytics/tracking script.
- Removing the unused CSS files from git (they're only excluded from deploy).

## Challenge

Challenger (opus) returned 5 BLOCKERs and 6 MINORs, and all of them are applied above:

- The `contact.html` form would have broken, so it's now migrated to Formspree in Phase 2.
- `check_site.py` would have failed on not-yet-delivered images, on untracked files, and on legitimate uses of "first" and "%". It now warns on missing images by default, checks case with `os.listdir`, bans phrases rather than words in text nodes only, and the "100% secure" line is reworded.
- The deck had a live `game-listings.PNG` 404, now fixed in Phase 1.
- The courts hero had a "no other" claim, now reworded.
- The image-fallback finding is moot since 2026-10-16: there are no missing-file slots, because illustrations are built in Phase 3.
- The rating example now shows both ▲ and ▼.
- The turnaround promise is gone, and competitor names are removed from the deck.
- `CNAME` and `marquee.css` survival is added to the Phase 1 accept command.

Verified OK by the Challenger: line refs (`main.js:27-35/41-100/105-135`, `components.css:1584`, `pitch-deck.css:706`), the privacy diff baseline is empty today, rsync is available on the runner, and the Formspree fetch+FormData approach works with CORS.


## Handoff prompt

> Execute the plan at `docs/plans/2026-10-16-ai-performance-repositioning/plan.md` in the Dinkli repo (`/Users/jorgealejandrodiez/Desktop/Websites/Dinkli`). Read `plan.md` in full first, then read `research.md` (`## codebase` has the path:line map). Work on branch `feature/ai-repositioning`, created from `main`.
>
> Do the phases in order, 1 to 9. Each phase ends when its **Accept** command passes. Commit once per phase, with the message "Phase N: <title>". Every decision in the plan is locked, including the ones tagged "assumed", so don't re-ask them.
>
> Hard rules:
> - No invented metrics, testimonials, accuracy figures, turnaround promises or "first/only/no other" claims.
> - Name YOLO only in technical sections.
> - The rating is the "Dinkli Rating", with the not-DUPR note.
> - Keep the anchor ids and the `.deck-shell` child contract.
> - Edit duplicated pages in pairs: `privacy-policy.html` with `privacy/index.html`, and `delete-account.html` with `delete-account/index.html`.
> - Keep both ticker halves identical.
> - Illustrations follow the *Illustration set* style rules: brand colors only, faceless players, no percentages or confidence scores, and every number labeled "Example".
>
> Stop and ask the user only:
> - if Formspree `xldqpalz` rejects submissions (you need a new form ID);
> - at the end of Phase 3, to approve the illustrations on `docs/illustrations-preview.html` before they go into pages;
> - before merging to `main`: to confirm the beta records no audio, uses no face recognition and deletes raw video within 90 days, since the privacy copy promises all three.
>
> Never push to `main` without the user's go-ahead.
