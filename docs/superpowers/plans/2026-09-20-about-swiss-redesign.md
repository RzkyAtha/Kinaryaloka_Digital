# About Swiss Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `src/components/About.tsx` as a Swiss modular grid per `docs/superpowers/specs/2026-09-20-about-swiss-redesign-design.md`, keeping data, assets, and interaction model.

**Architecture:** Single-file rewrite. Data constants (`valueCards`, `processSteps`, `GLITCH_LAYERS`, `GLITCH_SLICES`) and state/handlers in `About()` are kept verbatim. `BlueprintFrame` is deleted. `ValueTile` is rewritten for idle/solid-fill states. Popup is restyled inline. Layout is a bordered CSS grid using Tailwind utilities with `divide-*`/`border-*` for rules.

**Tech Stack:** React 18, TypeScript, Tailwind CSS, framer-motion, Heroicons. Build: Vite. Tests: Vitest (`npm test`).

---

### Task 1: Remove dead visuals and restyle `ValueTile`

**Files:**
- Modify: `src/components/About.tsx:79-341`

- [ ] **Step 1:** Delete `BlueprintFrame` (lines 89-124) and `BRAND_GRADIENT` (line 80). Keep `BRAND_ACCENT`.
- [ ] **Step 2:** Rewrite `ValueTile` per spec §"Value module": `aspect-square` button, `background-color` transition to `card.color` when `active`, idle body = index + code / `idleImage` / title + subtitle; active body = index + code + badge / floating `image` with glitch ghosts (`mixBlendMode: 'screen'`) / title + description + "Baca detail →". Remove marquee, scanline, radial glow, blur circle, `whileHover`.
- [ ] **Step 3:** Run `npx tsc --noEmit -p .` — expected: no errors.
- [ ] **Step 4:** Commit: `git commit -am "refactor(about): swiss value module, drop blueprint/marquee/scanline"`

### Task 2: Rebuild section layout as bordered modular grid

**Files:**
- Modify: `src/components/About.tsx` (`About()` return JSX)

- [ ] **Step 1:** Replace bento grid with a single container `border border-[#2a2a2a]` containing rows per spec §"Structure": meta bar → 3px rule → header (`lg:grid-cols-12`, 7/5, vertical rule) → values (`grid-cols-2 lg:grid-cols-4`, 1px rules via `border-r`/`border-b` with `lg:border-r-0` on last col) → process (`grid-cols-2 lg:grid-cols-4`) → footer meta bar with hint text.
- [ ] **Step 2:** Headline: `font-poppins font-extrabold tracking-[-0.03em] leading-[0.95]`, `style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}`, line 2 in `BRAND_ACCENT` solid. Paragraph `text-left`.
- [ ] **Step 3:** Process cells: mono index `0${i+1}` in `valueCards[i].color`, `step.code` caption, `step.label` bold, `step.note` muted.
- [ ] **Step 4:** Keep grid-paper background div; move `doodle_tech_art.webp` texture into headline cell at opacity 0.04.
- [ ] **Step 5:** `npx tsc --noEmit -p .` — expected: no errors.
- [ ] **Step 6:** Commit: `git commit -am "feat(about): swiss modular grid layout"`

### Task 3: Restyle popup + Escape to close

**Files:**
- Modify: `src/components/About.tsx` (popup JSX, `About()` hooks)

- [ ] **Step 1:** Add `useEffect` in `About()`: when `openIndex !== null`, listen `keydown` Escape → `closePopup()`. Import `useEffect`.
- [ ] **Step 2:** Popup box: remove `rounded-3xl`, radial glow, `BlueprintFrame`; add `border border-[#2a2a2a]`, top bar `<div className="h-2" style={{ background: popupCard.color }} />`, square close button (`h-8 w-8 border border-[#2a2a2a]`), `role="dialog" aria-modal="true"` on the overlay.
- [ ] **Step 3:** `npx tsc --noEmit -p .` — expected: no errors.
- [ ] **Step 4:** Commit: `git commit -am "feat(about): swiss popup, escape closes"`

### Task 4: Verify

- [ ] **Step 1:** `npm run build` — expected: `✓ built in …`, no TS errors.
- [ ] **Step 2:** `npm test -- --run` — expected: all existing tests pass.
- [ ] **Step 3:** `npm run dev`, open `/#tentang` at 375 / 768 / 1280 / 1440px: rules align, no double borders at outer edge, cells square, no layout shift on hover; Tab through modules, Enter opens popup, Escape closes.
- [ ] **Step 4:** Commit any fixes, then push: `git push origin master`.
