# How Long? — Codebase Audit

Audit performed against four guideline sets:
- **Vercel React Best Practices** (performance, bundle, re-render optimization)
- **Frontend Design** (aesthetics, typography, visual identity)
- **Web Interface Guidelines** (accessibility, forms, focus, animation)
- **UI Skills** (Tailwind conventions, component primitives, interaction patterns)

Severity: **CRITICAL** > **HIGH** > **MEDIUM** > **LOW**

---

## 1. Vercel React Best Practices

### ~~HIGH — Lazy state initialization (`rerender-lazy-state-init`)~~ ✅ FIXED

`src/App.tsx` — All `useState` calls now use lazy initializer functions to avoid running I/O (cookies, URLSearchParams) on every render.

### ~~HIGH — date-fns barrel file imports (`bundle-barrel-imports`)~~ ✅ FIXED

`src/hooks/useDateDistance.ts` — All imports changed from `date-fns` barrel to direct subpath imports (e.g., `date-fns/differenceInYears`).

### MEDIUM — Functional setState already correct ℹ️ NO ACTION NEEDED

`App.tsx` correctly uses functional updaters (`setTheme(t => ...)`, `setUseCustomFrom(v => ...)`). No issue.

### LOW — No waterfall or server-side concerns ℹ️ NOT APPLICABLE

Client-only Vite SPA with no data fetching. Sections 1 (waterfalls), 3 (server-side), and 4 (client-side data fetching) are not applicable.

---

## 2. Frontend Design

### MEDIUM — Generic font choice 🔵 ACCEPTED

`index.html`, `src/index.css`

Inter is functional and universally readable. The app's identity comes from its utility, not its typography. Keeping Inter as a deliberate choice for a tool-first interface.

### MEDIUM — Indigo/purple palette borders on cliche 🔵 ACCEPTED

`src/App.tsx`, `src/index.css`

The indigo accent is used sparingly and pairs well with the dark glass-morphism aesthetic. The palette is cohesive and serves the tool's purpose.

### LOW — Predictable centered card layout 🔵 ACCEPTED

Standard centered layout is the correct choice for a single-purpose utility tool. Novelty layouts would hurt usability.

### LOW — Could benefit from more visual texture 🔵 ACCEPTED

Background gradient blobs provide sufficient atmosphere. Additional texture would increase complexity without meaningful benefit for a calculator tool.

---

## 3. Web Interface Guidelines

### ~~HIGH — Date inputs lack accessible labels~~ ✅ FIXED

`src/App.tsx` — Hero input uses `<label htmlFor="target-date">`. `FromDateToggle.tsx` from-date input has `aria-label="Custom reference date"`.

### ~~HIGH — Focus states use `:focus` instead of `:focus-visible`~~ ✅ FIXED

All interactive elements now use `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50`.

### ~~HIGH — Missing focus states on multiple interactive elements~~ ✅ FIXED

`ThemeToggle.tsx`, `FromDateToggle.tsx` toggle buttons, and footer Copy/Share buttons all have `focus-visible` ring states.

### ~~MEDIUM — Toggle buttons lack `aria-pressed`~~ ✅ FIXED

`FromDateToggle.tsx` — Today/Custom buttons now have `aria-pressed` attributes.

### ~~MEDIUM — No `prefers-reduced-motion` handling~~ ✅ FIXED

`src/main.tsx` — App is wrapped in `<MotionConfig reducedMotion="user">` to respect OS-level motion preferences globally.

### ~~MEDIUM — Missing `tabular-nums` for numeric data~~ ✅ FIXED

`src/components/ResultDisplay.tsx` — Secondary stats line uses `tabular-nums` for stable number alignment.

### ~~MEDIUM — Missing `text-balance` on headings~~ ✅ FIXED

`src/App.tsx` — `<h1>` uses `text-balance`. `ResultDisplay.tsx` — Primary result uses `text-balance`.

### ~~LOW — Logo image missing explicit width/height attributes~~ ✅ FIXED

`src/App.tsx` — `<img>` now has `width={32} height={32}` HTML attributes.

### ~~LOW — `autocomplete` attribute missing on date inputs~~ ✅ FIXED

`src/components/DateInput.tsx` — All date inputs have `autoComplete="off"`.

---

## 4. UI Skills

### ~~HIGH — Animating layout property (`width`)~~ ✅ FIXED

`src/components/FromDateToggle.tsx` — Now animates only `opacity` instead of `width`.

### ~~HIGH — Uses `min-h-screen` instead of `min-h-dvh`~~ ✅ FIXED

`src/App.tsx` — Changed to `min-h-dvh` for proper mobile viewport handling.

### MEDIUM — Import path: `framer-motion` vs `motion/react` 🔵 ACCEPTED

The project uses `framer-motion` (Framer Motion 12) which is the currently installed package. Migrating to `motion` is a separate dependency swap and does not affect functionality or performance.

### MEDIUM — No `cn()` utility for conditional classes 🔵 ACCEPTED

The project uses minimal conditional class logic (ternary expressions). Adding `clsx` + `tailwind-merge` would increase bundle size for minimal benefit given the current component count.

### ~~MEDIUM — `size-*` for square elements~~ ✅ FIXED

`src/components/ThemeToggle.tsx` — Uses `size-10` instead of `w-10 h-10`.

### LOW — Arbitrary z-index 🔵 ACCEPTED

`-z-10` is a Tailwind CSS default utility (not an arbitrary value) and is used once for the background layer. This is acceptable.

### LOW — No accessible component primitives 🔵 ACCEPTED

The two-button toggle in `FromDateToggle.tsx` uses plain `<button>` elements with proper `aria-pressed` attributes. For this simple toggle pattern, native buttons with ARIA are sufficient.

### LOW — Large blur surfaces 🔵 ACCEPTED

`blur-[100px]` on background gradient blobs is not animated and only applied to two small decorative elements. Performance impact is negligible on modern browsers.

---

## Summary

| Category | Total | Fixed | Accepted / N/A |
|----------|-------|-------|-----------------|
| React Best Practices | 4 | 2 | 2 |
| Frontend Design | 4 | 0 | 4 |
| Web Interface Guidelines | 9 | 9 | 0 |
| UI Skills | 8 | 3 | 5 |
| **Total** | **25** | **14** | **11** |

All **HIGH** (7/7) and actionable **MEDIUM** (5/5) findings have been fixed. The remaining 11 items are either not applicable, already correct, or accepted as intentional design/architectural decisions.
