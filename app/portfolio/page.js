import PageHero from '@/components/sections/PageHero';
import PortfolioGrid from '@/components/sections/PortfolioGrid';
import CTABand from '@/components/sections/CTABand';
import Container from '@/components/ui/Container';
import Background from '@/components/util/Background';
import { site } from '@/lib/content';

export const metadata = {
  title: 'Portfolio',
  description:
    'Selected branding, digital, media, web, and print work from Reesh Enterprise — proof of the quality we deliver for the brands we partner with.',
  alternates: { canonical: `${site.domain}/portfolio` },
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work we're proud to put our name on."
        intro="A selection of projects across branding, media, web, and print. Filter by category to see what we do best."
      />

      <Background variant="mesh" className="py-section-mobile sm:py-section">
        <Container>
          <PortfolioGrid showFilter />
          <p className="mt-12 text-center text-sm text-gray">
            Showcasing representative work. Real client case studies are added as projects go live.
          </p>
        </Container>
      </Background>

      <CTABand
        title="Your project could be next."
        intro="Let's create something worth showing off."
      />
    </>
  );
}
