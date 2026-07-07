import Image from 'next/image';
import PageHero from '@/components/sections/PageHero';
import ValuesList from '@/components/sections/ValuesList';
import ProcessStepper from '@/components/sections/ProcessStepper';
import StatStrip from '@/components/sections/StatStrip';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Eyebrow from '@/components/ui/Eyebrow';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealItem } from '@/components/util/Reveal';
import Background from '@/components/util/Background';
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
        size="compact"
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

      {/* Mission & Vision — two balanced cards */}
      <Background variant="dot" className="py-section-mobile sm:py-section">
        <Container>
          <SectionHeading
            eyebrow="Our purpose"
            title="Mission & Vision"
            intro="What drives us, and where we're headed."
          />
          <Reveal stagger className="mt-12 grid gap-6 lg:grid-cols-2">
            {[
              {
                label: 'Our Mission',
                icon: (
                  <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0-3.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
                ),
                text:
                  'To help every business we work with look professional, get noticed, and grow — with creative work done right, under one roof.',
              },
              {
                label: 'Our Vision',
                icon: (
                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                ),
                text:
                  'To be the creative partner that raises the standard of branding in Somalia — proof that world-class work is built right here.',
              },
            ].map((c) => (
              <RevealItem
                key={c.label}
                className="group relative flex flex-col overflow-hidden rounded-card bg-white p-8 shadow-card ring-1 ring-line sm:p-10"
              >
                {/* Top brand rule */}
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-gradient-brand" />
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-reesh-blue">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
                    {c.icon}
                  </svg>
                </span>
                <p className="mt-6 text-eyebrow uppercase text-reesh-blue">{c.label}</p>
                <p className="mt-3 max-w-[46ch] font-display text-[clamp(20px,2.1vw,25px)] font-semibold leading-[1.4] text-ink">
                  {c.text}
                </p>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </Background>

      <StatStrip tone="ink" />

      <ValuesList />

      <ProcessStepper tone="white" />

      <CTABand
        title="Want a partner who takes your brand seriously?"
        intro="Let's talk about where your business is headed — and how we can help you get there."
      />
    </>
  );
}
