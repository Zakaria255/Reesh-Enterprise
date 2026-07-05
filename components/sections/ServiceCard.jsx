'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * ServiceCard — magnetic hover tilt. Links to a sub-brand page.
 */
export default function ServiceCard({ brand, index = 0 }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 18 });
  const sy = useSpring(my, { stiffness: 150, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(sx, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="group h-full"
    >
      <Link
        href={`/services/${brand.slug}`}
        className="card-base relative flex h-full flex-col overflow-hidden transition-shadow duration-med ease-reesh hover:shadow-card-hover"
      >
        <div className="relative h-44 overflow-hidden">
          <Image
            src={brand.image}
            alt={`${brand.name} — ${brand.tag}`}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover transition-transform duration-slow ease-reesh group-hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 40%, rgba(11,22,34,.55))' }} />
          <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur">
            0{index + 1}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6" style={{ transform: 'translateZ(24px)' }}>
          <p className="text-eyebrow uppercase text-reesh-blue">{brand.tag}</p>
          <h3 className="mt-2 font-display text-h3 text-ink">{brand.name}</h3>
          <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-slate">{brand.subheadline}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-reesh-blue">
            Learn more
            <svg className="h-3.5 w-3.5 transition-transform duration-med group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
