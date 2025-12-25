# Mind Palace 🧠

Your thinking space, reimagined. A calm, visual way to organize thoughts, ideas, and information.

## Overview

Mind Palace is a personal cognitive environment with two distinct but connected modes:

- **Dashboard Mode** — Structured, glanceable, widget-based interface (Plecto-style)
- **Palace Mode** — Infinite canvas for spatial thinking (Excalidraw-style)

This is not social media. This is not a productivity tool with pressure. It's a quiet studio for your mind.

## Features

### Dashboard Mode

- Customizable widget grid
- Drag and resize widgets
- Multiple widget types:
  - Charts and analytics
  - Notes
  - Tasks/Todos
  - Links
  - Time and weather
- Clean, organized view of what matters

### Palace Mode

- Infinite 2D canvas
- Pan with mouse drag
- Zoom with scroll
- Multiple node types:
  - Notes (warm yellow/sand)
  - Links (soft blue)
  - Images (subtle purple)
  - Todos (muted green)
  - Tweets (mock cards)
- Drag nodes freely
- Double-click to edit
- Visual connections between ideas

## Design Philosophy

- **Calm** — Large whitespace, soft shadows, rounded corners
- **Modern** — Clean typography, intentional motion
- **Thoughtfully Colorful** — Colors reduce cognitive load
- **Premium Feel** — Polished interactions, smooth transitions

### Color System

- Base: Off-white (#FAFAF9) / Charcoal (#1C1C1E)
- Notes: Warm yellow/sand
- Links: Soft blue
- Images: Subtle purple
- Todos: Muted green
- Analytics: Slate/teal

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
mind-palace/
├── app/                      # Next.js app directory
│   ├── page.tsx             # Landing page
│   ├── login/               # Authentication
│   ├── signup/
│   ├── palace/
│   │   ├── dashboard/       # Dashboard mode
│   │   └── canvas/          # Palace canvas mode
│   └── settings/            # Settings page
├── components/
│   ├── layout/              # Shared layout components
│   ├── dashboard/           # Dashboard widgets
│   ├── canvas/              # Canvas nodes
│   └── shared/              # Command palette, etc.
├── hooks/                   # Custom React hooks
├── lib/                     # Utilities and mock data
└── types/                   # TypeScript definitions
```

## Key Interactions

### Keyboard Shortcuts

- `Cmd/Ctrl + K` — Open command palette
- `Cmd/Ctrl + 1` — Go to Dashboard
- `Cmd/Ctrl + 2` — Go to Palace Canvas
- `Cmd/Ctrl + N` — Create new note

### Canvas Controls

- **Pan**: Click and drag on empty space
- **Zoom**: Scroll to zoom in/out
- **Create Node**: Click on empty space
- **Edit Node**: Double-click on node
- **Move Node**: Drag node
- **Delete Node**: Hover and click X

### Dashboard Controls

- **Add Widget**: Click "Add Widget" button
- **Remove Widget**: Hover over widget and click X
- **Drag Widget**: Click and drag widget header

## Motion Principles

- Subtle scale-in on creation
- Gentle hover lift
- No bouncing
- No flashing
- Motion must always feel slow and intentional

## Part of Cluster

Mind Palace is the first feature of a larger platform called Cluster. It's designed as an independent product that focuses on personal cognitive organization.

## License

Private project. All rights reserved.

---

**Built with intention. Designed for clarity.**
