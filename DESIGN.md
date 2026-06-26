# Redesign Notes

Working doc for the visual redesign. Content/copy stays the same — this is about look, feel, and motion.

## Direction

Apple-style calm as the baseline (~90% of the site), with a small number of deliberately hand-built interactive moments that signal front-end craft. Avoid two failure modes:
- Fully static Apple clone → looks templated, hides dev skill.
- Effects everywhere (current state) → reads as a UI-kit demo, not considered design.

## Styling architecture

**Decision: move off Tailwind entirely, to hand-written SCSS using CSS Modules** (`Component.module.scss` next to each `.tsx` file — native Next.js support, no extra config). This is a full framework swap, not a tooling tweak — every component currently styles itself via Tailwind utility classNames.

- **Sequencing**: combined with the section-by-section redesign in the Cleanup Plan below, not a separate port-first pass. Each section gets rewritten in SCSS *and* restyled for the new look in the same step, so files are only touched once.
- **Theme tokens**: verified in the compiled CSS output — Tailwind's `@theme` block already emits the `--color-*` custom properties as real `:root`/`.dark` variables, not just internal Tailwind state. So `.module.scss` files can use `var(--color-brand)` etc. *today*, no need to wait on a Tailwind-removal step first. The only thing that still needs to move out of Tailwind eventually is making sure nothing depends on `@theme` once Tailwind is uninstalled in step 6.
- **Type scale + spacing scale**: added as plain `:root` variables in `globals.css` (`--font-size-*`, `--font-weight-*`, `--tracking-*`, `--leading-*`, `--space-*`) — deliberately *outside* `@theme`, since Tailwind's auto-generated `--text-*`/`--spacing` scale only exists while Tailwind is installed and would vanish in step 6. Use these (not Tailwind's) in every new `.module.scss` file.
- **Radius / elevation / motion tokens**: added as plain `:root` variables (`--radius-card`, `--radius-pill`, `--elevation-sm/md/lg`, `--duration-fast/base/slow`, `--ease-standard`) for the borderless-card elevation pattern and consistent hover/transition timing. Named deliberately to avoid Tailwind's own theme namespace — Tailwind v4 already ships `--radius-sm/md/lg/xl` and `--shadow-sm/md/lg` with *different* values, and several unconverted components (`MagicButton`, `ResumeLink`, `PreviousExperienceExpandable`, `About`) still use `rounded-lg`/`rounded-md`/etc. Reusing those names would have silently changed their rendered values site-wide — caught and fixed before it shipped, verified `--radius-lg` still resolves to the original `0.5rem` in the compiled CSS.
- **Breakpoints**: CSS custom properties don't work inside `@media` conditions, so these are real Sass variables + a `respond-to($breakpoint)` mixin in `styles/_breakpoints.scss` (mirrors `tailwind.config.ts`'s `screens`). `next.config.mjs` has `sassOptions.includePaths` pointing at `styles/`, so any `.module.scss` can do `@use "breakpoints" as *;` and `@include respond-to(lg) { ... }` without relative-path chains.
- **Tailwind can only be fully removed once every component is ported** — it's still doing real work for unconverted sections. Uninstalling the package, deleting `tailwind.config.ts`/PostCSS config, and dropping `cn()`/`tailwind-merge` (`lib/utils.ts`) happens as a final step after the section-by-section pass, not now.

## Baseline style (applies everywhere)

- **Typography**: large, confident headings, tight tracking, generous line-height on body text. Inter or Geist as the SF Pro stand-in. Some bold graphic accents are wanted (confirmed direction, reference: dark portfolio screenshot, 2026-06-21): an italicized accent-colored word in the hero name, a bordered pill/badge around the role title, chunky CTA buttons — more graphic than a plain Apple headline, layered on top of the calm baseline rather than replacing it.
- **Color**: near-monochrome (white/black + neutral grays), one accent color used sparingly. Drop the purple/yellow/blue mix currently in use.

#### Color palette

Two coherent palettes built around the brand blue. The light-mode background carries a subtle blue tint that ties into the brand. Always-dark tokens (`--color-tile`, `--color-tile-foreground`) are theme-invariant — they apply to elements (hex tiles, marquee banner, resume links) that are intentionally dark in both modes and sit as accent elements on whichever background is behind them.

| Token | Light | Dark |
|---|---|---|
| `--color-background` | `hsl(220 25% 96%)` — soft blue-tinted off-white | `hsl(233 100% 5%)` — deep navy (`#000319`) |
| `--color-foreground` | `hsl(222 25% 11%)` — deep navy | `hsl(0 0% 96%)` — near-white |
| `--color-card` | `hsl(0 0% 100%)` — white (elevation above bg) | `hsl(233 40% 9%)` — lighter navy than bg |
| `--color-muted-foreground` | `hsl(222 12% 44%)` — blue-gray | `hsl(220 15% 62%)` — lighter blue-gray |
| `--color-border` | `hsl(220 20% 89%)` — subtle blue-tinted | `hsl(233 30% 17%)` — subtle dark |
| `--color-primary` | `hsl(222 25% 11%)` — dark navy button | `hsl(0 0% 98%)` — near-white button |
| `--color-brand` | `#0071e3` | `#2997ff` |
| `--color-tile` | `hsl(240 15% 14%)` — **never changes** | same |
| `--color-tile-foreground` | `hsl(0 0% 90%)` — **never changes** | same |
- **Shape language** (decided 2026-06-24, extended 2026-06-25): the Tech Stack hexagon tiles are the seed of a unifying angular motif — a single 45° chamfered corner, direction carrying semantic meaning:
  - **Top-right** (`corner-cut($size)` mixin) = interactive chrome: CTA buttons (`MagicButton`), marquee tiles, resume links, list bullets. Done.
  - **Top-left** (`corner-cut-left($size)` mixin) = content cards: About bento tiles, experience/education cards, marquee banner, stat tile. Done.
  - Both mixins live in `styles/_shapes.scss`. Applied to one corner only so it reads as a deliberate accent, not a sci-fi UI kit. Cards also carry a subtle `1px solid rgba(255,255,255,0.1)` border for definition without hard edges.
- **Spacing**: full-height-ish sections, more breathing room between blocks than the current bento-grid density.
- **Section boundaries**: confirmed direction (reference: dark portfolio screenshots, 2026-06-21) — keep distinct sections/cards (About, Tech Stack, Work Experience stay separate blocks), but drop hard borders/outlines between them. Transitions should read as soft/shared background (subtle gradient or background-shade shift) rather than boxed edges, so the page feels continuous even though content is still organized into cards. This applies to section/card-level edges only — small UI chrome (pills, badges, buttons) keeping a thin border is fine and part of the typographic-accent direction above.
- **Motion**: scroll-triggered fade/slide-up on section entry (Framer Motion `whileInView`), no looping/ambient animation by default.
- **Imagery**: keep the headshot, but reconsider the dotted `PatternBackground` grid — likely drop or replace with something subtler (soft gradient, no grid).

## Components to retire

- `PatternBackground` (dotted grid bg) — too "dev template."
- `TypewriterEffect` — replace with a single static subtitle line, calmer.
- `AnimatedBorderCard` / `MovingBorderCard` — glowing animated borders don't fit calm aesthetic.
- Hardcoded purple/yellow accent text in `WorkExperience` — fold into the single accent color.

## Components likely worth keeping (re-skinned)

- `TextGenerateEffect` for the name — fine as a one-time reveal, just restyle.
- `MagicButton` — simplify to a clean cut-corner CTA (see Shape language above), drop the glow. **Done** — ported to `MagicButton.module.scss`, glow removed, single top-right chamfered corner added.

~~Globe (`cobe`) in About~~ — removed entirely (done, see Cleanup Plan).

## Section-by-section ideas

### Navigation
- Minimal fixed top bar: name/initials on the left (anchors back to top), section links on the right: About · Skills · Experience · Resume.
- Semi-transparent background + `backdrop-filter: blur()` so content scrolls behind it — very Apple, low visual weight.
- Highlight the active section as you scroll (Intersection Observer).
- Mobile: same bar, links collapse or shrink — 4 links is short enough to fit without a hamburger menu.
- Clean up section IDs site-wide when building this — currently only `id="experience"` exists and nothing links to it.

### Hero
- Drop the dotted grid background. **Done** — replaced with `HexGrid` (see below).
- Name as large static type (no typewriter), with one word in the accent color, italicized (graphic-accent direction). Role/title sits in a bordered pill badge underneath, one calm subtitle treatment overall.
- Floating callout card overlapping/flanking the headshot (reference pattern) — but only one, stat-style, since there's no testimonial content to fill a second card. Content TBD when we build this section (candidates: years of experience, current role/employer, or language count — decide then).
- CTA button below gets a single top-right chamfered corner instead of full rounding (ties into the hex-derived shape-language motif, see Baseline style above) — **done**, drops the old bordered-glow `MagicButton` look.
- Full-viewport height at desktop — `min-height: calc(100svh - var(--nav-height))` with flex centering. **Done.**
- Candidate signature moment: cursor-reactive subtle gradient/glow behind the headshot, instead of the grid pattern.

#### HexGrid component — **Done**
Decorative SVG honeycomb pattern (`components/hero/HexGrid.tsx` + `HexGrid.module.scss`):
- **Geometry**: pointy-top hexes, row-based layout. `COL_W = R√3` (86.6 px) within-row spacing, `ROW_H = R × 1.5` (75 px) row-to-row, odd rows shift right by `COL_W / 2` (43.3 px). Guarantees edge-sharing (not vertex-touching).
- **Connected cluster**: `GRID_CELLS` — dense at top-right (rows 0–8), then sparse left-drifting trail into the About section (rows 9–13, y ≈ 725–1025 in SVG space). Stroke: `--color-hex-decoration` at 14% opacity.
- **Floating hexes**: 7 off-grid brand-colored (`--color-brand`) polygons at varying radii, scattered around the cluster. 30% opacity.
- **SVG layout**: `viewBox="0 0 1280 1200"`, `preserveAspectRatio="xMidYMin meet"`, `width: 100%; height: auto` — scales to container width and extends proportionally below the hero into the About section.
- **Left-edge fade**: `mask-image: linear-gradient(to right, transparent 0%, black 22%, black 100%)` keeps the text area clean.
- **z-index**: SVG at z-index 0, `.inner` content at z-index 1. About's `.section` has `position: relative; z-index: 1` so its content paints above the overflowing SVG.
- **Theme token**: `--color-hex-decoration` — `hsl(222 18% 62%)` light / `hsl(220 40% 55%)` dark, defined in `globals.css`.
- Hidden below `lg` breakpoint (`display: none` → `display: block`).

### Footer — **Done**
Minimal footer below `<main>`: NR logo (left, scrolls to top, same hover-swap style as nav logo), GitHub + LinkedIn icon links (right, `react-icons/fi`, theme-responsive color), copyright line (centered below, auto-updates year).
- `Footer.tsx` + `Footer.module.scss` in `components/footer/`.
- Width and padding match the page container (`80rem` max-width).
- Top border uses `--color-border` to visually close the page.

### About — **Done**
Full bento grid (6-col desktop, 2-col mobile) using `grid-template-areas`. 8 tiles:
- **Bio** (4 cols): Patagonia origin → Colorado life → front-end craft → personal interests.
- **Open to Opportunities** (2 cols, row 1): USA or Norway — hybrid, remote, or onsite.
- **Norway photo** (2 cols, spans 2 rows): `nordsetter-2026.webp` with flag + overlay caption.
- **Languages** (2 cols): English / Español / Norsk Bokmål with flags.
- **Nico ski shop portrait** (2 cols, spans 2 rows): `nico-ski-shop.webp`, thumbs-up in ski shop.
- **USAW Certified Coach** (2 cols): logo + 19-year stat + Norwegian national team mention.
- **Nordic Skiing** (2 cols): `langrenn-klassisk-granåsen.png` action photo + overlay.
- **Winter Park, CO** (4 cols): `co-hike.webp` panoramic hike photo + overlay.
All tiles use `corner-cut-left(1.5rem)`. Subtle `rgba(255,255,255,0.1)` border. No hover scale. `"use client"` removed (pure server component).

### Tech Stack
- Switch from flowing pill badges to an icon-tile grid (reference pattern: square tiles, one icon each) — but built with soft background-shade tiles, no hard borders, consistent with the no-hard-edges rule. Drop hover `scale(1.2)` bounce in favor of a subtle opacity/elevation change.
- Include one wider stat tile alongside the icon tiles (reference pattern: "4 Years Experience" callout) — gives the grid an asymmetric focal point instead of being purely uniform icons.

### Work Experience — **Done**
Unified vertical timeline — all jobs in one consistent card format, newest first. `PreviousExperienceExpandable` (Framer Motion expand-to-modal) removed entirely. All data consolidated into `workExperience` array in `data/index.ts` (replaced the old `currentJob` split). Education section added below with same card style and a brand-colored "EDUCATION" subheading.
- Cards use `corner-cut-left(1.5rem)`, `--color-brand` tech tags, corner-cut bullet points.
- Jobs: FyrKode (part-time badge), Booz Allen (updated to June 2026), Altvia. ProductPlan removed.
- ResumeLink ported to CSS Modules with `corner-cut` (top-right, interactive).
- Company imagery not used — removed raw screenshots pending a consistent treatment.
- Scroll-linked reveal still to do (step 5).

**Resume CTA** — redesigned from two floating buttons into a proper named section (`id="resume"`): brand-colored "Download" label, large "Get My CV" heading with accent color, bilingual subtext, then the two `ResumeLink` buttons. Separated from the education timeline with a `--color-border` top rule. The "Resume" nav link in Navigation scrolls here and activates via Intersection Observer.

## Cleanup Plan (do in this order)

This is the master checklist — check items off here as work lands. The "Components to retire" and "Section-by-section ideas" sections above are supporting detail/rationale, not separately tracked.

Reasoning: lock the decisions everything else inherits from before touching components, strip dead/leftover code so the page is easier to judge, then refactor section by section in order of visual gap (smallest → largest), and only add signature-moment polish once the calm baseline is in place everywhere.

1. **Lock foundational decisions**
   - [x] Pick the single accent color — **decided**: Apple's adaptive blue pair, added as a `--color-brand` token in `globals.css` (`#0071e3` light / `#2997ff` dark). Previewed on the hero name + "Fullstack" word, confirmed.
   - [x] Pick the font — **decided**: Geist (via the `geist` package, `geist/font/sans`), replacing `Plus_Jakarta_Sans` in `app/layout.tsx`.
   - [ ] Decide the 2-3 signature moments to actually build (see step 5 below).

2. **Fix the theme token system + move it off Tailwind**
   - [x] Add the chosen accent as a token (`--color-brand`) instead of hardcoding hex/Tailwind color names per component.
   - [x] Type scale, spacing scale, radius/elevation/motion tokens, and the breakpoints Sass mixin are all in place (see Styling architecture above) — verified collision-free against Tailwind's own theme namespace.
   - [x] Switch `defaultTheme` in `app/layout.tsx` from `"dark"` to `"system"` so it respects OS preference.
   - [x] Spot-checked light + dark via Playwright screenshots — no console errors either way, `--color-brand` renders correctly in both. Remaining light-mode roughness is exactly the known hardcoded-dark-background cards (About, Work Experience) — not a new regression, fixed when those sections are ported in step 4.
   - (Porting the `--color-*` custom properties out of Tailwind's `@theme` into the plain stylesheet happens in step 6, once nothing still depends on Tailwind generating them — not here. Hardcoded per-component colors — `bg-slate-900`, `rgb(4,7,29)` navy, `text-yellow-200`, etc. — get replaced when each section is ported to SCSS in step 4.)

3. **Strip dead/leftover code site-wide** — done, verified via build + `tsc` + `eslint` + Playwright spot-check (light/dark, zero console errors):
   - [x] Removed `PatternBackground` (dotted grid) from Hero; deleted the now-unused component file.
   - [x] Removed `TypewriterEffect`, replaced with a static subtitle line (`Fullstack Software Developer`, brand-colored word); deleted the now-unused component file (`TypewriterEffectSmooth` was also dead, deleted with it).
   - [x] Removed `AnimatedBorderCard` usage in `WorkExperience` (replaced with a plain `bg-card` div, no border/glow); deleted both `AnimatedBorderCard` and `MovingBorderCard` (the latter had zero consumers already).
   - [x] Stripped the conic-gradient glow out of `MagicButton`; now a plain `bg-primary`/`text-primary-foreground` button, same props/API.

4. **Section-by-section refactor — port to SCSS (CSS Modules) + apply new design together**, ordered by current gap size (smallest first, so momentum builds and the accent/font choices get validated early):
   - [x] Tech Stack — hex icon tiles, scrolling marquee, stat tile, CSS Modules. Corner-cut-left on stat tile and marquee banner.
   - [x] About — full bento grid, 8 tiles, 4 photos, corner-cut-left on all tiles. See About section above.
   - [x] Work Experience — unified vertical timeline, CSS Modules, education section, corner-cut-left on cards. See Work Experience section above.
   - [x] Navigation — fixed top bar, blur background, Intersection Observer active-link highlight, clean up section IDs site-wide. 4 links: About · Skills · Experience · Resume.
   - [~] Hero — `Hero.module.scss` done, full-viewport height done, `HexGrid` decorative SVG honeycomb done (see Hero notes above). Still pending: italic accent word, bordered role pill, floating stat callout card.
   - [x] Footer — `Footer.tsx` + `Footer.module.scss`, NR logo, GitHub + LinkedIn icons, copyright line (see Footer notes above).

5. **Layer in signature moments** (scroll-linked reveals, theme toggle transition, etc.) once the calm baseline reads consistently across all sections in both themes. Pick 2-3 from:
   - [ ] Cursor-reactive gradient/glow in the hero (replaces the dotted grid).
   - [ ] Scroll-linked reveal sequence across sections (fade/slide-up, staggered).
   - [ ] Custom dark/light theme toggle with a smooth, deliberate transition (not just an instant class swap).

6. **Remove Tailwind entirely** — **Done**:
   - [x] Uninstall `tailwindcss`, `@tailwindcss/postcss`, `tailwindcss-animate`, `mini-svg-data-uri`, `tailwind-merge`.
   - [x] Delete `tailwind.config.ts` and the Tailwind PostCSS config.
   - [x] Simplify or remove `cn()` in `lib/utils.ts` (deleted — `TextGenerateEffect` now combines classes via template literal).
   - [x] Grep for any leftover Tailwind classNames that slipped through the section-by-section pass.

