# Iojoy — Modern Portfolio

A premium, single-page portfolio built with Tailwind CSS + vanilla JavaScript. It features video storytelling, a custom notch-style navigation, a fast search overlay, and a live GitHub workspace that pulls repositories from the GitHub API.

## Features

- Video-first hero + work cards with smart offscreen pause/resume
- Custom notch navigation with active indicator + smooth internal routing
- Search overlay for sections, projects, and GitHub repositories
- Live GitHub profile + repository grid (cached + paginated)
- Performance-focused effects (scroll jank reduction + reduced-effects mode)

## Tech Stack

- HTML5
- Tailwind CSS (build-time, purged + minified)
- JavaScript (vanilla)
- Feather Icons
- Google Fonts (Manrope, Sora, Space Grotesk)

## Project Structure

```text
.
├─ assets/
│  ├─ tailwind.css          # generated (build output)
│  └─ video/
├─ src/
│  └─ tailwind.css          # Tailwind input entry
├─ index.html
├─ script.js
├─ tailwind.config.js
├─ package.json
└─ package-lock.json
```

## Getting Started

### Prerequisites

- Node.js (for building Tailwind CSS)

### Install

```bash
npm install
```

### Build CSS (Production)

```bash
npm run build
```

### Run Locally

- Open `index.html` directly, or use VS Code Live Server.
- Ensure internet access for:
  - Google Fonts
  - Feather Icons
  - GitHub API requests

### Tailwind Watch (Optional)

```bash
npm run dev:css
```

## Customization

- Update your profile/social links in `script.js` → `portfolioConfig.profile`
- Replace videos in `assets/video/` and update `<source>` paths in `index.html`

## Screenshots

Add screenshots in `assets/screenshots/` and reference them here:

- `assets/screenshots/home.png`
- `assets/screenshots/work.png`
- `assets/screenshots/github.png`

## Deployment

### Netlify (Recommended for static sites)

- Build command: `npm run build`
- Publish directory: `.`

### Vercel

- If you commit `assets/tailwind.css`, you can deploy as a static site with no build step.
- If you want Vercel to build Tailwind on deploy:
  - Build command: `npm run build`
  - Output directory: `.`

## Future Improvements

- Add WebM sources (`<source type="video/webm">`) for smaller video payloads
- Add `poster` images for instant video placeholders
- Add JS bundling/minification (optional) for even faster first load
- Add a blog section + RSS feed + sitemap
- Add automated Lighthouse performance budgets (CI)
