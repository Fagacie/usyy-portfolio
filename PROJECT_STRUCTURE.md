# Project structure

```text
.
├── astro.config.mjs
├── package.json
├── playwright.config.ts
├── public/
│   ├── assets/
│   │   ├── Abbas-Usman-Adamu-Resume.pdf
│   │   ├── certificates/
│   │   └── img/
│   ├── favicon.svg
│   └── robots.txt
├── scripts/
│   └── sync-github-metadata.mjs
├── src/
│   ├── assets/profile.png
│   ├── components/
│   │   ├── ProjectCard.astro
│   │   ├── SectionHeading.astro
│   │   ├── SiteFooter.astro
│   │   └── SiteHeader.astro
│   ├── data/
│   │   ├── github-metadata.ts
│   │   ├── projects.ts
│   │   └── recognition.ts
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── work.astro
│   │   ├── about.astro
│   │   ├── research.astro
│   │   ├── awards.astro
│   │   ├── contact.astro
│   │   └── projects/[slug].astro
│   ├── scripts/site.ts
│   └── styles/global.css
└── tests/
    ├── accessibility.spec.ts
    └── portfolio.spec.ts
```

## Architecture

- `BaseLayout.astro` owns document metadata, theme bootstrap, shared header/footer, and global CSS.
- `SiteHeader.astro` is the only source for desktop and mobile primary navigation.
- `projects.ts` drives the project index and all six static case-study routes.
- `recognition.ts` drives homepage recognition previews and the Awards page.
- `global.css` contains shared tokens and responsive patterns; page markup does not need unique copies of common components.
- `site.ts` contains only progressive enhancements: theme switching, project filters/search, back-to-top, and mailto fallback behaviour.
- `sync-github-metadata.mjs` queries public GitHub repository metadata at build time only. It has cached fallback values and does not create visitor-side API traffic.
- Vercel's `vercel.json` retains the stable `/resume` and `/cert/*` routes. The contact form remains email-draft based until a real Formspree endpoint is configured.

## Build and QA

Static output is written to `dist/`. Both the Vercel build and GitHub Pages deployment publish the generated output rather than the repository root. Playwright tests exercise all canonical routes, project filters/search, narrow viewport overflow, and automated WCAG checks.
