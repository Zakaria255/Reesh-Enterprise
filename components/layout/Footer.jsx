import Link from 'next/link';
import Image from 'next/image';
import { site, subBrands, nav } from '@/lib/content';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.45 9.45 0 0 1-1.44-5.01c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zm8.06-17.53A11.36 11.36 0 0 0 12.04 0C5.76 0 .64 5.12.64 11.4c0 2.01.53 3.97 1.53 5.7L.5 24l7.05-1.85a11.37 11.37 0 0 0 5.49 1.4h.01c6.28 0 11.39-5.12 11.39-11.4 0-3.05-1.19-5.9-3.35-8.05z" />
  </svg>
);

export default function Footer() {
  const year = 2026;
  return (
    <footer className="relative overflow-hidden bg-ink text-white bg-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 60% at 85% 0%, rgba(0,159,208,.18), transparent 60%)' }}
      />
      <div className="container-reesh relative z-[1] pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand col */}
          <div>
            <Image src="/brand/Reesh-Logo.svg" alt="Reesh Enterprise" width={170} height={40} className="h-10 w-auto" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/60">{site.signature}</p>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2.5 rounded-pill bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-[#04310f] transition-transform duration-med ease-reesh hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Nav col */}
          <nav aria-label="Footer">
            <h3 className="text-eyebrow uppercase text-white/40">Company</h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-white/70 transition-colors duration-med hover:text-reesh-blue">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services col */}
          <nav aria-label="Services">
            <h3 className="text-eyebrow uppercase text-white/40">Services</h3>
            <ul className="mt-4 space-y-3">
              {subBrands.map((b) => (
                <li key={b.slug}>
                  <Link href={`/services/${b.slug}`} className="text-[15px] text-white/70 transition-colors duration-med hover:text-reesh-blue">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact col */}
          <div>
            <h3 className="text-eyebrow uppercase text-white/40">Get in touch</h3>
            <ul className="mt-4 space-y-3 text-[15px] text-white/70">
              <li>{site.contact.address}</li>
              <li>
                <a href={`tel:${site.contact.phoneRaw}`} className="transition-colors duration-med hover:text-reesh-blue">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="transition-colors duration-med hover:text-reesh-blue">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-sm text-white/50 sm:flex-row">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p className="font-display font-semibold tracking-wide text-white/60">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
