import PageHero from '@/components/sections/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import Background from '@/components/util/Background';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Contact',
  description:
    'Get in touch with Reesh Enterprise in Taleex, Mogadishu. Request a quote, call +252 61 9744847, or message us on WhatsApp — we reply within one business day.',
  alternates: { canonical: `${site.domain}/contact` },
};

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17 0-.37-.02-.57-.02-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.45 9.45 0 0 1-1.44-5.01c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47z" />
  </svg>
);

const contactCards = [
  {
    label: 'Visit us',
    value: site.contact.address,
    href: 'https://www.google.com/maps/search/?api=1&query=Taleex+Mogadishu',
    icon: 'M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  },
  {
    label: 'Call us',
    value: site.contact.phone,
    href: `tel:${site.contact.phoneRaw}`,
    icon: 'M4 5a2 2 0 0 1 2-2h1.6a1 1 0 0 1 .95.68l1 3a1 1 0 0 1-.25 1L8 9.5a12 12 0 0 0 5.5 5.5l1.8-1.3a1 1 0 0 1 1-.25l3 1a1 1 0 0 1 .7.95V17a2 2 0 0 1-2 2A15 15 0 0 1 4 5Z',
  },
  {
    label: 'Email us',
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
    icon: 'M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2 8 5 8-5',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build your brand."
        intro="Tell us about your project and we'll get back to you within one business day. Prefer to chat now? Message us on WhatsApp."
      />

      <Background variant="mesh" className="py-section-mobile sm:py-section">
        <Container className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Form */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Details */}
          <Reveal delay={0.08} stagger className="flex flex-col gap-4">
            <RevealItem>
              <Eyebrow>Get in touch</Eyebrow>
              <h2 className="mt-3 font-display text-h3 text-ink">Reach us directly</h2>
            </RevealItem>

            {contactCards.map((c) => (
              <RevealItem key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-card border border-line bg-white p-5 shadow-[0_2px_12px_rgba(11,22,34,.05)] transition-all duration-med ease-reesh hover:-translate-y-0.5 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blue-50 text-reesh-blue transition-colors duration-med group-hover:bg-gradient-brand group-hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                      <path d={c.icon} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wide text-gray">{c.label}</span>
                    <span className="mt-0.5 block font-medium text-ink">{c.value}</span>
                  </span>
                </a>
              </RevealItem>
            ))}

            {/* WhatsApp */}
            <RevealItem>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 rounded-card bg-[#25D366] px-5 py-4 font-semibold text-[#04310f] shadow-card transition-transform duration-med ease-reesh hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
                Chat on WhatsApp
              </a>
            </RevealItem>

            {/* Map card */}
            <RevealItem>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Taleex+Mogadishu"
                target="_blank"
                rel="noreferrer"
                className="group relative block h-52 overflow-hidden rounded-card shadow-card ring-1 ring-line"
                aria-label="Open Taleex, Mogadishu in Google Maps"
              >
                {/* Stylized branded map */}
                <div className="absolute inset-0 bg-mist" />
                <div className="bg-line-grid absolute inset-0 opacity-70" />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: 'radial-gradient(60% 60% at 50% 45%, rgba(0,159,208,.10), transparent 70%)' }}
                />
                {/* Pin */}
                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand shadow-glow ring-4 ring-white transition-transform duration-med ease-reesh group-hover:-translate-y-1">
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="mt-1 h-2 w-2 rounded-full bg-reesh-blue/40 blur-[1px]" />
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-white/90 px-4 py-3 backdrop-blur">
                  <span className="text-sm font-semibold text-ink">{site.contact.address}</span>
                  <span className="text-sm font-medium text-reesh-blue">Get directions →</span>
                </div>
              </a>
            </RevealItem>
          </Reveal>
        </Container>
      </Background>

      <CTABand
        title="Prefer to start with a conversation?"
        intro="We're happy to talk through your ideas — no pressure, just clarity."
        primary={{ label: 'Message on WhatsApp', href: site.whatsapp }}
        secondary={{ label: 'Call us', href: `tel:${site.contact.phoneRaw}` }}
      />
    </>
  );
}
