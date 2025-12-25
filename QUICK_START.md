# Quick Start Guide 🚀

Welcome to Mind Palace! Here's how to get started with your personal thinking space.

## Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## First Steps

### 1. Landing Page

- You'll see the welcome screen explaining Mind Palace
- Click "Enter Mind Palace" or "Get started" to begin

### 2. Authentication (Mock)

- Sign up or log in (currently uses mock authentication)
- Any valid email/password will work for demo purposes

### 3. Choose Your Mode

#### Dashboard Mode (`/palace/dashboard`)

The structured, widget-based view:

- Click "Add Widget" to add new widgets
- Drag widgets to reposition them
- Hover over widgets and click X to remove them
- Try different widget types:
  - Line Chart - Visual data
  - Stat Card - Key metrics
  - Notes - Quick text notes
  - Tasks - Todo lists
  - Links - Saved bookmarks
  - Clock - Current time

#### Palace Mode (`/palace/canvas`)

The infinite canvas for spatial thinking:

- **Pan**: Click and drag on empty space
- **Zoom**: Scroll up/down or use zoom controls
- **Create Node**: Click anywhere to open node menu
- **Edit Node**: Double-click any node
- **Move Node**: Drag nodes to reposition
- **Delete Node**: Hover and click X

### 4. Use Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open command palette
- `Cmd/Ctrl + 1` - Go to Dashboard
- `Cmd/Ctrl + 2` - Go to Palace Canvas

## Key Features to Explore

### Command Palette

Press `Cmd/Ctrl + K` to open the command palette:

- Navigate between modes
- Create new items
- Quick actions
- Use arrow keys to navigate, Enter to select

### Node Types in Palace

1. **Notes** (Yellow) - Text notes and thoughts
2. **Links** (Blue) - Web links and references
3. **Todos** (Green) - Task lists
4. **Images** (Purple) - Visual content
5. **Tweets** (Light Purple) - Social media content

### Settings

Click the gear icon or go to `/settings` to customize:

- Theme (light/dark)
- Accent color
- View keyboard shortcuts
- Export data options

## Tips for Best Experience

### Dashboard Tips

- Start with a few essential widgets
- Organize by priority (top = most important)
- Use stat cards for quick glances
- Notes widget for temporary thoughts

### Canvas Tips

- Don't overthink structure initially
- Place related nodes near each other
- Use different colors to categorize
- Zoom out to see the big picture
- Zoom in to focus on details

### General Tips

- Use Cmd/Ctrl + K frequently for quick navigation
- Switch between modes based on your task
- Dashboard = consuming/reviewing
- Canvas = creating/exploring

## Common Workflows

### Capturing Ideas

1. Open Canvas mode
2. Click to create a note
3. Type your idea
4. Continue placing related ideas nearby

### Organizing Information

1. Go to Dashboard
2. Add relevant widgets
3. Customize layout
4. Review at a glance

### Planning Projects

1. Canvas mode for brainstorming
2. Create nodes for each component
3. Organize spatially
4. Pin key items to Dashboard

## Troubleshooting

### Canvas not panning?

- Make sure you're clicking on empty space, not nodes
- Try refreshing the page

### Widgets not dragging?

- Click and hold on the widget body (not header)
- Current version has simplified drag behavior

### Keyboard shortcuts not working?

- Make sure the app window is focused
- On Mac use Cmd, on Windows/Linux use Ctrl

## What's Next?

This is a complete frontend implementation with:

- ✅ Full UI/UX design
- ✅ Interactive components
- ✅ Smooth animations
- ✅ Responsive layouts
- ✅ TypeScript types
- ✅ Mock data

To make it production-ready, you would add:

- Backend API integration
- Real authentication
- Database persistence
- Real-time sync
- Cloud storage
- User accounts

## Development Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## File Structure Quick Reference

```
app/
├── page.tsx              # Landing page
├── login/                # Auth pages
├── signup/
├── palace/
│   ├── dashboard/        # Widget dashboard
│   └── canvas/           # Infinite canvas
└── settings/             # Settings page

components/
├── layout/               # AppShell, Sidebar, TopBar
├── dashboard/            # Widget components
├── canvas/               # Canvas nodes
└── shared/               # Command palette, etc.
```

## Need Help?

Check out:

- `README.md` - Full project documentation
- `DESIGN_GUIDE.md` - Visual design system
- `types/index.ts` - TypeScript definitions

---

**Happy thinking! 🧠**

Build something calm, clear, and intentional.
