import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Abdul Ahad J — Creative Designer & Visual Branding Specialist',
    short_name: 'Abdul Ahad',
    description: 'Portfolio and visual identity systems of Abdul Ahad J.',
    start_url: '/',
    display: 'standalone',
    background_color: '#25241F',
    theme_color: '#25241F',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
