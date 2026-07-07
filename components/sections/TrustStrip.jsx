import Container from '@/components/ui/Container';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { trustedBy } from '@/lib/content';

// Neutral placeholder marks (monochrome, currentColor). TODO: swap for real logos.
const MARKS = {
  orbit: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="2.4" fill="currentColor" />
    </>
  ),
  triangle: <path d="M11 4 19 18H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  hex: <path d="M11 3.5 18 7.5v7L11 18.5 4 14.5v-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" fill="none" />,
  waves: <path d="M3 13c2-3 4-3 6 0s4 3 6 0 4-3 4 0" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />,
  spark: <path d="M11 3v16M3 11h16M5.5 5.5l11 11M16.5 5.5l-11 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />,
  ring: (
    <>
      <circle cx="11" cy="11" r="7.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="11" cy="11" r="3.4" stroke="currentColor" strokeWidth="1.6" />
    </>
  ),
};

export default function TrustStrip() {
  return (
    <section className="relative border-t border-white/[.06] bg-ink py-10 sm:py-12" aria-label="Trusted by">
      <Container>
        <Reveal stagger className="flex flex-col items-center gap-7">
          <RevealItem className="text-center text-eyebrow uppercase tracking-[0.14em] text-white/45">
            {trustedBy.label}
          </RevealItem>
          <RevealItem className="flex w-full flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {trustedBy.logos.map((c) => (
              <span
                key={c.name}
                className="group inline-flex items-center gap-2.5 text-white/55 opacity-70 transition-all duration-med ease-reesh hover:text-white hover:opacity-100"
                title={c.name}
              >
                <svg viewBox="0 0 22 22" className="h-6 w-6 flex-none sm:h-7 sm:w-7" fill="none" aria-hidden>
                  {MARKS[c.mark]}
                </svg>
                <span className="font-display text-[17px] font-bold tracking-tight sm:text-lg">{c.name}</span>
              </span>
            ))}
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
