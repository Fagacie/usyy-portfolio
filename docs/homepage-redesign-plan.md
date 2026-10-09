# Homepage Redesign Audit & Implementation Plan

**Status:** Audit and planning only  
**Scope:** Home page (index.html) and Home-scoped presentation/interaction  
**Review branch:** portfolio/redesign-audit  
**Production branch:** main must remain unchanged until the Home page is reviewed and approved  
**Audit date:** 10 October 2026

## 1. Purpose

The Home page should feel like a carefully engineered portfolio experience, not a conventional template with new decoration placed over it. The objective is to help a recruiter, engineering lead, research collaborator, or potential client answer four questions quickly:

1. Who is Abbas, and what kind of problems does he work on?
2. What has he actually built?
3. How does he approach engineering work?
4. What is the best next step: inspect a project, read the résumé, explore research, or make contact?

The redesign should connect every section to that story. Interactions must improve understanding or navigation. Motion, depth, diagrams, and any 3D effects are supporting tools, not the point of the page.

## 2. Guardrails

- **Keep the existing portrait in the Home hero.** It establishes identity and trust. Do not replace it with a 3D object.
- Keep the established light neutral, graphite, white, and restrained cobalt-blue palette. Do not introduce gold, neon gradients, or a generic “AI” visual style.
- Keep the current plain HTML/CSS/JavaScript architecture. Do not migrate the portfolio to React or add a bundler just to animate a page.
- Prefer real product screenshots and accurate system diagrams over fabricated interface mockups. If a live screenshot is unavailable, use a labelled workflow/architecture illustration rather than pretending it is a deployed product screen.
- Do not invent usage figures, performance metrics, client results, awards, or claims of completed research.
- Do not hide important copy behind hover, animation, a carousel, or a WebGL canvas.
- Do not add sound, a custom cursor, endless particle effects, scroll hijacking, or motion that prevents normal scrolling.
- Scope changes to Home. Avoid editing css/style.css or js/components.js unless a later change is explicitly approved as global. Prefer css/home.css and, if the interaction requires it, a small js/home.js module loaded on Home only.

## 3. Audit method and limitation

This audit reviewed the current index.html, css/home.css, the shared css/style.css, and the shared navigation/footer in js/components.js. The live domain could not be loaded in the audit environment, so the findings below about current layout and behaviour are based on source code, not a confirmed browser screenshot. Before implementing the redesign, capture a baseline on desktop and mobile and compare every phase against it.

### Current Home page sequence

0. Shared floating navigation and résumé link
1. Hero: identity, positioning statement, short introduction, Projects and Résumé actions, profile portrait
2. Practice-area strip: web/backend, IoT, applied intelligent systems
3. Selected Work: PSM E-Learning, Smart Campus IoT Station, PKU Management System
4. How I Work: application development, IoT/integration, research-led thinking
5. Current Role: internship context and employer card
6. Research Direction: dark call-to-action band
7. Contact Call-to-Action
8. Shared footer

### What is already working

- The headline “I build software that solves real problems.” is direct and understandable.
- The page introduces a real person rather than an anonymous brand.
- Projects and résumé are reachable immediately from the hero.
- The existing light background, dark readable text, and blue accent are a sound base.
- The page already has semantic section headings, a skip link, focus-visible styles, and a reduced-motion CSS rule.
- The content is concise enough to build a stronger visual narrative without turning the homepage into a long biography.

### Main issues to solve

**A. The page is more static than its content deserves.** The hero and every section are mainly fixed layout and hover styling. Home currently does not load js/main.js; the older general interaction code is therefore not the source of Home behaviour. We should design a small number of purposeful interactions rather than trying to enable a collection of legacy effects.

**B. The project visuals look like interfaces, but they are CSS-drawn mockups.** The current Learning, IoT, and PKU illustrations can suggest a product, but they do not prove what the implemented systems actually look like. Replace them with genuine screenshots when available; otherwise use accurate and clearly identified architecture/workflow diagrams.

**C. The page repeats its main categories.** The practice strip and the three “How I Work” cards both communicate web applications, IoT, and intelligent/research systems. Give those areas different jobs: the strip should help visitors navigate to relevant work, while “How I Work” should explain a repeatable engineering process.

**D. The supposed featured project has no distinct visual treatment.** The first card uses a home-project-card-featured class, but there is no dedicated matching rule in css/home.css. Make hierarchy intentional rather than relying on a class name that currently does not change the design.

**E. Tablet project layout needs a deliberate decision.** The responsive stylesheet contains a rule that hides the last project card at narrower widths, followed by a later rule that displays it again. The later declaration wins, so the earlier hide rule is dead/conflicting CSS; at tablet widths the three-card, two-column layout can leave one card alone on the second row. Design a stable 1+2 composition at tablet widths, then stack all three cards on phones.

**F. The portrait image is comparatively heavy.** assets/img/profile.png is approximately 712 KB. Keep the actual portrait but create appropriately sized WebP/AVIF variants where supported, with a safe fallback, and measure the resulting load instead of guessing at performance.

**G. The hero explains the focus but gives little evidence of the work.** The positioning statement and intro are a good start; the visual beside them should communicate the kind of systems Abbas builds, not just add an independent decorative object.

**H. The remaining sections use a similar presentation pattern.** Most information is arranged as plain text and cards. Vary the composition with a project explorer, a connected process diagram, a timeline-like current-work panel, and a research-direction graphic, while keeping one coherent visual system.

**I. The current-role panel may date quickly.** The role uses a hard-coded “August 2026 – Present” label. Its copy and date should be reviewed whenever the internship status changes; do not let a “current” marker become stale.

**J. Contact is clear but generic.** Improve the final CTA so it feels like a natural conclusion to the work shown and gives a direct, low-friction route to email or professional contact.

## 4. Recommended visual direction: “Engineering in Motion”

The chosen direction is an editorial engineering portfolio with layered evidence, clear visual hierarchy, and controlled interaction. It should feel crafted and technical without resembling a game, a template, or a generic AI landing page.

Use:
- Off-white and white as the primary canvas, graphite for strong contrast, and cobalt blue for active states and key information.
- Larger, deliberate typography and consistent spacing, with a limited number of small uppercase labels.
- Strong section rhythm: open hero, compact navigation strip, substantial project showcase, process-oriented capabilities section, practical experience panel, darker research moment, and a clear closing CTA.
- Real application screenshots, code/system details, and precise SVG diagrams as the key visual material.
- Layered depth in the hero and work section through CSS perspective, subtle parallax, and object separation. The portrait remains part of the hero composition.
- A few interactions with clear purposes: navigate by discipline, switch the featured project, inspect the build process, and follow research themes.

Do **not** make a standalone 3D core the headline visual. The previous concept was a swap of one visual object for another and did not give the rest of the page a story. A 3D model may be considered later only if it explains something specific and belongs within a broader composition of real project evidence. CSS/SVG depth is the default because it is easier to load, make accessible, and keep consistent.

Current interaction-design research describes standout 2026 experiences as focused ideas whose interaction is connected to the narrative, not effects stacked on top; it also warns against heavy experiences that sacrifice usability. See [Utsubo's 2026 storytelling guide](https://www.utsubo.com/blog/immersive-storytelling-websites-guide) and [2026 Three.js examples](https://www.utsubo.com/blog/best-threejs-websites-2026). These are inspiration sources, not a demand to copy those sites' large-scale 3D techniques.

## 5. Section-by-section redesign specification

### 0. Shared navigation

**Purpose:** Give visitors reliable wayfinding without taking attention away from the main content.

**Keep:** The current logo, page links, résumé action, and mobile navigation behaviour. These are injected from the shared component, so avoid changing the shared component during the Home-only pass.

**Upgrade:**
- Audit alignment and spacing against the redesigned hero, especially the transition from the fixed/floating nav into the hero's top margin.
- Keep the visual treatment restrained; active and hover states should be obvious but not loud.
- Check that the Home state, résumé link, menu toggle, Escape-to-close behaviour, and focus indicator remain correct on desktop and mobile.
- Avoid adding a second redundant navigation menu or elaborate scroll progress UI.

**Acceptance:** Nav does not overlap the hero at 320, 375, 768, 1024, or 1440 px widths; mobile menu remains keyboard-operable; Home remains clearly active.

### 1. Hero: identity + evidence

**Priority:** P0, first visual review checkpoint.

**Purpose:** Establish who Abbas is, what he builds, and why the visitor should continue.

**Keep:**
- The personal portrait.
- The current clear headline as a starting point.
- Two primary actions: Explore Projects and View Résumé.
- The short, honest description of full-stack applications, backend systems, and connected IoT solutions.

**Upgrade the composition:**
- Retain the editorial two-column layout on desktop, but make its visual balance more deliberate. The headline, supporting text, portrait, CTA row, and visual material should read as one composition.
- Keep the portrait visible as a real portrait. Use it as the identity anchor rather than treating it as a placeholder that must be removed to make room for an effect.
- Compose a layered “engineering canvas” around and/or adjacent to the portrait. It should use genuine material: one verified product screenshot or an accurately drawn workflow, a small systems/network schematic, and restrained labels. The layers should relate to one another rather than float as unrelated decorative cards.
- Show a small, legible focus line such as “Web platforms · Backend systems · Connected devices” only if it adds useful context beyond the paragraph. Avoid redundant labels.
- Tighten the introductory copy if the visual competition makes the left column feel crowded.
- Keep the primary project CTA visually strongest, résumé secondary, and optionally a low-emphasis contact text link if it fits without crowding.
- Give the image/canvas a grounded composition, intentional crop, subtle border/shadow, and a clear edge or baseline. Avoid a giant empty orb, fake terminal output, fake metrics, or excessive floating labels.

**Interaction:**
- A short, staged introduction can reveal the eyebrow, headline, copy, actions, and visual in sequence.
- Pointer movement may shift only the visual layers a few pixels/degrees on capable desktop devices. The content and portrait must not swing dramatically.
- Selecting a visual layer should lead to the relevant case study, not just animate.
- The first rendered frame should be complete and readable without waiting for JavaScript.
- On mobile, simplify to a clean static composition; do not require hover, WebGL, gyroscope, or swipe to understand the hero.

**Acceptance:** Identity and message still make sense with JavaScript disabled; portrait remains present; all CTAs work; no layout shift from the hero visual; reduced-motion mode removes nonessential motion.

### 2. Practice strip: turn categories into navigation

**Priority:** P1.

**Purpose:** Let a visitor quickly choose the kind of work they want to inspect.

**Current issue:** The three phrases are passive, and overlap with the categories in “How I Work.”

**Upgrade:**
- Change the strip into three concise, navigable entry points linked to existing content:
  - Applications & backend workflows → Selected Work / PSM or PKU.
  - Connected systems → Smart Campus IoT project.
  - Intelligent systems & research → Research direction.
- Use small icon/diagram marks only where they improve scanning. Keep the strip horizontal and light on desktop, wrapping or stacking cleanly on mobile.
- Use anchors with clear hover and focus states. No automatic ticker or continuously moving marquee.

**Acceptance:** Every item has a useful destination; the strip remains understandable without motion; it does not repeat the full capability-card copy.

### 3. Selected Work: replace mock interfaces with evidence

**Priority:** P0/P1; this is the most important proof section.

**Purpose:** Demonstrate the quality and range of real work, not just list project titles.

**Keep the three featured projects:** PSM E-Learning, Smart Campus IoT Station, and PKU Management System, plus the “All projects” route.

**Upgrade to a project explorer:**
- Use a compact, keyboard-accessible selector for the three projects. Selecting a project updates a large preview area, one-sentence problem/solution summary, key technologies, and case-study link.
- The first/default item should be PSM E-Learning. Give it the strongest initial visual hierarchy without making the other options inaccessible.
- Where a real, accurate screenshot can be captured from a working demo or actual application, use it. Where no running interface is available, use an accurate workflow or architecture graphic and label it as such. No invented dashboard screenshots.
- PSM preview should communicate the verified product workflow: enrollment → payment → learning → assessment → certificate → QR verification.
- IoT preview should communicate the actual sensor/controller/cloud path rather than fake real-time readings.
- PKU preview should use an accurate role/workflow/data view if no live UI exists.
- Add concise information about the problem addressed and the implemented work. Do not add fabricated result metrics or unsupported impact claims.
- Show only a few relevant technology tags; use the case-study page for depth.
- Keep an explicit “Read case study”/“View project” action. Hover can enrich the preview, but must not be the only way to open it.

**Responsive behaviour:** Wide project explorer at desktop; stacked selector and preview on mobile; no card hidden at tablet sizes and no orphan card on a second row.

**Acceptance:** All three projects are reachable by keyboard, selector state is obvious to screen readers, real imagery is not stretched, all project links work, and a static default preview is visible before interaction.

### 4. “How I Work”: explain the engineering method

**Priority:** P1.

**Purpose:** Explain how the person behind the projects thinks, rather than repeating project categories.

**Recommended concept:** A connected three-stage process: **Understand → Build & Integrate → Verify & Improve**.

- **Understand:** identify the user, constraints, workflow, and data.
- **Build & Integrate:** implement the interface, backend, database, APIs/devices, and other required components.
- **Verify & Improve:** check key user journeys, edge cases, and reliability; iterate on the result.

Use a visual line or diagram connecting the stages. Each stage may expand or highlight a concrete example from a relevant project when selected. Keep the explanation in the document flow, not trapped in tooltips.

This is a better distinction from the practice strip: the strip answers “what kind of work?”, this section answers “how does the work get done?”

**Acceptance:** Each stage contains a useful example or action, the visual reads on narrow screens, and the process does not make unsupported claims about certifications or formal methods.

### 5. Current work / internship

**Priority:** P1.

**Purpose:** Establish current professional context and connect it to practical engineering work.

**Keep:** The Software Engineering Intern role, Eco Hydrotech Solutions Sdn. Bhd., and the INOS / Universiti Malaysia Terengganu context as currently written, subject to content/date verification at implementation time.

**Upgrade:**
- Replace the plain text + isolated card combination with a compact timeline or connected “current work” panel.
- Create a visual hierarchy for role, organization/context, and date; make date text smaller than the role but clearly readable.
- Add a concise, factual statement describing the problem domain or type of work only where the wording has been verified and is suitable for public disclosure.
- Link to Experience & Background as it already does.
- Keep the role status/date easy to update. Do not add fake timeline milestones or claim deliverables that are not confirmed.

**Acceptance:** Role and organization are immediately legible; date/status is not stale; no additional details are invented; mobile layout stacks without a cramped two-column card.

### 6. Research direction: make the next link meaningful

**Priority:** P1.

**Purpose:** Show what the user wants to investigate and give a compelling path to the Research page.

**Current issue:** The dark band creates contrast, but its copy remains broad and the visual has little relationship to the project evidence above it.

**Upgrade:**
- Keep it as the page's main dark/contrast moment.
- Add a quiet, animated SVG map or set of connected research themes that visitors can select to see a short explanation and follow to the Research page.
- Use the themes already present on the Research page: Applied AI & machine learning, AI for cybersecurity, Trustworthy AI in learning, and IoT & edge intelligence.
- The graphic should suggest relationships between practical software, data, and research questions. Avoid a generic network-of-glowing-nodes graphic unless nodes carry meaning.
- Label interests as research directions, not as completed publications or proven results.
- Make the main “Explore Research” CTA obvious and preserve a text-only fallback.

**Acceptance:** Theme links work with keyboard/touch, the page never requires interaction to understand the research direction, and the CTA is visible without scrolling through animation.

### 7. Contact CTA: make it the natural conclusion

**Priority:** P1.

**Purpose:** Turn the portfolio visit into a simple next step.

**Keep:** The current welcoming headline, email route, and link to the Contact page.

**Upgrade:**
- Make the CTA feel like the natural final beat of the Home page, with more space and stronger typographic hierarchy.
- Keep “Email me” as the obvious main action; keep “More contact options” secondary.
- Optional professional-profile links should only be added here if they do not duplicate the footer or clutter the block.
- Use a restrained arrow/underline/shape interaction to make the action feel responsive, not a dramatic animation.
- Do not fake an email “sent” state. A mailto action or a real working form is required for honest confirmation.

**Acceptance:** Email opens the expected address; Contact route works; CTA layout remains clear at phone widths and under increased text zoom.

### 8. Footer and page ending

**Priority:** P2, unless the baseline reveals an obvious visual problem.

**Keep:** Existing injected footer navigation, social links, email, copyright, and back-to-top control. Since it is shared, this audit does not propose changing its global markup.

**Upgrade:** Use Home-scoped styles only if the redesigned page's spacing, background, or final CTA creates a visual mismatch where the shared footer begins. Keep visual continuity from the Contact CTA into the footer. Re-check the back-to-top button for visible focus and adequate touch size.

**Acceptance:** No global footer regressions on other routes; social links remain accurate; the page ends cleanly and not with an abrupt colour/layout jump.

## 6. Interaction and motion system

Use a small, consistent set of interaction rules throughout Home:

1. **Reveal:** content enters quickly and once as it approaches the viewport; never keep copy invisible while waiting for a script.
2. **Explore:** the project selector and research-theme selector change visible, meaningful content.
3. **Depth:** layered hero/project visuals can respond subtly to pointer movement on desktop; no large tilt, cursor follower, or parallax that fights reading.
4. **Feedback:** buttons, tabs, links, and process nodes have visible hover, focus, selected, and active states.

Use Intersection Observer and CSS transitions for most effects; no GSAP dependency is justified unless a later prototype demonstrates a specific interaction that cannot be done simply. Keep motion optional and brief. Respect prefers-reduced-motion in both CSS and JavaScript, following [MDN guidance](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion). If a future design does include WebGL, render only while needed/visible and provide a static fallback; [Three.js documents rendering on demand](https://threejs.org/manual/pages/rendering-on-demand.html).

## 7. Visual and responsive rules

- Keep the neutral/blue identity, but strengthen contrast between section roles, not by adding lots of colours.
- Use a clear type scale: display headline, section headline, card title, body text, metadata. Avoid using tiny uppercase copy as the primary way to convey meaning.
- Use a consistent spacing scale and border/radius system; avoid excessive outlines on every element.
- Align the hero, project explorer, process section, and CTA to a common content grid.
- Use genuine imagery first; use SVG illustrations for architecture/workflow second; use CSS mock product UI only as a last resort and never as evidence of a real deployment.
- Do not add third-party JavaScript just to produce hover effects.
- Treat mobile as a designed layout, not a desktop layout squeezed down: simplify the hero composition, make selectors tap-friendly, stack process steps, keep all project entries, and preserve readable body copy.
- Ensure focus, hover, active, and disabled/selected states are visible and consistent.

## 8. Implementation phases and review gates

### Phase 0 — Establish a trustworthy baseline
- Capture Home at desktop (1440 px wide), tablet (768 px), and mobile (375 px).
- Verify every homepage link and navigation state.
- Record which real project screenshots or demos are available. If a project has no truthful interface screenshot, plan a diagram.
- Do not change main.

**Gate:** baseline screenshots and asset inventory reviewed.

### Phase 1 — Hero and practice strip
- Keep portrait, rewrite/rebalance only where useful, build the layered engineering canvas, and create three purposeful route links in the practice strip.
- Deliver as the first visual preview so composition can be judged before the rest is changed.

**Gate:** approve the hero layout and interaction on desktop/mobile before proceeding.

### Phase 2 — Selected Work explorer
- Replace the CSS mock previews with verified screenshots/diagrams.
- Add accessible project selection, coherent feature hierarchy, and accurate summary/technology content.

**Gate:** test all three projects and compare their displayed content to the actual case studies.

### Phase 3 — Build/process and current work
- Turn the duplicate capability cards into a connected engineering method.
- Redesign the current-role panel with editable, accurate role/date text.

**Gate:** verify that no invented results or stale dates were added.

### Phase 4 — Research and Contact
- Add the meaningful research-theme map and give the final contact CTA a cleaner conclusion.
- Keep the Research/Contact content and navigation routes intact.

**Gate:** test all selectable themes, links, and CTA states.

### Phase 5 — Polish and QA
- Reconcile Home-specific CSS; remove contradictory/dead declarations introduced by the old responsive rules.
- Optimize portrait/project assets and use appropriate image sizes/formats.
- Test keyboard, reduced motion, screen size, zoom, contrast, touch targets, overflow, route correctness, and browser console.
- Measure performance rather than claim it. Use [Core Web Vitals guidance](https://web.dev/articles/vitals): good targets are LCP ≤ 2.5 s, INP ≤ 200 ms, and CLS ≤ 0.1 at the 75th percentile in field data. These are targets, not results already measured for this site.

**Gate:** final diff contains Home-only implementation work; production stays unchanged until explicit approval.

## 9. Acceptance checklist for the completed Home redesign

- [ ] Hero keeps the real portrait and a complete initial frame; no waiting/loading gate.
- [ ] Home tells a coherent story from identity → work → method → current work → research → contact.
- [ ] Project visuals show truthful evidence or are explicitly workflow/architecture diagrams.
- [ ] Project selector and research interactions work by keyboard and touch.
- [ ] No essential information requires hover, sound, WebGL, or animation.
- [ ] Layout has been inspected at 320, 375, 768, 1024, 1280, and 1440 px widths.
- [ ] No horizontal overflow, broken routes, dead links, or card content clipped at breakpoints.
- [ ] Reduced-motion setting is respected, and content remains visible without animation.
- [ ] Focus states and text contrast are checked.
- [ ] Images are responsive and optimized; layout does not jump on load.
- [ ] Browser console has no new errors; project links and résumé route are verified.
- [ ] Measured performance is recorded before claiming Core Web Vitals success.
- [ ] Only Home-specific files are changed unless a global change is separately discussed.
- [ ] No change is merged to main until the preview is approved.

## 10. Explicitly rejected approaches

- Replacing the portrait with one floating 3D object and calling that a redesign.
- Giving each section an unrelated visual style or a separate decorative 3D model.
- Using fake project screenshots, arbitrary counters, fabricated “live” data, or generic AI branding.
- Adding large scroll-jacking narratives, auto-running WebGL scenes, sound, or heavy libraries to make the site seem modern.
- Enabling the old general js/main.js interaction bundle indiscriminately; Home currently does not load it, and reusing every old selector/effect is not the solution.
- Changing the rest of the site while Home is still under review.

**Decision requested before implementation:** This plan is the blueprint for a staged Home-only rebuild. The first implementation checkpoint is the complete hero + practice-strip composition, with the portrait retained and project evidence forming part of the visual. The other Home sections follow only after that first composition is approved.
