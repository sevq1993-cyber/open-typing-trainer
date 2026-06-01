# Current State

Last updated: 2026-05-21 23:10 +04

Purpose: short snapshot of where the project is now. This is not a plan, backlog, or replacement for `AGENTS.md`.

## Project Snapshot
- Project: Open Typing Trainer, an international touch typing trainer prototype visually aimed at a premium macOS-like desktop app.
- Current state: Vite + React + TypeScript web prototype with dashboard, lessons screen, and dynamic active lesson routes.
- Main active area: trainer pages such as `/lessons/4`, `/lessons/7`, and `/lessons/12`, with compact stats, typing text card, Aceternity-style Russian virtual keyboard, and right-side sound/hints controls.
- Recent meaningful change: course data now has two sections and 60 lessons. `Начальный уровень` covers lessons 1-30; `Базовый уровень` covers lessons 31-60 from the user-provided markdown file, with metadata preserved.

## Important Context
- Current seed content: Russian UI and Cyrillic lesson content; this is not the product identity.
- Product metric: speed is `зн/мин`, not WPM.
- Important product rule: speed is `зн/мин`; WPM, live camera, heatmap, and eye-tracking product UI should not appear in active surfaces.
- Important keyboard rule: preserve the current Aceternity-style trainer keyboard unless the user explicitly asks to replace it; hints-off must remove persistent target/current hints but pressed-key feedback may still appear while typing.
- Important hints context: the attempted visual hand/finger overlay was removed, but `getActiveFingers()` in `src/components/trainer/RussianKeyboard.tsx` preserves the key-to-finger mapping for a future visual solution.
- Important typing rule: caret is a stable purple element moved with `transform`, not a recreated per-keystroke element.
- Important commands: `npm run dev`, `npm run build`, `npm run preview`.

## Continuation Hint
- If continuing lesson/catalog work, start from `Summarizations.md`, then inspect `src/data/lessons.ts`, `src/components/lessons/LessonList.tsx`, and `src/components/lessons/LessonPreview.tsx`.
- If continuing trainer hint work, inspect `src/components/trainer/RussianKeyboard.tsx`; reuse `getActiveFingers()` rather than recreating the mapping.
- Current dev server is expected at `http://127.0.0.1:5173/`.

## Boundaries
- Read `AGENTS.md` for permanent project instructions.
- Read `Summarizations.md` for the latest restart state.
- Read `decisions.md` for durable decisions.
