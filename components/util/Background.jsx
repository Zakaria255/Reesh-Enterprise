'use client';

import { motion } from 'framer-motion';

/**
 * Background — wraps a section with one of the DS background treatments.
 * variant: 'light' | 'mist' | 'ink' | 'ink-glow' | 'mesh' | 'dot' | 'line' | 'brand'
 */
export default function Background({
  variant = 'light',
  orbs = false,
  grain = false,
  className = '',
  children,
  as: Tag = 'section',
  ...rest
}) {
  const base = {
    light: 'bg-white text-slate',
    mist: 'bg-mist text-slate',
    ink: 'bg-ink text-white',
    'ink-glow': 'bg-ink text-white',
    mesh: 'bg-white text-slate',
    dot: 'bg-mist text-slate',
    line: 'bg-white text-slate',
    brand: 'text-white',
  }[variant];

  const isDark = variant === 'ink' || variant === 'ink-glow' || variant === 'brand';

  return (
    <Tag
      className={`relative overflow-hidden ${base} ${grain ? 'bg-grain' : ''} ${className}`}
      style={variant === 'brand' ? { background: 'linear-gradient(135deg,#009FD0 0%,#006A8B 100%)' } : undefined}
      {...rest}
    >
      {/* Ink radial glow */}
      {(variant === 'ink-glow' || variant === 'brand') && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              variant === 'brand'
                ? 'radial-gradient(60% 60% at 20% 10%, rgba(255,255,255,.18), transparent 60%)'
                : 'radial-gradient(50% 50% at 15% 0%, rgba(0,159,208,.30), transparent 60%)',
          }}
        />
      )}

      {/* Gradient mesh (light) */}
      {variant === 'mesh' && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="glow-orb animate-drift"
            style={{ width: 520, height: 520, top: -140, left: -120, background: 'rgba(102,207,236,.16)' }}
          />
          <div
            className="glow-orb animate-drift-slow"
            style={{ width: 460, height: 460, bottom: -160, right: -100, background: 'rgba(0,159,208,.12)' }}
          />
        </div>
      )}

      {/* Dot / line grid */}
      {variant === 'dot' && <div aria-hidden className="bg-dot-grid pointer-events-none absolute inset-0" />}
      {variant === 'line' && <div aria-hidden className="bg-line-grid pointer-events-none absolute inset-0" />}

      {/* Floating orbs */}
      {orbs && (
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="glow-orb"
            style={{
              width: 420,
              height: 420,
              top: '-10%',
              right: '-8%',
              background: isDark ? 'rgba(0,159,208,.28)' : 'rgba(0,159,208,.14)',
            }}
            animate={{ y: [0, 26, 0], x: [0, -18, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="glow-orb"
            style={{
              width: 340,
              height: 340,
              bottom: '-12%',
              left: '-6%',
              background: isDark ? 'rgba(102,207,236,.18)' : 'rgba(102,207,236,.16)',
            }}
            animate={{ y: [0, -22, 0], x: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="relative z-[1]">{children}</div>
    </Tag>
  );
}
