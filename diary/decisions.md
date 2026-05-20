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
