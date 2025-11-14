# Dinkli Website Development Plan

## Project Overview

**Purpose**: Landing page and marketing website for Dinkli mobile app - a platform that helps users discover, book, and join local pickleball pickup games.

**Key Value Propositions**:
- 🏀 Games organized on outdoor public courts (basketball, football, any concrete surface)
- 💰 Significant cost reduction vs. traditional court rentals
- ⏰ Guaranteed playtime
- 🎯 Skill-based player matching
- 🎾 Game captains provide nets, rackets, and balls

**Business Model**:
- One-time: $10 per game
- Monthly membership: $50/month

---

## Best Practices for Mobile App Landing Pages

### 1. **Hero Section (Above the Fold)**
- Clear, compelling headline that communicates value immediately
- Subheadline explaining the unique advantage
- High-quality app screenshots or mockups
- Primary CTA: "Download Now" buttons (App Store + Google Play)
- Secondary CTA: "Learn More" or "See How It Works"
- Mobile-optimized (thumb-friendly buttons, single-column layout)

### 2. **Value Proposition Section**
- Highlight key benefits (cost savings, guaranteed playtime, skill matching)
- Use icons or visuals to make benefits scannable
- Address pain points (expensive courts, no guaranteed spots, mismatched skill levels)

### 3. **How It Works**
- Simple 3-4 step process
- Visual flow (icons, illustrations, or screenshots)
- Clear, concise explanations

### 4. **Social Proof**
- User testimonials/reviews
- Number of active users/games
- Media mentions or press coverage
- Trust badges (if applicable)

### 5. **Features Showcase**
- Key app features with visuals
- Screenshots or short video demo
- Feature comparison (Dinkli vs. traditional courts)

### 6. **Pricing Section**
- Clear pricing tiers ($10/game vs. $50/month)
- Value comparison (show savings)
- FAQ about pricing

### 7. **Download CTAs**
- Multiple download buttons throughout page
- App Store and Google Play badges
- QR code for mobile scanning

### 8. **FAQ Section**
- Address common concerns
- Build trust and reduce friction

### 9. **Footer**
- Contact information
- Social media links
- Privacy policy, Terms of Service
- Additional navigation

### 10. **Technical Best Practices**
- Fast load times (< 3 seconds)
- Mobile-first responsive design
- SEO optimization
- Accessibility (WCAG compliance)
- Analytics tracking

---

## Website Structure & Pages

### **Primary Pages**

1. **Homepage (Landing Page)**
   - Hero section with app value prop
   - How it works
   - Key features
   - Social proof
   - Pricing
   - Download CTAs
   - FAQ

2. **About Page** (Optional - can be section on homepage)
   - Company story
   - Mission/vision
   - Team (if applicable)

3. **How It Works Page** (Optional - can be section on homepage)
   - Detailed step-by-step guide
   - Visual walkthrough

4. **FAQ Page** (Can be section on homepage or separate)
   - Common questions
   - Pricing questions
   - App usage questions

5. **Contact Page** (Optional)
   - Contact form
   - Email/social links

---

## Development Roadmap

### **Phase 1: Foundation & Structure** ✅
- [x] Initialize repository
- [x] Set up GitHub Pages
- [x] Connect domain
- [x] Create develop branch

### **Phase 2: Project Setup**
- [ ] Choose tech stack (HTML/CSS/JS vs. framework)
- [ ] Set up project structure
- [ ] Create folder organization
- [ ] Set up build/deployment pipeline (if needed)
- [ ] Add development dependencies

### **Phase 3: Design System**
- [ ] Define color palette (brand colors)
- [ ] Choose typography (fonts)
- [ ] Create component library (buttons, cards, sections)
- [ ] Design mobile-first layout system
- [ ] Create style guide document

### **Phase 4: Core Sections Development**

#### 4.1 Hero Section
- [ ] Design hero layout
- [ ] Create headline and subheadline
- [ ] Add app mockup/screenshot placeholders
- [ ] Implement download CTA buttons
- [ ] Add smooth scroll animations

#### 4.2 Value Proposition Section
- [ ] Design benefit cards
- [ ] Add icons/illustrations
- [ ] Write compelling copy for each benefit
- [ ] Implement responsive grid layout

#### 4.3 How It Works Section
- [ ] Create step-by-step flow
- [ ] Design visual timeline
- [ ] Add icons or illustrations
- [ ] Write clear explanations

#### 4.4 Features Showcase
- [ ] List key app features
- [ ] Create feature cards
- [ ] Add app screenshots/mockups
- [ ] Implement interactive elements (if needed)

#### 4.5 Social Proof Section
- [ ] Design testimonial cards
- [ ] Add user review placeholders
- [ ] Create stats/metrics display
- [ ] Add trust indicators

#### 4.6 Pricing Section
- [ ] Design pricing cards
- [ ] Create comparison table
- [ ] Add value proposition highlights
- [ ] Implement CTA buttons

#### 4.7 FAQ Section
- [ ] Write FAQ questions/answers
- [ ] Design accordion or expandable FAQ
- [ ] Organize by category

#### 4.8 Footer
- [ ] Add navigation links
- [ ] Include social media icons
- [ ] Add legal links (Privacy, Terms)
- [ ] Contact information

### **Phase 5: Mobile Optimization**
- [ ] Test on various mobile devices
- [ ] Optimize touch targets (buttons)
- [ ] Ensure single-column layout on mobile
- [ ] Test form inputs
- [ ] Optimize images for mobile
- [ ] Test load times

### **Phase 6: Content & Copywriting**
- [ ] Finalize all copy
- [ ] Add app screenshots (when available)
- [ ] Write meta descriptions
- [ ] Add alt text to images
- [ ] Create compelling CTAs

### **Phase 7: SEO & Performance**
- [ ] Add meta tags (title, description, OG tags)
- [ ] Implement structured data (JSON-LD)
- [ ] Optimize images (compression, WebP format)
- [ ] Minify CSS/JS
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Test page speed (Lighthouse)

### **Phase 8: Analytics & Tracking**
- [ ] Set up Google Analytics
- [ ] Add conversion tracking
- [ ] Track download button clicks
- [ ] Set up event tracking

### **Phase 9: Testing & QA**
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility testing
- [ ] Performance testing
- [ ] Link checking
- [ ] Form testing (if applicable)

### **Phase 10: Launch Preparation**
- [ ] Final content review
- [ ] Legal pages (Privacy Policy, Terms of Service)
- [ ] Set up 404 page
- [ ] Final SEO check
- [ ] Backup/version control check

### **Phase 11: Post-Launch**
- [ ] Monitor analytics
- [ ] A/B test key elements
- [ ] Gather user feedback
- [ ] Iterate based on data

---

## Recommended Tech Stack Options

### **Option 1: Static HTML/CSS/JS** (Simplest)
- ✅ Fast load times
- ✅ Easy to deploy on GitHub Pages
- ✅ No build process needed
- ✅ Full control
- ❌ More manual work for complex features

### **Option 2: Modern Framework (React/Vue)**
- ✅ Component reusability
- ✅ Better for complex interactions
- ✅ Modern development experience
- ❌ Requires build process
- ❌ More setup complexity

### **Option 3: Static Site Generator (Jekyll, 11ty)**
- ✅ Good for content management
- ✅ Built-in optimization
- ✅ GitHub Pages native support (Jekyll)
- ❌ Learning curve

**Recommendation**: Start with **Option 1 (Static HTML/CSS/JS)** for simplicity and speed, can migrate later if needed.

---

## File Structure Proposal

```
Dinkli/
├── index.html              # Homepage
├── css/
│   ├── style.css           # Main stylesheet
│   ├── components.css      # Component styles
│   └── responsive.css      # Media queries
├── js/
│   ├── main.js            # Main JavaScript
│   └── animations.js      # Scroll animations
├── images/
│   ├── app-screenshots/   # App mockups
│   ├── icons/             # Icons
│   └── logos/             # Brand assets
├── assets/
│   └── fonts/             # Custom fonts (if any)
├── .github/
│   └── workflows/
│       └── pages.yml      # Deployment
├── README.md
├── DOMAIN_SETUP.md
└── WEBSITE_PLAN.md        # This file
```

---

## Key Messaging & Copy Points

### **Headlines Options**:
- "Pickleball Without the Court Costs"
- "Play Pickleball Anywhere. Anytime. Guaranteed."
- "Affordable Pickleball Games on Public Courts"
- "Find Your Perfect Pickleball Match"

### **Value Props to Highlight**:
1. **Cost Savings**: "Play for $10/game vs. $50+ court rentals"
2. **Guaranteed Playtime**: "No more waiting lists or full courts"
3. **Skill Matching**: "Play with players at your level"
4. **Convenience**: "Games on public courts near you"
5. **Equipment Provided**: "Just show up - we bring everything"

### **Call-to-Action Options**:
- "Download Free"
- "Start Playing Today"
- "Join a Game Now"
- "Get the App"

---

## Next Steps

1. **Review and approve this plan**
2. **Choose tech stack** (recommend: Static HTML/CSS/JS)
3. **Start Phase 2: Project Setup**
4. **Begin Phase 3: Design System**

---

## Questions to Consider

- Do you have app screenshots/mockups ready?
- What are your brand colors?
- Do you have a logo?
- Any existing user testimonials?
- Target launch date?
- Any specific design inspiration/references?

