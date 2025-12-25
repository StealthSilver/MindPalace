# Mind Palace 🧠

Your thinking space, reimagined. A calm, visual way to organize thoughts, ideas, and information.

## Overview

Mind Palace is a **fully stateful personal cognitive environment** with two distinct but connected modes:

- **Dashboard Mode** — Structured, glanceable, widget-based interface (Plecto-style)
- **Palace Mode** — Infinite canvas for spatial thinking (Excalidraw-style)

This is not social media. This is not a productivity tool with pressure. It's a quiet studio for your mind.

**NEW**: Now with full database integration! Your data is securely stored and synced across sessions.

## Features

### Authentication & Data Persistence ✨

- **User Accounts** — Sign up and log in securely
- **JWT Authentication** — Secure token-based authentication
- **Auto-Save** — All changes automatically saved to cloud database
- **Data Isolation** — Your data is private and secure
- **Cross-Device** — Access your palace from anywhere

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
- **Persistent across sessions** — Your layout is saved

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
- **All nodes saved automatically** — Positions, content, everything

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

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt
- **Animations**: Framer Motion
- **Icons**: Heroicons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables - create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

5. **Sign up** to create your account and start using Mind Palace!

### Documentation

- **[DATABASE_GUIDE.md](./DATABASE_GUIDE.md)** — Database integration and API documentation
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — System architecture

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
