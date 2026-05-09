# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Next.js Version Warning

**This project uses Next.js 16 (not 14 or 15).** Before writing any App Router code, read `node_modules/next/dist/docs/` — APIs, conventions, and file structure differ from training data. Breaking changes exist.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build (runs tsc + next build)
npm run lint         # ESLint check
npm run typecheck    # tsc --noEmit only
npm run check        # lint + typecheck + build (use before committing)
```

No test runner is configured — the project uses visual QA via browser MCP instead.

## Architecture

**This is a blank-slate template.** `src/app/page.tsx` shows a placeholder; all real content is built by the `/clone-website` skill. The scaffold exists purely to be filled by extraction agents.

### Key architectural facts not derivable from the file tree

- **Design tokens live in `src/app/globals.css` `:root` block** — update these with the target site's actual colors when cloning. The file uses oklch color space and Tailwind v4's `@theme inline` block to expose tokens as Tailwind utilities.
- **shadcn/ui uses Base UI (`@base-ui/react`)** as its Radix replacement. Import primitives from `@base-ui/react`, not `@radix-ui/*`.
- **Tailwind v4** — no `tailwind.config.js`. All customization goes in `globals.css` using `@theme` blocks. The `cn()` utility is in `src/lib/utils.ts`.
- **Icons** — Lucide React is the default. Extracted SVGs from the target site go in `src/components/icons.tsx` as named React components.
- **Multi-agent worktree workflow** — when building section-by-section, each builder agent gets its own git worktree branch. The orchestrating agent merges them in order, resolving conflicts with full context.

### Files to update during every clone

| File | What to update |
|------|---------------|
| `src/app/globals.css` | Color tokens (`:root`), fonts (`@theme`), keyframe animations, global scroll behaviors |
| `src/app/layout.tsx` | `next/font/google` imports, `<html>` classes, `metadata` (title, description, OG) |
| `src/app/page.tsx` | Replace placeholder with imported section components |
| `src/components/icons.tsx` | Extracted SVG icons as named React components |
| `public/seo/` | Favicons, apple-touch-icon, webmanifest, OG images |

## Maintenance Scripts

| Script | When to run |
|--------|-------------|
| `bash scripts/sync-agent-rules.sh` | After editing `AGENTS.md` — regenerates `.github/copilot-instructions.md`, `.clinerules`, `.continue/rules/project.md`, `.amazonq/rules/project.md` |
| `node scripts/sync-skills.mjs` | After editing `.claude/skills/clone-website/SKILL.md` — regenerates command files for 9 AI platforms |

**`AGENTS.md` is the single source of truth** for agent instructions. All other platform files are generated from it. Never edit generated files directly.
