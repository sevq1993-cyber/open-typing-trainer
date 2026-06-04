# Ready-to-Copy GitHub Issues

## 1. Define language pack schema and validation

Labels: `enhancement`, `i18n`, `good first issue`, `codex-ready`

Body:
Open Typing Trainer should support multiple language packs through a documented schema instead of hardcoded Russian seed data. Define a versioned language pack format for lessons, keyboard layout, UI strings, metadata, and validation errors.

Acceptance criteria:
- Add a TypeScript schema/type for language packs.
- Document required fields, optional fields, and versioning rules in code comments or a small colocated doc.
- Add validation for lesson text, keyboard rows, key labels, locale metadata, and speed unit labels.
- Keep the current Russian/Cyrillic pack working through the new schema.
- Do not rebrand the project as Russian-only.

## 2. Add Armenian language pack

Labels: `enhancement`, `i18n`, `content`, `codex-ready`

Body:
Add an Armenian language pack so Open Typing Trainer can demonstrate international language support beyond the current Russian seed pack.

Acceptance criteria:
- Add Armenian UI strings, keyboard labels, and starter lessons using the language pack schema.
- Include metadata for locale, display name, script, and speed unit label.
- Ensure lessons progress from simple key drills to short words/sentences.
- Make the pack selectable without breaking the Russian seed pack.
- Avoid adding unrelated analytics, dashboards, or trainer features.

## 3. Add Georgian language pack

Labels: `enhancement`, `i18n`, `content`, `codex-ready`

Body:
Add a Georgian language pack to broaden script coverage and verify that the trainer handles non-Cyrillic layouts cleanly.

Acceptance criteria:
- Add Georgian UI strings, keyboard labels, and starter lessons using the language pack schema.
- Include metadata for locale, display name, script, and speed unit label.
- Ensure keyboard rendering supports Georgian labels at desktop sizes.
- Make the pack selectable without breaking existing packs.
- Add focused tests or fixtures if language pack validation exists.

## 4. Build custom lesson importer

Labels: `enhancement`, `lessons`, `ux`, `codex-ready`

Body:
Allow users to import custom lesson text so teachers, contributors, and learners can create their own typing drills without editing source code.

Acceptance criteria:
- Add a simple importer flow for pasted text or JSON lesson data.
- Validate imported lessons before they are used.
- Show clear errors for unsupported characters, empty lessons, or malformed input.
- Keep imported lessons local to the browser for now; do not add backend storage.
- Preserve existing lesson routes and trainer behavior.

## 5. Add Codex command typing lessons

Labels: `enhancement`, `content`, `developer-experience`, `codex-ready`

Body:
Create a lesson pack focused on typing common OpenAI Codex and terminal commands accurately. This helps developers practice command entry while giving OSS contributors a fun project-specific content area.

Acceptance criteria:
- Add lessons for common shell/git/npm/Codex-style command phrases.
- Keep content safe and non-destructive; avoid teaching dangerous commands as drills.
- Include punctuation, flags, paths, and mixed-case examples.
- Make the lesson pack clearly separate from natural-language packs.
- Do not change runtime command execution behavior; this is typing content only.

## 6. Add teacher mode

Labels: `enhancement`, `education`, `ux`, `needs-design`

Body:
Introduce a teacher mode for classroom or tutoring use, focused on assigning lessons and reviewing practice results without adding unrelated social or leaderboard features.

Acceptance criteria:
- Define teacher-mode user stories and minimum UI surface.
- Allow selecting or grouping lessons into an assignment.
- Show simple local progress summaries suitable for a teacher review screen.
- Keep data local unless a future storage issue is accepted.
- Avoid leaderboards, calendars, CRM-style panels, or account systems in this issue.

## 7. Run accessibility pass on core trainer flows

Labels: `accessibility`, `quality`, `frontend`, `codex-ready`

Body:
Improve accessibility across the home page, lesson list, and active trainer so the app is usable with keyboard navigation, screen readers, and high-contrast preferences.

Acceptance criteria:
- Audit `/`, `/lessons`, and one active lesson route such as `/lessons/7`.
- Ensure interactive controls have accessible names and visible focus states.
- Verify trainer controls are keyboard reachable and understandable.
- Check color contrast for the Cream Crystal Purple visual direction.
- Confirm no speed metric uses WPM in the current Russian seed pack.

## 8. Add GitHub Pages and Vercel deployment path

Labels: `deployment`, `documentation`, `oss`, `codex-ready`

Body:
Prepare Open Typing Trainer for public demos by documenting and verifying deployment to GitHub Pages and Vercel.

Acceptance criteria:
- Add deployment instructions for GitHub Pages and Vercel in the appropriate docs.
- Ensure Vite base path configuration is compatible with GitHub Pages.
- Verify `npm run build` produces a deployable static output.
- Document any environment assumptions or required settings.
- Do not deploy from the issue work unless maintainers explicitly approve it.

## 9. Build gaze discipline detection for touch typing

Labels: `enhancement`, `research`, `privacy`, `trainer`, `codex-ready`

Body:
Touch typing depends on keeping attention on the screen instead of looking down at the keyboard. Build a first privacy-first implementation of gaze discipline detection that can identify when a learner looks down during an active lesson and include that signal in training feedback.

Acceptance criteria:
- Define the first technical approach for camera-assisted gaze/downward-look detection.
- Require explicit consent and a visible camera-active state before any camera access.
- Process signals locally where feasible and do not record or upload video by default.
- Show gentle lesson feedback when the learner repeatedly looks down at the keyboard.
- Add safeguards and documentation for children, schools, and classroom use.
- Keep the first implementation focused on active lesson routes; do not add unrelated analytics dashboards.
