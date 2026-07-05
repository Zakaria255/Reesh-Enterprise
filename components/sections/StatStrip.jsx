'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';
import { stats } from '@/lib/content';
import { EASE } from '@/lib/motion';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    let raf;
    let start;
    const step = (t) => {
      if (start === undefined) start = t;
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function StatStrip({ tone = 'mist' }) {
  const dark = tone === 'ink';
  return (
    <section className={`${dark ? 'bg-ink text-white' : 'bg-mist text-ink'} py-14 sm:py-16`}>
      <Container>
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <div className="font-display text-[clamp(2.25rem,1.6rem+2vw,3.25rem)] font-extrabold leading-none text-gradient-brand">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className={`mt-2 text-sm font-medium ${dark ? 'text-white/60' : 'text-slate'}`}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
