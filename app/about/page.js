import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import ValuesList from '@/components/sections/ValuesList';
import ProcessStepper from '@/components/sections/ProcessStepper';
import TeamGrid from '@/components/sections/TeamGrid';
import StatStrip from '@/components/sections/StatStrip';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import { site, images } from '@/lib/content';

export const metadata = {
  title: 'About',
  description:
    'Reesh Enterprise is a creative & digital agency in Mogadishu helping businesses move from simple ideas to professional brands — five specialties under one roof.',
  alternates: { canonical: `${site.domain}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Reesh"
        title="We build brands businesses are proud to own."
        intro={site.signature}
        image={images.about}
      />

      {/* Story — 2 col + accent panel */}
      <section className="bg-white py-section-mobile sm:py-section">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal stagger className="flex flex-col gap-5">
            <RevealItem>
              <Eyebrow>Our story</Eyebrow>
            </RevealItem>
            <RevealItem as="h2" className="font-display text-h2 text-ink">
              One team, five specialties, a single standard: excellent.
            </RevealItem>
            <RevealItem as="p" className="text-body-l text-slate">
              Reesh Enterprise was founded on a simple belief — that businesses in Somalia deserve creative work that
              stands next to the best in the world. Too often, growing brands are forced to juggle separate designers,
              marketers, and printers, losing time and consistency in the gaps.
            </RevealItem>
            <RevealItem as="p" className="text-slate">
              We brought it all under one roof. Design, digital, media, web, and print — five focused specialties working
              as one team, so your brand looks and feels professional everywhere it appears. From the first sketch to
              ongoing growth, we are the partner that takes your business seriously.
            </RevealItem>
          </Reveal>

          <Reveal className="relative">
            <div className="relative overflow-hidden rounded-img shadow-card">
              <Image
                src={images.aboutPanel}
                alt="The Reesh Enterprise team collaborating in the studio"
                width={720}
                height={560}
                sizes="(max-width:1024px) 100vw, 50vw"
                className="h-full w-full object-cover"
              />
            </div>
            {/* Accent panel */}
            <div className="absolute -bottom-6 -left-6 hidden rounded-card bg-gradient-brand p-6 shadow-glow sm:block">
              <p className="font-display text-3xl font-extrabold text-white">Under one roof</p>
              <p className="mt-1 text-sm text-white/85">Design · Digital · Media · Web · Print</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Mission + Vision */}
      <section className="bg-mist py-section-mobile sm:py-section">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal className="card-base flex flex-col p-8">
            <Eyebrow>Our mission</Eyebrow>
            <p className="mt-4 font-display text-h3 text-ink">
              To help every business we work with look professional, get noticed, and grow — with creative work done
              right, under one roof.
            </p>
          </Reveal>
          <Reveal delay={0.08} className="card-base relative flex flex-col overflow-hidden bg-ink p-8 text-white">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ background: 'radial-gradient(60% 60% at 80% 0%, rgba(0,159,208,.25), transparent 60%)' }}
            />
            <div className="relative">
              <Eyebrow tone="light">Our vision</Eyebrow>
              <p className="mt-4 font-display text-h3 text-white">
                To be the creative partner that raises the standard of branding in Somalia — proof that world-class work
                is built right here.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <StatStrip tone="ink" />

      <ValuesList />

      <ProcessStepper tone="white" />

      <TeamGrid />

      <CTABand
        title="Want a partner who takes your brand seriously?"
        intro="Let's talk about where your business is headed — and how we can help you get there."
      />
    </>
  );
}
