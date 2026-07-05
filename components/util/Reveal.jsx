'use client';

import { motion } from 'framer-motion';
import { fadeRise, staggerParent } from '@/lib/motion';

/**
 * Scroll-reveal wrapper — fades up 16px once on entering viewport.
 * Set `stagger` to animate direct children in sequence (wrap each child in <Reveal.Item>).
 */
export default function Reveal({
  children,
  as = 'div',
  className = '',
  delay = 0,
  stagger = false,
  amount = 0.12,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div;

  if (stagger) {
    return (
      <MotionTag
        className={className}
        variants={staggerParent(0.08, delay)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount }}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={fadeRise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ children, as = 'div', className = '', ...rest }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag className={className} variants={fadeRise} {...rest}>
      {children}
    </MotionTag>
  );
}
