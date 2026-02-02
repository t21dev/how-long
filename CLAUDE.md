# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"How Long?" is a single-page date distance calculator built with React 19, TypeScript, and Vite. It calculates time between two dates with a glass-morphism UI aesthetic. The full product spec lives in `spec.md`.

## Commands

- `npm run dev` — Start Vite dev server with HMR
- `npm run build` — Type-check with `tsc -b` then bundle with Vite
- `npm run lint` — Run ESLint across all `.ts`/`.tsx` files
- `npm run preview` — Serve the production build locally

No test framework is configured yet.

## Tech Stack

- **React 19** with **React Compiler** (via `babel-plugin-react-compiler` in Vite config)
- **TypeScript 5.9** — Strict mode, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`
- **Vite 7** — Build tool and dev server
- **Tailwind CSS v4** — Styling (per spec, not yet installed)
- **date-fns** — Date calculations (per spec, not yet installed)
- **Framer Motion** — Animations (optional, per spec)

## Architecture

The spec defines this component structure:

```
src/
├── components/
│   ├── DateInput.tsx        # Native date picker wrapper
│   ├── ResultDisplay.tsx    # Primary + secondary time results
│   ├── FunFact.tsx          # Contextual fun stats
│   ├── ThemeToggle.tsx      # Dark/light theme switch
│   └── FromDateToggle.tsx   # Custom reference date toggle
├── hooks/
│   └── useDateDistance.ts   # Core date calculation logic
├── utils/
│   └── funFacts.ts          # Fun fact generator
├── App.tsx                  # Root component
└── main.tsx                 # Entry point
```

**Key patterns:**
- Business logic goes in custom hooks (`hooks/`), not components
- Utility/data functions go in `utils/`
- Default behavior compares a selected date to today; optional custom "from" date
- Bidirectional: handles both past ("ago") and future ("until") dates
- Dark theme is the default; light theme via toggle
- Glass-morphism aesthetic: `bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl`

## TypeScript Configuration

- Target: ES2022, Module: ESNext with bundler resolution
- `verbatimModuleSyntax` is enabled — use `import type` for type-only imports
- `erasableSyntaxOnly` is enabled — avoid enums and parameter properties; use `as const` objects instead
