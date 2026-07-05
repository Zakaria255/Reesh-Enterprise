import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import Reveal from '@/components/util/Reveal';
import { site } from '@/lib/content';

/**
 * CTABand — gradient conversion band. Reused on ~10 pages.
 */
export default function CTABand({
  title = 'Ready to build something people notice?',
  intro = "Let's turn your idea into a professional brand — and your visibility into real growth.",
  primary = { label: 'Request a Quote', href: '/contact' },
  secondary = { label: 'Message on WhatsApp', href: site.whatsapp },
}) {
  return (
    <section className="relative overflow-hidden py-section-mobile sm:py-section" aria-label="Call to action">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[28px] px-6 py-14 text-center sm:px-16 sm:py-20">
          {/* Gradient + glow background */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg,#009FD0 0%,#006A8B 100%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 80% at 80% 10%, rgba(255,255,255,.22), transparent 60%)' }}
          />
          <div aria-hidden className="bg-grain pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-[1] mx-auto flex max-w-2xl flex-col items-center gap-6">
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
                  className="!text-white !ring-white/40 hover:!bg-white/10 hover:!ring-white/70"
                  target={secondary.href.startsWith('http') ? '_blank' : undefined}
                  rel={secondary.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
