# Christen Loyola — Portfolio

Personal portfolio for Christen I. Loyola, an AI/ML and software engineer based in Adelaide, Australia. A single-page, dark editorial site that showcases shipped projects, experience, and how to get in touch.

> **Live:** https://christenloyolaportofliowebsite.vercel.app/

## Highlights

- **Full-bleed hero** with a cinematic portrait, cursor parallax, a time-of-day greeting, and a rolling 3D cube that flips through roles.
- **Projects showcase** in a scroll-driven carousel: a thumbnail rail, a centre stage that swaps with a diagonal transition, and per-project year, description, and tech stack.
- **What I Do** accordion and a **proof-of-work Experience** timeline with per-role stacks and links to each company.
- **Contact** section with a real-time rotating circular email (mailto), a blended portrait, socials, and a cursor "hello" interaction.
- Smooth scrolling, scroll-reveal animations, an intro loader, and an infinite loop back to the top at the page end.
- Fully responsive and respects `prefers-reduced-motion`.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS v4
- [Framer Motion](https://www.framer.com/motion/) — hero scroll-scrub and parallax
- [GSAP](https://gsap.com/) + ScrollTrigger + SplitText — reveals and the line-by-line blur
- [Lenis](https://lenis.darkroom.engineering/) — smooth scroll

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
src/
  app/            App Router pages, layout, and global styles
  components/     Hero, Work (projects), Contact, Nav, animations, etc.
  data/
    content.ts    All site content (profile, projects, experience, skills)
public/           Images and static assets
```

Most copy and data live in [`src/data/content.ts`](src/data/content.ts) — edit there to update the site.

## Deployment

Deployed on [Vercel](https://vercel.com/). Pushing to `main` triggers a new production deploy automatically.
