import Link from 'next/link';

/**
 * Button — 5 variants: primary | secondary | ghost | dark | white
 */
const VARIANTS = {
  primary:
    'bg-gradient-brand text-white shadow-glow hover:shadow-[0_10px_40px_rgba(0,159,208,.5)] sheen',
  secondary:
    'bg-white text-ink ring-1 ring-line hover:ring-reesh-blue hover:text-reesh-blue shadow-card',
  ghost:
    'bg-transparent text-ink ring-1 ring-ink/15 hover:ring-ink/40 hover:bg-ink/[.03]',
  dark: 'bg-ink text-white hover:bg-ink-soft shadow-card sheen',
  white: 'bg-white text-ink hover:bg-mist shadow-card sheen',
};

const ArrowIcon = () => (
  <svg
    className="h-4 w-4 transition-transform duration-med ease-reesh group-hover:translate-x-1"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden
  >
    <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  arrow = false,
  className = '',
  type,
  ...rest
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-[15px]',
    lg: 'px-8 py-4 text-base',
  };

  const cls = `group inline-flex items-center justify-center gap-2 rounded-btn font-display font-semibold transition-all duration-med ease-reesh will-change-transform active:scale-[.98] ${sizes[size]} ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
        {arrow && <ArrowIcon />}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type || 'button'} className={cls} {...rest}>
      {content}
    </button>
  );
}
