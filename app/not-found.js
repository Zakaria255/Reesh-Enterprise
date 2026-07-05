import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-ink text-white bg-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(50% 55% at 50% 20%, rgba(0,159,208,.25), transparent 60%)' }}
      />
      <div
        aria-hidden
        className="glow-orb animate-drift"
        style={{ width: 420, height: 420, top: '10%', left: '10%', background: 'rgba(0,159,208,.2)' }}
      />
      <Container className="relative z-[1] flex flex-col items-center pt-24 text-center">
        <p className="font-display text-[clamp(5rem,10vw,9rem)] font-extrabold leading-none text-gradient-brand">404</p>
        <h1 className="mt-4 font-display text-h2 text-white">This page took a different path.</h1>
        <p className="mt-4 max-w-md text-body-l text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" size="lg" arrow>
            Back to Home
          </Button>
          <Button href="/contact" variant="ghost" size="lg" className="!text-white !ring-white/25 hover:!bg-white/10 hover:!ring-white/50">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
