import Hero from '@/components/sections/Hero';
import ReeshFive from '@/components/sections/ReeshFive';
import StatStrip from '@/components/sections/StatStrip';
import WhyReesh from '@/components/sections/WhyReesh';
import ProcessStepper from '@/components/sections/ProcessStepper';
import IndustryGrid from '@/components/sections/IndustryGrid';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import ServiceCard from '@/components/sections/ServiceCard';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import Background from '@/components/util/Background';
import { subBrands, helpItems } from '@/lib/content';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Signature — The Reesh Five expanding columns */}
      <ReeshFive />

      {/* What we help you do — gradient mesh */}
      <Background variant="mesh" className="py-section-mobile sm:py-section">
        <Container>
          <SectionHeading
            eyebrow="What we help you do"
            title="Everything your brand needs to be taken seriously."
            intro="From a first idea to steady growth, we cover the full journey — so your business looks professional and performs."
            align="center"
          />
          <Reveal stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {helpItems.map((h, i) => (
              <RevealItem
                key={h.title}
                className={`group card-base flex flex-col p-7 transition-all duration-med ease-reesh hover:-translate-y-1.5 hover:shadow-card-hover ${
                  i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 font-display text-lg font-bold text-reesh-blue transition-colors duration-med group-hover:bg-gradient-brand group-hover:text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-h3 text-ink">{h.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{h.desc}</p>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Background>

      {/* Services preview — magnetic cards */}
      <section className="bg-white py-section-mobile sm:py-section">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Our services"
              title="Five specialties, built to work together."
              intro="Each is a brand of its own — and stronger as one."
            />
            <Reveal>
              <Button href="/services" variant="secondary" size="md" arrow>
                View all services
              </Button>
            </Reveal>
          </div>
          <Reveal stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {subBrands.map((b, i) => (
              <RevealItem key={b.slug}>
                <ServiceCard brand={b} index={i} />
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Animated stat counters */}
      <StatStrip tone="mist" />

      {/* Why Reesh — dark + grain */}
      <WhyReesh />

      {/* Process */}
      <ProcessStepper tone="white" />

      {/* Industries preview — grid pattern */}
      <Background variant="line" className="py-section-mobile sm:py-section">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Industries"
              title="Trusted across the sectors that move Somalia forward."
              intro="Whatever your field, we speak your customers' language."
            />
            <Reveal>
              <Button href="/industries" variant="secondary" size="md" arrow>
                Explore industries
              </Button>
            </Reveal>
          </div>
          <div className="mt-12">
            <IndustryGrid variant="chips" />
          </div>
        </Container>
      </Background>

      {/* Portfolio preview — hover reveal */}
      <section className="bg-mist py-section-mobile sm:py-section">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title="Proof over promises."
              intro="A look at the kind of work we deliver for the brands we partner with."
            />
            <Reveal>
              <Button href="/portfolio" variant="secondary" size="md" arrow>
                See the portfolio
              </Button>
            </Reveal>
          </div>
          <div className="mt-12">
            <PortfolioGrid showFilter={false} limit={6} />
          </div>
        </Container>
      </section>

      <CTABand />
    </>
  );
}
