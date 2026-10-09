# Portfolio Audit: Findings and Redesign Plan

Repository: [Fagacie/usyy-portfolio](https://github.com/Fagacie/usyy-portfolio)  
Live site: https://www.usyy-portfolio.tech/  
Audit branch: `portfolio/redesign-audit`  
Audit status: **Initial source review**. This document records findings from repository files and the tracked file tree. It is not a claim that every live route, browser interaction, or deployment has already been tested.

## Goals and guardrails

- Improve the portfolio's information architecture, clarity, credibility, accessibility, responsiveness, and performance.
- Keep the current `main` branch unchanged while redesign work happens on a dedicated branch.
- Work page by page, starting with information architecture and the homepage.
- Do not remove assets or rewrite the stack merely for tidiness. Verify usage and purpose first.
- Preserve factual accuracy. Confirm dates, awards, project status, demos, repositories, and claims before presenting them as verified.
- Prefer an editorial engineering portfolio: light neutral surfaces, dark readable typography, a restrained blue accent, real project evidence, clean spacing, and purposeful motion. Avoid extra glow effects and decorative animation that compete with the work.

## High-priority findings

### P0 / P1: Correctness and trust

1. **A certificate rewrite points to a file that is absent from the tracked tree.**  
   `vercel.json` maps `/cert/water-survival` to `/assets/certificates/water-survival.pdf`, but that target is not present in the repository tree. Verify whether the certificate exists elsewhere; then either add the correct approved asset or remove/correct the route. Do not invent a replacement.

2. **Navigation omits the Research page.**  
   The shared navigation in `js/components.js` includes Home, Work, About, and Contact, but not Research, even though `research.html` exists. The footer also omits Research. This makes a first-class page harder to discover.

3. **Project-page active navigation detection is incomplete.**  
   `components.js` identifies only project paths beginning with `psm-`, `iot-`, or `pku-` as Work pages. Existing WeatherHub, MasakJerr!, and Elite Soccer project pages do not match those prefixes, so their Work navigation state may not be set consistently.

4. **Award/Dean's List labels need verification.**  
   The Work page's award text and the tracked certificate filenames appear to use different semester labels. The source documents must be checked before changing public claims. No semester label should be corrected from a filename alone.

5. **WeatherHub's repository link appears to point to the GitHub profile rather than a project repository.**  
   `projects/weatherhub.html` links to `https://github.com/Fagacie`. Verify the intended repository and update only when the correct destination is known.

### P1: Information architecture and content

6. **The Work page combines several different content types.**  
   Project cards, professional experience, community roles, awards, and certificates are presented on one long page. Separate the concepts clearly: Projects, Experience & Leadership, and selected Recognition/Credentials. Keep navigation simple rather than creating a page for every small category.

7. **About and Work overlap.**  
   About contains biography, development focus, education, leadership, technical skills, and a roles/education timeline. Work repeats professional roles and achievements. Establish a single source of truth for each fact and use concise summaries with links where useful.

8. **The homepage has too many competing messages and effects.**  
   It combines an animated canvas, portrait and glow, social links, a scrolling technology marquee, capability cards, featured projects, and additional research/recognition/contact sections. Prioritize the value proposition and strongest evidence; reduce duplicated technology lists and motion.

9. **Project cards and detail pages need a consistent evidence-first case-study structure.**  
   Standardize project pages around: purpose/problem, the user's role, key decisions and features, architecture/stack, challenges or trade-offs, screenshots or other evidence, current status, and verified demo/source links. Do not invent metrics or imply a project is live unless verified.

10. **Research needs a clear role in the site.**  
    The Research page currently lists broad interest areas. Clarify current interests versus completed research, publications, and future plans. Avoid presenting aspirations as completed work.

### P2: Maintainability and polish

11. **Project structure documentation is incomplete.**  
    `PROJECT_STRUCTURE.md` contains only a placeholder. Document the actual page, asset, style, script, project-detail, and deployment structure.

12. **README design claims do not fully match the implementation.**  
    README describes a clean/minimal interface with reduced animation, while the source includes multiple motion effects, a canvas background, marquee, glows, transitions, and interactive effects. Update the design description after the redesign rather than promising qualities the site does not consistently deliver.

13. **CSS and asset references are inconsistent.**  
    Pages reference different `style.css` query versions (for example, `index.html`, `work.html`, `about.html`, and project pages use different values or none). Consolidate cache-busting/versioning once the deployment setup is confirmed. The main stylesheet is large (about 97 KB) and some pages use inline styles; audit duplication before restructuring it.

14. **Potential duplicate assets increase repository weight.**  
    The tree contains repeated certificate/image files under different names and paths, often with identical blob hashes, plus an approximately 8.5 MB consolation-prize PDF stored twice by path. Confirm which paths are referenced before deduplicating or compressing. Preserve the original certificate and its readability.

15. **A temporary-looking PowerShell script is committed at the repository root.**  
    `_tmp_theme_patch.ps1` looks temporary by its filename. Inspect its contents and history before deciding whether it belongs in the repository. Do not delete it without verification.

16. **Semantic/accessibility review is required.**  
    Inspect nested/invalid HTML structure, keyboard operation, focus visibility, mobile menu focus behaviour, image alternatives, contrast, reduced-motion support, and whether decorative canvas/motion is hidden from assistive technology. In particular, the desktop navigation markup appears to place a `div` directly inside a `ul`; restructure it to valid list markup if confirmed in final implementation.

17. **External dependencies and performance need measurement.**  
    The pages load Google Fonts, Font Awesome, and AOS from third parties. Measure real impact before removing or replacing them. Review image dimensions/formats, the large PDF assets, JavaScript work on scroll/mouse movement, and animation fallbacks.

18. **Route and deployment assumptions need end-to-end testing.**  
    The site uses clean URLs in `vercel.json`, relative links, and root-level resume/certificate rewrites. Verify every internal link from both root pages and `/projects/` pages, plus the Vercel build/deployment configuration. A source inspection alone cannot prove that a live route works.

## Proposed information architecture

Primary navigation:
- **Home** — concise positioning, strongest selected projects, capabilities, current experience, selected recognition, research preview, contact CTA.
- **Projects** (current Work page can be retained as the route initially) — searchable/filterable project index and clear project categories.
- **About** — concise background, education, approach, and a small set of relevant skills.
- **Research** — current research interests and verified outputs, clearly separating ongoing interests from completed work.
- **Contact** — direct email and a small number of relevant professional links.
- **Resume** — persistent, clearly labelled action.

Within Projects, group project case studies separately from career experience and credentials. Experience and leadership can be a distinct section on About or a clearly labelled section on Work; recognition should be curated rather than mixed into project cards.

## Homepage sequence to test in the redesign

1. Hero: name, clear role/focus, concise value proposition, primary Projects action, secondary Resume action.
2. Selected projects: two or three strongest projects, with real screenshots and clear status/source links.
3. Capabilities: three specific areas supported by project evidence, not generic skill claims.
4. Current experience: concise and date-verified.
5. Selected recognition: only verified, relevant items.
6. Research preview: current interests or outputs, accurately labelled.
7. Contact CTA and restrained footer.

## Implementation sequence

1. Complete source/link/content audit and verify factual claims.
2. Agree on a small visual system (type, spacing, colours, surfaces, cards, buttons, motion rules).
3. Redesign the homepage only and review it before changing other pages.
4. Standardize the project index and case-study pages.
5. Refine About, Research, and Contact.
6. Clean documentation/assets only after references are verified.
7. Run route, responsive, accessibility, console, and deployment checks; review the branch diff before merging.


## Implementation progress

### Completed on `portfolio/redesign-audit`

- Added the initial source-level audit and documented the proposed information architecture and QA limits.
- Reworked the homepage content order and added a scoped responsive stylesheet.
- Added Research to the shared desktop/mobile navigation and footer; corrected active-state handling for all six project detail routes.
- Replaced invalid desktop navigation nesting with a valid flex container and direct links.
- Removed the homepage's inactive scroll-progress indicator and unused main script load from that page.
- Rebuilt the Work page as a project index, experience/leadership timeline, and recognition archive, with scoped responsive styling and improved filter accessibility.
- Standardized all six project-detail pages with a breadcrumb back to Projects, consistent responsive case-study styling, and previous/next project navigation.
- Rebuilt About, Research, and Contact with a shared responsive layout. Research is explicitly described as interests and directions, not completed publications or studies.
- Aligned community role chronology with the latest known information: Treasurer (2025–Present), previously Media & Publicity Officer.
- Changed the WeatherHub repository action to clearly say “Browse GitHub Profile” rather than implying the profile URL is a specific source repository. A confirmed repository for the older portfolio WeatherHub demo is still not established.
- Removed the `/cert/water-survival` rewrite because its target file is absent and the redesigned Work page no longer links to it. The Water Survival participation entry remains without a certificate link.
- Kept changes on the review branch; `main` has not been changed.

### Current validation status

- Vercel's GitHub status check has reported successful preview deployments for recent branch commits.
- Source-level checks found no missing local page/style/image/certificate paths in the redesigned homepage and Work page.
- Confirmed six project cards and seven recognition entries remain in the Work page.
- Confirmed mobile breakpoints, reduced-motion CSS, valid desktop navigation container markup, and project-filter `aria-pressed` state updates.
- Not yet completed: visual browser inspection, real-device/viewport interaction testing, keyboard focus walkthrough, browser console/network checks, automated accessibility audit, performance measurements, and end-to-end verification of external destinations.
- The Dean's Award semester labels still need verification against original certificates. The Water Survival certificate route remains unresolved because the expected file is absent from the tracked tree.

## Verification checklist

- [ ] Confirm all internal links and clean-URL rewrites.
- [ ] Confirm every project demo and source link.
- [ ] Confirm award/certificate names and dates against source documents.
- [ ] Confirm the correct resume and certificate files.
- [ ] Test navigation and menu with keyboard and mobile viewport.
- [ ] Check reduced-motion preference and visible focus states.
- [ ] Check responsive layout at narrow, medium, and wide widths.
- [ ] Check browser console and network errors.
- [ ] Measure image/PDF weight and page performance.
- [ ] Review all changed files and test deployment preview before merge.

## Scope note

The findings above are a source-level audit. Live browser testing, link-status checks, accessibility tooling, and performance measurements remain to be completed during implementation/QA. Items that depend on personal facts or source documents are marked for verification rather than silently “fixed.”
