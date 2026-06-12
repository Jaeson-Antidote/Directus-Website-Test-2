// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import path from 'path';

export default defineConfig({
  site: 'https://lecercle.ai',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  server: {
    port: 3000,
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '~': path.resolve('./src'),
      },
    },
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
  ],
});
