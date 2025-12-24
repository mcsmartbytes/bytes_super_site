# MC Smart Bytes - The Made Easy Suite

Marketing website for MC Smart Bytes, showcasing the Made Easy software suite for contractors and small businesses.

## Overview

This site serves as the main marketing hub for:

- **Expenses Made Easy** - AI-powered receipt scanning and mileage tracking
- **Books Made Easy** - Full accounting software for small businesses
- **SiteSense** - Job costing and time tracking for contractors

## Features

- Responsive design with modern animations
- Product showcase with integrated app links
- Freemium pricing model (Free, Pro $29/mo, Business $79/mo)
- Done For You managed services page
- Contact form with security verification
- SEO optimized with sitemap and robots.txt

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Homepage
│   ├── services/         # Done For You services page
│   ├── admin/            # Admin dashboard
│   ├── globals.css       # Global styles & animations
│   └── sitemap.ts        # SEO sitemap
├── components/
│   ├── Navigation.tsx    # Main navigation
│   ├── AnimatedSection.tsx
│   └── AnimatedCounter.tsx
└── services/             # Backend services
```

## App Links

- Expenses Made Easy: https://expenses-made-easy-opal.vercel.app
- Books Made Easy: https://books-made-easy-app.vercel.app
- SiteSense: https://sitesense-lilac.vercel.app

## Deployment

The site is deployed on Vercel and automatically deploys on push to the main branch.

## License

Copyright 2024 MC Smart Bytes. All rights reserved.
