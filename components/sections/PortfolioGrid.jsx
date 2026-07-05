'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { portfolio, portfolioCategories } from '@/lib/content';
import { EASE } from '@/lib/motion';

/**
 * PortfolioGrid — FLIP-style filter animation + hover-reveal.
 * showFilter → Portfolio page; false + limit → Home preview.
 */
export default function PortfolioGrid({ showFilter = true, limit }) {
  const [active, setActive] = useState('All');
  const base = limit ? portfolio.slice(0, limit) : portfolio;
  const items = active === 'All' ? base : base.filter((p) => p.category === active);

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap gap-2.5" role="tablist" aria-label="Filter portfolio">
          {portfolioCategories.map((cat) => {
            const on = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(cat)}
                className={`relative rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-med ${
                  on ? 'text-white' : 'text-slate hover:text-ink'
                }`}
              >
                {on && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-pill bg-gradient-brand shadow-glow"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative z-[1]">{cat}</span>
              </button>
            );
          })}
        </div>
      )}

      <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="group relative aspect-[4/3] overflow-hidden rounded-img shadow-card ring-1 ring-line/60"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width:768px) 100vw, 33vw"
                className="object-cover transition-transform duration-slow ease-reesh group-hover:scale-105"
              />
              {/* Hover-reveal scrim */}
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-med ease-reesh group-hover:bg-ink/70" />
              <div className="absolute inset-0 flex translate-y-3 flex-col justify-end p-5 opacity-0 transition-all duration-med ease-reesh group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-eyebrow uppercase text-reesh-blue">{p.category}</span>
                <h3 className="mt-1.5 font-display text-lg font-semibold text-white">{p.title}</h3>
              </div>
              {/* Always-visible category tag */}
              <span className="absolute left-4 top-4 rounded-pill bg-white/90 px-3 py-1 text-xs font-semibold text-ink backdrop-blur transition-opacity duration-med group-hover:opacity-0">
                {p.category}
              </span>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {items.length === 0 && (
        <p className="py-16 text-center text-slate">No projects in this category yet — check back soon.</p>
      )}
    </div>
  );
}
