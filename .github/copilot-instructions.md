## Quick orientation for AI coding agents

This repository is a Next.js 15 + TypeScript frontend (in `frontend/`) that integrates Claude AI (Anthropic). Keep guidance short and actionable — use the files below as the single-source references.

- Big picture:

  - Frontend app lives in `frontend/src/` following a 6-folder, domain-driven layout: `app/`, `modules/`, `shared/`, `lib/`, `store/`, `styles/`, `types/`.
  - AI integrations and query wiring live in `frontend/src/lib/claude/` and `frontend/src/lib/query/` (see `client.ts`, `config.ts`, `services/`, and `providers.tsx`).

- Dev workflows (use these exact commands):

  - Setup environment: `./setup.sh` (creates `frontend/.env` → root `../.env` symlink).
  - Start dev server:
    - cd into frontend: `cd frontend`
    - install & run: `npm install` then `npm run dev`
  - Other useful: `npm run build`, `npm run lint`, `npm run type-check` (run from `frontend/`).

- Conventions & patterns to follow (do not invent alternatives):

  - Module layout: each feature under `src/modules/<name>/` contains `components/`, `hooks/`, `utils/`, and `types.ts`.
  - Global state: `src/store/` (Zustand) with `slices/` and typed selectors in `hooks.ts`.
  - Path aliases in TS config: use `@modules/*`, `@shared/*`, `@lib/*`, `@styles/*` for imports.
  - File limits: keep files concise (project enforces ~180 line file size and complexity limits). Check `Docs/code-standards.md`.

- React Query / Claude patterns to reuse:

  - Query keys are hierarchical: `['claude-api', 'questions', JSON.stringify(params)]`. See `frontend/src/lib/query/*`.
  - Use prefetch and aggressive caching patterns (staleTime ~5min, gcTime ~10min) to reduce API cost — see `frontend/src/lib/query/README.md`.

- Specific files to consult for decisions or examples:

  - Project overview and dynamic instruction modules: `CLAUDE.md` (top-level).
  - API & integration details: `Docs/api-design.md` and `frontend/src/lib/claude/*` (`client.ts`, `config.ts`, `errors.ts`, `types.ts`).
  - Architecture & rationale: `Docs/technical-architecture.md` and `frontend/README.md`.
  - Design iteration rules: `.superdesign/design_iterations/` and top-level `.windsurfrules` (UI/design agent rules).

- When editing/adding features:

  - Place code in the matching module under `src/modules/<feature>/` and wire exports through shared index files.
  - Add typed definitions in `src/types/` or the module `types.ts`.
  - Update `Docs/` for any change that affects architecture, API, or developer setup.

- Commit & PR notes for agents:
  - Keep commits small and focused. Reference `Docs/code-standards.md` for linting and formatting rules.
  - When changing API or Claude integration, run the local dev server and verify the relevant UI flows (practice/assessment/results).

If anything is missing or you'd like examples expanded (import snippets, query key examples, or a short checklist for PRs), tell me which section to expand.
