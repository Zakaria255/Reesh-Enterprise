'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, subBrands } from '@/lib/content';
import Button from '@/components/ui/Button';
import { EASE } from '@/lib/motion';

// Routes that render on a light hero (dark text/logo). Every current route has a
// dark hero, so the header is transparent-over-dark by default everywhere.
const LIGHT_HERO_ROUTES = new Set([]);

const Arrow = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 8h9M8.5 3.5 13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeBrand, setActiveBrand] = useState(0);
  const pathname = usePathname();
  const closeTimer = useRef(null);
  const servicesBtn = useRef(null);
  const rowRefs = useRef([]);

  const lightPage = LIGHT_HERO_ROUTES.has(pathname);

  // Scroll state (throttled via rAF)
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY >= 40);
        raf = null;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServices(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Mega menu open/close with grace delay
  const openMega = useCallback(() => {
    clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  // Keyboard within mega menu
  const onMegaKeyDown = (e) => {
    if (e.key === 'Escape') {
      setMegaOpen(false);
      servicesBtn.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const focusables = rowRefs.current.filter(Boolean);
      const idx = focusables.indexOf(document.activeElement);
      let next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
      if (next < 0) next = focusables.length - 1;
      if (next >= focusables.length) next = 0;
      focusables[next]?.focus();
      setActiveBrand(next);
    }
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Header visual state
  const solid = scrolled || megaOpen;
  const headerText = lightPage && !solid ? 'text-ink' : 'text-white';
  const logoSrc = lightPage && !solid ? '/brand/logo-full.svg' : '/brand/logo-full-white.svg';

  let headerBg = 'bg-transparent border-transparent';
  if (solid) {
    headerBg = lightPage
      ? 'bg-white/85 backdrop-blur-2xl border-line/70'
      : 'bg-[rgba(11,22,34,0.72)] backdrop-blur-2xl border-white/[.08]';
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`border-b transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-reesh ${headerBg} ${
          solid ? 'shadow-[0_8px_32px_rgba(11,22,34,.18)]' : ''
        }`}
      >
        <nav
          className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between px-5 sm:px-8 lg:h-[72px]"
          aria-label="Primary"
        >
          <Link href="/" className="relative z-10 flex items-center" aria-label="Reesh Enterprise home">
            <Image src={logoSrc} alt="Reesh Enterprise" width={162} height={38} priority className="h-9 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              if (item.href === '/services') {
                return (
                  <li key={item.href} className="relative" onMouseEnter={openMega} onMouseLeave={scheduleClose}>
                    <Link
                      href={item.href}
                      ref={servicesBtn}
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onFocus={openMega}
                      className={`group flex items-center gap-1.5 rounded-btn px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${headerText} ${
                        active || megaOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-reesh ${megaOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <ActiveUnderline show={active || megaOpen} />
                    </Link>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative rounded-btn px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${headerText} ${
                      active ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    {item.label}
                    <ActiveUnderline show={active} />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" variant="primary" size="sm" arrow>
              Request a Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-btn ring-1 lg:hidden ${
              headerText
            } ${lightPage && !solid ? 'ring-line' : 'ring-white/25'}`}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col gap-[5px]">
              <span className={`h-0.5 w-5 bg-current transition-all duration-300 ease-reesh ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 bg-current transition-all duration-300 ease-reesh ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 bg-current transition-all duration-300 ease-reesh ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </nav>

        {/* MEGA MENU (desktop) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: EASE }}
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
              onKeyDown={onMegaKeyDown}
              className="absolute inset-x-0 top-full hidden px-5 pt-3 sm:px-8 lg:block"
            >
              <div className="mx-auto max-w-[1240px]">
                <div className="relative overflow-hidden rounded-[20px] border-t-2 border-t-reesh-blue bg-ink-soft bg-grain shadow-[0_24px_64px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
                  <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-[55%_45%]">
                    {/* Left — sub-brand rows */}
                    <ul className="flex flex-col gap-1" role="menu" aria-label="Services">
                      {subBrands.map((b, i) => (
                        <motion.li
                          key={b.slug}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.04 * i + 0.05, ease: EASE }}
                        >
                          <Link
                            href={`/services/${b.slug}`}
                            role="menuitem"
                            ref={(el) => (rowRefs.current[i] = el)}
                            onMouseEnter={() => setActiveBrand(i)}
                            onFocus={() => setActiveBrand(i)}
                            className={`group flex items-center gap-4 rounded-xl p-3 transition-colors duration-200 ${
                              activeBrand === i ? 'bg-reesh-blue/[.08]' : 'hover:bg-reesh-blue/[.06]'
                            }`}
                          >
                            <span
                              className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl transition-colors duration-200 ${
                                activeBrand === i ? 'bg-gradient-brand text-white' : 'bg-blue-50 text-reesh-blue group-hover:bg-gradient-brand group-hover:text-white'
                              }`}
                            >
                              <span className="font-display text-sm font-bold">{b.name.replace('Reesh ', '').charAt(0)}</span>
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block font-display text-[15px] font-semibold text-white">{b.name}</span>
                              <span className="block text-[13px] text-gray">{b.tag}</span>
                            </span>
                            <Arrow className="h-4 w-4 flex-none text-reesh-blue opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
                          </Link>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Right — swapping premium image */}
                    <Link
                      href="/services"
                      className="group relative hidden overflow-hidden rounded-2xl lg:block"
                      aria-label="Explore all services"
                    >
                      {subBrands.map((b, i) => (
                        <Image
                          key={b.slug}
                          src={b.image}
                          alt=""
                          fill
                          sizes="40vw"
                          className={`object-cover transition-opacity duration-200 ${activeBrand === i ? 'opacity-100' : 'opacity-0'}`}
                        />
                      ))}
                      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.15) 30%, rgba(11,22,34,.9) 100%)' }} />
                      <div className="absolute inset-x-0 bottom-0 p-5">
                        <span className="text-eyebrow uppercase text-blue-300">{subBrands[activeBrand].name}</span>
                        <span className="mt-1.5 flex items-center gap-1.5 font-display text-lg font-semibold text-white">
                          Explore all services
                          <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Page-dim backdrop while mega open */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            onMouseEnter={scheduleClose}
            className="fixed inset-0 -z-[1] hidden bg-ink/20 lg:block"
            aria-hidden
          />
        )}
      </AnimatePresence>

      {/* MOBILE full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ink bg-grain lg:hidden"
          >
            <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-24">
              <ul className="flex flex-col gap-1">
                {nav.map((item, i) => {
                  if (item.href === '/services') {
                    return (
                      <li key={item.href} className="border-b border-white/10">
                        <button
                          onClick={() => setMobileServices((v) => !v)}
                          aria-expanded={mobileServices}
                          className="flex w-full items-center justify-between py-4 font-display text-xl font-semibold text-white"
                        >
                          Services
                          <svg className={`h-5 w-5 transition-transform duration-300 ease-reesh ${mobileServices ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                        <AnimatePresence initial={false}>
                          {mobileServices && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="overflow-hidden"
                            >
                              {subBrands.map((b) => (
                                <li key={b.slug}>
                                  <Link href={`/services/${b.slug}`} className="flex items-center gap-3 py-3 pl-1 text-white/75">
                                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-reesh-blue/15 font-display text-xs font-bold text-reesh-blue">
                                      {b.name.replace('Reesh ', '').charAt(0)}
                                    </span>
                                    <span>
                                      <span className="block text-[15px] font-medium text-white">{b.name}</span>
                                      <span className="block text-xs text-gray">{b.tag}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                              <li>
                                <Link href="/services" className="block py-3 pl-1 text-sm font-semibold text-reesh-blue">
                                  Explore all services →
                                </Link>
                              </li>
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i + 0.1, ease: EASE }}
                      className="border-b border-white/10"
                    >
                      <Link
                        href={item.href}
                        className={`block py-4 font-display text-xl font-semibold ${isActive(item.href) ? 'text-reesh-blue' : 'text-white'}`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>

            {/* Pinned CTA */}
            <div className="border-t border-white/10 p-5">
              <Button href="/contact" variant="primary" size="lg" arrow className="w-full">
                Request a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ActiveUnderline({ show }) {
  return (
    <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 overflow-hidden rounded-full">
      <span
        className={`block h-full origin-center rounded-full bg-reesh-blue transition-transform duration-300 ease-reesh ${
          show ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </span>
  );
}
