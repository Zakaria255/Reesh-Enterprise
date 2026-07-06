'use client';

import { MotionConfig } from 'framer-motion';

/**
 * Global providers. MotionConfig reducedMotion="user" makes ALL framer-motion
 * animations honor the OS "reduce motion" setting (JS-driven motion values that
 * the global CSS media query cannot reach).
 */
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
