import Container from '@/components/ui/Container';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { trustedBy } from '@/lib/content';

/**
 * TrustStrip — real client logos on the dark band beneath the hero.
 * Logos render in full brand color on subtle white chips so every mark reads
 * clearly on the dark surface. Data-driven from content.trustedBy; drop new
 * artwork in public/brand/clients/ and add an entry to swap.
 */
export default function TrustStrip() {
  return (
    <section className="relative border-t border-white/[.06] bg-ink py-12 sm:py-14" aria-label="Trusted by">
      <Container>
        <Reveal stagger className="flex flex-col items-center gap-8">
          <RevealItem className="text-center text-eyebrow uppercase tracking-[0.14em] text-white/45">
            {trustedBy.label}
          </RevealItem>
          <RevealItem className="flex flex-wrap items-center justify-center gap-4 sm:gap-5">
            {trustedBy.logos.map((c) => (
              <span
                key={c.name}
                className="flex h-16 min-w-[128px] items-center justify-center rounded-2xl bg-white px-6 shadow-[0_10px_28px_rgba(0,0,0,.28)] ring-1 ring-white/10 transition-transform duration-med ease-reesh hover:-translate-y-0.5"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.logo}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-9 w-auto object-contain"
                  style={{ maxWidth: '160px' }}
                />
              </span>
            ))}
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
