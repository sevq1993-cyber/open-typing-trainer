# AGENTS.md

## Purpose
- This repo is a Vite + React + TypeScript prototype for a Russian-language touch typing trainer, intended to evolve toward a macOS-like desktop app.
- The product language is Russian. Typing speed MUST be shown as `зн/мин`, never WPM.

## Tooling
- Install dependencies with `npm install`.
- Run local development with `npm run dev`.
- Build and typecheck with `npm run build`.
- Preview the production build with `npm run preview`.

## Project Conventions
- Preserve the Cream Crystal Purple visual direction: warm cream background, clean white/ivory work surfaces, restrained purple accents, and macOS-like UI density.
- Optimize primarily for desktop/macOS window layouts. Small viewports should not break, but mobile is fallback-only unless the user explicitly changes the product target.
- Keep routes simple unless there is a clear need for a router dependency. Current routes are `/`, `/lessons`, and `/lessons/7`.
- Use Russian lesson data, Cyrillic keyboard labels, and Russian exercise text for core training surfaces.

## Architectural Boundaries
- Keep reusable app chrome in `src/components/layout/`, shared primitives in `src/components/ui/`, page-specific lesson UI in `src/components/lessons/`, trainer UI in `src/components/trainer/`, and mock data in `src/data/`.
- Eye tracking, keyboard sounds, and hints are currently UI prototypes. Do not add real camera access, live camera previews, heatmaps, or audio engines unless the user explicitly asks for that implementation step.
- Do not add dashboard-style analytics, leaderboards, calendars, or unrelated CRM-like panels to the active lesson screen.

## Definition of Done
- Run `npm run build` after code changes.
- For UI changes, verify the relevant route in a browser. For current core screens, check `/`, `/lessons`, and `/lessons/7` as applicable.
- For trainer changes, verify typing input, error behavior, pause/resume, keyboard hide/show, and that no `WPM`, live camera block, or heatmap appears.

## Canonical Documentation
- `Summarizations.md` is the restart handoff for current work.
- `diary/` stores durable project memory when maintained.
