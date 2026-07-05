import './globals.css';
import { Sora, Inter } from 'next/font/google';
import { site } from '@/lib/content';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'creative agency Mogadishu',
    'branding Somalia',
    'digital marketing Mogadishu',
    'web design Somalia',
    'Reesh Enterprise',
    'logo design',
    'media production',
    'print branding',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: 'en',
    url: site.domain,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  alternates: { canonical: site.domain },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0B1622',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: site.name,
  description: site.description,
  url: site.domain,
  telephone: site.contact.phoneRaw,
  email: site.contact.email,
  image: `${site.domain}/opengraph-image`,
  logo: `${site.domain}/brand/logo-full.svg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Taleex',
    addressLocality: 'Mogadishu',
    addressCountry: 'SO',
  },
  areaServed: 'Somalia',
  sameAs: [site.social.instagram, site.social.facebook, site.social.linkedin, site.social.tiktok],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
