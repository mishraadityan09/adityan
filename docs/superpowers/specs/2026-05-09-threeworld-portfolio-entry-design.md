# threeworld — Portfolio Entry Design

**Date:** 2026-05-09
**Owner:** Aditya Mishra
**Status:** Draft, awaiting user review

## Goal

Add **threeworld / 3dsvg** as a new project on the portfolio's `/en/projects` page. Visitors should see it in the project grid, click into a detail page styled like the existing `flightsmojo` and `nxflow` entries, and from there have a prominent "Try it live" link to the deployed editor and a secondary "GitHub" link to the fork. No 3D engine code is bundled into the portfolio — the live website is the interactive demo.

## Non-goals

- Embedding the `<SVG3D>` engine inline on the portfolio page.
- Modifying the `Project` / `ProjectInfo` TypeScript types.
- Replacing or demoting the existing Babylon.js entries (`3d-showroom`, `3d-viewer`).
- Adding a video player. If the user later wants an MP4 demo loop, it'll be a separate change.

## Context (links + credit)

- **Live editor:** https://threeworld-web-j7a8.vercel.app/
- **GitHub fork (Aditya's, where the upgrades live):** https://github.com/mishraadityan09/threeworld
- **Original upstream (for credit):** renatoworks/3dsvg
- **Framing:** description leads with "Forked from renatoworks/3dsvg and substantially upgraded." GitHub button points to Aditya's fork.

## File changes

Three touches. No type changes. No new dependencies.

| File | Change |
|---|---|
| `src/app/en/projects/page.tsx` | Insert one `Project` object into the `PROJECTS` array. Slot: position 6 (after `tripshield`, before `3d-showroom`) so the chronological "newest 3D work first" reading works. |
| `src/app/en/projects/[project]/ProjectDetail.tsx` | Add a new key `"threeworld"` to the `PROJECT_DATA` map. |
| `public/projects/threeworld/` (new directory) | Holds screenshots provided by the user. Filenames referenced from `images[]` in `PROJECT_DATA`. |

## Listing entry (in `page.tsx`)

```ts
{
  title: "threeworld — Turn SVGs into Interactive 3D",
  description:
    "Open-source npm package + visual editor. The <SVG3D> React component embeds extruded 3D text/SVGs with PBR materials and animations; the editor lets anyone design 3D objects from text or SVG and export as PNG, video, or 3D model. Built on React Three Fiber. Forked from renatoworks/3dsvg and substantially upgraded.",
  href: "/en/projects/threeworld",
  previewImage: "/projects/threeworld/hero.png",
}
```

## Detail entry (in `PROJECT_DATA`)

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
}
```

All gallery items use `frame: "browser"` because this is a desktop web editor, matching how `tripshield` and the FlightsMojo Web entries are framed.

## Assets the user must provide

Paths the spec references — these need to exist before the page renders cleanly:

- `public/projects/threeworld/hero.png` — used by the project listing's hover preview.
- `public/projects/threeworld/editor.png`
- `public/projects/threeworld/materials.png`
- `public/projects/threeworld/export.png`
- `public/projects/threeworld/embed.png`

Filenames are suggestions. If the user drops different filenames, the spec's `images[]` array will be updated to match before implementation.

## Acceptance criteria

1. Visiting `/en/projects` shows a new card titled "threeworld — Turn SVGs into Interactive 3D" in the grid, positioned after the TripShield card and before the Babylon.js 3D Showroom card.
2. Hovering the new card shows the `hero.png` preview via the existing `HoverCard`.
3. Clicking the card navigates to `/en/projects/threeworld` and renders the detail page using the same layout used by `flightsmojo`, `nxflow`, etc.
4. The detail page shows: title, time ("Apr 2025"), description with the credit line, the stack chip row, the "Try it live" and "GitHub" buttons, and the four-image gallery in browser frames.
5. Both link buttons open in a new tab (existing `ProjectDetail` link rendering already does this for external links).
6. `npm run check` passes (lint + typecheck + build).
7. No console warnings about missing images on either the listing page or the detail page.

## Out of scope / explicit YAGNI

- No `npm install 3dsvg` — engine stays out of the portfolio bundle.
- No iframe of the live editor on the portfolio page — link out only, per user choice.
- No video element on the gallery — image grid is enough for v1.
- No new component file. The change reuses `ProjectCard` and `ProjectDetail`.
- No changes to the existing two Babylon.js entries.

## Risks

- **Image paths break the page if assets are missing.** Mitigation: implementer should confirm the five PNGs exist in `public/projects/threeworld/` before marking done. If the user wants to ship without all gallery shots, drop entries from the `images[]` array rather than reference missing files.
- **Live demo URL drift.** The Vercel preview URL `threeworld-web-j7a8.vercel.app` is a default Vercel-generated subdomain. If the user ever attaches a custom domain or redeploys under a new project, this hardcoded link will need updating. Acceptable for v1.
- **Credit line wording.** "Forked from renatoworks/3dsvg and substantially upgraded" is accurate per user. If the original author objects or the framing later feels off, it's a one-line edit in two files.
