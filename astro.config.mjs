import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.usyy-portfolio.tech',
  trailingSlash: 'never',
  integrations: [sitemap()],
  build: {
    // Directory output supports both clean URLs on Vercel and static hosting.
    format: 'directory',
  },
  image: {
    responsiveStyles: true,
  },
});
