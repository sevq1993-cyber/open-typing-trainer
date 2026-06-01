# Decisions

Purpose: record durable decisions that future AI sessions should not rediscover or casually reverse.

## Active Decisions

### D-20260521-001 - Web Prototype First

- Date: 2026-05-21
- Status: active
- Context: The long-term product may become a macOS app, but the current implementation is a fast UI prototype.
- Decision: Build the first iteration as a Vite + React + TypeScript web prototype.
- Rationale: This keeps design and interaction iteration fast before committing to a native shell.
- Consequences: Do not introduce Tauri, SwiftUI, AppKit, or native camera/audio plumbing unless the user explicitly starts that phase.
- Applies to: whole project.

### D-20260521-002 - Desktop/macOS First

- Date: 2026-05-21
- Status: active
- Context: The user clarified that mobile adaptation is not a product priority because the final app will have window-size constraints.
- Decision: Treat desktop/macOS-like windows as the primary design target; mobile is only a defensive fallback.
- Rationale: The product is intended as an app-like trainer, not a mobile website.
- Consequences: Future UI polish should define and optimize for a minimum desktop window instead of spending effort on mobile-first UX.
- Applies to: app shell, lesson screens, trainer screen, CSS layout.

### D-20260521-003 - Eye Tracking And Sounds Are Prototype UI

- Date: 2026-05-21
- Status: active
- Context: Eye tracking and keyboard sounds are desired product ideas, but real camera/audio implementation was not requested for this iteration.
- Decision: Keep these features as compact local UI controls and mock statistics in v1.
- Rationale: This preserves the intended product surface without adding privacy-sensitive camera access or real audio complexity prematurely.
- Consequences: Do not add live camera, heatmaps, face previews, or real sound engines unless explicitly requested.
- Applies to: `src/components/trainer/TrainerSidePanel.tsx`, future settings/features.

### D-20260521-004 - Aceternity Trainer Keyboard

- Date: 2026-05-21
- Status: active
- Context: The previous Magic Keyboard implementation was explicitly replaced after the user provided Aceternity/shadcn keyboard code and requested that it be inserted rather than treated as a reference.
- Decision: Preserve the current trainer keyboard as the Aceternity-style implementation with Russian key labels, custom sound sprite assets, light body, large desktop scale, hint support, and soft pressed-key feedback.
- Rationale: The keyboard component, sound behavior, Russian labels, and current scale were iteratively requested and tuned by the user.
- Consequences: Do not revert to the old Magic Keyboard object or redesign the keyboard unless explicitly requested. Hints-off must remove persistent target/current-key hints but may keep transient pressed-key feedback.
- Applies to: `src/components/ui/keyboard.tsx`, `src/components/trainer/RussianKeyboard.tsx`, `src/components/trainer/TrainerPage.tsx`, `src/components/trainer/TrainerSidePanel.tsx`, `src/styles/globals.css`, `public/sounds/`.

### D-20260521-005 - Real UI Sizing Over Global Transform

- Date: 2026-05-21
- Status: active
- Context: A temporary global visual shrink caused follow-on layout issues and made caret/keyboard positioning harder to reason about.
- Decision: Keep product-scale changes as real CSS/layout dimensions and tokens, not a global `.app-shell` transform or browser-like post-scale.
- Rationale: Real dimensions keep hit testing, caret geometry, responsive keyboard fitting, and browser QA predictable.
- Consequences: Future size tuning should adjust component/layout tokens, keyboard cap, and responsive height rules directly; do not reintroduce a global app transform as the primary sizing mechanism.
- Applies to: `src/styles/globals.css`, trainer layout, keyboard fitting, shared UI sizing.

### D-20260521-006 - Preserve Finger Mapping, Not Finger Visual

- Date: 2026-05-21
- Status: active
- Context: A visual transparent hand/finger overlay for keyboard hints was implemented, then rejected by the user.
- Decision: Remove the finger visual completely, but keep the key-to-finger mapping logic available as `getActiveFingers()` for future hint designs.
- Rationale: The mapping is useful product logic, while the specific visual treatment was not accepted.
- Consequences: Do not reintroduce the removed hand/finger overlay. Future finger hints should reuse the existing mapping and implement a new visual concept.
- Applies to: `src/components/trainer/RussianKeyboard.tsx`, future keyboard hint UI.
