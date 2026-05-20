# Current State

Last updated: 2026-05-21 01:12 +04

Purpose: short snapshot of where the project is now. This is not a plan, backlog, or replacement for `AGENTS.md`.

## Project Snapshot
- Project: Russian-language touch typing trainer prototype, visually aimed at a premium macOS-like app.
- Current state: Vite + React + TypeScript web prototype with main dashboard, lessons screen, and active lesson screen.
- Main active area: `/lessons/7` trainer with compact header, large white typing card, Word-like caret, Russian virtual keyboard, compact right controls, and lower current-session dashboard.
- Recent meaningful change: active lesson was made cleaner and whiter; the duplicated upper metrics bar was removed, pause moved into the header, and the keyboard was restyled toward a large Apple Magic Keyboard-like object.

## Important Context
- Supported language: Russian UI and Cyrillic lesson content.
- Product metric: speed is `зн/мин`, not WPM.
- Important product rule: eye tracking and keyboard sounds are UI prototypes only until real technical implementation is explicitly requested.
- Important commands: `npm run dev`, `npm run build`, `npm run preview`.

## Continuation Hint
- If continuing visual work, prioritize desktop/macOS window sizes and define a minimum supported app window before deeper responsive polish.
- Full-size Magic Keyboard dimensions do not fit the current central column without changing composition; either keep tuning inside the verified fit or explicitly widen the layout first.

## Boundaries
- Read `AGENTS.md` for permanent project instructions.
- Read `Summarizations.md` for the latest restart state.
- Read `decisions.md` for durable decisions.
