# ARCHITECTURE.md

## Purpose

Durable architecture map for Open Typing Trainer, an international touch typing trainer prototype. Use this file for repository structure, runtime flows, content/data ownership, project invariants, and verification entrypoints.

## System Snapshot

| Area | Value | Evidence |
|---|---|---|
| Product | International touch typing trainer prototype aimed at a macOS-like desktop app, currently seeded with Russian lessons | `AGENTS.md`, `src/app/App.tsx` |
| Stack | Vite + React + TypeScript | `package.json`, `vite.config.ts`, `tsconfig.app.json` |
| Styling | Global CSS plus Tailwind utility classes used by the keyboard component | `src/styles/globals.css`, `src/components/ui/keyboard.tsx`, `vite.config.ts` |
| Routing | In-app browser history routing without a router dependency | `src/app/App.tsx` |
| Course size | 60 lessons in two sections: `Начальный уровень` 1-30 and `Базовый уровень` 31-60 | `src/data/lessons.ts` |
| Persistence | No backend; local UI state only, plus `localStorage` for keyboard visibility | `src/components/trainer/TrainerPage.tsx` |

## Repository Map

| Path | Responsibility | Edit when | Verify with |
|---|---|---|---|
| `src/app/App.tsx` | App-level route parsing, navigation, route-to-page selection | Adding routes or changing navigation behavior | `npm run build`, route smoke checks |
| `src/components/layout/` | App shell, sidebar, header actions | Changing global chrome or navigation surfaces | `/`, `/lessons`, trainer route visual check |
| `src/components/cards/`, `src/components/sections/` | Dashboard cards and dashboard composition | Changing home dashboard | `/` visual check |
| `src/components/lessons/` | Lessons screen, section list, hover preview, course summary | Changing course browsing or lesson preview | `/lessons` visual and interaction check |
| `src/components/trainer/` | Active lesson workflow, typing card, side controls, trainer keyboard wrapper | Changing typing behavior, hints, sounds, pause, finish, keyboard visibility | trainer route checks such as `/lessons/7`, `/lessons/31`, `/lessons/60` |
| `src/components/ui/` | Shared primitives and Aceternity-style keyboard implementation | Changing shared controls or key rendering/sound behavior | `npm run build`, trainer keyboard QA |
| `src/data/lessons.ts` | Lesson catalog, section metadata, route lookup, active mock session, keyboard maps | Adding/editing lessons, course sections, typing source text, target keys | `npm run build`, data sanity checks |
| `src/data/dashboard.ts` | Dashboard mock data and route helpers | Changing dashboard copy/routes | `npm run build`, `/` and navigation check |
| `src/styles/globals.css` | Product visual system, layout density, trainer/keyboard CSS | Changing layout, responsive rules, visual polish | Browser QA on affected route |
| `public/sounds/` | Keyboard sound sprite assets | Changing sound profiles/assets | Trainer sound toggle and browser asset check |

## Runtime Entry Points

| Entrypoint | Owns/starts | Config source | Notes |
|---|---|---|---|
| `npm run dev` | Vite dev server | `package.json`, `vite.config.ts` | Current local target is usually `http://127.0.0.1:5173/` |
| `npm run build` | TypeScript build and Vite production build | `tsconfig*.json`, `vite.config.ts` | Required after code changes |
| `npm run preview` | Vite preview server for built output | `package.json` | Use after production build when needed |
| `src/main.tsx` | React app mount | `index.html` | Mounts `App` |
| `src/app/App.tsx` | Runtime route selection | `routes` from `src/data/dashboard.ts`, `getLessonById()` | Supports `/`, `/lessons`, and `/lessons/:id` |

## Core Flows

### Navigation And Routing

`App` stores the current `window.location.pathname`, handles `popstate`, and uses `window.history.pushState()` for internal navigation. `/lessons/:id` is parsed with `getLessonIdFromPath()` and resolved through `getLessonById()`. Unknown lesson IDs fall back to the home/dashboard branch because `routeLesson` is `null`.

### Lessons Browsing

`LessonsPage` owns the active tab and preview lesson ID. `LessonList` renders `lessonSections` from `src/data/lessons.ts`, supports collapse/expand, and calls `onSelectLesson` on hover/focus. `LessonPreview` renders metadata, mini keyboard target keys, and start CTA for the selected lesson.

### Active Trainer

`TrainerPage` receives a `Lesson`, builds typing text from `getLessonTypingText(lesson)`, and tracks typed states, current index, runtime errors, pause state, hints, sound toggle, and keyboard visibility. `TypingTextCard` captures keyboard input and delegates character/backspace handling. `RussianKeyboard` wraps the Aceternity-style keyboard, handles fit-to-container scaling, hide/show state, and passes persistent hints only when hints are enabled.

### Keyboard Hints And Finger Mapping

Persistent target/current-key hints are controlled by the trainer hints toggle. Pressed-key feedback may remain transient even when hints are off. The rejected visual hand/finger overlay was removed; `getActiveFingers()` in `src/components/trainer/RussianKeyboard.tsx` preserves the key-to-finger logic for a future visual approach.

## Content / Blog / CMS Pipeline

| Concern | Local source | Runtime/production location | How it works | Verification |
|---|---|---|---|---|
| Lesson catalog | `src/data/lessons.ts` | Bundled client JS | Static TypeScript data is mapped into `lessons` with display ID, progress, duration, row count, and locked state | `npm run build`, route checks for changed lessons |
| Lesson sections | `lessonSections` in `src/data/lessons.ts` | Bundled client JS | Section metadata filters `lessons` by ID ranges | `/lessons` collapse/expand and hover QA |
| Sound assets | `public/sounds/` | Served by Vite from `/sounds/...` | Keyboard component fetches the sound sprite when sound is enabled | Browser sound toggle check |

## Integrations And External Systems

| System | Purpose | Code location | Config/env | Verification |
|---|---|---|---|---|
| None currently | The prototype is local/static | None | No env required | `npm run build` |

## Data Model And Storage

| Data/entity | Storage/schema source | Owner module | Used by | Notes |
|---|---|---|---|---|
| `Lesson` | Type in `src/data/lessons.ts` | `src/data/lessons.ts` | Lessons list, preview, trainer routes | Includes `targetKeys`, `lines`, metadata, progress, lock state |
| Course stats | Derived object in `src/data/lessons.ts` | `src/data/lessons.ts` | `CourseSummary` | Total time parses exact durations and ranges |
| Active session mock | `activeSession` in `src/data/lessons.ts` | `src/data/lessons.ts` | Trainer stats, side panel defaults | Mock only, not persistent stats |
| Keyboard visibility | `localStorage["typing.keyboardVisible"]` | `TrainerPage` | `RussianKeyboard` visibility | Local browser-only preference |

## Deployment And Environments

| Environment | Build/deploy path | Runtime process | Content/uploads location | Verification |
|---|---|---|---|---|
| Local dev | `npm run dev` | Vite dev server | `src/`, `public/` | `curl -I http://127.0.0.1:5173/lessons` |
| Local production preview | `npm run build` then `npm run preview` | Vite preview server | `dist/` | Preview route checks |
| Production | Unknown | Unknown | Unknown | Define when deployment target is chosen |

## Change Map

| If you need to change... | Start here | Also check | Verify with |
|---|---|---|---|
| Route behavior | `src/app/App.tsx` | `src/data/dashboard.ts` route helpers | `/`, `/lessons`, `/lessons/:id` |
| Lesson content or metadata | `src/data/lessons.ts` | `LessonList`, `LessonPreview`, `TrainerPage` | `npm run build`, target lesson route |
| Course sections | `lessonSections` in `src/data/lessons.ts` | `LessonList` open section defaults | `/lessons` |
| Typing acceptance rules | `TrainerPage` normalization handlers | `TypingTextCard`, `russianKeyMap` | Trainer typing QA |
| Virtual keyboard rendering | `src/components/ui/keyboard.tsx` | `RussianKeyboard`, `globals.css` keyboard styles | Hints on/off, pressed/current/error states |
| Trainer layout density | `src/styles/globals.css` | Trainer components | Desktop viewport browser QA |
| Sounds or hints panel | `TrainerSidePanel` | `activeSession`, `soundProfiles`, keyboard sound assets | Trainer side panel checks |

## Runbooks

| Runbook | Use when | Notes |
|---|---|---|
| None | No repeatable operational runbooks exist yet | Create under `docs/runbooks/` only for a real repeated procedure |

## Project Skills

| Skill | Use when | Notes |
|---|---|---|
| None | No repo-local `.agents/skills/` exist yet | Global skills are outside this architecture file |

## Invariants And Gotchas

- Current seed pack language is Russian; speed is `зн/мин`, never WPM.
- Desktop/macOS-like windows are the primary target; mobile is defensive fallback.
- Do not use a global `.app-shell { transform: scale(...) }` to tune density. Change real CSS/layout dimensions.
- Preserve the current Aceternity/shadcn-style trainer keyboard unless the user explicitly requests replacement.
- Hints-off must remove persistent target/current-key hints and mini-preview target hints; transient pressed feedback can remain.
- Do not add live camera, heatmaps, face previews, real eye tracking, or real audio engines unless explicitly requested.
- The visual hand/finger overlay was rejected. Reuse `getActiveFingers()` for future finger-hint visuals, but do not restore the removed overlay.
- Many files may be dirty from ongoing work; do not revert unrelated changes.

## Verification Matrix

| Area | Command/check | Expected result |
|---|---|---|
| Build/typecheck | `npm run build` | TypeScript and Vite build pass |
| Forbidden WPM | `rg -n "WPM|wpm" src` | No matches |
| Removed camera/eye tracking UI | `rg -n "heatmap|live camera|camera|камера|теплов|eyeTracking|eye-tracking|Анализ взгляда|Взгляд" src` | No matches unless explicitly reintroduced |
| Removed finger visual | `rg -n "finger-guide|keyboard-finger-guide|FingerGuide|FINGER_LABELS" src` | No matches |
| Dev route smoke | `curl -I http://127.0.0.1:5173/lessons` | `200 OK` when dev server is running |
| Lessons screen | Browser check `/lessons` | Sections collapse/expand; hover/focus updates preview |
| Trainer basics | Browser check representative lesson routes | Typing, errors, Backspace, pause/resume, hints, sounds, keyboard show/hide |

## Documentation Relationships

- `AGENTS.md`: always-loaded project instructions and Definition of Done.
- `ARCHITECTURE.md`: durable project structure, flows, invariants, and verification map.
- `Summarizations.md`: latest restart handoff for current work state.
- `diary/`: durable project memory and decisions when maintained.

## Unknowns

| Unknown | Why it matters | How to verify |
|---|---|---|
| Production deployment target | Determines build base path, hosting constraints, preview strategy, and release runbook | Decide deployment platform and create/update deployment docs |
| Persistent user progress model | Current progress/session stats are mock/static | Define storage/backend/local persistence requirements |
| Final finger-hint visual design | Mapping exists, but accepted visual treatment is undecided | User selects/approves a new visual approach |
