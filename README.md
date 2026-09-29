# Itzfizz Scroll Car Animation

A production-focused Next.js recreation of the scroll-driven car hero reference at `https://paraschaturvedi.github.io/car-scroll-animation/`.

The page uses a pinned full-screen hero, a left-to-right top-view car animation, a growing green trail, progressive headline letter reveals, and statistic cards that enter individually on initial page load.

## Technology Stack

- Next.js App Router
- React
- JavaScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Static export for GitHub Pages

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Open the local URL printed by Next.js.

## Build

```bash
npm run build
```

The static export is written to `out/`.

## Lint

```bash
npm run lint
```

## Animation Implementation

The primary animation lives in `src/components/Hero.jsx` beside the markup it controls.

- `ScrollTrigger` pins the hero track while the page scrolls through the animation range.
- The car moves across the road using transform-based GSAP interpolation.
- The green trail width is updated from the car's live position.
- Headline letters reveal as the car crosses their screen position.
- Statistic cards fade in on initial load with subtle staggered timing.
- `gsap.context()` scopes animations to the React component and cleans up ScrollTriggers safely.
- `prefers-reduced-motion` users receive the composed hero without scroll-linked movement.

## Deployment

GitHub Pages deployment is configured in `.github/workflows/deploy.yml`.

1. Push the repository to GitHub.
2. Enable GitHub Pages with GitHub Actions as the source.
3. Push to `main` or run the workflow manually.

For GitHub Pages, the build uses `GITHUB_PAGES=true` so `next.config.mjs` applies the repository base path and asset prefix.

## Links

- Live website: https://kanishik0011.github.io/Itzfizz/
- GitHub repository: https://github.com/kanishik0011/Itzfizz
