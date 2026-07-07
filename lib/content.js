// =============================================================================
// REESH ENTERPRISE — CONTENT MODEL (single source of truth)
// Edit copy & imagery here → every page updates. CMS-ready.
// =============================================================================

// ---- Site-wide config --------------------------------------------------------
export const site = {
  name: 'Reesh Enterprise',
  shortName: 'Reesh',
  domain: 'https://www.reeshenterprise.com',
  tagline: 'Design. Digital. Media. Web. Print.',
  signature:
    'Reesh helps businesses move from simple ideas to professional brands, from visibility to growth.',
  description:
    'Reesh Enterprise is a creative & digital agency in Mogadishu building professional brands — design, digital marketing, media production, web, and print, under one roof.',
  whatsapp: 'https://wa.me/252619744847',
  contact: {
    phone: '+252 61 9744847',
    phoneRaw: '+252619744847',
    whatsapp: 'https://wa.me/252619744847',
    email: 'hello@reeshenterprise.com',
    address: 'Taleex, Mogadishu, Somalia',
    city: 'Mogadishu',
    country: 'Somalia',
  },
  social: {
    instagram: 'https://instagram.com/reeshenterprise',
    facebook: 'https://facebook.com/reeshenterprise',
    linkedin: 'https://linkedin.com/company/reeshenterprise',
    tiktok: 'https://tiktok.com/@reeshenterprise',
  },
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
];

// ---- Centralized imagery (swap in one place) --------------------------------
// Professional stock now; swap portfolio thumbnails with real Reesh work later.
export const images = {
  // Hero growth visual. Local asset so it renders everywhere and stays sharp.
  // To use a real photo, drop it at public/images/hero-growth.jpg (>=1920px wide)
  // and change this to '/images/hero-growth.jpg'.
  heroGrowth: '/images/hero-growth.svg',
  about:
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80',
  aboutPanel:
    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80',
  services:
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1600&q=80',
  contact:
    'https://images.unsplash.com/photo-1577086664693-894d8405334a?auto=format&fit=crop&w=1600&q=80',
};

// ---- Sub-brands (The Reesh Five) --------------------------------------------
export const subBrands = [
  {
    slug: 'design',
    name: 'Reesh Design',
    accent: '#009FD0',
    tag: 'Brand & Visual Identity',
    subheadline: 'Identities that make businesses unforgettable.',
    description:
      'We craft the visual foundation of your brand — logos, identity systems, and design that give your business a confident, professional face. Every mark is built with intention, so you look established from the very first impression.',
    included: [
      'Logo design & brand marks',
      'Complete visual identity systems',
      'Brand guidelines & style kits',
      'Business cards & stationery',
      'Social media templates',
      'Presentation & pitch decks',
    ],
    bestFor: ['Startups', 'Rebrands', 'Established businesses', 'Personal brands'],
    benefits: [
      { title: 'Instant credibility', desc: 'Look professional and trustworthy from day one.' },
      { title: 'Consistency everywhere', desc: 'One identity that holds together across every touchpoint.' },
      { title: 'Built to scale', desc: 'A flexible system that grows as your business grows.' },
    ],
    cta: { label: 'Start your brand identity', href: '/contact' },
    image:
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1400&q=80',
    seo: {
      title: 'Reesh Design — Brand Identity & Logo Design | Reesh Enterprise',
      description:
        'Logos, visual identity systems, and brand guidelines crafted to make your business look professional and unforgettable. Design by Reesh Enterprise, Mogadishu.',
    },
  },
  {
    slug: 'digital',
    name: 'Reesh Digital',
    accent: '#009FD0',
    tag: 'Marketing & Growth',
    subheadline: 'Visibility that turns into real growth.',
    description:
      'We put your brand in front of the right people and turn attention into customers. From social media to paid campaigns and content strategy, we manage the channels that grow your business measurably.',
    included: [
      'Social media management',
      'Paid ad campaigns (Meta, Google, TikTok)',
      'Content strategy & calendars',
      'Copywriting & captions',
      'Analytics & performance reporting',
      'Community & engagement management',
    ],
    bestFor: ['Retail & e-commerce', 'Restaurants', 'Service businesses', 'Growing brands'],
    benefits: [
      { title: 'Reach that matters', desc: 'Get seen by the audiences most likely to buy.' },
      { title: 'Measurable results', desc: 'Clear reporting on what is working and why.' },
      { title: 'Always-on presence', desc: 'A consistent, active brand your customers can trust.' },
    ],
    cta: { label: 'Grow your audience', href: '/contact' },
    image:
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1400&q=80',
    seo: {
      title: 'Reesh Digital — Social Media & Marketing | Reesh Enterprise',
      description:
        'Social media management, paid campaigns, and content strategy that turn visibility into growth. Digital marketing by Reesh Enterprise, Mogadishu.',
    },
  },
  {
    slug: 'media',
    name: 'Reesh Media',
    accent: '#009FD0',
    tag: 'Photography & Video',
    subheadline: 'Stories told through powerful visuals.',
    description:
      'We produce the photography and video that make your brand feel alive. From product shoots to brand films and social content, our media is crafted to capture attention and communicate quality.',
    included: [
      'Brand & product photography',
      'Promotional & brand videos',
      'Social media reels & short-form',
      'Event & behind-the-scenes coverage',
      'Motion graphics & editing',
      'Studio & on-location shoots',
    ],
    bestFor: ['Product brands', 'Hospitality', 'Events', 'Content-driven businesses'],
    benefits: [
      { title: 'Stop the scroll', desc: 'Visuals crafted to grab attention instantly.' },
      { title: 'Premium perception', desc: 'High-quality media makes your brand feel bigger.' },
      { title: 'Content that lasts', desc: 'A library of assets you can use across every channel.' },
    ],
    cta: { label: 'Book a shoot', href: '/contact' },
    image:
      'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=80',
    seo: {
      title: 'Reesh Media — Photography & Video Production | Reesh Enterprise',
      description:
        'Brand photography, promotional video, and social content produced to capture attention and communicate quality. Media by Reesh Enterprise, Mogadishu.',
    },
  },
  {
    slug: 'web',
    name: 'Reesh Web',
    accent: '#009FD0',
    tag: 'Websites & Digital Products',
    subheadline: 'Modern websites that work as hard as you do.',
    description:
      'We design and build fast, modern websites that turn visitors into customers. From landing pages to full business sites and e-commerce, every build is responsive, professional, and made to convert.',
    included: [
      'Business & marketing websites',
      'Landing pages & campaigns',
      'E-commerce stores',
      'Booking & contact systems',
      'Responsive, mobile-first design',
      'SEO & performance optimization',
    ],
    bestFor: ['Any business online', 'E-commerce', 'Professionals', 'Local services'],
    benefits: [
      { title: 'Fast & modern', desc: 'Sites that load quickly and feel effortless to use.' },
      { title: 'Built to convert', desc: 'Clear structure that guides visitors to take action.' },
      { title: 'Yours to grow', desc: 'Easy to update and ready to expand when you are.' },
    ],
    cta: { label: 'Launch your website', href: '/contact' },
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1400&q=80',
    seo: {
      title: 'Reesh Web — Website Design & Development | Reesh Enterprise',
      description:
        'Fast, modern, responsive websites and e-commerce stores built to convert. Web design & development by Reesh Enterprise, Mogadishu.',
    },
  },
  {
    slug: 'print',
    name: 'Reesh Print',
    accent: '#009FD0',
    tag: 'Print & Physical Branding',
    subheadline: 'Your brand, made real and tangible.',
    description:
      'We bring your brand into the physical world with print and signage done right. From packaging to banners, menus, and branded merchandise, every piece is produced to match your identity precisely.',
    included: [
      'Business cards & stationery',
      'Flyers, brochures & catalogs',
      'Banners & outdoor signage',
      'Packaging & label design',
      'Menus & point-of-sale material',
      'Branded merchandise & apparel',
    ],
    bestFor: ['Retail stores', 'Restaurants', 'Events', 'Any physical location'],
    benefits: [
      { title: 'Tangible quality', desc: 'Print that feels as premium as your brand looks.' },
      { title: 'Perfectly on-brand', desc: 'Colors and details matched to your identity.' },
      { title: 'Real-world presence', desc: 'Stand out in the places your customers actually are.' },
    ],
    cta: { label: 'Order print & branding', href: '/contact' },
    image:
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&w=1400&q=80',
    seo: {
      title: 'Reesh Print — Print & Physical Branding | Reesh Enterprise',
      description:
        'Business cards, packaging, signage, and branded merchandise produced to match your identity precisely. Print by Reesh Enterprise, Mogadishu.',
    },
  },
];

export const getSubBrand = (slug) => subBrands.find((b) => b.slug === slug);

// ---- What we help you do (Home intro + used on Home) ------------------------
export const helpItems = [
  {
    title: 'Build a professional brand',
    desc: 'Turn a simple idea into a confident identity people remember and trust.',
  },
  {
    title: 'Get seen by the right people',
    desc: 'Grow visibility across the channels where your customers already are.',
  },
  {
    title: 'Look premium everywhere',
    desc: 'Consistent, high-quality visuals across web, social, and print.',
  },
  {
    title: 'Turn attention into growth',
    desc: 'Move from awareness to real customers with campaigns that convert.',
  },
  {
    title: 'Do it all under one roof',
    desc: 'Five specialties, one team — no juggling agencies, no lost consistency.',
  },
];

// ---- Why Reesh --------------------------------------------------------------
export const whyReesh = [
  {
    title: 'Everything under one roof',
    desc: 'Design, digital, media, web, and print from a single team — perfectly consistent.',
  },
  {
    title: 'Enterprise-grade quality',
    desc: 'Work that stands next to the best international brands, made right here.',
  },
  {
    title: 'Local insight, global standard',
    desc: 'We understand the Somali market and deliver to a world-class bar.',
  },
  {
    title: 'A real partnership',
    desc: 'We work with you, not just for you — invested in your long-term growth.',
  },
  {
    title: 'Built to convert',
    desc: 'Every decision is made to help your business get results, not just look good.',
  },
  {
    title: 'Fast, reliable delivery',
    desc: 'Clear timelines and dependable communication from start to finish.',
  },
];

// ---- Process ----------------------------------------------------------------
export const process = [
  { step: '01', title: 'Discover', desc: 'We learn your business, goals, and audience to build on the right foundation.' },
  { step: '02', title: 'Strategy', desc: 'We shape a clear plan and direction before any pixel is designed.' },
  { step: '03', title: 'Create', desc: 'Our team designs and produces the work, refining until it is exactly right.' },
  { step: '04', title: 'Review', desc: 'We collaborate with you, gather feedback, and perfect every detail.' },
  { step: '05', title: 'Launch', desc: 'We deliver and deploy — polished, tested, and ready for the world.' },
  { step: '06', title: 'Grow', desc: 'We support and optimize over time so your brand keeps moving forward.' },
];

// ---- Values -----------------------------------------------------------------
export const values = [
  { title: 'Quality first', desc: 'We never ship anything we would not be proud to put our name on.' },
  { title: 'Clarity', desc: 'Clear communication, clear pricing, clear results — no confusion.' },
  { title: 'Creativity with purpose', desc: 'Every creative choice serves a real business goal.' },
  { title: 'Reliability', desc: 'We do what we say, on time, every time.' },
  { title: 'Partnership', desc: 'Your success is the measure of ours.' },
  { title: 'Growth mindset', desc: 'We keep learning so our clients keep leading.' },
  { title: 'Integrity', desc: 'Honest advice, even when it is not the easy answer.' },
];

// ---- Team -------------------------------------------------------------------
export const team = [
  { name: 'Abdirahman Yusuf', role: 'Founder & Creative Director' },
  { name: 'Fatima Ali', role: 'Head of Design' },
  { name: 'Mohamed Hassan', role: 'Digital Marketing Lead' },
  { name: 'Sagal Ahmed', role: 'Media & Production Lead' },
  { name: 'Ibrahim Nur', role: 'Web Development Lead' },
  { name: 'Hodan Omar', role: 'Brand Strategist' },
  { name: 'Yasin Abdi', role: 'Motion & Video Editor' },
  { name: 'Amina Farah', role: 'Content & Social Manager' },
  { name: 'Khalid Warsame', role: 'Print & Production Manager' },
];

// ---- Industries -------------------------------------------------------------
export const industries = [
  {
    name: 'Hospitality & Hotels',
    icon: 'hotel',
    services: ['Brand identity', 'Photography', 'Websites & booking', 'Social media'],
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Restaurants & Cafés',
    icon: 'utensils',
    services: ['Menus & print', 'Food photography', 'Social content', 'Delivery sites'],
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Retail & E-commerce',
    icon: 'bag',
    services: ['Online stores', 'Product media', 'Paid campaigns', 'Packaging'],
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Healthcare & Clinics',
    icon: 'health',
    services: ['Trusted branding', 'Websites', 'Signage', 'Patient content'],
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Real Estate',
    icon: 'building',
    services: ['Property media', 'Listing websites', 'Brochures', 'Social ads'],
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Finance & Fintech',
    icon: 'chart',
    services: ['Corporate identity', 'Web platforms', 'Reports & decks', 'Content'],
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Education',
    icon: 'book',
    services: ['Institutional branding', 'Websites', 'Print material', 'Social media'],
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Technology & Startups',
    icon: 'chip',
    services: ['Product branding', 'Web & apps', 'Pitch decks', 'Growth marketing'],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'NGOs & Public Sector',
    icon: 'globe',
    services: ['Mission branding', 'Campaign media', 'Websites', 'Reports'],
    image:
      'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Professional Services',
    icon: 'briefcase',
    services: ['Identity systems', 'Websites', 'Stationery', 'LinkedIn content'],
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
  },
];

// ---- Portfolio (placeholder → real Reesh work later) ------------------------
export const portfolioCategories = [
  'All',
  'Branding',
  'Digital',
  'Media',
  'Web',
  'Print',
  'Hospitality',
  'Retail',
  'Real Estate',
];

export const portfolio = [
  {
    title: 'Horizon Hotels — Brand Identity',
    category: 'Branding',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Nomad Coffee — Social Campaign',
    category: 'Digital',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Xaawo Boutique — Product Film',
    category: 'Media',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Deeqa Store — E-commerce Site',
    category: 'Web',
    image:
      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Beledweyne Grill — Menu & Print',
    category: 'Print',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Marina Resort — Full Rebrand',
    category: 'Hospitality',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Suuq Retail — Campaign Media',
    category: 'Retail',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Barwaqo Properties — Listing Platform',
    category: 'Real Estate',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Cadceed Clinic — Identity System',
    category: 'Branding',
    image:
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Geeska Media — Brand Film',
    category: 'Media',
    image:
      'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Hilaac Tech — Marketing Website',
    category: 'Web',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Dahabshiil Café — Packaging Suite',
    category: 'Print',
    image:
      'https://images.unsplash.com/photo-1607083206968-13611e3d76db?auto=format&fit=crop&w=1200&q=80',
  },
];

// ---- Trusted-by strip -------------------------------------------------------
// Placeholder wordmarks only — no real brands. TODO: replace with real client
// logos (drop SVGs in public/brand/clients/ and set `logo` on each entry).
export const trustedBy = {
  label: 'Trusted by growing businesses',
  logos: [
    { name: 'Northwind', mark: 'orbit' },
    { name: 'Meridian', mark: 'triangle' },
    { name: 'Vantage', mark: 'hex' },
    { name: 'Cascade', mark: 'waves' },
    { name: 'Lumen', mark: 'spark' },
    { name: 'Orbit', mark: 'ring' },
  ],
};

// ---- Stats ------------------------------------------------------------------
export const stats = [
  { value: 120, suffix: '+', label: 'Projects delivered' },
  { value: 60, suffix: '+', label: 'Brands trusted us' },
  { value: 5, suffix: '', label: 'Specialties, one team' },
  { value: 8, suffix: '+', label: 'Industries served' },
];
