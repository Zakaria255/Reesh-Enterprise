import { notFound } from 'next/navigation';
import PageHero from '@/components/sections/PageHero';
import ReeshFive from '@/components/sections/ReeshFive';
import IncludedList from '@/components/sections/IncludedList';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import Background from '@/components/util/Background';
import { subBrands, getSubBrand, site } from '@/lib/content';

export function generateStaticParams() {
  return subBrands.map((b) => ({ slug: b.slug }));
}

export function generateMetadata({ params }) {
  const brand = getSubBrand(params.slug);
  if (!brand) return {};
  return {
    title: brand.seo.title,
    description: brand.seo.description,
    alternates: { canonical: `${site.domain}/services/${brand.slug}` },
    openGraph: {
      title: brand.seo.title,
      description: brand.seo.description,
    },
  };
}

export default function SubBrandPage({ params }) {
  const brand = getSubBrand(params.slug);
  if (!brand) notFound();

  return (
    <>
      <PageHero eyebrow={brand.tag} title={brand.name} intro={brand.subheadline} image={brand.image}>
        <Button href={brand.cta.href} variant="primary" size="lg" arrow>
          {brand.cta.label}
        </Button>
      </PageHero>

      {/* Overview */}
      <section className="bg-white py-section-mobile sm:py-section">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 font-display text-h2 text-ink">What {brand.name} does</h2>
          </Reveal>
          <Reveal delay={0.08} as="p" className="text-body-l text-slate">
            {brand.description}
          </Reveal>
        </Container>
      </section>

      {/* What's included — checkmark draw-in */}
      <Background variant="mist" grain className="py-section-mobile sm:py-section">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow>What&apos;s included</Eyebrow>
            <h2 className="mt-4 font-display text-h2 text-ink">Everything in one package.</h2>
            <p className="mt-4 text-slate">
              A complete offering, so nothing about your brand is left half-done.
            </p>
          </Reveal>
          <div className="lg:pt-2">
            <IncludedList items={brand.included} />
          </div>
        </Container>
      </Background>

      {/* Best for — chips */}
      <section className="bg-white py-section-mobile sm:py-section">
        <Container>
          <Reveal className="flex flex-col items-center gap-5 text-center">
            <Eyebrow>Best for</Eyebrow>
            <h2 className="max-w-2xl font-display text-h2 text-ink">Who this is built for</h2>
          </Reveal>
          <Reveal stagger className="mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-3">
            {brand.bestFor.map((b) => (
              <RevealItem
                key={b}
                className="rounded-pill border border-line bg-mist px-5 py-2.5 text-sm font-semibold text-ink transition-all duration-med ease-reesh hover:-translate-y-0.5 hover:border-reesh-blue/40 hover:text-reesh-blue"
              >
                {b}
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* Benefits — cards */}
      <Background variant="ink-glow" grain className="py-section-mobile text-white sm:py-section">
        <Container>
          <Reveal className="flex flex-col gap-4">
            <Eyebrow tone="light">Why it matters</Eyebrow>
            <h2 className="max-w-2xl font-display text-h2 text-white">The difference {brand.name} makes.</h2>
          </Reveal>
          <Reveal stagger className="mt-12 grid gap-6 md:grid-cols-3">
            {brand.benefits.map((benefit, i) => (
              <RevealItem
                key={benefit.title}
                className="rounded-card border border-white/10 bg-white/[.04] p-7 transition-transform duration-med ease-reesh hover:-translate-y-1.5"
              >
                <span className="font-display text-3xl font-extrabold text-reesh-blue">0{i + 1}</span>
                <h3 className="mt-3 font-display text-h3 text-white">{benefit.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{benefit.desc}</p>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Background>

      {/* Related sub-brands — mini ReeshFive */}
      <ReeshFive heading={false} currentSlug={brand.slug} />

      <CTABand
        title={`Ready to get started with ${brand.name}?`}
        intro={brand.subheadline}
        primary={brand.cta}
      />
    </>
  );
}
