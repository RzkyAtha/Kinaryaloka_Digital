# About Section — Swiss Modular Grid Redesign

Date: 2026-09-20
Scope: `src/components/About.tsx` only. No new assets, no new dependencies.

## Goal

Redesign the `#tentang` section in Swiss (International Typographic) style while keeping the existing concept and assets: headline, intro paragraph, 4 value cards (illustration + police-text image + per-value color), 4 process steps, and the detail popup.

## Decisions

- Layout: **C — Modular Grid**. Entire section is one bordered table (`1px solid #2a2a2a`), sharp corners, no shadow, no gradient, no rounded corners.
- Value module state: **Solid color block**. Idle = white with police-text image; hover/focus = full fill with the value color, white text, illustration replaces police-text.
- Motion: **Medium**. Keep illustration float + chromatic glitch on hover. Remove marquee, scanline, `BlueprintFrame`, radial glow, blur circle, and `whileHover` lift.

## Structure

Rows inside a single `max-w-[1400px]` bordered container:

1. **Meta bar** — `01 / TENTANG` left, `KINARYALOKA DIGITAL STUDIO` right. Mono, 10px, uppercase, `tracking-[0.14em]`. 3px rule below.
2. **Header** — `lg:grid-cols-12`: headline spans 7 cols, intro paragraph spans 5 cols (left-aligned, bottom-aligned). Vertical rule between. `doodle_tech_art.webp` as background texture at opacity 0.04 inside the headline cell only.
3. **Values** — `grid-cols-2 lg:grid-cols-4`, each cell `aspect-square`, separated by 1px rules.
4. **Process** — `grid-cols-2 lg:grid-cols-4`, each cell: mono step index (`01`–`04`) colored with `valueCards[i].color`, label bold, note muted. Existing `processSteps[].code` text ("Pertama", "Lalu kita", …) is shown as the small mono caption above the label; numeric index is added.
5. **Footer meta bar** — the interactive hint text ("Interaktif: arahkan kursor…") in mono 10px, left-aligned.

Section background: white with the existing faint grid-paper pattern (kept, unchanged).

## Typography

- Headline: `font-poppins font-extrabold tracking-[-0.03em] leading-[0.95]`, size `clamp(32px, 5vw, 64px)`. Line 2 ("Partner yang Ngerti") in solid `#F5C542`; lines 1 and 3 in `#2a2a2a`. No gradient text. `font-climate` is not used in this section.
- Labels/numbers: `font-mono`, 10–11px, uppercase, `tracking-[0.14em]`.
- Body: Poppins 400, 13–14px, `#5a5a5a`, `text-left` (no justify).
- Module title: Poppins 700, 15–18px, `tracking-[-0.01em]`.

## Value module

Container: `<motion.button>` with `aspect-square`, `p-4 sm:p-5`, `flex flex-col justify-between`, `text-left`, `outline-none`, focus-visible ring inset 2px in value color. Background transitions `background-color 250ms ease`.

Idle:
- Top row: mono index `01` (`#8a8a8a`) + `card.code` (value color).
- Middle: `card.idleImage`, `max-h-[70px] sm:max-h-[110px]`, centered.
- Bottom: `card.title` (bold, `#2a2a2a`) + `card.subtitle` (`#8a8a8a`).

Active (hover / focus / touch first tap):
- Background = `card.color`. All text white.
- Top row: index + code (white), `card.badge` right-aligned (white, uppercase, 9px).
- Middle: `card.image` float (`y: [-6, 6, -6]`, 5s) with glitch ghosts using existing `GLITCH_LAYERS` / `GLITCH_SLICES`, but `mixBlendMode: 'screen'` so they read on a solid color. No scanline.
- Bottom: `card.title`, `card.description` (white/85), then `Baca detail →` (white, bold, 11px).

State switch uses `AnimatePresence` with 200ms opacity crossfade, same fixed-stage approach as today so cells never resize.

## Popup

- White box, `max-w-sm`, sharp corners, `border: 1px solid #2a2a2a`, top bar `h-2` in `popupCard.color`. No radial glow, no `BlueprintFrame`.
- Close button: 32px square, border 1px `#2a2a2a`, top-right, no rounding.
- Content order: meta row (`code · 02/04` mono), illustration float (no glitch), badge, title, subtitle, description with `border-l-2` in value color.
- Overlay unchanged (`rgba(10,10,12,0.82)` + blur).

## Responsive

- `lg+`: header 7/5, values 4 cols, process 4 cols.
- `<lg`: header stacks (headline then paragraph, horizontal rule between), values 2x2, process 2x2, meta bars stack labels if needed.
- Touch: first tap sets active (`onPointerEnter` fires on touch), second tap opens popup. `onPointerLeave` on the grid clears active. Unchanged from current behavior.

## Accessibility

- Buttons keep `aria-label="{title} — {badge}"`.
- `focus-visible` sets active state (existing `onFocus`) and shows a 2px inset ring.
- Popup: `role="dialog"`, `aria-modal="true"`, Escape closes (add `keydown` listener like `WhatsAppPopup`).
- Images keep existing `alt`, `loading="lazy"`, `decoding="async"`; popup image `loading="eager"`.

## Out of scope

- Other sections, global styles, fonts loaded in `index.html`.
- Changing copy in `valueCards` or `processSteps`.

## Verification

- `npm run build` passes with no TypeScript errors.
- Visual check at 375px, 768px, 1280px, 1440px: rules align, no double borders, cells stay square, no layout shift on hover.
- Keyboard: Tab through 4 modules, Enter opens popup, Escape closes.
- Existing unit tests (`npm test`) still pass.
