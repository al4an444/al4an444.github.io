import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://al4an444.github.io',
  integrations: [
    mdx(),
    // English at the root, Spanish under /es/: the sitemap pairs each page
    // with its translation (xhtml:link hreflang) so both get indexed.
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      filter: (page) => !page.includes('/google'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
