import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import WhyReesh from '@/components/sections/WhyReesh';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Button from '@/components/ui/Button';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import Background from '@/components/util/Background';
import { subBrands, site, images } from '@/lib/content';

export const metadata = {
  title: 'Services',
  description:
    'Design, Digital, Media, Web, and Print — five specialties from Reesh Enterprise, delivered under one roof to a world-class standard.',
  alternates: { canonical: `${site.domain}/services` },
};

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 flex-none" aria-hidden>
    <path d="M16.5 5.5 8 14l-4.5-4.5" stroke="#009FD0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Five specialties. One standard of excellence."
        intro="Everything your brand needs to look professional and grow — design, digital, media, web, and print, working together as one."
        image={images.services}
      >
        <Button href="/contact" variant="primary" size="lg" arrow>
          Request a Quote
        </Button>
      </PageHero>

      {/* Alternating service blocks */}
      <Background variant="mesh">
        {subBrands.map((b, i) => {
          const imageLeft = i % 2 === 1;
          return (
            <section
              key={b.slug}
              className={`py-section-mobile sm:py-section ${i % 2 === 0 ? 'bg-white/0' : 'bg-mist/60'}`}
              id={b.slug}
            >
              <Container className="grid items-center gap-12 lg:grid-cols-2">
                <Reveal className={`relative ${imageLeft ? 'lg:order-2' : ''}`}>
                  <div className="relative overflow-hidden rounded-img shadow-card">
                    <Image
                      src={b.image}
                      alt={`${b.name} — ${b.tag}`}
                      width={760}
                      height={560}
                      sizes="(max-width:1024px) 100vw, 50vw"
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,159,208,.12), transparent 60%)' }} />
                  </div>
                  <span className="absolute -top-4 left-5 rounded-pill bg-ink px-4 py-1.5 font-display text-sm font-bold text-white shadow-card">
                    0{i + 1}
                  </span>
                </Reveal>

                <Reveal stagger className={`flex flex-col gap-5 ${imageLeft ? 'lg:order-1' : ''}`}>
                  <RevealItem>
                    <Eyebrow>{b.tag}</Eyebrow>
                  </RevealItem>
                  <RevealItem as="h2" className="font-display text-h2 text-ink">
                    {b.name}
                  </RevealItem>
                  <RevealItem as="p" className="text-body-l text-slate">
                    {b.description}
                  </RevealItem>
                  <RevealItem as="ul" className="grid gap-2.5 sm:grid-cols-2">
                    {b.included.slice(0, 6).map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[15px] text-slate">
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </RevealItem>
                  <RevealItem>
                    <Button href={`/services/${b.slug}`} variant="dark" size="md" arrow className="mt-2">
                      Explore {b.name}
                    </Button>
                  </RevealItem>
                </Reveal>
              </Container>
            </section>
          );
        })}
      </Background>

      <WhyReesh />

      <CTABand
        title="Not sure which service you need?"
        intro="Tell us your goal and we'll recommend the right mix — often it's more than one."
      />
    </>
  );
}
