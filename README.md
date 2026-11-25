# Dinkli Website

Website for Dinkli: pickleball booking for players, captains, and clubs.

## 🎾 About Dinkli

Dinkli is a pickleball booking app:

- **For Players**: Find a regular pickleball game at your level, book a spot in the iOS app, and show up. After each game, players rate each other's skill, so matchups stay even.
- **For Captains**: Run games at clubs and charge in the app, instead of group chats and Venmo. Dinkli lists your game at your price, players pay in the app, and Dinkli sends you your share.
- **For Clubs**: Players see a session, book a spot, pay, and show up. Ratings help keep games even. Start with one session. Works alongside how you run things today.

**Coming soon:** AI recording. Upload a game from your phone and get video plus a highlight in the app.

The homepage speaks to players. `/captains/` and `/clubs/` pages speak to hosts. iOS only. No installed cameras, no camera-driven ratings.

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
├── index.html              # Homepage (players: sign up and show up)
├── captains/               # Captains page
├── clubs/                  # Clubs page
├── courts/                 # Redirects to /clubs/
├── pitch-deck/             # Redirects to /clubs/ (unpublished)
├── contact.html, privacy-policy.html, privacy/, delete-account.html, delete-account/
├── css/
│   ├── style.css           # Base styles & design tokens
│   ├── components.css      # Component styles
│   └── marquee.css         # Ticker
├── js/
│   └── main.js             # FAQ, nav, Formspree lead forms, scroll reveal
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

Lead forms post to Formspree (`js/main.js`, `FORMSPREE_ENDPOINT`) with a hidden `source` field: `player`, `captain`, `club`, or `contact`.

Copy rule: no invented metrics, testimonials, accuracy figures, turnaround promises or "first/only" claims. No em dashes. Rating wording must be exact: "After each game, players rate each other's skill, so matchups stay even." Never use "Dinkli Rating" on the new site. `check_site.py` enforces the obvious cases.

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

1. Work on the `develop` branch (or a feature branch)
2. Test locally
3. Commit and push
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
