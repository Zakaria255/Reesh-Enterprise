'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { subBrands } from '@/lib/content';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal, { RevealItem } from '@/components/util/Reveal';

/**
 * ReeshFive — SIGNATURE MOMENT (Home): five expanding columns.
 * Hover/focus a column → it expands and reveals detail.
 */
export default function ReeshFive({ heading = true, currentSlug = null }) {
  const [active, setActive] = useState(0);
  const brands = currentSlug ? subBrands.filter((b) => b.slug !== currentSlug) : subBrands;
  const compact = heading === false && currentSlug;

  return (
    <section className="relative overflow-hidden bg-ink py-section-mobile text-white bg-grain sm:py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 50% at 50% 0%, rgba(0,159,208,.18), transparent 60%)' }}
      />
      <Container className="relative z-[1]">
        {compact && (
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <Reveal>
              <Eyebrow tone="light">Explore the rest</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="max-w-xl font-display text-h2 text-white">The rest of the Reesh Five</h2>
            </Reveal>
          </div>
        )}
        {heading && (
          <div className="mb-10 flex flex-col items-center gap-4 text-center">
            <Reveal>
              <Eyebrow tone="light">The Reesh Five</Eyebrow>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="max-w-2xl font-display text-h2 text-white">
                Five specialties. One team. One consistent brand.
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="max-w-xl text-body-l text-white/70">
                Everything your brand needs to look professional and grow — designed to work together, delivered under one roof.
              </p>
            </Reveal>
          </div>
        )}

        {/* Expanding columns (desktop) */}
        <Reveal className="hidden gap-3 md:flex md:h-[440px]">
          {brands.map((b, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={b.slug}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative min-w-0 cursor-pointer overflow-hidden rounded-[20px] ring-1 ring-white/10"
                animate={{ flex: isActive ? 3.2 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/services/${b.slug}`} className="absolute inset-0 block" aria-label={b.name}>
                  <Image src={b.image} alt="" fill sizes="40vw" className="object-cover" />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? 'linear-gradient(180deg, rgba(11,22,34,.35) 0%, rgba(11,22,34,.92) 100%)'
                        : 'linear-gradient(180deg, rgba(11,22,34,.55) 0%, rgba(11,22,34,.85) 100%)',
                    }}
                  />

                  {/* Vertical label (collapsed) */}
                  <div className="absolute inset-0 flex items-end p-5">
                    <div className="w-full">
                      <span className="mb-2 inline-block text-eyebrow uppercase text-reesh-blue">0{i + 1}</span>
                      <h3
                        className={`font-display font-semibold text-white transition-all duration-med ${
                          isActive ? 'text-h3' : 'text-lg'
                        }`}
                      >
                        {b.name}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 max-w-xs text-sm text-white/75">{b.subheadline}</p>
                        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-reesh-blue">
                          Explore {b.name.replace('Reesh ', '')}
                          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </Reveal>

        {/* Stacked cards (mobile) */}
        <Reveal stagger className="grid gap-4 md:hidden">
          {brands.map((b, i) => (
            <RevealItem key={b.slug}>
              <Link
                href={`/services/${b.slug}`}
                className="relative flex h-40 items-end overflow-hidden rounded-[20px] ring-1 ring-white/10"
              >
                <Image src={b.image} alt="" fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.3), rgba(11,22,34,.9))' }} />
                <div className="relative p-5">
                  <span className="text-eyebrow uppercase text-reesh-blue">0{i + 1}</span>
                  <h3 className="font-display text-h3 text-white">{b.name}</h3>
                  <p className="mt-1 text-sm text-white/75">{b.subheadline}</p>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
