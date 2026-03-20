# MSC-NMU Eid Card Generator

A web-based Eid Al-Fitr greeting card generator created by Microsoft Student Clubs at New Mansoura University. Create personalized Eid cards with your photo and share them with friends and family.

## Features

- **Photo Upload** — Drag & drop or click to upload your photo (PNG, JPG up to 5MB)
- **Personalization** — Add your name and position/role to the card
- **Beautiful Template** — Professional Eid Mubarak design with MSC-NMU branding
- **High Quality Export** — Download cards at 1080x1080px resolution
- **Share Options** — Share directly via Web Share API or copy to clipboard
- **Celebration Animations** — Confetti and sparkle effects when card is generated
- **Responsive Design** — Works seamlessly on desktop and mobile devices

## How to Use

1. **Upload Photo** — Click or drag your photo into the upload area
2. **Enter Details** — Fill in your name and optionally your position/role
3. **Generate** — Click "Generate My Card" button
4. **Download/Share** — Use the Download or Share buttons to save or share your card

## Tech Stack

- **HTML5** — Semantic markup and Canvas API for card rendering
- **CSS3** — Modern styling with animations, gradients, and backdrop filters
- **Vanilla JavaScript** — No frameworks, pure JS for all functionality
- **Google Fonts** — Inter and Tajawal font families

## Project Structure

```
MSC-EID/
├── assets/
│   ├── logo.png          # MSC-NMU logo
│   └── template.png      # Card template background
├── index.html            # Main HTML file
├── style.css             # Stylesheet
├── script.js             # JavaScript functionality
├── vercel.json           # Vercel deployment config
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Deployment

This project is configured for deployment on Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or simply connect your GitHub repository to Vercel for automatic deployments.

## Local Development

No build tools required. Simply open `index.html` in a browser or use a local server:

```bash
# Using Python
python -m http.server 3000

# Using Node.js
npx serve

# Using PHP
php -S localhost:3000
```

## License

Created by Microsoft Student Clubs — New Mansoura University

---

**Eid Mubarak!** 🌙
