# Open Typing Trainer

Open Typing Trainer is an open-source foundation for teaching fast, confident computer typing in any language. The goal is to give every country, school, parent, teacher, and child a free way to create typing lessons in their own language, script, keyboard layout, and cultural context.

Typing is becoming a basic literacy skill for the AI era. Children who can express thoughts quickly on a keyboard can learn programming, work with AI assistants, write prompts, operate developer tools, and communicate with computers with less friction. This project exists to make that foundation accessible without requiring proprietary software, paid subscriptions, or language-specific commercial platforms.

## Why This Exists

Many typing trainers are closed, paid, language-limited, or designed around English-first assumptions. That leaves a gap for communities that need local alphabets, local lesson texts, local keyboard layouts, and local teaching methods.

This repository is a starting point for a different model:

- Any language should be able to have a high-quality typing trainer.
- Any school should be able to adapt lessons for its students.
- Any child should be able to learn touch typing without a paywall.
- Any community should be able to load its own texts, fonts, symbols, and keyboard layouts.
- Any developer should be able to fork the project and improve the learning experience.

The current app demonstrates this idea with one initial language pack, lesson browsing, active typing exercises, hints, keyboard sounds, and a macOS-like desktop interface. That first lesson pack is only the starting point, not the identity of the project.

## Current App

The prototype includes:

- A localized learning interface.
- A lesson catalog with beginner and basic sections.
- Dynamic lesson routes such as `/lessons/7`, `/lessons/31`, and `/lessons/60`.
- A focused active lesson screen with typing text, progress, errors, pause/resume, hints, and a large virtual keyboard.
- A virtual keyboard implementation with a polished Aceternity/shadcn-style visual system.
- Character-per-minute speed metrics that fit non-word-based practice.
- Local prototype behavior only: no backend, no accounts, no tracking, no paid features.

## Open-Source Vision

This project is meant to become a reusable international learning platform, not a trainer for one country or one language.

The long-term idea is simple: a country, teacher, or community should be able to open the repository, add a language pack, provide lesson texts, define keyboard labels, choose suitable fonts, and run a local or hosted typing trainer for students.

Examples of future language packs could include:

- Armenian
- Georgian
- Ukrainian
- Turkish
- Arabic
- Hindi
- Kazakh
- Greek
- Hebrew
- Any other writing system with a keyboard layout

The goal is not to force every language into an English typing model. The goal is to let every language define its own lesson progression, keyboard logic, symbols, texts, and learning rhythm.

## Future Direction

Planned features and research areas:

- Language packs: structured lesson data, keyboard layouts, fonts, sample texts, and localized UI strings.
- Custom lesson import: upload or paste texts and generate practice sessions from them.
- Font and script support: make it easy to use fonts suitable for Armenian, Georgian, Ukrainian, Turkish, and other languages.
- Teacher mode: prepare classroom lesson sets and share them with students.
- Progress storage: optional local progress tracking without requiring an account.
- Accessibility improvements: better keyboard navigation, reduced-motion modes, screen reader checks, and high-contrast themes.
- Better typing analytics: accuracy, rhythm, difficult keys, and practice recommendations without turning the app into a distracting dashboard.
- Desktop packaging: evolve the web prototype toward a macOS-like desktop app experience.

## Codex And AI-Era Lessons

Typing speed is not only about writing documents. It is becoming part of how people work with AI systems and developer tools.

A future track of this project should teach practical command input for AI-assisted work:

- How to type prompts quickly and clearly.
- How to use slash commands.
- How to enter terminal-like commands accurately.
- How to write structured instructions for tools such as Codex.
- How to switch between natural language, code, paths, symbols, and command syntax.
- How to practice common developer patterns: file names, CLI commands, JSON, Markdown, Git commands, and code snippets.

The ambition is to help students move from basic keyboard confidence to practical computer fluency: typing text, controlling software, writing prompts, and eventually working with code and AI agents.

## Repository Structure

```text
src/
  app/                 App entry and lightweight route handling
  components/
    layout/            Shared app shell, sidebar, header actions
    lessons/           Lesson catalog, preview, mini keyboard
    trainer/           Active lesson screen and typing workflow
    ui/                Shared primitives and keyboard implementation
  data/                Lesson data, dashboard data, keyboard maps
  styles/              Global visual system and responsive layout
public/
  sounds/              Keyboard sound sprite assets
```

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Contributing

Useful contributions include:

- New lesson packs for other languages.
- Better keyboard layouts for non-English scripts.
- More realistic lesson progressions for children and beginners.
- Accessibility fixes.
- UI improvements that keep the trainer focused and calm.
- Documentation for teachers and local communities.
- Ideas for Codex, AI, terminal, and developer-tool typing lessons.

Before contributing, keep the product principles in mind:

- The learning language should feel native, not translated as an afterthought.
- Speed metrics should fit the language and script.
- The active lesson screen should stay focused on typing.
- The project should remain free, adaptable, and easy to fork.

## License

This repository is intended to be open source. A final license file still needs to be selected before reuse terms are formally defined.
