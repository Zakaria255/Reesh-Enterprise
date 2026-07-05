import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { values } from '@/lib/content';

export default function ValuesList() {
  return (
    <section className="relative overflow-hidden bg-mist py-section-mobile sm:py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="glow-orb animate-drift" style={{ width: 480, height: 480, top: -160, right: -120, background: 'rgba(0,159,208,.10)' }} />
      </div>
      <Container className="relative z-[1]">
        <SectionHeading
          eyebrow="Our values"
          title="What we stand for."
          intro="Seven principles that guide every project, every decision, and every relationship."
        />
        <Reveal stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <RevealItem
              key={v.title}
              className="group card-base relative overflow-hidden p-6 transition-all duration-med ease-reesh hover:-translate-y-1.5 hover:shadow-card-hover"
            >
              <span className="font-display text-4xl font-extrabold text-blue-50 transition-colors duration-med group-hover:text-blue-300/60">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-h3 text-ink">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slate">{v.desc}</p>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-brand transition-transform duration-med ease-reesh group-hover:scale-x-100"
              />
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
