# threeworld Portfolio Entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the threeworld (3dsvg) project to Aditya's portfolio as a new entry on `/en/projects` with a detail page that links to the deployed editor and the GitHub fork.

**Architecture:** Pure additive change to two existing TSX files (`page.tsx` and `ProjectDetail.tsx`) plus a new `public/projects/threeworld/` asset directory. No new dependencies, no type changes, no engine code bundled. The "Try it live" CTA points at `https://threeworld-web-j7a8.vercel.app/`; the GitHub link points at the user's fork at `https://github.com/mishraadityan09/threeworld`.

**Tech Stack:** Next.js 16 (App Router, React 19), TypeScript strict, Tailwind CSS v4, no test runner (visual QA via dev server).

**Spec:** `docs/superpowers/specs/2026-05-09-threeworld-portfolio-entry-design.md`

---

## File Map

| File | Responsibility | Type |
|---|---|---|
| `src/app/en/projects/page.tsx` | Project listing grid; insert one new `Project` object into the `PROJECTS` array. | Modify |
| `src/app/en/projects/[project]/ProjectDetail.tsx` | Per-project detail page; insert one new key `"threeworld"` into the `PROJECT_DATA` map. | Modify |
| `public/projects/threeworld/` | Holds five PNG assets referenced by the new entry. | Create dir |

No other files are touched. The dynamic route `[project]/page.tsx` already routes any slug through `ProjectDetail`, so a new key in `PROJECT_DATA` automatically enables `/en/projects/threeworld`.

## Pre-flight: Asset directory and user-provided images

The user said they would drop assets into `public/projects/threeworld/`. The plan references five filenames:

- `hero.png` (used in the projects-list hover preview)
- `editor.png`
- `materials.png`
- `export.png`
- `embed.png`

**Before starting Task 1**, the implementer must:

1. Confirm `public/projects/threeworld/` exists and contains all five files. Run:
   ```bash
   ls -la /Users/adityan/Work/others/portfolio-thanhlong-clone/public/projects/threeworld/ 2>&1
   ```
   Expected: a directory listing showing `hero.png`, `editor.png`, `materials.png`, `export.png`, `embed.png` (or whatever five filenames the user has dropped).
2. If the directory does not exist or files are missing: **stop and ask the user for the assets** before proceeding. Do not invent placeholders. Do not commit references to files that don't exist on disk — the production build will load broken images and the `<Image>` component may emit warnings.
3. If the user dropped files with different names than the suggested set, update the `images[]` array in Task 2 and the `previewImage` path in Task 1 to match the actual filenames before writing them. The spec explicitly calls these filenames "suggestions, easy to rename" — match reality.

---

## Task 1: Add the project to the listing grid

**Files:**
- Modify: `src/app/en/projects/page.tsx` (insert one object into the `PROJECTS` array between the `tripshield` entry and the `3d-showroom` entry)

- [ ] **Step 1: Read the current file to confirm the exact insertion point**

Run:
```bash
cat -n /Users/adityan/Work/others/portfolio-thanhlong-clone/src/app/en/projects/page.tsx | sed -n '37,50p'
```

Expected output (lines 37–49 should look roughly like this; the entries above end with a `tripshield` block and the `3d-showroom` block follows):
```
37      {
38        title: "TripShield Claim Portal — tripshield.flightsmojo.in",
38        description:
...
43      },
44      {
45        title: "3D Interactive Showroom (Babylon.js)",
...
49      },
```

If the file's structure has drifted from the spec, adapt the insertion point but keep the rule: **new entry goes after `tripshield`, before `3d-showroom`.**

- [ ] **Step 2: Edit the file to insert the new entry**

Use the Edit tool. Insert the new `Project` object between the closing `},` of the `tripshield` entry and the opening `{` of the `3d-showroom` entry. The exact text to insert:

```ts
  {
    title: "threeworld — Turn SVGs into Interactive 3D",
    description:
      "Open-source npm package + visual editor. The <SVG3D> React component embeds extruded 3D text/SVGs with PBR materials and animations; the editor lets anyone design 3D objects from text or SVG and export as PNG, video, or 3D model. Built on React Three Fiber. Forked from renatoworks/3dsvg and substantially upgraded.",
    href: "/en/projects/threeworld",
    previewImage: "/projects/threeworld/hero.png",
  },
```

The Edit tool call should match the exact text between the end of the `tripshield` object (`href: "/en/projects/tripshield",\n    previewImage: "/projects/tripshield/claim-portal.png",\n  },`) and the start of the `3d-showroom` object. If the asset filenames are different from `hero.png`, replace `previewImage` accordingly.

- [ ] **Step 3: Visual verification — run the dev server and load the projects page**

Run (in background if needed):
```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone && npm run dev
```

Open `http://localhost:3000/en/projects` in a browser. Expected:
- A new card titled "threeworld — Turn SVGs into Interactive 3D" appears between the TripShield card and the "3D Interactive Showroom" card.
- Hovering the new card shows the `hero.png` preview popup (existing `HoverCard` behavior).
- Clicking the card navigates to `/en/projects/threeworld`. **It will currently render an empty/undefined detail page** because Task 2 hasn't run yet — that's expected.

If the hover preview shows a broken image, the asset path is wrong. Either fix the path in `previewImage` or stop and ask the user for the correct filename.

- [ ] **Step 4: Run `npm run check`**

Run:
```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone && npm run check
```

Expected: lint passes, typecheck passes, build succeeds. The new entry uses only fields already in the `Project` type (`title`, `description`, `href`, `previewImage`), so no type errors are expected.

If the build fails because of the empty detail page route at `/en/projects/threeworld` (e.g. an SSG step bails on undefined data), document the failure mode and continue to Task 2 anyway — Task 2 will resolve it. Otherwise, all green.

- [ ] **Step 5: Commit**

```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone
git add src/app/en/projects/page.tsx
git commit -m "feat(projects): add threeworld card to projects listing"
```

---

## Task 2: Add the detail page entry

**Files:**
- Modify: `src/app/en/projects/[project]/ProjectDetail.tsx` (insert one new key `"threeworld"` into the `PROJECT_DATA` map, between any two existing keys — recommended location: after `"3d-showroom"` so the two newer 3D-related entries sit adjacent in the source file)

- [ ] **Step 1: Read the current file to confirm the insertion point**

Run:
```bash
sed -n '159,170p' "/Users/adityan/Work/others/portfolio-thanhlong-clone/src/app/en/projects/[project]/ProjectDetail.tsx"
```

Expected: the `"3d-showroom"` entry (lines ~159–164) ends with `},` and is followed by `"wifi-service"` (line ~165). The new `"threeworld"` entry will be inserted between them.

If the file structure has drifted, the rule is: **insert the new key anywhere inside the `PROJECT_DATA` object literal as long as commas are correct.** Order in the object literal does not affect rendering.

- [ ] **Step 2: Edit the file to insert the new entry**

Use the Edit tool. The exact text to insert (between the `},` closing of `"3d-showroom"` and the `"wifi-service":` opening line):

```ts
  "threeworld": {
    title: "threeworld — SVG → Interactive 3D",
    time: "Apr 2025",
    description:
      "Forked from renatoworks/3dsvg and substantially upgraded. threeworld turns any SVG or text into a real-time 3D object — shipped as both an embeddable <SVG3D> React component (npm: 3dsvg) and a Next.js visual editor where designers pick from 10 PBR material presets, 7 animation modes, procedural textures, and configurable lighting, then export as PNG (up to 4K), 60fps video (MP4 via FFmpeg WASM, or WebM), or a GLB 3D model. The editor renders the engine directly, so what you see is exactly what you embed.",
    stack: [
      "Next.js 16",
      "React Three Fiber",
      "Three.js",
      "TypeScript",
      "tsup",
      "opentype.js",
      "FFmpeg WASM",
      "Tailwind v4",
      "shadcn/ui",
    ],
    links: [
      { label: "Try it live", href: "https://threeworld-web-j7a8.vercel.app/", platform: "web" },
      { label: "GitHub", href: "https://github.com/mishraadityan09/threeworld", platform: "external" },
    ],
    images: [
      { src: "/projects/threeworld/editor.png",    caption: "Visual editor — material + animation controls", frame: "browser" },
      { src: "/projects/threeworld/materials.png", caption: "10 PBR material presets",                       frame: "browser" },
      { src: "/projects/threeworld/export.png",    caption: "PNG export up to 4K, 60fps video export",       frame: "browser" },
      { src: "/projects/threeworld/embed.png",     caption: "Embed code generation — copy <SVG3D> JSX",      frame: "browser" },
    ],
  },
```

If asset filenames or count differ from what the user dropped in `public/projects/threeworld/`, edit the `images[]` array to match. Each image entry needs `src`, `caption`, and `frame: "browser"`.

- [ ] **Step 3: Visual verification — load the detail page**

If `npm run dev` is already running from Task 1, just open `http://localhost:3000/en/projects/threeworld` in a browser. Otherwise:
```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone && npm run dev
```

Expected on the detail page:
1. Title reads "threeworld — SVG → Interactive 3D".
2. Time line shows "Apr 2025".
3. Description starts "Forked from renatoworks/3dsvg and substantially upgraded."
4. Stack chip row shows nine chips (Next.js 16, React Three Fiber, Three.js, TypeScript, tsup, opentype.js, FFmpeg WASM, Tailwind v4, shadcn/ui).
5. Two link buttons: "Try it live" (left) and "GitHub" (right). Both have the external-link icon. Both open in a new tab when clicked.
6. The image gallery shows four browser-frame screenshots in the same layout used by `tripshield` and the FlightsMojo Web entries. No broken image icons.

If any image is broken, the asset filename is wrong — fix the `src` to match the actual file in `public/projects/threeworld/`.

- [ ] **Step 4: Click both links to verify they open correctly**

- "Try it live" should open `https://threeworld-web-j7a8.vercel.app/` in a new tab.
- "GitHub" should open `https://github.com/mishraadityan09/threeworld` in a new tab.

If either URL is wrong (e.g. typo, redirect failure), fix it in the `links` array.

- [ ] **Step 5: Run `npm run check` for the full pre-commit gate**

Run:
```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone && npm run check
```

Expected: lint passes, `tsc --noEmit` passes, `next build` succeeds with no missing-page or missing-asset warnings related to threeworld. The build will statically generate the new `/en/projects/threeworld` route.

If `next build` warns about a missing image, the file isn't where the spec says it is — re-check `public/projects/threeworld/` against the `src` paths in `images[]`.

- [ ] **Step 6: Commit**

```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone
git add "src/app/en/projects/[project]/ProjectDetail.tsx"
git commit -m "feat(projects): add threeworld detail page entry"
```

---

## Task 3: Confirm full acceptance criteria pass

This is a verification-only task. No code changes. Walk through the spec's acceptance criteria and tick each one off against the running site.

- [ ] **Step 1: List acceptance criteria from spec and verify each**

| # | Criterion | How to verify | Expected |
|---|---|---|---|
| 1 | New card appears on `/en/projects` between TripShield and 3D Showroom | Open `/en/projects` | Card present, in correct slot |
| 2 | Hover preview shows `hero.png` | Mouse over the new card | Preview popup shows the hero image |
| 3 | Clicking navigates to `/en/projects/threeworld` and renders detail page | Click the card | Detail page loads with all sections |
| 4 | Detail page shows title, time, credit-line description, stack chips, two CTAs, four-image gallery | Inspect detail page | All visible |
| 5 | Both link buttons open in new tab | Click each, watch for new tab | Both open `_blank` |
| 6 | `npm run check` passes | Run command | Exit code 0 |
| 7 | No console warnings about missing images on listing or detail page | Open browser devtools console while loading both pages | No `404` for any `/projects/threeworld/*.png` |

If any row fails, fix the cause and re-run that row's verification step. Do not mark the implementation complete with any failing rows.

- [ ] **Step 2: Final commit (if any fixes were made during verification)**

If verification surfaced any small fixes, commit them with:
```bash
cd /Users/adityan/Work/others/portfolio-thanhlong-clone
git add -p   # stage only the verification-fix changes
git commit -m "fix(projects): adjustments after threeworld acceptance check"
```

If no fixes were needed, skip this step.

---

## Out of scope (do not do)

- Do not modify the `Project` or `ProjectInfo` types. The new entry uses only existing fields.
- Do not edit any of the other `PROJECT_DATA` entries (no "while I'm here" cleanup).
- Do not add `npm install 3dsvg` or any new dependency.
- Do not add a video element, an iframe, or any inline 3D rendering on the portfolio page.
- Do not touch the existing `3d-showroom` or `3d-viewer` entries.
- Do not adjust styling, spacing, or layout in `ProjectDetail.tsx` — the existing layout is what we want.

## Risks and how the implementer should respond

- **Missing asset files:** stop, ask the user. Don't commit references to non-existent images.
- **Dev server build error on the empty `/en/projects/threeworld` route during Task 1 only:** acceptable transient state; Task 2 fixes it.
- **Live URL stops working:** out of scope for this implementation. If the Vercel preview URL is dead at verification time, flag it to the user and continue — the URL is in the spec.
- **Edit tool rejects the insertion because `old_string` isn't unique:** include more surrounding context (e.g., the full `tripshield` object plus the opening of `3d-showroom`) to disambiguate.
