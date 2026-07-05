# Reesh Enterprise — Marketing Website

Premium, enterprise-grade marketing website for **Reesh Enterprise**, a creative & digital
agency in Mogadishu. Built to the **Reesh DS v1.0** design system with premium motion,
advanced backgrounds, and context-fit imagery.

**Design. Digital. Media. Web. Print. — built to be noticed.**

## Stack

- **Next.js 14** (App Router, all pages static/SSG)
- **Tailwind CSS** (config mirrors the DS tokens exactly)
- **framer-motion** for choreographed entrances, scroll-reveal, parallax, FLIP filtering
- **next/image** (WebP, lazy-load) with a centralized image map
- **next/font** — Sora (display) + Inter (body)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (SSG)
npm run start      # serve the production build
```

## Project structure

```
app/                     App Router routes + metadata/sitemap/robots/OG image
  page.js                Home
  about/ services/ ...   Pages (12 routes total, incl. /services/[slug] × 5)
  api/contact/route.js   Contact form endpoint (webhook + WhatsApp fallback)
components/
  ui/                    Primitives: Button, Container, Eyebrow, SectionHeading, Icon
  layout/                Navbar, Footer
  sections/              Reusable blocks: Hero, ReeshFive, ServiceCard, ProcessStepper,
                         WhyReesh, IndustryGrid, PortfolioGrid, TeamGrid, ValuesList,
                         CTABand, ContactForm, StatStrip, PageHero, IncludedList
  util/                  Reveal (scroll animation), Background (bg treatments), SmartImage
lib/
  content.js             SINGLE SOURCE OF TRUTH — all copy + imagery. CMS-ready.
  motion.js              Shared framer-motion variants (one easing curve everywhere)
public/brand/            Logo SVGs (light / white / mark)
```

## Editing content

All copy, sub-brands, industries, team, values, process, portfolio, and image URLs live in
**`lib/content.js`**. Edit once → every page updates. Swap portfolio thumbnails and imagery
by changing the URLs there (one line each).

## Design system (locked)

- **Colors:** `--reesh-blue #009FD0`, `--ink #0B1622`, `--slate #4B5A68`, `--mist #F2F8FB`
  (90% neutral, 10% blue — blue reserved for actions & signature moments).
- **Type:** Sora 600/700/800 (display), Inter 400/500/600 (body); fluid clamp scale.
- **Radius:** btn 10 · card 16 · img 20 · pill 999.
- **Motion:** one easing curve `cubic-bezier(0.22, 1, 0.36, 1)`; entrance + scroll-reveal +
  hover + one signature moment per page. `prefers-reduced-motion` disables all.

## Contact form delivery

`POST /api/contact` validates and forwards leads. Set `CONTACT_WEBHOOK_URL` (env) to forward
to an email/CRM service; without it, leads are logged server-side and the UI offers a WhatsApp
fallback (`wa.me/252619744847`).

## Deploy

Optimized for **Vercel** → https://www.reeshenterprise.com. Remote images are allow-listed in
`next.config.mjs` (Unsplash/Pexels); replace with your CDN/host as real assets land.
