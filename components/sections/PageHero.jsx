'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import { EASE } from '@/lib/motion';

/**
 * PageHero — inner-page hero with ink background, glow, optional parallax image.
 * Reused on ~8 pages.
 */
export default function PageHero({ eyebrow, title, intro, image, accent, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-ink text-white bg-grain">
      {/* Parallax image layer */}
      {image && (
        <motion.div aria-hidden className="absolute inset-0" style={{ y, scale }}>
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-[.35]" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.72) 0%, rgba(11,22,34,.92) 100%)' }}
          />
        </motion.div>
      )}

      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 55% at 18% 0%, rgba(0,159,208,.28), transparent 60%)' }}
      />
      <motion.div
        aria-hidden
        className="glow-orb"
        style={{ width: 360, height: 360, top: '-8%', right: '-4%', background: 'rgba(0,159,208,.22)' }}
        animate={{ y: [0, 24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Container className="relative z-[1] flex flex-col items-start gap-5 pb-16 pt-36 sm:pb-24 sm:pt-44">
        {eyebrow && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
          className="max-w-3xl font-display text-h1 text-white"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.16 }}
            className="max-w-2xl text-body-l text-white/75"
          >
            {intro}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.24 }}
            className="mt-2"
          >
            {children}
          </motion.div>
        )}
      </Container>

      {/* bottom fade into next section */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white/0" />
    </section>
  );
}
