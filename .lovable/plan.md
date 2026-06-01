# PLEVID — About Us page

A direct structural port of the reference About page, rebuilt for PLEVID (architectural lighting, Mumbai). Black canvas, oversized lowercase typography, single lime accent (#C8FF4D), three images max, hand-drawn curved process path.

## Route & files

- Replace `src/routes/index.tsx` with the About Us page (single-page brief — this is the page).
- Save the uploaded PLEVID logo as a Lovable asset and use it in the top-left of the nav.
- Generate 3 architectural lighting images via `imagegen` into `src/assets/`:
  1. Small monochrome lighting project (top-left floating, ~180×220)
  2. Large vertical hero image — luxury hotel lobby / staircase lighting installation (4:5, center)
  3. Small architectural spotlight detail (right-side floating, ~140×170)
- Update root `head()` with PLEVID title + description + og tags.

## Design tokens (src/styles.css)

- `--background: oklch(0 0 0)` (#000)
- `--foreground: oklch(1 0 0)` (#fff)
- `--accent: oklch(0.93 0.19 125)` (≈ #C8FF4D)
- Add font: Inter Tight (weights 400/500/900) + a serif italic for small "process." / "main / about us" labels (Instrument Serif or similar) via Google Fonts in root head links.
- Body defaults: black bg, white text, Inter Tight.

## Page structure (top → bottom)

1. **Nav bar** — thin top row. Left: PLEVID logo (small, white). Center: `about us · works · projects · brands · contact us`. Right: pill `get in touch` outlined.
2. **Hero composition**
   - Top-center tiny italic accent label: `main / about us`
   - Floating image 1 (top-left, slight offset)
   - Center large 4:5 lighting image
   - Floating image 2 (right, lower than image 1)
   - Massive `about us` headline, lowercase, weight 900, tracking tight, scaled to ~92vw using `clamp()`. Sits directly under the image stack and dominates.
3. **Intro band**
   - Tiny `+` glyph centered, thin vertical divider
   - Small centered caption: `Based in Mumbai. Lighting across India.`
   - Large centered statement (clamp ~40–72px, weight 700): *"we illuminate spaces through architectural lighting, global design partnerships, and thoughtful execution."*
   - Narrow right-offset paragraph (max-w ~420px) with the two-paragraph Plevid Group copy from the brief.
4. **Process section**
   - Italic accent label `process.` at top center
   - Single SVG curved path running vertically down ~1600px, 1px stroke, accent color, with subtle loops mirroring the reference's hand-drawn curve
   - 6 steps anchored to points along the path, alternating left/right:
     - 01 research · 02 design concept · 03 lighting plan · 04 project execution · 05 customisation · 06 delivery
   - Each step: small accent dot on the path, accent italic number (`01.`), bold lowercase title, 3-line description, max-w ~260px.
5. **why plevid.** section
   - Heading `why plevid.` left-aligned, large (clamp 56–120px), weight 900, lowercase
   - 4 items as a 2-col editorial list (no cards, no icons): small accent number, bold title, one-line description, generous row gap.
6. **Closing statement**
   - Full-viewport centered slogan: `we don't sell lights.` / `we shape experiences.` — massive, lowercase, weight 900, two stacked lines.
7. **Footer** — minimal: PLEVID wordmark left, Mumbai · India right, thin top border.

## Technical notes

- All sizing via `clamp()` for fluid type; no breakpoint-specific JSX needed beyond Tailwind's md: for nav.
- Process path: inline SVG with a single `<path>` using cubic beziers; absolutely-positioned step blocks aligned by percentage. No animation libraries required; optional subtle `stroke-dasharray` reveal on scroll via IntersectionObserver can be added but is not essential to the brief.
- Images via `imagegen` (standard tier) saved to `src/assets/hero-lighting.jpg`, `src/assets/float-1.jpg`, `src/assets/float-2.jpg`, then imported as ES modules.
- Logo: copy uploaded PNG to `src/assets/plevid-logo.png` and import.
- `head()` on the index route: title `PLEVID — About`, description from intro paragraph, og:image = hero lighting asset.
- Respect rules: no cards, no shadows, no gradients, accent used only on path/dots/labels/`+` glyph.

## Out of scope

- Other routes (works, contact) — not requested.
- Scroll animations beyond optional path reveal.
- CMS / data fetching.
