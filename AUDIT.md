# Portfolio redesign implementation record

## Current implementation

This branch migrates the static multi-page portfolio to a shared Astro architecture while retaining static deployment. The build is configured to publish `dist/`, not the repository root.

### Design system
- Shared neutral surfaces, dark readable typography, restrained blue accents, spacing and radius tokens.
- Light and dark themes controlled by a single persistent theme toggle.
- Reusable primary/secondary buttons, section headings, tags, cards, status labels, timelines, project-grid, architecture steps, forms, and shared footer.
- No decorative animation is required for the layout; reduced-motion preferences are respected.

### Navigation and routes
- Single shared navigation source for desktop and mobile.
- Canonical routes: Home, Projects, About, Research, Awards, Contact, and six project case studies.
- Mobile dock stays readable at 320px and avoids making Research disappear from mobile navigation.
- Résumé and certificate paths remain short and stable; the PAMERKOM rewrite is corrected to the specific `pamerkom-2026.pdf` asset.
- The old Research redirect is removed from the Vercel rewrite configuration in favour of a real Research page.

### Content
- Six project case studies are generated from `src/data/projects.ts`.
- Recognition entries come from `src/data/recognition.ts`.
- The WeatherHub source action is labelled as a GitHub profile, because the existing link does not identify a verified WeatherHub repository.
- Project statistics, performance claims, and business impact figures are not invented.
- The PAMERKOM title is kept neutral pending verification of the precise award classification against the original certificate.

### Integrations
- Astro's `Picture` component generates responsive profile image variants.
- Lucide icons are imported per component.
- Optional GitHub REST API metadata is fetched at build time, with cached fallback; no API calls run in the visitor's browser.
- Contact form defaults to a mailto draft. Online submission requires a real `PUBLIC_FORMSPREE_ENDPOINT` supplied through the deployment environment.

### Validation plan
- `npm run check` — Astro and TypeScript diagnostics.
- `npm run build` — static output.
- `npm run test:e2e` — navigation, route, search/filter, responsive overflow, and axe checks.
- Vercel preview checks — internal links, résumé/certificate documents, and desktop/mobile visual review.

## Outstanding human review
- Verify each certificate title, term/semester, and exact award classification against the original source documents before promoting stronger wording.
- Verify all external live demos are accessible and still represent the advertised project.
- Test the generated Vercel preview manually on actual mobile hardware.
- Configure `PUBLIC_FORMSPREE_ENDPOINT` only after the owner creates and authorises a real Formspree endpoint.

## Guardrails
- No changes to `main` are made by this branch.
- This is a first-pass migration; preview and automated checks must pass before merge.
