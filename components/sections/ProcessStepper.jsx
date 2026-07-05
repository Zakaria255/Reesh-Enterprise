'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/util/Reveal';
import { process } from '@/lib/content';

/**
 * ProcessStepper — 6 steps with a scroll-driven progress line. Reused on Home + About + Services.
 * tone: 'light' (default) | 'mist'
 */
export default function ProcessStepper({ tone = 'light' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const dark = tone === 'ink';

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-section-mobile sm:py-section ${dark ? 'bg-ink text-white bg-grain' : tone === 'mist' ? 'bg-mist' : 'bg-white'}`}
    >
      <Container>
        <SectionHeading
          eyebrow="How we work"
          title="A clear, proven process from idea to growth."
          intro="No guesswork, no surprises — just a considered path that gets your brand where it needs to be."
          tone={dark ? 'light' : 'dark'}
        />

        <div className="relative mt-14">
          {/* Progress rail */}
          <div className="absolute left-[19px] top-2 h-[calc(100%-2rem)] w-0.5 bg-line md:left-1/2 md:-translate-x-1/2">
            <motion.div style={{ height }} className="w-full origin-top bg-gradient-brand" />
          </div>

          <ol className="space-y-8 md:space-y-14">
            {process.map((p, i) => {
              const leftSide = i % 2 === 0;
              const card = (
                <div className={`card-base p-6 ${dark ? '!bg-white/[.04] !ring-white/10' : ''} ${leftSide ? 'md:text-right' : ''}`}>
                  <h3 className={`font-display text-h3 ${dark ? 'text-white' : 'text-ink'}`}>{p.title}</h3>
                  <p className={`mt-2 text-[15px] leading-relaxed ${dark ? 'text-white/65' : 'text-slate'}`}>{p.desc}</p>
                </div>
              );
              return (
                <Reveal as="li" key={p.step} className="relative md:grid md:grid-cols-2 md:items-center md:gap-16">
                  {/* Node */}
                  <div className="absolute left-0 top-0 z-[1] flex h-10 w-10 flex-none items-center justify-center rounded-full bg-gradient-brand font-display text-sm font-bold text-white shadow-glow md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    {p.step}
                  </div>

                  {leftSide ? (
                    <>
                      <div className="ml-16 md:ml-0">{card}</div>
                      <div className="hidden md:block" aria-hidden />
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block" aria-hidden />
                      <div className="ml-16 md:ml-0">{card}</div>
                    </>
                  )}
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
