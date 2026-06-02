# PLEVID — motion & interaction layer

Add a restrained, scroll-driven motion layer to the existing About page. No new sections, no redesign — only behavior. All motion is tied to scroll position or viewport entry, never autoplay loops.

## Library

- Add `framer-motion` (already React 19 compatible) for `useScroll`, `useTransform`, and viewport reveals. Single dependency, tree-shakeable, SSR-safe.
- No GSAP, no ScrollTrigger, no Lenis. Native scroll only.

## Per-section behavior

**1. Hero title `about us`**
- Wrap the H1 in a `motion.h1` whose `scale` is driven by `useScroll({ target: heroRef, offset: ["start start", "end start"] })`.
- `scale: 0.68 → 1.0` across the first ~20% of scroll, then clamped at 1.0.
- `transform-origin: 50% 50%`. No opacity change, no Y movement. Easing: linear (scroll-linked).

**2. Hero images parallax**
- Same `useScroll` target as the title.
- Left float: `y: 0 → 40`
- Center hero: `y: 0 → 16`
- Right float: `y: 0 → 48`
- Pure `translateY`, no scale, no rotation. Movement caps when hero leaves viewport.

**3. Intro statement — progressive word reveal**
- Split the sentence into words at build time (`text.split(" ")`), render each as a `<motion.span>`.
- `useScroll` on the statement container with `offset: ["start 0.85", "start 0.25"]`.
- Each word's opacity = `useTransform(progress, [i/n, (i+1)/n], [0.12, 1])` — left-to-right spotlight sweep.
- No translate, no blur, no cursor. Initial opacity 0.12 is visible on first paint (no FOUC).

**4. Process timeline — scroll-drawn path**
- Give the `<path>` a ref; measure `getTotalLength()` in `useEffect`, store in state.
- Set `strokeDasharray = strokeDashoffset = length` initially.
- `useScroll` on the process section with `offset: ["start 0.8", "end 0.2"]`.
- `strokeDashoffset = useTransform(progress, [0,1], [length, 0])` via `motion.path`.
- Each of the 6 step blocks: `motion.div` with `initial={{opacity:0, y:20}}`, `whileInView={{opacity:1, y:0}}`, `viewport={{ once: true, amount: 0.6 }}`, `transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}`. The accent dot uses the same reveal with a 0.1s delay so it reads as "the line reached me, then I appeared".

**5. Generic section reveals**
- Intro band, why-plevid heading + items, footer: `motion.div` wrapper with `initial={{opacity:0, y:30}}`, `whileInView={{opacity:1, y:0}}`, `viewport={{ once: true, amount: 0.3 }}`, `transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}`.
- `why plevid.` items stagger via a parent `staggerChildren: 0.08`.

**6. Closing brand statement**
- `we don't sell lights.` — reveal on enter (`opacity 0→1, y 24→0`, 0.7s).
- `we shape experiences.` — same reveal, triggered when its own element hits `amount: 0.6` (naturally later in scroll). No extra orchestration needed; the scroll gap between the two lines provides the cinematic beat.

**7. Cursor light (optional, on by default, desktop only)**
- A single `position: fixed` div, 600px circle, `background: radial-gradient(closest-side, #C8FF4D, transparent)`, `filter: blur(100px)`, `opacity: 0.05`, `pointer-events: none`, `mix-blend-mode: screen`, `z-index: 1`.
- Position updated via `requestAnimationFrame` from a `mousemove` listener with lerp (factor 0.12) for soft trailing.
- Disabled when `matchMedia('(pointer: coarse)')` or `prefers-reduced-motion: reduce`.

## Accessibility & perf

- Wrap the whole motion layer behind a `prefers-reduced-motion` check: when set, all `motion.*` components fall back to static (`initial=false`, parallax `y=0`, title `scale=1`, words full opacity, path fully drawn).
- All scroll listeners use Framer's `useScroll` (rAF-batched). No manual scroll handlers except the cursor.
- `will-change: transform` only on the hero title and the three hero images.

## Files touched

- `src/routes/index.tsx` — refactor into small subcomponents (`HeroTitle`, `HeroImages`, `RevealStatement`, `ProcessTimeline`, `Reveal` wrapper, `CursorLight`). No layout, color, or copy changes.
- `package.json` — add `framer-motion`.

## Out of scope

- No new pages, copy, images, colors, fonts, or components.
- No page transitions, no smooth-scroll hijack, no loader, no counters.
