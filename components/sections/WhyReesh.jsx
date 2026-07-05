import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { whyReesh } from '@/lib/content';

const CheckMark = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
    <path d="M20 6 9 17l-5-5" stroke="#009FD0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WhyReesh() {
  return (
    <section className="relative overflow-hidden bg-ink py-section-mobile text-white bg-grain sm:py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(45% 45% at 85% 10%, rgba(0,159,208,.20), transparent 60%)' }}
      />
      <Container className="relative z-[1]">
        <SectionHeading
          eyebrow="Why Reesh"
          title="The difference is doing it right — and doing it together."
          intro="We are not just a vendor. We are the creative partner invested in your brand looking premium and your business growing."
          tone="light"
        />

        <Reveal stagger className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {whyReesh.map((r) => (
            <RevealItem key={r.title} className="flex gap-4">
              <div className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-white/[.06] ring-1 ring-white/10">
                <CheckMark />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{r.title}</h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{r.desc}</p>
              </div>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
