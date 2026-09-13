# Dinkli Website

Landing page, marketing website, and pitch deck for Dinkli - a mobile booking and player experience layer for pickleball courts.

## 🎾 About Dinkli

Dinkli helps pickleball court owners and operators give their existing player communities a cleaner mobile experience. Key features:
- **Mobile Reservations**: Book courts, open play, clinics, leagues, and recurring sessions
- **Player Ratings**: Capture rating, skill, and no-show signals to improve session quality
- **Memberships and Passes**: Present repeat-play options in a simple player flow
- **Court Admin Tools**: Reduce manual scheduling, policy, cancellation, and confirmation work
- **Player Retention**: Make it easier for players to book again and stay connected to the facility

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
├── index.html              # Main landing page
├── pitch-deck/             # Court-operator pitch deck
├── css/
│   ├── style.css          # Base styles & design system
│   └── components.css     # Component-specific styles
├── js/
│   └── main.js            # JavaScript functionality
├── images/
│   ├── logos/             # Brand logos
│   ├── app-screenshots/   # App screenshots
│   └── icons/             # Icons (if needed)
├── assets/
│   └── fonts/             # Custom fonts (if any)
└── README.md
```

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

Deployment is automatic via GitHub Actions when pushing to the `main` branch.

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

- `WEBSITE_PLAN.md` - Complete development plan and roadmap
- `DOMAIN_SETUP.md` - Domain configuration instructions
- `IMAGE_SETUP.md` - Image requirements and setup

## 🔗 Links

- **Website**: https://www.dinkli.com
- **Repository**: https://github.com/alediez2048/Dinkli-website

## 📧 Contact

For questions or support, contact through the app or website.

---

© 2025 Dinkli. All rights reserved. ESTD 2025
