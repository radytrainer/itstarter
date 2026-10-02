import type { MetadataRoute } from 'next';
import en from '../../messages/en.json';
import km from '../../messages/km.json';

/**
 * Web app manifest (served at /manifest.webmanifest and linked automatically by Next.js).
 * It makes the site installable: home-screen icon, full-screen window, brand colours.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: en.app.name,
    short_name: 'IT Starter',
    description: `${en.app.tagline} · ${km.app.tagline}`,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f6f7fb',
    theme_color: '#4f46e5',
    lang: 'en',
    categories: ['education'],
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
