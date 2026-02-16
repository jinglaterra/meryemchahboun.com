# Meryem Chahboun - Portfolio Website

Professional bilingual (English/Spanish) portfolio website for architectural and interior designer Meryem Chahboun, based in Costa del Sol, Spain.

## 🌐 Live Preview

The website is currently running locally at: **http://localhost:8000**

## ✨ Features

- **Bilingual Content**: Seamless English/Spanish switching with localStorage persistence
- **Mediterranean Modern Design**: Warm beige, terracotta, and natural color palette
- **Responsive**: Mobile-first design optimized for all devices
- **Project Showcase**: Dynamic project grid with modal details
- **Contact Integration**: WhatsApp, email, and LinkedIn integration
- **SEO Optimized**: Proper meta tags, semantic HTML, and structured data ready
- **Professional**: Compliant with title regulations (Architectural & Interior Designer)

## 🚀 Quick Start

### Running Locally

```bash
# Using npx (recommended)
npx -y http-server -p 8000

# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve
```

Then open: **http://localhost:8000**

## 📁 Project Structure

```
meryemchahboun.com/
├── index.html                    # Main HTML file
├── styles/
│   ├── design-system.css         # Design tokens & variables
│   ├── main.css                  # Global styles
│   ├── components.css            # Reusable components
│   └── pages.css                 # Page-specific styles
├── src/
│   ├── components/               # JavaScript components
│   ├── pages/                    # Page scripts
│   └── data/                     # Content & project data (JSON)
└── public/
    └── images/                   # Image assets
```

## 🔧 Customization

### 1. Add Real Images

Place project images in `/public/images/projects/` and update paths in `src/data/projects.json`

### 2. Update WhatsApp Number

Edit `src/components/contact-form.js` line 7:
```javascript
this.whatsappNumber = '+34XXXXXXXXX'; // Your number
```

### 3. Update LinkedIn URL

Search for `linkedin.com/in/meryemchahboun` in `index.html` and replace with actual URL

### 4. Edit Content

All text content is in `src/data/content.json` - edit both `"en"` and `"es"` sections

### 5. Add/Edit Projects

Edit `src/data/projects.json` to add new projects or modify existing ones

## 🎨 Design System

**Colors:**
- Sand: #E8DCC8
- Terracotta: #C9A88A
- Stone: #8B7E74
- Charcoal: #2C2825
- Sage: #A8B5A0

**Typography:**
- Headings: Cormorant Garamond
- Body: Inter

**Spacing:** 8px-based scale

## 📱 Browser Support

- Chrome, Firefox, Safari, Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)
- Responsive from 320px to 2560px

## 🚀 Deployment

### Recommended Platforms

- **Netlify**: Drag & drop deployment
- **Vercel**: GitHub integration
- **GitHub Pages**: Free hosting
- **Traditional Hosting**: Upload via FTP

### Before Deploying

1. ✅ Add real project images
2. ✅ Update WhatsApp number
3. ✅ Verify LinkedIn URL
4. ✅ Test all contact methods
5. ✅ Test language switching
6. ✅ Check mobile responsiveness

## 📧 Contact Integration

- **Email**: contact@meryemchahboun.com
- **WhatsApp**: Update number in `contact-form.js`
- **LinkedIn**: Update URL in `index.html`

## 📄 License

© 2026 Meryem Chahboun. All rights reserved.

---

**Built with:** HTML5, CSS3, Vanilla JavaScript  
**Design:** Mediterranean Modern  
**Languages:** English, Spanish
