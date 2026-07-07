import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/util/Reveal';
import { site } from '@/lib/content';

/**
 * CTABand — full-bleed, edge-to-edge gradient conversion band. Reused on ~10 pages.
 */
export default function CTABand({
  title = 'Ready to build something people notice?',
  intro = "Let's turn your idea into a professional brand — and your visibility into real growth.",
  primary = { label: 'Request a Quote', href: '/contact' },
  secondary = { label: 'Message on WhatsApp', href: site.whatsapp },
}) {
  return (
    <section
      className="relative w-full overflow-hidden py-section-mobile sm:py-section"
      aria-label="Call to action"
    >
      {/* Full-bleed brand gradient */}
      <div aria-hidden className="absolute inset-0" style={{ background: 'linear-gradient(135deg,#009FD0 0%,#006A8B 100%)' }} />
      {/* Depth: radial glow + grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(55% 80% at 82% 8%, rgba(255,255,255,.20), transparent 60%)' }}
      />
      <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-50" />
      {/* Soft top/bottom edges so it seats against neighbors */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(11,22,34,.12) 0%, transparent 12%, transparent 88%, rgba(11,22,34,.12) 100%)' }}
      />

      <Container className="relative z-[1]">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="font-display text-h2 text-white">{title}</h2>
          <p className="text-body-l text-white/85">{intro}</p>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
            <Button href={primary.href} variant="white" size="lg" arrow>
              {primary.label}
            </Button>
            {secondary && (
              <Button
                href={secondary.href}
                variant="ghost"
                size="lg"
                className="!text-white !ring-white/50 hover:!bg-white hover:!text-ink hover:!ring-white"
                target={secondary.href.startsWith('http') ? '_blank' : undefined}
                rel={secondary.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                {secondary.label}
              </Button>
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
