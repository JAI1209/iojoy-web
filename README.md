# Iojoy - Modern Portfolio

Iojoy is a responsive single-page portfolio for Jai Surya Kumar. It combines glassmorphism, local video storytelling, a custom notch-style mobile nav, and a live GitHub workspace that loads public repositories directly from GitHub.

## Page Overview

The page is built as a polished front-end portfolio with these main sections:

- Fixed top navbar with animated live time and date pill
- Full-screen hero section with video background
- About section with profile summary and skill highlights
- Work section with video-based showcase cards
- GitHub Workspace section with live profile data and repository grid
- Contact section with GitHub, LinkedIn, Instagram, WhatsApp, and email links
- Floating bottom notch navigation for quick section switching
- Search overlay for section, project, and repository discovery

## Main Features

- Responsive layout tuned for desktop and small mobile devices
- Custom notch navigation bar with active indicator
- Animated timestamp pill in the navbar
- Local video assets used across hero, about, work, logo, and GitHub profile areas
- GitHub-style repository screen with live API data
- Internal repo scroll area for long repository lists
- Search panel that can find sections, projects, contact links, and repositories

## Tech Stack

- HTML5
- Tailwind CSS via CDN
- Vanilla JavaScript
- Feather Icons
- Google Fonts: Manrope, Sora, and Space Grotesk

## Project Structure

```text
IoJoy/
|- index.html
|- script.js
|- README.md
`- assets/
   `- video/
      |- Hlogo.mp4
      |- abt.mp4
      |- git.vid.mp4
      |- m1.mp4
      |- v1.mp4
      `- v2.mp4
```

## How It Works

### Live GitHub Workspace

The GitHub section fetches profile and repository data from the GitHub API using the username configured in `script.js`.

- Loads the GitHub profile avatar, name, username, bio, meta details, stars, repo count, and followers
- Fetches all public repositories with pagination
- Sorts repositories by latest activity
- Renders repository cards with description, topics, language, stars, branch, and updated date

### Portfolio Config

The easiest place to update identity and social links is the `portfolioConfig` object in `script.js`.

Current fields:

- `email`
- `githubUsername`
- `githubUrl`
- `linkedinUrl`
- `instagramUrl`
- `whatsappNumber`
- `whatsappMessage`
- `repoPageSize`

## Run Locally

This project does not need a build step.

1. Clone or download the repository.
2. Open `index.html` in a browser, or run it with a simple local server such as VS Code Live Server.
3. Make sure you have internet access in the browser for:
   - Tailwind CDN
   - Google Fonts
   - Feather Icons
   - GitHub API requests

## Customize The Page

### Update Personal Info

Edit `script.js` and change the values inside `portfolioConfig.profile`.

### Update Section Content

Edit `index.html` to change:

- Hero heading and intro copy
- About section text
- Work section cards
- Contact labels and layout
- GitHub section heading or UI copy

### Replace Videos

Swap files inside `assets/video/` and update the matching `<source>` paths in `index.html` if needed.

Current video usage:

- `m1.mp4` for the hero background and one work card
- `v2.mp4` for the about section
- `abt.mp4` and `m1.mp4` for showcase cards
- `Hlogo.mp4` for the navbar brand logo
- `git.vid.mp4` for the GitHub profile card background

## Notes

- The page is designed as a static front-end portfolio.
- Repository content in the GitHub section is loaded live in the browser.
- If GitHub data does not appear, check the configured username in `script.js` and confirm browser network access.

## Author

Jai Surya Kumar  
Frontend Engineer building modern UI systems and responsive digital experiences.
