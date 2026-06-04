# Contributing

Open Typing Trainer is an international open-source foundation for touch typing education. The current seed pack is Russian/Cyrillic only, but the project identity is broader: any country, school, or community should be able to add local language packs, fonts, keyboard layouts, and lessons.

## Ways to Contribute

- Add or improve language packs, keyboard layouts, lesson text, and locale-specific typography.
- Improve the training experience for desktop and macOS-like workflows.
- Add AI-era typing lessons for prompts, slash commands, terminal commands, Markdown, JSON, Git, and code snippets.
- Fix accessibility, layout, performance, and content quality issues.
- Improve documentation for educators and community maintainers.

## Development

Install dependencies:

```bash
npm install
```

Run the local app:

```bash
npm run dev
```

Build and typecheck:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Content Guidelines

- Treat the Russian/Cyrillic pack as seed content, not as the product boundary.
- Keep speed units appropriate for the active language pack. The current Russian pack uses `зн/мин`, not WPM.
- For new language packs, include keyboard labels, lesson text, font recommendations, and any local typing conventions.
- Prefer practical lessons that reflect real modern typing: commands, prompts, structured text, and code-adjacent workflows.
- Avoid copyrighted lesson text unless it is clearly licensed for reuse.

## Pull Requests

- Keep changes focused and easy to review.
- Follow the existing project structure and UI conventions.
- Do not add dependencies unless they are necessary and documented in the pull request.
- Run `npm run build` before submitting code changes.
- Include screenshots or short notes for visible UI changes.

## Conduct

By participating, you agree to follow this repository's Code of Conduct.
