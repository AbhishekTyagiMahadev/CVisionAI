<div align="center">

# CVisionAI — AI Resume Analyzer

**An AI-powered resume analyzer built with React, React Router, and Puter.js.**
Upload a resume, match it against a job listing, and receive an ATS compatibility score with actionable, category-by-category feedback — entirely in the browser, with no backend to deploy or maintain.

[![Live Preview](https://img.shields.io/badge/Live%20Preview-Visit-blue?style=flat-square)](https://6a0b4d630a89c9acf32fb4cf--kaleidoscopic-gecko-a39bfa.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-CVisionAI-black?style=flat-square&logo=github)](https://github.com/AbhishekTyagiMahadev/CVisionAI)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](#license)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

CVisionAI helps job seekers understand how their resume will actually perform against an Applicant Tracking System (ATS) before they apply. Users upload a resume as a PDF, optionally paste in a target job title and description, and the app returns:

- An overall resume score out of 100
- An ATS compatibility score with specific, actionable tips
- A category breakdown across tone & style, content, structure, and skills
- A persistent history of every resume analyzed, so progress can be tracked over time

All authentication, file storage, and AI inference run client-side through [Puter.js](https://jsm.dev/resumind-puterjs), so the app has no server component of its own to host, scale, or secure.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | Component-based UI library |
| [React Router v7](https://reactrouter.com/) | Routing, nested layouts, and SPA-mode builds |
| [Puter.js](https://jsm.dev/resumind-puterjs) | Client-side auth, file storage, key-value database, and AI inference — no backend required |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling, configured via CSS `@theme` tokens |
| [Vite 7](https://vite.dev/) | Dev server and production build tool |
| [Zustand](https://github.com/pmndrs/zustand) | Lightweight global state management |
| [Framer Motion](https://motion.dev/) | Page transitions, list animations, and UI micro-interactions |
| [React Three Fiber](https://r3f.docs.pmnd.rs/) · [Drei](https://github.com/pmndrs/drei) · [Three.js](https://threejs.org/) | Lightweight, lazy-loaded 3D visual accents |
| [react-dropzone](https://react-dropzone.js.org/) | Drag-and-drop file upload |
| [pdfjs-dist](https://mozilla.github.io/pdf.js/) | Client-side PDF-to-image conversion for AI scoring |

The project is written entirely in JavaScript/JSX — there is no TypeScript, type declarations, or type-checking step in the build.

---

## Features

- **Browser-based authentication** — sign-in and session handling powered entirely by Puter.js, with no auth server to run
- **Resume upload & storage** — resumes are uploaded and persisted per-user, ready to revisit at any time
- **AI-powered ATS scoring** — paste a job title and description to get a tailored ATS compatibility score and improvement tips
- **Category feedback** — detailed, expandable breakdowns for tone & style, content, structure, and skills
- **Application history** — every analyzed resume appears on the dashboard with its score, so users can track improvement across applications
- **Fully responsive** — works across desktop, tablet, and mobile screen sizes
- **Data control** — a dedicated page lets users inspect and permanently wipe their stored data
- **Modular architecture** — small, single-responsibility components that are easy to extend or restyle

---

## Prerequisites

Make sure the following are installed before setup:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

---

## Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/AbhishekTyagiMahadev/CVisionAI.git
cd CVisionAI
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the development server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app. Puter.js handles auth and storage automatically — no environment variables or API keys are required to run locally.

> **Note:** On first run, React Router generates a `.react-router/types/` folder containing route-typing helper files. This is built into React Router's own dev tooling and happens regardless of project language. It's already listed in `.gitignore`, isn't imported anywhere in the app, and can be safely ignored.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite dev server with hot module reloading |
| `npm run build` | Builds a production-ready static bundle to `build/client` |
| `npm run start` | Serves the production build locally |

---

## Project Structure

```
app/
├── app.css                  # Global styles and design tokens
├── entry.client.jsx         # Client hydration entry point
├── entry.server.jsx         # SPA-mode prerender entry point
├── root.jsx                 # App shell, layout, and error boundary
├── routes.js                # Route definitions
│
├── components/              # Reusable UI components
│   └── 3d/                  # Lazy-loaded 3D visual accents
│
├── constants/                # Static config and AI prompt templates
├── lib/                     # Puter.js integration, PDF conversion, utilities
│
└── routes/                  # Route-level page components
    ├── auth.jsx
    ├── home.jsx
    ├── resume.jsx
    ├── upload.jsx
    └── wipe.jsx
```

---

## How It Works

1. **Upload** — a resume PDF is selected or dragged onto the upload page, along with an optional job title and description.
2. **Convert** — the PDF is rendered to an image client-side (via `pdfjs-dist`) for the AI to analyze visually alongside the raw text.
3. **Store** — the original PDF and its image are uploaded to Puter's file storage, and a record is saved to Puter's key-value store.
4. **Analyze** — the resume is sent to Puter's AI inference endpoint with a structured prompt requesting an ATS score, an overall score, and category-level feedback as JSON.
5. **Review** — the parsed feedback is saved back to the record and rendered on the resume's results page, and the resume appears on the dashboard for future reference.

---

## Deployment

The app builds to a fully static bundle (`npm run build` → `build/client`), so it can be deployed to any static host. A `netlify.toml` is included for one-click deployment to [Netlify](https://www.netlify.com/), and a `Dockerfile` is included for containerized deployment.

---

## Contributing

Issues and pull requests are welcome. For significant changes, please open an issue first to discuss what you'd like to change.

---

## License

This project is licensed under the MIT License.

<div align="center">

Made with ❤️ by <strong>Abhishek Tyagi</strong>

</div>