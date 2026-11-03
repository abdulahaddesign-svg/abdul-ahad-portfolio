import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SITE_SETTINGS } from '@/lib/constants';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#25241F',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://abdulahad.design'),
  title: {
    default: 'Abdul Ahad J — Graphic Designer & Visual Branding Specialist | Coimbatore',
    template: '%s | Abdul Ahad J',
  },
  description:
    'Portfolio of Abdul Ahad J, a multidisciplinary creative designer in Coimbatore, Tamil Nadu, India. Specializing in brand identity, marketing collateral, UI/UX design, and motion graphics.',
  keywords: [
    'Graphic designer in Coimbatore',
    'Freelance graphic designer in Coimbatore',
    'Graphic design portfolio Coimbatore',
    'UI/UX designer in Coimbatore',
    'Motion graphics designer in Coimbatore',
    'Branding designer in Coimbatore',
    'Visual branding specialist in Coimbatore',
    'Abdul Ahad designer',
    'Reztro case study'
  ],
  authors: [{ name: 'Abdul Ahad J', url: 'https://abdulahad.design' }],
  creator: 'Abdul Ahad J',
  publisher: 'Abdul Ahad J',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://abdulahad.design',
    title: 'Abdul Ahad J — Premium Creative Portfolio & Visual Branding',
    description: 'Designed with intent. Made to matter. Graphic design, brand identity systems, and UI/UX case studies.',
    siteName: 'Abdul Ahad J Portfolio',
    images: [
      {
        url: '/projects/reztro/reztro-cover.svg',
        width: 1200,
        height: 630,
        alt: 'Abdul Ahad J — Graphic Designer & Visual Branding Specialist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Ahad J — Graphic Designer & Visual Branding Specialist',
    description: 'Designed with intent. Made to matter. Creative portfolio based in Coimbatore, India.',
    images: ['/projects/reztro/reztro-cover.svg'],
  },
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://abdulahad.design/#person',
        name: 'Abdul Ahad J',
        jobTitle: 'Graphic Designer & Visual Branding Specialist',
        description:
          'Creative Graphic Designer with 3+ years experience in brand identity, marketing collateral, UI/UX design, and motion graphics.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Coimbatore',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        email: SITE_SETTINGS.email,
        telephone: SITE_SETTINGS.phone,
        url: 'https://abdulahad.design',
        sameAs: [
          SITE_SETTINGS.linkedinUrl,
          SITE_SETTINGS.behanceUrl,
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: SITE_SETTINGS.educationInstitution,
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://abdulahad.design/#website',
        url: 'https://abdulahad.design',
        name: 'Abdul Ahad J Portfolio',
        publisher: {
          '@id': 'https://abdulahad.design/#person',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://abdulahad.design/#service',
        name: 'Abdul Ahad Creative Design Studio',
        url: 'https://abdulahad.design',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Coimbatore',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        telephone: SITE_SETTINGS.phone,
        priceRange: '₹₹',
        openingHours: 'Mo-Sa 09:00-19:00',
      },
    ],
  };

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
