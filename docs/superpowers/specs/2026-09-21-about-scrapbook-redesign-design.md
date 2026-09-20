# About Section — Scrapbook "Open Book" Redesign

Date: 2026-09-21
Supersedes: `2026-09-20-about-swiss-redesign-design.md`
Scope: `src/components/About.tsx`, `index.html` (font link), `tailwind.config.js` (font families). No new image assets or npm dependencies.

## Goal

Redesign `#tentang` in a scrapbook aesthetic while keeping every existing asset and the interaction model: 4 illustrations, 4 police-text images (used as stickers), `doodle_tech_art.webp` (background scribbles), per-value colors, headline/paragraph copy, 4 process steps, detail popup.

## Decisions

- Layout: **B — Open book spread** (two pages side by side, stacked on mobile).
- Value card interaction: **Flip**. Hover/focus flips the polaroid 180° to show the back; click opens the popup.
- Fonts: headline **Permanent Marker**, handwriting **Caveat** (500/700), labels/badges **Special Elite**, body **Poppins**. Rock Salt and Climate Crisis are not used in this section.

## Fonts

`index.html`: add `Permanent+Marker`, `Caveat:wght@500;700`, `Special+Elite` to the existing Google Fonts URL (all three `<link>` occurrences).
`tailwind.config.js` `fontFamily`: `marker: ['"Permanent Marker"', 'cursive']`, `caveat: ['Caveat', 'cursive']`, `typewriter: ['"Special Elite"', 'monospace']`.

## Canvas

Section background `#e6d9c4` (kraft desk) with fine dot grain (`radial-gradient(rgba(0,0,0,.05) 1px, transparent 1px)`, 6px). Existing blueprint grid-paper background is removed.

Book: `max-w-[1400px]` container, `grid lg:grid-cols-2`, gap 0. Each page `#fdfbf5`, `p-6 sm:p-8 lg:p-10`, `box-shadow: 0 10px 30px rgba(60,40,10,.18)`. Gutter: left page has `inset -12px 0 16px -12px rgba(0,0,0,.18)`, right page mirror. On `<lg` pages stack; gutter shadow becomes a bottom/top inset.

## Left page

1. Label `tentang kami ✎` — Caveat 700, 18px, `#8a8a8a`, rotate −2°.
2. Headline on a torn paper strip (`#fff2c4`, `clip-path` jagged polygon, rotate −1.5°, `shadow-sm`): `Bukan Agency Biasa.` Permanent Marker, `clamp(26px, 3.2vw, 40px)`, `#2a2a2a`.
3. Sub-headline `Partner yang Ngerti Bisnis Kamu.` — Caveat 700, `clamp(24px, 2.8vw, 36px)`, color `#D4912A`, indent 8px.
4. Paragraph — Poppins 13–14px, `#5a5a5a`, `leading-[1.75]`.
5. Process list — 4 rows: circled number `①②③④` in Caveat 700 24px colored `valueCards[i].color`; label Poppins 700 13px; note Poppins 11px `#8f8f8f`. A vertical dashed "pen" line (`border-l-2 border-dashed #c9bda3`) connects rows at x = 14px.
6. Background: `doodle_tech_art.webp` cover, opacity 0.06, inside the page.
7. Sticker: `valueCards[3].idleImage` (RINCI JELAS AMAN) absolute bottom-left, `w-28`, rotate −6°, `drop-shadow`.

## Right page — polaroid grid

`grid grid-cols-2 gap-5 sm:gap-7`, `onPointerLeave={clearHover}`.

Each card is a `<button>` with `perspective: 1000px`; inner `<motion.div>` `transformStyle: preserve-3d`, `animate={{ rotateY: active ? 180 : 0 }}`, `transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}`. Static rotations per index: `[-2.5, 2, 1.5, -2]` deg applied on the button.

Washi tape: absolute `-top-2`, width 64px, height 18px, `background: ${color}66`, rotate −6° (even index) / +6° (odd index), `backdrop-filter: none`. Rendered outside the flipping inner so it stays put.

Front face (`backface-visibility: hidden`): white polaroid `p-3 pb-4`, photo area `#f6f1e6` `aspect-[4/3]` with illustration `w-20 sm:w-28` floating (`y: [-4,4,-4]`, 5s, only when in view); caption: title Poppins 700 13–15px, subtitle Caveat 500 15px `#8a8a8a`.

Back face (`rotateY(180deg)`, `backface-visibility: hidden`): same size, `#fdfbf5` with faint ruled lines; top-right handwritten `02/04` Caveat; police-text image (`idleImage`) `max-h-[56px]` rotate −4° with `drop-shadow`; badge in Special Elite 10px uppercase inside a 1px `#2a2a2a` box rotated −2°; description Poppins 11–12px; `Baca detail →` Caveat 700 15px in `card.color`.

Handwritten note `klik untuk baca ✎` — Caveat 500 16px `#8a8a8a`, absolute bottom-right of page, rotate 3°.

Removed: glitch layers, scanline, marquee, `BlueprintFrame`, gradients, radial glows. `GLITCH_LAYERS`/`GLITCH_SLICES` constants are deleted.

## Popup

Overlay unchanged. Card: large polaroid `max-w-sm`, white, `p-4 pb-6`, rotate 0, `box-shadow: 0 24px 60px rgba(10,10,12,.35)`. Tape at top center (`${color}66`, 90x22, rotate −3°). Photo area `#f6f1e6` with illustration `w-28 sm:w-32` floating. Below: badge as **stamp** — Special Elite 10px uppercase, `border-2` in `color`, color text, rotate −4°, positioned top-right of the caption block; title Permanent Marker 22px; subtitle Caveat 500 18px `#8a8a8a`; description Poppins 13–14px. Close button: 32px circle white with `border 1px #2a2a2a`, top-right, overlapping frame edge like a sticker. `role="dialog" aria-modal="true"`, Escape closes.

## Responsive

- `lg+`: two pages side by side.
- `<lg`: left page above right page; polaroid grid stays 2 cols with `gap-4`.
- Touch: first tap flips (via `onPointerEnter`), second tap opens popup — unchanged.

## Accessibility

- Buttons keep `aria-label="{title} — {badge}"`; `onFocus` flips; `focus-visible:ring-2 ring-offset-2` in `#2a2a2a`.
- Decorative images/tapes `aria-hidden`; police-text image on back has `alt={policeText}`.
- Respect `prefers-reduced-motion`: use `useReducedMotion()` from framer-motion to disable float and use instant flip.

## Verification

- `npx tsc --noEmit -p .` clean; `npm run build` succeeds; `npm test -- --run` passes.
- Visual at 375 / 768 / 1280 / 1440px: pages align, tapes stay on flip, no clipping of rotated cards (page has `overflow: visible`), popup readable.
- Keyboard: Tab flips cards, Enter opens, Escape closes.
