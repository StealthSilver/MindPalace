# Mind Palace - Complete File Structure

## Project Overview

A complete Next.js 14 application with TypeScript and Tailwind CSS implementing a dual-mode cognitive workspace.

## Root Files

```
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.ts       # Tailwind with custom colors
├── postcss.config.js        # PostCSS configuration
├── .gitignore              # Git ignore rules
├── .env.example            # Environment template
├── README.md               # Main documentation
├── DESIGN_GUIDE.md         # Visual design system
└── QUICK_START.md          # Getting started guide
```

## App Directory (Next.js 14 App Router)

```
app/
├── layout.tsx              # Root layout with Inter font
├── globals.css             # Global styles and Tailwind
├── page.tsx                # Landing page (marketing)
│
├── login/
│   └── page.tsx            # Login page with form
│
├── signup/
│   └── page.tsx            # Signup page with form
│
├── palace/
│   ├── layout.tsx          # Palace section layout
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard mode (widgets)
│   └── canvas/
│       └── page.tsx        # Canvas mode (infinite)
│
└── settings/
    └── page.tsx            # Settings page
```

## Components

```
components/
├── layout/
│   ├── AppShell.tsx        # Main app wrapper with sidebar/topbar
│   ├── Sidebar.tsx         # Left icon-based navigation
│   └── TopBar.tsx          # Top bar with mode switcher
│
├── dashboard/
│   └── WidgetCard.tsx      # Individual widget component
│                             - LineChart
│                             - StatCard
│                             - NotesWidget
│                             - TasksWidget
│                             - LinksWidget
│                             - ClockWidget
│
├── canvas/
│   ├── CanvasNode.tsx      # Draggable canvas node
│   └── CanvasTopic.tsx     # Topic grouping (optional)
│
└── shared/
    └── CommandPalette.tsx  # Cmd+K command palette
```

## Hooks

```
hooks/
└── useInfiniteCanvas.ts    # Canvas pan/zoom logic
                              - Pan with mouse drag
                              - Zoom with scroll
                              - Coordinate conversion
                              - Event handling
```

## Library Files

```
lib/
├── mockData.ts             # Sample widget data
└── utils.ts                # Helper functions
                              - generateId
                              - clamp
                              - debounce
                              - throttle
                              - getNodeColorClass
                              - formatDate/Time
```

## Types

```
types/
└── index.ts                # TypeScript definitions
                              - Node
                              - Topic
                              - Connection
                              - Widget
                              - WidgetType
                              - NodeType
                              - AppMode
                              - DashboardLayout
```

## Features Implemented

### Landing Page (/)

- ✅ Hero section with tagline
- ✅ Philosophy section (no feeds, noise, pressure)
- ✅ Feature previews (Dashboard and Palace)
- ✅ CTA sections
- ✅ Smooth scroll animations
- ✅ Responsive design

### Authentication (/login, /signup)

- ✅ Clean minimal forms
- ✅ Mock authentication
- ✅ Form validation
- ✅ Error handling
- ✅ Navigation to palace after login

### Dashboard Mode (/palace/dashboard)

- ✅ 3-column responsive grid
- ✅ Add widget functionality
- ✅ Widget library modal
- ✅ Remove widgets
- ✅ Drag widgets (basic)
- ✅ Multiple widget types:
  - Line chart with data visualization
  - Stat cards with trends
  - Notes widget (editable)
  - Tasks/todos with checkboxes
  - Links widget
  - Clock widget
- ✅ Empty state
- ✅ Auto-save layout (client-side)

### Canvas Mode (/palace/canvas)

- ✅ Infinite 2D canvas
- ✅ Pan with mouse drag
- ✅ Zoom with scroll wheel
- ✅ Zoom controls (UI buttons)
- ✅ Zoom level indicator
- ✅ Grid background (scales with zoom)
- ✅ Click to create node menu
- ✅ Multiple node types:
  - Notes (yellow)
  - Links (blue)
  - Images (purple)
  - Todos (green)
  - Tweets (light purple)
- ✅ Drag nodes freely
- ✅ Double-click to edit
- ✅ Inline text editing
- ✅ Delete nodes
- ✅ Color-coded by type
- ✅ Empty state message
- ✅ Smooth animations

### Command Palette (Cmd/Ctrl+K)

- ✅ Keyboard shortcut activation
- ✅ Search functionality
- ✅ Command categories
- ✅ Arrow key navigation
- ✅ Enter to select
- ✅ ESC to close
- ✅ Quick actions:
  - Navigate to Dashboard
  - Navigate to Canvas
  - Open Settings
  - Create notes/todos
  - Add widgets

### Settings (/settings)

- ✅ Theme selection (light/dark UI)
- ✅ Accent color picker
- ✅ Keyboard shortcuts reference
- ✅ Data export options (UI)
- ✅ Clear cache option (UI)
- ✅ About section
- ✅ Version info

### Shared Components

- ✅ AppShell wrapper
- ✅ Sidebar with icon navigation
- ✅ Top bar with mode switcher
- ✅ Smooth mode transitions
- ✅ Consistent styling
- ✅ Responsive layouts

## Design System

### Colors

- Calm muted base colors
- Soft accent colors for node types
- High contrast for readability
- Thoughtful color usage

### Typography

- Inter font family
- Clear hierarchy
- Appropriate sizing
- Good line height

### Spacing

- Generous whitespace
- Consistent padding
- Large gaps between sections
- Breathing room

### Animations

- Subtle scale-in on creation
- Gentle hover lift
- Calm transitions (300ms)
- Intentional motion (500ms)
- No bouncing or flashing

### Shadows

- Soft: Subtle depth
- Medium: Card elevation
- Lift: Hover states

### Components

- Rounded corners (8-16px)
- Clean borders
- Soft shadows
- Hover states

## Technical Stack

### Core

- Next.js 14 (App Router)
- React 18
- TypeScript 5

### Styling

- Tailwind CSS 3
- Custom color system
- Responsive design
- Dark mode ready

### Animations

- Framer Motion
- CSS transitions
- Transform-based

### State Management

- React useState
- React useCallback
- Custom hooks
- Local state

## Not Implemented (Backend)

- ❌ Real authentication
- ❌ Database persistence
- ❌ API endpoints
- ❌ User accounts
- ❌ Cloud sync
- ❌ File uploads
- ❌ Real-time collaboration

## Mock Data

All data is client-side with mock implementations:

- Widget data in `lib/mockData.ts`
- Nodes created in memory
- No persistence between sessions
- Login accepts any credentials

## Browser Support

- Modern evergreen browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Performance Considerations

- Transform-based animations
- Debounced canvas events
- Lazy loading (where applicable)
- Optimized re-renders

## Accessibility Features

- Semantic HTML
- Keyboard navigation
- Focus indicators
- ARIA labels
- Alt text ready
- Color contrast

## Next Steps for Production

1. **Backend Integration**

   - Set up API routes
   - Database schema
   - Authentication service
   - Data persistence

2. **User Management**

   - Real user accounts
   - Profile management
   - Data ownership
   - Privacy controls

3. **Data Persistence**

   - Save/load widgets
   - Save/load canvas state
   - Auto-save functionality
   - Sync across devices

4. **Enhanced Features**

   - File uploads for images
   - Collaborative editing
   - Export to PDF/PNG
   - Import from other tools

5. **Performance**

   - Canvas virtualization
   - Lazy loading nodes
   - Optimistic updates
   - Caching strategy

6. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Performance tests

---

**Status**: ✅ Complete Frontend Implementation
**Ready for**: Backend integration and production deployment
