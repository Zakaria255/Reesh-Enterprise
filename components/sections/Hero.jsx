'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { images, subBrands } from '@/lib/content';
import { EASE } from '@/lib/motion';

// WebGL ripple is client-only and lazy — never blocks the hero paint.
const HeroRipple = dynamic(() => import('@/components/sections/HeroRipple'), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-screen items-center overflow-hidden bg-[#070E1A] text-white bg-grain">
      {/* Base — growth image (also the fallback when WebGL is unavailable) */}
      <motion.div aria-hidden className="absolute inset-0" style={{ scale: imgScale }}>
        <Image
          src={images.heroGrowth}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover [object-position:center_right]"
        />
      </motion.div>

      {/* Interactive water-ripple layer (above image, below scrims) */}
      <HeroRipple src={images.heroGrowth} className="absolute inset-0 h-full w-full" />

      {/* Even legibility scrim — centered layout, arrow kept as subtle ambiance */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,14,26,0.80) 0%, rgba(7,14,26,0.64) 45%, rgba(7,14,26,0.82) 100%)',
        }}
      />
      {/* Center focus vignette — darkens behind the centered text block */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(75% 65% at 50% 46%, rgba(7,14,26,0.34) 0%, rgba(7,14,26,0) 72%)',
        }}
      />

      {/* Content */}
      <Container className="relative z-[2] py-32">
        <motion.div variants={container} initial="hidden" animate="show" className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          {/* Eyebrow — no city name */}
          <motion.div variants={rise} className="flex items-center justify-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-reesh-blue" />
            </span>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-blue-300">
              Creative &amp; Digital Agency
            </span>
          </motion.div>

          {/* Headline — Sora 800, blue-gradient line 2. Two clean lines at lg
              (nowrap) sized so neither line orphans a word or crowds the arrow. */}
          <h1 className="mx-auto mt-6 max-w-[min(92vw,1040px)] font-display font-extrabold leading-[1.02] tracking-[-0.02em] text-white [font-size:clamp(40px,6vw,76px)]">
            <motion.span variants={rise} className="block lg:whitespace-nowrap">
              From a simple idea
            </motion.span>
            <motion.span
              variants={rise}
              className="block bg-gradient-to-r from-[#0FB4E8] via-[#009FD0] to-[#66CFEC] bg-clip-text text-transparent lg:whitespace-nowrap"
            >
              to a brand people trust.
            </motion.span>
          </h1>

          {/* Sub-line */}
          <motion.p variants={rise} className="mx-auto mt-6 max-w-[44ch] leading-relaxed text-white/[.74] [font-size:clamp(17px,1.5vw,20px)]">
            Design, digital, media, web, and print — five specialties, one team.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-center">
            <Button href="/contact" variant="primary" size="lg" arrow>
              Request a Quote
            </Button>
            <a
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-btn border border-white/[.22] bg-white/[.07] px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 ease-reesh hover:-translate-y-0.5 hover:border-reesh-blue hover:bg-white/[.12]"
            >
              Explore our services
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Sub-brand dots — pulse in sequence */}
          <motion.ul variants={rise} className="mt-14 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {subBrands.map((b, i) => (
              <li key={b.slug} className="flex items-center gap-2 text-sm font-medium text-white/60">
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-reesh-blue"
                  animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
                  aria-hidden
                />
                {b.name.replace('Reesh ', '')}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      {/* Scroll cue — fades on scroll */}
      <motion.div aria-hidden style={{ opacity: cueOpacity }} className="absolute bottom-7 left-1/2 z-[2] -translate-x-1/2">
        <div className="flex h-9 w-6 items-start justify-center rounded-pill border border-white/25 p-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
