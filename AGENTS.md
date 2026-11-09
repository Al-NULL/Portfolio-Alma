<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


---

# Web Project Rules

## Product and visual direction

- Do not produce generic AI-looking interfaces.
- Do not default to purple/blue gradients, glassmorphism, oversized rounded cards, floating blobs, arbitrary icon grids, or a centered SaaS hero unless the brief gives a clear reason.
- Before building a page, identify its audience, primary task, content hierarchy, brand character, and responsive behavior. If the brief is incomplete, make a small number of explicit assumptions rather than inventing a full product direction.
- Give each project a coherent visual system. Choose typography, spacing, color, borders, imagery, and interaction patterns deliberately; do not decorate without a purpose.
- Use realistic, specific copy. Avoid filler text, fabricated testimonials, fake metrics, and placeholder logos presented as real content.
- Prefer strong hierarchy, useful whitespace, intentional alignment, and a small number of well-executed components over decorative complexity.
- Make mobile layouts intentional. Do not merely shrink desktop layouts.
- Respect accessibility: semantic HTML, keyboard navigation, visible focus, sufficient contrast, labels, and reduced-motion preferences where relevant.

## Engineering

- Use the App Router and TypeScript conventions already configured by the project.
- Prefer Server Components. Add `"use client"` only when browser APIs, local state, effects, or client-side event handling require it.
- Keep components cohesive. Extract a component when it has a clear responsibility, reuse case, or meaningful testing boundary; do not create a component for every wrapper.
- Keep domain logic out of presentation components when it has meaningful complexity.
- Use CSS variables/design tokens for shared visual decisions. Avoid scattering unexplained magic values throughout the UI.
- Validate untrusted input at system boundaries. Do not add a validation library unless the project needs it.
- Do not add dependencies without explaining the concrete benefit and maintenance cost.
- Use the built-in platform and framework capabilities before introducing extra libraries.
- Do not invent backend endpoints, authentication providers, or data contracts. Identify missing integration requirements.

## Quality gates

- Run the relevant lint, type-check, and production build commands when available.
- Check responsive behavior and keyboard interaction for changed UI.
- Fix errors introduced by the change. Clearly report checks that could not be run.
- Never claim tests or builds passed unless they were actually executed.

## Language

- All source-code comments, JSDoc, technical documentation, and developer-facing instructions must be in English.
- Product-facing text must use the language specified in the product brief. Do not assume that UI copy must be English.
