# Usman Abbas Adamu — Portfolio

A responsive software engineering portfolio built with Astro, TypeScript, and a small shared design system. The site is statically generated for Vercel and GitHub Pages; it does not require a database or an always-on application server.

## Stack

- **Astro** — shared layouts, reusable UI components, and static page generation.
- **TypeScript** — typed project and recognition data.
- **Lucide for Astro** — consistent, tree-shakable interface icons.
- **Astro Picture/Image** — build-time responsive image output for the profile image.
- **GitHub REST API** — optional repository stars/fork metadata fetched during the build, cached into generated source data, and never called from a visitor's browser.
- **Playwright + axe-core** — route, responsive, interaction, and automated accessibility tests.
- **Astro Sitemap** — sitemap generated from the public site routes.
- **Vercel** — static deployment and clean-URL/certificate/resume routing.

## Local development

Requirements: Node.js `22.23.4` or later and npm.

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm run check       # Astro and TypeScript checks
npm run build       # fetch optional repository metadata, then build dist/
npm run preview     # preview the production build
npm run test:e2e    # Playwright route, filtering, responsive, and a11y tests
```

Before running browser tests, install Chromium once:

```sh
npx playwright install chromium
```

## Project structure

- `src/pages/` — homepage, projects index, About, Research, Awards, Contact, and generated case studies.
- `src/components/` — shared navigation, footer, section heading, project card.
- `src/layouts/` — shared HTML, metadata, global CSS, and navigation shell.
- `src/data/projects.ts` — the typed source of truth for six project case studies.
- `src/data/recognition.ts` — awards, programme records, and certificate destinations.
- `src/styles/global.css` — global tokens, components, states, and responsive rules.
- `src/scripts/site.ts` — lightweight browser interactions.
- `public/assets/` — résumé, favicon/OG image, and certificates served as static files.
- `scripts/sync-github-metadata.mjs` — build-time repository metadata refresh with cached fallback.
- `tests/` — Playwright functional, viewport, and automated accessibility checks.

Some original static files remain in the repository during the first migration review to make comparison and rollback straightforward. The Astro build only publishes the generated `dist/` directory; it does not copy those legacy files to the deployed site.

## Routes

- `/`
- `/work`
- `/about`
- `/research`
- `/awards`
- `/contact`
- `/projects/psm-e-learning` and the other five case studies
- `/resume` and `/cert/*` — Vercel rewrites to the source documents under `public/assets/`

The project details and recognition names live in TypeScript data files, reducing page-by-page content drift.

## Optional integrations

### GitHub repository metadata

The build reads public repository metadata for selected repositories. `GITHUB_TOKEN` is optional; setting it in CI/Vercel increases API headroom. If the API is unavailable or rate-limited, the script keeps its cached values and the site still builds.

### Contact form

The contact form opens a pre-populated email draft by default and clearly informs the visitor that they still need to send it. To enable online form submission, configure `PUBLIC_FORMSPREE_ENDPOINT` in the Vercel project environment with the exact endpoint created for the portfolio, then redeploy. No fake success state is displayed.

## Release process

1. Work on a feature branch.
2. Run `npm run check`, `npm run build`, and `npm run test:e2e`.
3. Review the Vercel preview at mobile and desktop widths.
4. Check all clean URLs, résumé/certificate rewrites, live demo links, and external destinations.
5. Merge only after the preview and GitHub checks are reviewed.
