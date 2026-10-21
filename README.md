# Dinkli Website

Website and pitch deck for Dinkli. We install a complete booking platform and AI cameras at pickleball courts.

## 🎾 About Dinkli

Dinkli is a complete booking and player platform for pickleball, and its headline feature is **AI game analytics**:

- **AI Game Analytics (Record & Analyze)**: a per-game add-on. cameras installed at the court record the game, computer vision (YOLO object detection plus tracking) follows every player and the ball, and each player gets a personal video with timestamped coaching notes and game stats
- **Dinkli Rating**: moves up or down after every analyzed game (Dinkli's own rating, not affiliated with DUPR)
- **Court Booking**: courts, open play, clinics, leagues and recurring sessions
- **Payments & Memberships**: one-time bookings, passes and memberships in one checkout
- **Skill-Matched Play**: skill levels and no-show accountability
- **Court Tools**: scheduling, policies, cancellations and player communication for host courts

The homepage and pitch deck speak to court owners. The mission is the best booking experience in pickleball for their players. Cameras are installed permanently at each court, and players add Record & Analyze per game. `/courts/` redirects to the homepage.

## 🎨 Design

This website uses a **neurobrutalism** design style featuring:
- Bold, thick borders (4px)
- High contrast colors (black, white, highlighter green)
- Geometric shapes with bold rounded corners
- Playful, energetic aesthetic
- Strong typography

**Brand Colors:**
- Primary: Highlighter Green (#00FF00)
- Secondary: Black (#000000)
- Background: White (#FFFFFF)

## 📁 Project Structure

```
Dinkli/
├── index.html              # Homepage (court owners)
├── courts/                 # Redirects to the homepage
├── pitch-deck/             # Court-host pitch deck (prints to 11 landscape pages)
├── contact.html, privacy-policy.html, privacy/, delete-account.html, delete-account/
├── css/
│   ├── style.css           # Base styles & design tokens
│   ├── components.css      # Component styles (incl. AI game analytics components)
│   ├── marquee.css         # Ticker
│   └── pitch-deck.css      # Deck styles
├── js/
│   ├── main.js             # FAQ, nav, Formspree lead forms, scroll reveal
│   └── pitch-deck.js       # Deck navigation and print
├── images/
│   ├── illustrations/      # Designed SVG illustrations + icons.svg sprite
│   ├── og/                 # Social share image (rendered by scripts/render_og.sh)
│   ├── app-screenshots/    # App screenshots
│   └── logos/              # Logo and mascots
├── scripts/                # build_site.sh, check_site.py, render_og.sh (not deployed)
└── docs/                   # Plans and the illustration review page (not deployed)
```

Note: `privacy-policy.html` / `privacy/index.html` and `delete-account.html` / `delete-account/index.html` are copies. Edit both of each pair.

## ✅ Checks

```bash
python3 scripts/check_site.py   # broken links/anchors (case-sensitive), banned marketing claims, SVG budget
bash scripts/build_site.sh      # builds the filtered _site/ that gets deployed
bash scripts/render_og.sh       # re-renders images/og/dinkli-og.png after changing the hero illustration
```

Lead forms post to Formspree (`js/main.js`, `FORMSPREE_ENDPOINT`) with a hidden `source` field: `court-owner` or `contact`.

Copy rule: no invented metrics, testimonials, accuracy figures, turnaround promises or "first/only" claims. `check_site.py` enforces the obvious cases.

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/alediez2048/Dinkli-website.git
   cd Dinkli-website
   ```

2. **Add Images**
   - See `IMAGE_SETUP.md` for detailed instructions
   - Add your logo to `images/logos/dinkli-logo.png`
   - Add app screenshots to `images/app-screenshots/`

3. **Start Local Development Server**
   
   **Option 1: Using the provided script (Easiest)**
   ```bash
   ./start-server.sh
   ```
   Then open http://localhost:8000 in your browser
   
   **Option 2: Using Python directly**
   ```bash
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser
   
   **Option 3: Using Node.js (if installed)**
   ```bash
   npx http-server -p 8000
   ```
   Then open http://localhost:8000 in your browser
   
   **Option 4: VS Code Live Server**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

## 🌐 Deployment

This site is deployed on **GitHub Pages** and live at:
- **Production**: https://www.dinkli.com
- **GitHub Pages**: https://alediez2048.github.io/Dinkli-website

Deployment is automatic via GitHub Actions when pushing to the `main` branch. The workflow runs `scripts/build_site.sh` and publishes only `_site/`, so `docs/`, `scripts/`, Markdown files and app config never go live.

## 📝 Development

- **Main branch**: Production-ready code
- **Develop branch**: Active development

### Making Changes

1. Work on the `develop` branch
2. Test locally
3. Commit and push to `develop`
4. Merge to `main` when ready to deploy

## 🛠️ Technologies

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox
- **JavaScript**: Vanilla JS (no frameworks)
- **GitHub Pages**: Hosting and deployment

## 📱 Features

- ✅ Responsive design (mobile-first)
- ✅ Neurobrutalism design system
- ✅ FAQ accordion
- ✅ Smooth scrolling
- ✅ Scroll animations
- ✅ SEO optimized
- ✅ Accessibility features

## 📄 Documentation

- `DOMAIN_SETUP.md` - Domain configuration instructions
- `IMAGE_SETUP.md` - Image requirements and setup

## 🔗 Links

- **Website**: https://www.dinkli.com
- **Repository**: https://github.com/alediez2048/Dinkli-website

## 📧 Contact

For questions or support, contact through the app or website.

---

© 2025 Dinkli. All rights reserved. ESTD 2025
