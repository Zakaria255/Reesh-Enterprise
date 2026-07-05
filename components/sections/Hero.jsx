'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import { site, subBrands } from '@/lib/content';
import { EASE } from '@/lib/motion';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-white bg-grain">
      {/* Background image + scrim */}
      <motion.div aria-hidden className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.78) 0%, rgba(11,22,34,.9) 55%, rgba(11,22,34,.98) 100%)' }}
        />
      </motion.div>

      {/* Radial glow + floating orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(45% 50% at 15% 5%, rgba(0,159,208,.30), transparent 60%)' }}
      />
      <motion.div
        aria-hidden
        className="glow-orb"
        style={{ width: 460, height: 460, top: '-6%', right: '-6%', background: 'rgba(0,159,208,.26)' }}
        animate={{ y: [0, 28, 0], x: [0, -18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="glow-orb"
        style={{ width: 320, height: 320, bottom: '4%', left: '-4%', background: 'rgba(102,207,236,.16)' }}
        animate={{ y: [0, -24, 0], x: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-[1] flex min-h-[92vh] flex-col justify-center pb-24 pt-40 sm:pb-32">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
          <motion.div variants={item}>
            <Eyebrow tone="light">Creative &amp; Digital Agency · Mogadishu</Eyebrow>
          </motion.div>

          <motion.h1 variants={item} className="mt-6 font-display text-h1 text-white">
            From a simple idea to a{' '}
            <span className="text-gradient-brand">brand people trust.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-2xl text-body-l text-white/75">
            {site.signature} Design, digital, media, web, and print — five specialties, one team, built to a world-class standard.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/contact" variant="primary" size="lg" arrow>
              Request a Quote
            </Button>
            <Button href="/services" variant="ghost" size="lg" className="!text-white !ring-white/25 hover:!bg-white/10 hover:!ring-white/50">
              Explore our services
            </Button>
          </motion.div>

          {/* Sub-brand strip */}
          <motion.ul variants={item} className="mt-14 flex flex-wrap gap-x-6 gap-y-3">
            {subBrands.map((b) => (
              <li key={b.slug} className="flex items-center gap-2 text-sm font-medium text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-reesh-blue" aria-hidden />
                {b.name.replace('Reesh ', '')}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        className="absolute bottom-7 left-1/2 z-[1] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
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
