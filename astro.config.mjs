// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';
import path from 'path';

export default defineConfig({
  adapter: node({ mode: 'standalone' }),
  site: 'https://lecercle.ai',
  trailingSlash: 'never',
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
