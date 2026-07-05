'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { nav } from '@/lib/content';
import Button from '@/components/ui/Button';
import { EASE } from '@/lib/motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={`transition-all duration-med ease-reesh ${
          scrolled
            ? 'border-b border-line/70 bg-white/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(11,22,34,.06)]'
            : 'border-b border-transparent bg-white/0'
        }`}
      >
        <nav className="container-reesh flex h-[68px] items-center justify-between" aria-label="Primary">
          <Link href="/" className="flex items-center" aria-label="Reesh Enterprise home">
            <Image src="/brand/logo-full.svg" alt="Reesh Enterprise" width={158} height={37} priority className="h-9 w-auto" />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`relative rounded-btn px-3.5 py-2 text-sm font-medium transition-colors duration-med ${
                    isActive(item.href) ? 'text-ink' : 'text-slate hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-reesh-blue"
                      transition={{ duration: 0.4, ease: EASE }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="/contact" variant="primary" size="sm" arrow>
              Request a Quote
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-btn ring-1 ring-line lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-[5px]">
              <span className={`h-0.5 w-5 bg-ink transition-all duration-med ease-reesh ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`h-0.5 w-5 bg-ink transition-all duration-med ease-reesh ${open ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-5 bg-ink transition-all duration-med ease-reesh ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </div>
          </button>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="container-reesh lg:hidden"
          >
            <div className="mt-2 rounded-card border border-line bg-white/95 p-3 shadow-card backdrop-blur-xl">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className={`block rounded-btn px-4 py-3 text-[15px] font-medium ${
                        isActive(item.href) ? 'bg-mist text-ink' : 'text-slate'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-2 px-1 pb-1">
                <Button href="/contact" variant="primary" size="md" arrow className="w-full">
                  Request a Quote
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
