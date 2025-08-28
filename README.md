# CareTail Landing Page

A modern, responsive landing page for CareTail - the ultimate pet care companion app.

## 🐾 About CareTail

CareTail is a comprehensive pet care management application that helps pet owners track their furry friends' health, schedule appointments, manage feeding times, and connect with local pet services.

## 🚀 Features

- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, intuitive interface with smooth animations
- **Fast Loading** - Optimized for performance with minimal dependencies
- **SEO Friendly** - Proper meta tags and semantic HTML structure
- **Accessibility** - WCAG compliant design principles

## 📁 Project Structure

```
/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality and animations
├── _headers            # Cloudflare Pages security headers
└── README.md           # This file
```

## 🛠 Deployment to Cloudflare Pages

### Prerequisites
- Cloudflare account with domains already configured
- Git repository (GitHub, GitLab, or Bitbucket)

### Steps

1. **Push code to Git repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial CareTail landing page"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to "Pages" in the sidebar
   - Click "Create a project"
   - Connect your Git provider and select the repository
   
3. **Configure build settings:**
   - **Framework preset:** None (Static HTML)
   - **Build command:** (leave empty)
   - **Build output directory:** `/`
   - **Root directory:** (leave empty)

4. **Add custom domain:**
   - After deployment, go to "Custom domains" tab
   - Add your domains: `caretail.pet` and `caretail.app`
   - Cloudflare will automatically configure DNS

### Environment Variables (if needed)
Currently, no environment variables are required for the static landing page.

## 🎨 Customization

### Colors
The main brand colors can be modified in `styles.css`:
- Primary gradient: `#667eea` to `#764ba2`
- Text colors: `#333` (dark), `#666` (medium), `#ccc` (light)

### Content
Update the following sections in `index.html`:
- Hero title and description
- Feature cards content
- About section text
- Contact information

### Fonts
Currently using Inter font from Google Fonts. To change:
1. Update the Google Fonts link in `<head>`
2. Modify the `font-family` in CSS

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and up
- **Tablet:** 768px - 1199px
- **Mobile:** 320px - 767px

## 🔧 Performance Optimizations

- Minified CSS and JavaScript (for production)
- Optimized images (when added)
- Proper caching headers via `_headers` file
- Lazy loading for images
- Efficient CSS animations

## 🚧 Future Enhancements

- [ ] Add real images for better visual appeal
- [ ] Implement proper email collection backend
- [ ] Add blog section
- [ ] Create download pages for iOS/Android apps
- [ ] Add multi-language support
- [ ] Implement analytics tracking

## 📞 Contact

For questions or support regarding the CareTail landing page:
- Website: [caretail.pet](https://caretail.pet) / [caretail.app](https://caretail.app)
- Email: Coming soon!

## 📄 License

All rights reserved. CareTail © 2024

---

**Note:** This landing page is optimized for Cloudflare Pages deployment with your existing domain configuration.