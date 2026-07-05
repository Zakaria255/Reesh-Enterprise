'use client';

import { motion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * IncludedList — 2-col checklist with checkmark draw-in (sub-brand signature).
 */
export default function IncludedList({ items }) {
  return (
    <motion.ul
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="grid gap-x-8 gap-y-4 sm:grid-cols-2"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
          className="flex items-center gap-3.5 border-b border-line pb-4 text-[15px] font-medium text-ink"
        >
          <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-blue-50">
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <motion.path
                d="M15.5 6 8.5 13.5 4.5 9.5"
                stroke="#009FD0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.5, ease: EASE } } }}
              />
            </svg>
          </span>
          {item}
        </motion.li>
      ))}
    </motion.ul>
  );
}
