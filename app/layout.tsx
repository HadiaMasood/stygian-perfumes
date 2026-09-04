import type { Metadata } from 'next';
import { Cinzel, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Toast } from '@/components/ui/Toast';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://stygian-perfumes.vercel.app'),
  title: {
    default: 'Stygian Haute Parfumerie | Artisanal Nocturnal Fragrances',
    template: '%s | Stygian Haute Parfumerie',
  },
  description:
    'Haute perfumery born in the shadows. Discover signature extrait fragrances including Wolfsbane, Belladonna, Nox Arcana, and the bespoke Alchemist Discovery Coffret.',
  keywords: [
    'luxury perfume',
    'niche fragrance',
    'extrait de parfum',
    'Wolfsbane perfume',
    'Belladonna perfume',
    'gothic fragrance',
    'dark luxury',
    'artisanal perfumery',
    'frankincense oud',
    'nocturnal botanicals',
  ],
  openGraph: {
    title: 'Stygian Haute Parfumerie | Nocturnal Fragrance House',
    description:
      'Immersive luxury fragrances handcrafted with rare cold-extracted botanicals and aged resins.',
    url: 'https://stygian-perfumes.vercel.app',
    siteName: 'Stygian Perfumes',
    images: [
      {
        url: '/images/stygian-campaign.jpg',
        width: 1200,
        height: 630,
        alt: 'Stygian Perfumes Signature Extraits',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stygian Haute Parfumerie',
    description: 'Haute perfumery born in the shadows.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Stygian Haute Parfumerie',
    url: 'https://stygian-perfumes.vercel.app',
    logo: '/images/stygian-campaign.jpg',
    description:
      'Exclusive luxury perfume house specializing in dark gothic aesthetics, rare nocturnal botanicals, and high-concentration extraits.',
    sameAs: ['https://instagram.com', 'https://pinterest.com'],
  };

  return (
    <html lang="en" className={`${cinzel.variable} ${plusJakarta.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body className="bg-[#08080a] text-[#f0f1f5] min-h-screen flex flex-col font-sans-luxury selection:bg-[#c5a880] selection:text-black">
        {/* Navigation */}
        <Navbar />

        {/* Main Content View */}
        <main className="flex-1">{children}</main>

        {/* Global Cart Slide-over Drawer */}
        <CartDrawer />

        {/* Toast Notifications */}
        <Toast />

        {/* Global Luxury Footer */}
        <Footer />
      </body>
    </html>
  );
}
