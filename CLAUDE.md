# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio built with **React 19 + TypeScript + Vite**, styled with **Tailwind CSS** and animated with **GSAP**. The visual theme is **Neo-Brutalism**: thick black borders, hard offset shadows (`8px 8px 0 0 #000`), flat colors, and monospaced typography.

## Commands

```bash
npm run dev       # Start dev server (Vite HMR)
npm run build     # Type-check (tsc -b) then bundle
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Stack & Key Dependencies

| Package | Purpose |
|---|---|
| `react` / `react-dom` v19 | UI framework |
| `vite` v8 + `@vitejs/plugin-react` | Build tool |
| `tailwindcss` | Utility-first CSS |
| `gsap` | Animation library |
| `lucide-react` | Icon set |
| `typescript` ~6.0 | Type safety |

## Design System (Neo-Brutalism)

Custom Tailwind tokens (defined in `tailwind.config.ts`):

| Token | Hex | Usage |
|---|---|---|
| `bgColor` | `#F3F0E0` | Page background (cream/beige) |
| `accentYellow` | `#F4DC5D` | Navbar, card headers, CTA buttons |
| `linkBlue` | `#89AEEA` | LinkedIn pill |
| `linkGreen` | `#9BDCBB` | WhatsApp pill |

**Border rule:** `border-2 border-black` on cards (thin frame), `border-4 border-black` on strong dividers.  
**Shadow rule:** `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]` on all card/interactive elements.  
**Typography:** `font-black` for headings; `font-mono` for code-like labels and nav links.

## Architecture

```
src/
  App.tsx                          # Root — flex column layout wrapping Navbar + Hero
  main.tsx                         # ReactDOM.createRoot entry point
  index.css                        # Global resets, Tailwind base, CSS keyframes
  App.css                          # (legacy, mostly empty)
  assets/                          # Static images
  features/
    navbar/
      Navbar.tsx                   # Top nav; logo has GSAP float animation
    hero/
      Hero.tsx                     # Main section; GSAP entrance + idle float for all cards
      InfoCard.tsx                 # Left card — name, bio, CTA buttons, social links
      TechStrip.tsx                # Left strip — scrolling marquee of tech names
    tech-stack/
      IdeWindow.tsx                # Right card — IDE-style window; post-its hang from bottom
      PostIt.tsx                   # Small decorative post-it (tape + body); GSAP sway
      techStack.constants.ts       # STACK_SECTIONS and POST_ITS data
  shared/
    components/
      Tag.tsx                      # Colored tech tag with neo-brutal shadow
    constants/
      tagColors.ts                 # Per-technology color map for Tag
    icons/
      GithubIcon.tsx
      LinkedinIcon.tsx
public/                            # Served as-is (favicon, icons.svg)
```

## GSAP Animation Conventions

All animations use `gsap.context()` for cleanup. Two animation tiers:

### 1. Entrance (one-shot, on mount)
```tsx
gsap.fromTo('.left-col',  { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.15 })
gsap.fromTo('.right-col', { opacity: 0, x: 56 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.45 })
```

### 2. Idle float (infinite, starts after entrance completes)
Each card element gets a continuous `y` oscillation with different `duration` and `delay` so they float out of phase.  
Post-its: GSAP-owned `rotation` oscillation (`gsap.set` to initialise from `data-rotate` attribute, then animate to `base ± 7deg`).

## CSS Keyframes (index.css)

| Class | Effect |
|---|---|
| `.cursor-blink` | 1s step-end blink |
| `.marquee-track` | 18s linear infinite scroll (TechStrip) |
| `.pulse-dot` | 1.4s ease-in-out opacity+scale pulse (availability badge dot) |

## GSAP Class Targets

| Class | Element | Used for |
|---|---|---|
| `.left-col` | InfoCard + TechStrip outer divs | Entrance animation |
| `.info-card` | InfoCard outer div | Idle float |
| `.tech-strip` | TechStrip outer div | Idle float |
| `.right-col` | IdeWindow outer wrapper | Entrance + idle float |
| `.post-it-item` | Each PostIt root div | Sway rotation (reads `data-rotate`) |

## TypeScript Config

Three tsconfig files:
- `tsconfig.json` — workspace root (references the two below)
- `tsconfig.app.json` — browser/React code (`src/`)
- `tsconfig.node.json` — Vite config (`vite.config.ts`)
