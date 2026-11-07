import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Manrope } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { FluidMouseFollower } from '@/components/ui/FluidMouseFollower';
import { SITE_SETTINGS } from '@/lib/constants';
import { getSiteSettings } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://abdulahad.design/#person',
        name: settings.name,
        jobTitle: settings.title,
        description: settings.aboutIntro,
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Coimbatore',
          addressRegion: 'Tamil Nadu',
          addressCountry: 'IN',
        },
        email: settings.email,
        telephone: settings.phone,
        url: 'https://abdulahad.design',
        sameAs: [
          settings.linkedinUrl,
          settings.behanceUrl,
        ],
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: settings.educationInstitution,
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://abdulahad.design/#website',
        url: 'https://abdulahad.design',
        name: `${settings.name} Portfolio`,
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
        telephone: settings.phone,
        priceRange: '₹₹',
        openingHours: 'Mo-Sa 09:00-19:00',
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var a=${JSON.stringify(Boolean(settings.allowDarkTheme))};var p=localStorage.getItem('theme-preference');if(a&&p==='dark'){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');document.documentElement.style.colorScheme='dark';}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');document.documentElement.style.colorScheme='light';}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-ivory text-charcoal dark:bg-charcoal dark:text-ivory transition-colors duration-300">
        <ThemeProvider allowDarkTheme={Boolean(settings.allowDarkTheme)}>
          <FluidMouseFollower />
          <Navbar settings={settings} />
          <main className="flex-1">{children}</main>
          <Footer settings={settings} />
        </ThemeProvider>
      </body>
    </html>
  );
}
