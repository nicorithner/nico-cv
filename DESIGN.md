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

- **Typography**: large, confident headings, tight tracking, generous line-height on body text. Inter or Geist as the SF Pro stand-in. Some bold graphic accents are wanted (confirmed direction, reference: dark portfolio screenshot, 2026-06-21): an italicized accent-colored word in the hero name, a bordered pill/badge around the role title, chunky pill-shaped CTA buttons — more graphic than a plain Apple headline, layered on top of the calm baseline rather than replacing it.
- **Color**: near-monochrome (white/black + neutral grays), one accent color used sparingly. Drop the purple/yellow/blue mix currently in use.
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
- `MagicButton` — simplify to a clean pill/underline CTA, drop the glow.

~~Globe (`cobe`) in About~~ — removed entirely (done, see Cleanup Plan).

## Section-by-section ideas

### Hero
- Drop the dotted grid background.
- Name as large static type (no typewriter), with one word in the accent color, italicized (graphic-accent direction). Role/title sits in a bordered pill badge underneath, one calm subtitle treatment overall.
- Floating callout card overlapping/flanking the headshot (reference pattern) — but only one, stat-style, since there's no testimonial content to fill a second card. Content TBD when we build this section (candidates: years of experience, current role/employer, or language count — decide then).
- CTA button below becomes a chunky pill shape (ties into the typographic-accent direction), not the current bordered-glow `MagicButton`.
- Candidate signature moment: cursor-reactive subtle gradient/glow behind the headshot, instead of the grid pattern.

### About
- Currently a bento-style grid of cards (about text, languages). Keep the grid layout — it's a reasonable Apple-adjacent pattern (cf. Apple's feature grids) — but remove `border-2` entirely rather than just softening it; let cards read as distinct via a subtle background-shade shift, not an outline. Drop heavy hover `scale(1.05)` in favor of subtle elevation on hover.

### Tech Stack
- Switch from flowing pill badges to an icon-tile grid (reference pattern: square tiles, one icon each) — but built with soft background-shade tiles, no hard borders, consistent with the no-hard-edges rule. Drop hover `scale(1.2)` bounce in favor of a subtle opacity/elevation change.
- Include one wider stat tile alongside the icon tiles (reference pattern: "4 Years Experience" callout) — gives the grid an asymmetric focal point instead of being purely uniform icons.

### Work Experience
- Replace `AnimatedBorderCard` with a borderless card — no outline at all, just a background-shade shift from the page background (consistent with the no-hard-edges direction) — and clean divider lines between roles instead of a glowing border.
- Remove the leftover `01 02 03 04` decorative tab strip artifact in the top-left corner of the current job card (dead chrome from the border-animation component, not intentional UI).
- Company imagery (Booz Allen marketing banner, FyrKode logo tile, ProductPlan dashboard screenshot) is visually inconsistent — different crops/styles/colors. Needs a consistent treatment (e.g. uniform aspect ratio + crop, or a consistent logo-on-neutral-bg treatment) rather than raw screenshots.
- Consider an asymmetric showcase layout for this (reference pattern: one large image + a row of smaller cropped images with captions) instead of uniform stacked cards, once the imagery-consistency issue above is fixed — raw inconsistent screenshots would undermine this layout more than the current stacked one.
- This is a good candidate for the scroll-linked reveal (cards/timeline entries fade/slide in as you scroll).

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
   - [ ] Tech Stack — `TechStack.module.scss`, switch to borderless icon-tile grid + stat tile, remove hover `scale(1.2)` bounce.
   - [ ] About — `About.module.scss`, flatten card chrome (`border-2`, hover `scale(1.05)`) now that it's a clean two-card layout post-globe-removal.
   - [ ] Hero — `Hero.module.scss`, apply new type/color, italic accent word + bordered role pill, chunky pill CTA, floating stat callout card, add cursor-reactive signature moment if chosen.
   - [ ] Work Experience — `WorkExperience.module.scss`, biggest lift: rebuild card without `AnimatedBorderCard`, fix company imagery consistency, fold tech tags into accent system, consider asymmetric showcase layout, review `PreviousExperienceExpandable` styling (currently unreviewed).

5. **Layer in signature moments** (scroll-linked reveals, theme toggle transition, etc.) once the calm baseline reads consistently across all sections in both themes. Pick 2-3 from:
   - [ ] Cursor-reactive gradient/glow in the hero (replaces the dotted grid).
   - [ ] Scroll-linked reveal sequence across sections (fade/slide-up, staggered).
   - [ ] Custom dark/light theme toggle with a smooth, deliberate transition (not just an instant class swap).

6. **Remove Tailwind entirely** (only once every component above is ported off it):
   - [ ] Uninstall `tailwindcss`, `@tailwindcss/postcss`, `tailwindcss-animate`, `mini-svg-data-uri`, `tailwind-merge`.
   - [ ] Delete `tailwind.config.ts` and the Tailwind PostCSS config.
   - [ ] Simplify or remove `cn()` in `lib/utils.ts` (no more class-merge conflicts to resolve without Tailwind).
   - [ ] Grep for any leftover Tailwind classNames that slipped through the section-by-section pass.

