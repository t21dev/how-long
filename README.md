<p align="center">
  <img src="public/favicon.svg" alt="How Long? logo" width="80" height="80" />
</p>

<h1 align="center">How Long?</h1>

<p align="center">A sleek, minimalist date distance calculator. Pick any date and instantly see how much time has passed — or remains — broken down into years, months, days, weeks, and hours. Plus contextual fun facts like heartbeats elapsed and Mars orbits completed.</p>

**[Report Bug](https://github.com/t21dev/how-long/issues)** &nbsp;&middot;&nbsp; **[Request Feature](https://github.com/t21dev/how-long/issues)**

---

## Features

- **Bidirectional** — works for past dates ("ago") and future dates ("from now")
- **Custom reference date** — compare any two dates, not just against today
- **Multiple units** — years/months/days breakdown plus total days, weeks, and hours
- **Fun facts** — contextual stats (heartbeats, Moon cycles, Mars orbits, and more)
- **Shareable URLs** — every calculation is encoded in the URL (`?date=2023-05-14&from=2025-01-01`)
- **Copy to clipboard** — one-click copy of the result text or share link
- **Keyboard shortcut** — `Cmd/Ctrl + K` to focus the date picker
- **Dark / Light theme** — dark by default with a toggle, preference saved in cookies
- **Remembers your last date** — persisted via cookies across sessions
- **Responsive** — fully mobile-friendly with a sticky header on small screens
- **PWA-ready** — includes a web app manifest for installability
- **Accessible** — semantic HTML, `aria` attributes, `focus-visible` states, and `prefers-reduced-motion` support

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [React 19](https://react.dev) with [React Compiler](https://react.dev/learn/react-compiler) |
| Language | [TypeScript 5.9](https://www.typescriptlang.org/) (strict mode) |
| Build | [Vite 7](https://vite.dev) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Dates | [date-fns 4](https://date-fns.org) |
| Animation | [Framer Motion 12](https://www.framer.com/motion/) |
| Cookies | [js-cookie](https://github.com/js-cookie/js-cookie) |
| Linting | [ESLint](https://eslint.org/) with TypeScript + React Hooks plugins |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- npm (ships with Node)

### Installation

```bash
git clone https://github.com/t21dev/how-long.git
cd how-long
npm install
```

### Development

```bash
npm run dev
```

Opens a local dev server at `http://localhost:5173` with hot module replacement.

### Build

```bash
npm run build
```

Type-checks with `tsc` then bundles with Vite. Output goes to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Generate OG Image

```bash
npm run generate:og
```

Converts `public/og-image.svg` to `public/og-image.png` (1200x630) using [sharp](https://sharp.pixelplumbing.com/).

## Project Structure

```
src/
├── components/
│   ├── DateInput.tsx          # Native date picker with accessible label support
│   ├── ResultDisplay.tsx      # Primary + secondary time distance output
│   ├── FunFact.tsx            # Contextual fun stat with animated transitions
│   ├── ThemeToggle.tsx        # Dark/light mode toggle button
│   └── FromDateToggle.tsx     # Today / Custom reference date selector
├── hooks/
│   └── useDateDistance.ts     # Core date calculation logic (date-fns)
├── utils/
│   ├── cookies.ts             # Cookie get/set/remove wrapper (js-cookie)
│   └── funFacts.ts            # Deterministic fun fact generator
├── App.tsx                    # Root component — state, effects, layout
├── main.tsx                   # Entry point — React root + MotionConfig
└── index.css                  # Tailwind v4 import + dark mode variant + base styles
```

## URL Parameters

| Param | Example | Description |
|-------|---------|-------------|
| `date` | `?date=2023-05-14` | Target date to calculate distance for |
| `from` | `&from=2025-01-01` | Optional custom reference date (defaults to today) |

Both parameters are synced to the URL as you interact, making every result shareable by copying the address bar.

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Focus the date picker |

## Cookies

The app stores two cookies (expire after 1 year, `SameSite=Lax`):

| Cookie | Purpose |
|--------|---------|
| `howlong-target-date` | Remembers the last date you entered |
| `howlong-theme` | Persists your dark/light theme preference |

No analytics, no tracking, no third-party cookies.

## Deployment

The project works out of the box on any static hosting platform:

- **[Vercel](https://vercel.com)** — `npm run build`, output dir `dist`
- **[Netlify](https://netlify.com)** — same as above
- **[Cloudflare Pages](https://pages.cloudflare.com)** — same as above
- **GitHub Pages** — build and deploy `dist/`

> **Note:** For Open Graph images to work on social platforms, update the `og:image` meta tag in `index.html` to use your full production URL (e.g., `https://yourdomain.com/og-image.png`).

## Contributing

Contributions are welcome. To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Run `npm run lint` and `npm run build` to verify
5. Commit and push
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built by [t21dev](https://github.com/t21dev)
