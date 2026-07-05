/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Reesh DS v1.0 — extracted from logo (exact)
        'reesh-blue': '#009FD0',
        ink: {
          DEFAULT: '#0B1622',
          soft: '#16242F',
        },
        slate: {
          DEFAULT: '#4B5A68',
        },
        gray: {
          DEFAULT: '#8B98A5',
        },
        mist: '#F2F8FB',
        line: '#E3EAF0',
        blue: {
          50: '#E6F7FC',
          300: '#66CFEC',
          500: '#009FD0',
          700: '#006A8B',
          900: '#003546',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // clamp-based fluid type scale
        h1: ['clamp(2.5rem, 1.6rem + 4vw, 4.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em', fontWeight: '800' }],
        h2: ['clamp(2rem, 1.6rem + 1.8vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '700' }],
        h3: ['clamp(1.375rem, 1.2rem + 0.7vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-l': ['clamp(1.125rem, 1.05rem + 0.3vw, 1.25rem)', { lineHeight: '1.6' }],
        eyebrow: ['0.8125rem', { lineHeight: '1', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      borderRadius: {
        btn: '10px',
        card: '16px',
        img: '20px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 12px 32px rgba(11,22,34,.10)',
        'card-hover': '0 20px 48px rgba(11,22,34,.16)',
        glow: '0 8px 32px rgba(0,159,208,.35)',
      },
      spacing: {
        section: '96px',
        'section-mobile': '64px',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #009FD0 0%, #006A8B 100%)',
        'gradient-ink': 'linear-gradient(180deg, #16242F 0%, #0B1622 100%)',
      },
      transitionTimingFunction: {
        reesh: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        fast: '200ms',
        med: '400ms',
        slow: '600ms',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -3%, 0) scale(1.08)' },
        },
        'drift-slow': {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-5%, 4%, 0) scale(1.12)' },
        },
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
          '100%': { transform: 'translateX(220%) skewX(-20deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.06' },
        },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        'drift-slow': 'drift-slow 24s ease-in-out infinite',
        'fade-rise': 'fade-rise 600ms cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
