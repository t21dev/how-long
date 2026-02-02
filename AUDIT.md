# How Long? — Codebase Audit

Audit performed against four guideline sets:
- **Vercel React Best Practices** (performance, bundle, re-render optimization)
- **Frontend Design** (aesthetics, typography, visual identity)
- **Web Interface Guidelines** (accessibility, forms, focus, animation)
- **UI Skills** (Tailwind conventions, component primitives, interaction patterns)

Severity: **CRITICAL** > **HIGH** > **MEDIUM** > **LOW**

---

## 1. Vercel React Best Practices

### HIGH — Lazy state initialization (`rerender-lazy-state-init`)

`src/App.tsx:25`

`getInitialState()` reads `localStorage` and `URLSearchParams` on **every render**, not just initialization. `useState` ignores the argument after mount but the computation still runs.

```tsx
// Current — runs every render
const initial = getInitialState();
const [targetDate, setTargetDate] = useState(initial.targetDate);

// Fix — runs only once
const [targetDate, setTargetDate] = useState(() => {
  const params = new URLSearchParams(window.location.search);
  return params.get('date') || localStorage.getItem('howlong-target-date') || '';
});
```

> Note: React Compiler may auto-memoize this, but explicit lazy init is still the correct pattern and avoids reliance on compiler optimization for I/O operations.

### HIGH — date-fns barrel file imports (`bundle-barrel-imports`)

`src/hooks/useDateDistance.ts:1-13`

Importing from `date-fns` barrel file pulls the entire module graph during dev, slowing HMR and cold starts. `date-fns` is specifically listed as a commonly affected library.

```tsx
// Current
import { differenceInYears } from 'date-fns';

// Fix — direct imports
import { differenceInYears } from 'date-fns/differenceInYears';
import { differenceInMonths } from 'date-fns/differenceInMonths';
// ... etc
```

Vite tree-shakes for production builds, so this primarily affects DX speed.

### MEDIUM — Functional setState already correct

`App.tsx:119` and `App.tsx:149` correctly use functional updaters (`setTheme(t => ...)`, `setUseCustomFrom(v => ...)`). No issue.

### LOW — No waterfall or server-side concerns

This is a client-only Vite SPA with no data fetching. Sections 1 (waterfalls), 3 (server-side), and 4 (client-side data fetching) of the Vercel guide are not applicable.

---

## 2. Frontend Design

### MEDIUM — Generic font choice

`index.html:12`, `src/index.css:5`

Inter is listed as one of the "overused font families" that produce generic AI aesthetics. The guideline specifically calls out: *"NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts)."*

**Suggested alternatives**: A distinctive display font for the heading (e.g., Instrument Serif, Cabinet Grotesk, Satoshi, Syne) paired with a refined body font (e.g., General Sans, Switzer, or even keeping Inter for body while using a character display font for `<h1>`).

### MEDIUM — Indigo/purple palette borders on cliche

`src/App.tsx:104-105`, `src/index.css:6-7`

The guideline warns against *"cliched color schemes (particularly purple gradients on white backgrounds)"*. The indigo accent (`#6366f1`) is very close to the purple family. While the dark glass-morphism gives it more character than a typical "AI purple on white" look, the palette could be more distinctive.

**Alternatives to consider**: warm amber/coral, teal/cyan, or an unexpected accent like chartreuse or vermillion.

### LOW — Predictable centered card layout

`src/App.tsx:108`

Standard centered single-column `max-w-md` layout. The guideline encourages *"unexpected layouts, asymmetry, overlap, diagonal flow, grid-breaking elements."* For a utility tool this layout is perfectly functional, but it won't be memorable.

### LOW — Could benefit from more visual texture

Background gradient blobs provide good atmosphere. Adding a subtle noise/grain overlay or geometric pattern could elevate the glass-morphism aesthetic further.

---

## 3. Web Interface Guidelines

### HIGH — Date inputs lack accessible labels

`src/components/DateInput.tsx:15-21`

The hero date input has "How long was" as visual context, but it's a `<span>`, not a `<label htmlFor="target-date">`. Screen readers won't associate the text with the input.

```tsx
// Fix in App.tsx:127
<label htmlFor="target-date" className="text-lg text-gray-600 dark:text-white/60 whitespace-nowrap">
  How long was
</label>
```

Similarly, the "from" date input in `FromDateToggle.tsx` has no label. Add `aria-label="Custom reference date"` to the `DateInput` when used there.

### HIGH — Focus states use `:focus` instead of `:focus-visible`

`src/components/DateInput.tsx:20`

```
focus:outline-none focus:ring-2 focus:ring-indigo-500/50
```

Should be `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50`. Using `:focus` shows focus rings on mouse clicks too, which is visually noisy. `:focus-visible` only shows for keyboard navigation.

### HIGH — Missing focus states on multiple interactive elements

- `src/components/ThemeToggle.tsx:12` — no focus ring defined
- `src/components/FromDateToggle.tsx:23,34` — toggle buttons have no focus states
- `src/App.tsx:173,180` — footer Copy/Share buttons have no focus states

All interactive elements need visible `focus-visible:ring-*` or equivalent.

### MEDIUM — Toggle buttons lack `aria-pressed`

`src/components/FromDateToggle.tsx:21-41`

The Today/Custom buttons function as a toggle group but don't communicate state to assistive technology. Add `aria-pressed={!useCustom}` and `aria-pressed={useCustom}` respectively, or use `role="tablist"` with `role="tab"` and `aria-selected`.

### MEDIUM — No `prefers-reduced-motion` handling

`src/components/ResultDisplay.tsx`, `FunFact.tsx`, `ThemeToggle.tsx`, `FromDateToggle.tsx`

All Framer Motion animations play regardless of user motion preferences. Add:

```tsx
// At the top of animated components or globally
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Then conditionally apply:
initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
```

Or use Framer Motion's `useReducedMotion()` hook.

### MEDIUM — Missing `tabular-nums` for numeric data

`src/components/ResultDisplay.tsx:53`

The secondary stats line (days, weeks, hours) contains numbers that shift when values change. Add `tabular-nums` for stable alignment:

```tsx
<p className="text-sm text-gray-400 dark:text-white/40 tabular-nums">
```

### MEDIUM — Missing `text-balance` on headings

`src/App.tsx:113`

```tsx
// Current
<h1 className="text-2xl font-bold text-gray-900 dark:text-white">

// Fix
<h1 className="text-2xl font-bold text-gray-900 dark:text-white text-balance">
```

Also `src/components/ResultDisplay.tsx:44` — the primary result text acts as a heading-like element and should use `text-balance`.

### LOW — Logo image missing explicit width/height attributes

`src/App.tsx:112`

```tsx
<img src="/favicon.svg" alt="" className="w-8 h-8" />
```

Uses Tailwind sizing but lacks HTML `width` and `height` attributes, which help prevent layout shift during load.

### LOW — `autocomplete` attribute missing on date inputs

`src/components/DateInput.tsx:16` — add `autoComplete="off"` since date pickers don't benefit from autocomplete.

---

## 4. UI Skills

### HIGH — Animating layout property (`width`)

`src/components/FromDateToggle.tsx:46-48`

```tsx
initial={{ opacity: 0, width: 0 }}
animate={{ opacity: 1, width: 'auto' }}
exit={{ opacity: 0, width: 0 }}
```

Violates: *"NEVER animate layout properties (width, height, top, left, margin, padding)."* Animating `width` triggers layout recalculations. Use `transform: scaleX()` with `overflow-hidden`, or animate only `opacity` and use `display`/`grid` tricks for reveal.

```tsx
// Alternative — opacity-only with grid collapse
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  <DateInput ... />
</motion.div>
```

### HIGH — Uses `min-h-screen` instead of `min-h-dvh`

`src/App.tsx:100`

```
min-h-screen
```

Should be `min-h-dvh`. On mobile Safari, `100vh` doesn't account for the dynamic address bar, causing content to be hidden behind it. `dvh` (dynamic viewport height) fixes this.

### MEDIUM — Import path: `framer-motion` vs `motion/react`

`src/components/ResultDisplay.tsx:1`, `FunFact.tsx:1`, `ThemeToggle.tsx:1`, `FromDateToggle.tsx:1`

The skill specifies `motion/react` as the canonical import. Framer Motion has been rebranded as Motion. Consider migrating:

```bash
npm uninstall framer-motion && npm install motion
```

Then update imports from `'framer-motion'` to `'motion/react'`.

### MEDIUM — No `cn()` utility for conditional classes

Multiple files use template literal string concatenation for conditional classes:
- `src/components/FromDateToggle.tsx:23-26,34-37`
- `src/components/DateInput.tsx:9-12`

The skill requires `cn` utility (clsx + tailwind-merge) for class logic:

```bash
npm install clsx tailwind-merge
```

```tsx
// src/utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### MEDIUM — `size-*` for square elements

`src/components/ThemeToggle.tsx:12`

```
w-10 h-10
```

Should use `size-10` for square elements per the layout rule.

### LOW — Arbitrary z-index

`src/App.tsx:102`

```
-z-10
```

The skill says *"MUST use a fixed z-index scale (no arbitrary z-*)"*. Use a defined scale (e.g., `z-0`, `z-10`, `z-20`). `-z-10` is a Tailwind default value so this is borderline — acceptable if the project establishes it as the "background" layer.

### LOW — No accessible component primitives

The toggle (Today/Custom) in `FromDateToggle.tsx` is built with plain `<button>` elements. For more complex keyboard and focus behavior, the skill recommends Base UI, Radix, or React Aria. For this simple two-button toggle, plain buttons are acceptable but the tab-like pattern would benefit from proper `role="tablist"` semantics.

### LOW — Large blur surfaces

`src/App.tsx:104-105`

```
blur-[100px]
```

The skill warns: *"NEVER animate large blur() or backdrop-filter surfaces."* These blurs aren't animated, but a 100px blur radius on 72x72-sized elements is computationally expensive on lower-end devices. Consider reducing to `blur-3xl` (64px) or using static gradient images.

---

## Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| React Best Practices | 0 | 2 | 0 | 1 |
| Frontend Design | 0 | 0 | 2 | 2 |
| Web Interface Guidelines | 0 | 3 | 4 | 2 |
| UI Skills | 0 | 2 | 3 | 3 |
| **Total** | **0** | **7** | **9** | **8** |

### Top priority fixes

1. **Accessible labels** for date inputs (`<label htmlFor>` and `aria-label`)
2. **`focus-visible`** instead of `focus` on all interactive elements
3. **`min-h-dvh`** instead of `min-h-screen`
4. **Stop animating `width`** in FromDateToggle
5. **Lazy state initialization** for localStorage reads
6. **date-fns direct imports** for faster dev experience
7. **Add missing focus states** on ThemeToggle, FromDateToggle buttons, footer buttons
