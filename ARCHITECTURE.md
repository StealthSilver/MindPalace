# Mind Palace - Component Architecture

## Visual Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                         App Root                             │
│                    (app/layout.tsx)                          │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    Landing Page                      │   │
│  │                   (app/page.tsx)                     │   │
│  │  • Hero Section                                      │   │
│  │  • Philosophy Section                                │   │
│  │  • Feature Previews                                  │   │
│  │  • CTA Footer                                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                 Authentication                       │   │
│  │              (app/login, signup)                     │   │
│  │  • Login Form                                        │   │
│  │  • Signup Form                                       │   │
│  │  • Validation                                        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    App Shell                         │   │
│  │          (components/layout/AppShell)                │   │
│  │                                                       │   │
│  │  ┌──────────┬──────────────────────────────────┐    │   │
│  │  │          │         TopBar                    │    │   │
│  │  │          │  • Mode Switcher                  │    │   │
│  │  │          │  • Add Button                     │    │   │
│  │  │          │  • Profile                        │    │   │
│  │  │          └──────────────────────────────────┘    │   │
│  │  │          │                                        │   │
│  │  │  Sidebar │         Main Content                  │   │
│  │  │          │                                        │   │
│  │  │  • Logo  │  ┌──────────────────────────┐        │   │
│  │  │  • Nav   │  │   Dashboard Mode         │        │   │
│  │  │    Items │  │   (palace/dashboard)     │        │   │
│  │  │  • Dashb │  │                          │        │   │
│  │  │  • Palce │  │  ┌────────┬────────┐    │        │   │
│  │  │  • Searc │  │  │ Widget │ Widget │    │        │   │
│  │  │  • Settg │  │  ├────────┼────────┤    │        │   │
│  │  │          │  │  │ Widget │ Widget │    │        │   │
│  │  │  • User  │  │  └────────┴────────┘    │        │   │
│  │  │          │  └──────────────────────────┘        │   │
│  │  │          │                OR                     │   │
│  │  │          │  ┌──────────────────────────┐        │   │
│  │  │          │  │    Canvas Mode           │        │   │
│  │  │          │  │    (palace/canvas)       │        │   │
│  │  │          │  │                          │        │   │
│  │  │          │  │    [Infinite Canvas]     │        │   │
│  │  │          │  │    • Pan & Zoom          │        │   │
│  │  │          │  │    • Nodes               │        │   │
│  │  │          │  │    • Grid Background     │        │   │
│  │  │          │  └──────────────────────────┘        │   │
│  │  └──────────┴──────────────────────────────────┘    │   │
│  │                                                       │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │          Command Palette (Overlay)            │  │   │
│  │  │       (components/shared/CommandPalette)      │  │   │
│  │  │  • Search Input                               │  │   │
│  │  │  • Command List                               │  │   │
│  │  │  • Keyboard Navigation                        │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                   Settings Page                      │   │
│  │                  (app/settings)                      │   │
│  │  • Theme Selector                                    │   │
│  │  • Color Picker                                      │   │
│  │  • Keyboard Shortcuts                                │   │
│  │  • Data Management                                   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown by Section

### 1. Layout Components

```
AppShell (Parent Container)
├── Sidebar (Fixed Left)
│   ├── Logo
│   ├── Navigation Icons
│   │   ├── Dashboard
│   │   ├── Palace
│   │   ├── Search
│   │   └── Settings
│   └── User Avatar
│
└── Main Area (Flex)
    ├── TopBar (Fixed Top)
    │   ├── Mode Switcher
    │   │   ├── Dashboard Button
    │   │   └── Palace Button
    │   └── Add Button
    │
    └── Content (Dynamic)
        ├── Dashboard Page
        ├── Canvas Page
        └── Settings Page
```

### 2. Dashboard Components

```
Dashboard Page
├── Header
│   ├── Title
│   ├── Description
│   └── Add Widget Button
│
└── Widget Grid (3 columns)
    ├── WidgetCard (Repeating)
    │   ├── Header
    │   │   ├── Title
    │   │   └── Remove Button
    │   └── Content
    │       ├── LineChart
    │       ├── StatCard
    │       ├── NotesWidget
    │       ├── TasksWidget
    │       ├── LinksWidget
    │       └── ClockWidget
    │
    └── Empty State
        ├── Icon
        ├── Message
        └── CTA Button
```

### 3. Canvas Components

```
Canvas Page
├── Canvas Container (Pannable)
│   ├── Grid Background
│   ├── Canvas Content (Scalable)
│   │   └── CanvasNode (Multiple)
│   │       ├── Header
│   │       │   ├── Type Icon
│   │       │   ├── Type Label
│   │       │   └── Delete Button
│   │       └── Content
│   │           └── Editable Text
│   │
│   └── Empty State Message
│
├── Zoom Controls (Fixed)
│   ├── Zoom In Button
│   ├── Zoom Level
│   └── Zoom Out Button
│
└── Node Menu (Contextual)
    ├── Note Option
    ├── Link Option
    ├── Todo Option
    ├── Image Option
    └── Tweet Option
```

### 4. Shared Components

```
CommandPalette (Global Overlay)
├── Search Input
│   ├── Search Icon
│   ├── Text Input
│   └── ESC Badge
│
├── Commands List
│   └── Command Item (Repeating)
│       ├── Category Label
│       ├── Command Label
│       └── Shortcut Badge
│
└── Footer
    ├── Navigation Hint
    └── Select Hint
```

## Data Flow

### Dashboard Mode

```
Dashboard Page
    ↓
[widgets] State (Array)
    ↓
map() → WidgetCard Components
    ↓
User Interactions:
• Add Widget → Update State
• Remove Widget → Update State
• Drag Widget → Update State
```

### Canvas Mode

```
Canvas Page
    ↓
[nodes] State (Array)
    ↓
map() → CanvasNode Components
    ↓
User Interactions:
• Create Node → Update State
• Move Node → Update Position
• Edit Node → Update Content
• Delete Node → Update State
    ↓
useInfiniteCanvas Hook
• Pan → Update Offset
• Zoom → Update Scale
• Convert Coordinates
```

### Command Palette

```
App Shell
    ↓
[Cmd/Ctrl + K] Event
    ↓
CommandPalette Opens
    ↓
User Types → Filter Commands
    ↓
Arrow Keys → Navigate
    ↓
Enter → Execute → Close
```

## State Management

### Local Component State

- Dashboard widgets array
- Canvas nodes array
- Canvas pan/zoom state
- Command palette open/close
- Form inputs
- UI toggles

### No Global State Manager

- Pure React useState
- Props drilling minimal
- Event-based communication
- URL-based routing

## Hooks Usage

### Built-in Hooks

- `useState` - All component state
- `useEffect` - Event listeners, initialization
- `useCallback` - Memoized handlers
- `useRef` - DOM references, non-reactive values
- `useRouter` - Navigation (Next.js)
- `usePathname` - Current route (Next.js)

### Custom Hooks

- `useInfiniteCanvas` - Canvas pan/zoom logic
  - Returns: canvasRef, canvasState, helpers
  - Handles: Mouse events, wheel events, coordinates

## Event Flow Examples

### Creating a Dashboard Widget

```
User clicks "Add Widget"
    ↓
Modal opens with widget types
    ↓
User selects widget type
    ↓
New widget object created
    ↓
Added to widgets array
    ↓
Component re-renders
    ↓
New widget appears on grid
```

### Creating a Canvas Node

```
User clicks empty canvas space
    ↓
Click event → screenToWorld conversion
    ↓
Node menu opens at position
    ↓
User selects node type
    ↓
New node object created with world coordinates
    ↓
Added to nodes array
    ↓
Component re-renders
    ↓
New node appears on canvas
```

### Panning the Canvas

```
User mousedown on canvas
    ↓
isPanning = true
    ↓
User moves mouse (mousemove)
    ↓
Calculate delta from last position
    ↓
Update canvas offset state
    ↓
CSS transform updates position
    ↓
User mouseup
    ↓
isPanning = false
```

## Styling Approach

### Tailwind Classes

- Utility-first styling
- Custom color classes
- Responsive variants
- Hover/focus states
- Animation classes

### Custom Styles

- `globals.css` - Base styles
- Inline styles - Dynamic values (transforms, positions)
- CSS transitions - Smooth animations

## Type Safety

Every component has:

- Props interface
- Event handler types
- State types
- Return types

Example:

```typescript
interface WidgetCardProps {
  widget: Widget;
  onDragStart?: (e: React.DragEvent, widget: Widget) => void;
  onRemove?: (id: string) => void;
}
```

## Accessibility Features

- Semantic HTML elements
- Keyboard navigation support
- Focus indicators (ring-2)
- ARIA labels ready
- Alt text structure
- Color contrast compliant
- Touch target sizes (44px min)

---

This architecture provides:

- ✅ Clear component hierarchy
- ✅ Predictable data flow
- ✅ Easy to understand
- ✅ Easy to extend
- ✅ Type-safe
- ✅ Maintainable
