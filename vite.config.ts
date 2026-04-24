import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

import { cloudflare } from "@cloudflare/vite-plugin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), VitePWA({
    registerType: 'prompt',
    injectRegister: false,
    includeAssets: ['favicon.svg', 'og-image.png', 'llms.txt'],
    manifest: {
      name: 'How Long?',
      short_name: 'How Long?',
      description: 'A modern date distance calculator',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      theme_color: '#030712',
      background_color: '#030712',
      icons: [
        {
          src: '/favicon.svg',
          type: 'image/svg+xml',
          sizes: 'any',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico,webmanifest}'],
      cleanupOutdatedCaches: true,
      navigateFallback: '/index.html',
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.origin === 'https://fonts.googleapis.com',
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          },
        },
        {
          urlPattern: ({ url }) =>
            url.origin === 'https://fonts.gstatic.com',
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
            cacheableResponse: { statuses: [0, 200] },
          },
        },
      ],
    },
    devOptions: {
      enabled: false,
    },
  }), cloudflare()],
})