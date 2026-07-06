'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { images, subBrands } from '@/lib/content';
import { EASE } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const orb1Y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink text-white bg-grain">
      {/* 1 — Base image (bright / open) */}
      <motion.div aria-hidden className="absolute inset-0" style={{ y: imgY }}>
        <Image src={images.heroHome} alt="" fill priority sizes="100vw" className="object-cover" />
      </motion.div>

      {/* 2 — Brand gradient blend (dark left → blue right) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(115deg, rgba(11,22,34,0.92) 0%, rgba(11,22,34,0.55) 45%, rgba(0,159,208,0.25) 100%)',
        }}
      />
      {/* extra left column reinforcement for AA contrast */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'linear-gradient(90deg, rgba(11,22,34,0.5) 0%, transparent 55%)' }}
      />

      {/* 3 — Glow orbs (slow parallax drift) */}
      <motion.div
        aria-hidden
        className="glow-orb"
        style={{ width: 520, height: 520, top: '-8%', right: '2%', background: 'rgba(0,159,208,.32)', y: orb1Y }}
        animate={{ x: [0, -22, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="glow-orb"
        style={{ width: 360, height: 360, bottom: '2%', left: '-4%', background: 'rgba(102,207,236,.18)', y: orb2Y }}
        animate={{ x: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-[1] pb-28 pt-32 sm:pt-40">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1100px]">
          {/* Eyebrow */}
          <motion.div variants={rise} className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-reesh-blue" />
            </span>
            <span className="text-eyebrow uppercase tracking-[0.12em] text-blue-300">
              Creative &amp; Digital Agency · Mogadishu
            </span>
          </motion.div>

          {/* Headline — two lines, line 2 blue gradient */}
          <h1 className="mt-6 font-display font-extrabold leading-[1.02] tracking-[-0.02em] text-white [font-size:clamp(40px,5.6vw,80px)] [text-wrap:balance]">
            <motion.span variants={rise} className="block">
              From a simple idea
            </motion.span>
            <motion.span variants={rise} className="block text-gradient-brand">
              to a brand people trust.
            </motion.span>
          </h1>

          {/* Sub-line */}
          <motion.p variants={rise} className="mt-6 max-w-[46ch] text-[19px] leading-relaxed text-white/70 sm:text-[21px]">
            Design, digital, media, web, and print — five specialties, one team.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:items-center">
            <Button href="/contact" variant="primary" size="lg" arrow>
              Request a Quote
            </Button>
            <a
              href="/services"
              className="group inline-flex items-center justify-center gap-2 rounded-btn border border-white/25 bg-white/[.06] px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-all duration-200 ease-reesh hover:-translate-y-0.5 hover:border-reesh-blue hover:bg-white/10"
            >
              Explore our services
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Sub-brand dots — pulse in sequence */}
          <motion.ul variants={rise} className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
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
      <motion.div aria-hidden style={{ opacity: cueOpacity }} className="absolute bottom-7 left-1/2 z-[1] -translate-x-1/2">
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
