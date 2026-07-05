import PageHero from '@/components/sections/PageHero';
import IndustryGrid from '@/components/sections/IndustryGrid';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Background from '@/components/util/Background';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Industries',
  description:
    'Reesh Enterprise serves hospitality, retail, healthcare, real estate, finance, education, technology and more — creative and digital work tailored to each sector.',
  alternates: { canonical: `${site.domain}/industries` },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Creative work that speaks your sector's language."
        intro="We understand that a hotel, a clinic, and a retail store each need something different. Here's how we tailor our five specialties to the industries we serve."
      />

      <Background variant="dot" className="py-section-mobile sm:py-section">
        <Container>
          <SectionHeading
            eyebrow="Who we serve"
            title="Tailored to your industry, built to a single standard."
            intro="Every sector has its own audience, tone, and expectations. We adapt — the quality never does."
            align="center"
          />
          <div className="mt-14">
            <IndustryGrid variant="blocks" />
          </div>
        </Container>
      </Background>

      <CTABand
        title="Don't see your industry?"
        intro="We work with businesses of every kind. Tell us about yours and we'll show you what's possible."
      />
    </>
  );
}
