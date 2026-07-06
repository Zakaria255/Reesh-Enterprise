'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { nav, subBrands } from '@/lib/content';
import Button from '@/components/ui/Button';
import { EASE } from '@/lib/motion';

// Routes rendered on a light hero (dark text/logo). All current routes have a
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
  const [dropOpen, setDropOpen] = useState(false);
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

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServices(false);
    setDropOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Dropdown open/close with grace delay (prevents flicker)
  const openDrop = useCallback(() => {
    clearTimeout(closeTimer.current);
    setDropOpen(true);
  }, []);
  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropOpen(false), 150);
  }, []);

  const onDropKeyDown = (e) => {
    if (e.key === 'Escape') {
      setDropOpen(false);
      servicesBtn.current?.focus();
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const items = rowRefs.current.filter(Boolean);
      const idx = items.indexOf(document.activeElement);
      let next = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
      if (next < 0) next = items.length - 1;
      if (next >= items.length) next = 0;
      items[next]?.focus();
    }
  };

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  // Header visual state
  const solid = scrolled || dropOpen;
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
                  <li key={item.href} className="relative" onMouseEnter={openDrop} onMouseLeave={scheduleClose}>
                    <Link
                      href={item.href}
                      ref={servicesBtn}
                      aria-haspopup="menu"
                      aria-expanded={dropOpen}
                      onFocus={openDrop}
                      className={`group relative flex items-center gap-1.5 rounded-btn px-3.5 py-2 text-sm font-medium transition-opacity duration-200 ${headerText} ${
                        active || dropOpen ? 'opacity-100' : 'opacity-90 hover:opacity-100'
                      }`}
                    >
                      {item.label}
                      <svg
                        className={`h-3.5 w-3.5 transition-transform duration-300 ease-reesh ${dropOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden
                      >
                        <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <ActiveUnderline show={active || dropOpen} />
                    </Link>

                    {/* SIMPLE dropdown (~300px) */}
                    <AnimatePresence>
                      {dropOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2, ease: EASE }}
                          onKeyDown={onDropKeyDown}
                          className="absolute left-0 top-full w-[300px] pt-3"
                        >
                          <div className="overflow-hidden rounded-2xl border-t-2 border-t-reesh-blue bg-[rgba(22,36,47,0.96)] p-2 shadow-[0_24px_48px_rgba(0,0,0,0.4)] ring-1 ring-white/10 backdrop-blur-xl">
                            <ul role="menu" aria-label="Services">
                              {subBrands.map((b, i) => (
                                <li key={b.slug} role="none">
                                  <Link
                                    href={`/services/${b.slug}`}
                                    role="menuitem"
                                    ref={(el) => (rowRefs.current[i] = el)}
                                    className="group flex items-center gap-3 rounded-xl p-2.5 transition-colors duration-200 hover:bg-reesh-blue/10"
                                  >
                                    <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-reesh-blue/15 font-display text-xs font-bold text-reesh-blue transition-colors duration-200 group-hover:bg-gradient-brand group-hover:text-white">
                                      {b.name.replace('Reesh ', '').charAt(0)}
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block text-sm font-semibold text-white">{b.name}</span>
                                      <span className="block truncate text-xs text-gray">{b.tag}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              href="/services"
                              className="group mt-1 flex items-center justify-between rounded-xl border-t border-white/10 px-2.5 py-3 text-sm font-semibold text-reesh-blue"
                            >
                              View all services
                              <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative rounded-btn px-3.5 py-2 text-sm font-medium transition-opacity duration-200 ${headerText} ${
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
            className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-btn ring-1 lg:hidden ${headerText} ${
              lightPage && !solid ? 'ring-line' : 'ring-white/25'
            }`}
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
      </motion.div>

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
                                  <Link href={`/services/${b.slug}`} className="flex items-center gap-3 py-3 pl-1">
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
                                  View all services →
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
