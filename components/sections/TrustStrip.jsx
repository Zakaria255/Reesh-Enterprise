import Container from '@/components/ui/Container';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { trustedBy } from '@/lib/content';

/**
 * TrustStrip — client logo strip on the dark band beneath the hero.
 * Logos render monochrome-white at ~60% opacity, brightening to full on hover.
 * Data-driven from content.trustedBy; drop official artwork in
 * public/brand/clients/ (same filenames) to swap.
 */
export default function TrustStrip() {
  return (
    <section className="relative border-t border-white/[.06] bg-ink py-10 sm:py-12" aria-label="Trusted by">
      <Container>
        <Reveal stagger className="flex flex-col items-center gap-8">
          <RevealItem className="text-center text-eyebrow uppercase tracking-[0.14em] text-white/45">
            {trustedBy.label}
          </RevealItem>
          <RevealItem className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-7 sm:gap-x-16">
            {trustedBy.logos.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.name}
                src={c.logo}
                alt={c.name}
                loading="lazy"
                className="h-6 w-auto opacity-60 transition-all duration-med ease-reesh hover:opacity-100 sm:h-7"
                style={{ filter: 'brightness(0) invert(1)', maxWidth: '170px' }}
              />
            ))}
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
