# Mind Palace - Visual Design Guide

## Color Palette

### Base Colors

- **Background**: `#FAFAF9` (Off-white, warm)
- **Foreground**: `#1C1C1E` (Charcoal, deep)
- **White**: `#FFFFFF` (Pure white for cards)

### Node Type Colors

#### Notes (Warm Yellow/Sand)

- Light: `#FFF4E6`
- Default: `#FFE4B5`
- Dark: `#F5D9A0`

#### Links (Soft Blue)

- Light: `#E8F4FB`
- Default: `#A8D8F0`
- Dark: `#7EC8E3`

#### Images (Subtle Purple)

- Light: `#F3EFF8`
- Default: `#D4C5E8`
- Dark: `#BBA5D8`

#### Todos (Muted Green)

- Light: `#E8F5E9`
- Default: `#B8E6B8`
- Dark: `#A0D9A0`

#### Analytics (Slate/Teal)

- Light: `#E6F3F5`
- Default: `#B0DADC`
- Dark: `#8FC9CC`

### UI Accent

- Light: `#E8EEFF`
- Default: `#8B9AFF`
- Dark: `#6B7AE5`

## Typography

### Font Family

- Primary: Inter (Google Fonts)
- Fallback: system-ui, sans-serif

### Font Sizes

- Hero: `text-6xl` (60px)
- Heading 1: `text-4xl` (36px)
- Heading 2: `text-3xl` (30px)
- Heading 3: `text-2xl` (24px)
- Body Large: `text-xl` (20px)
- Body: `text-base` (16px)
- Small: `text-sm` (14px)
- Tiny: `text-xs` (12px)

## Spacing System

Based on Tailwind's default spacing scale:

- XS: `2` (8px)
- S: `4` (16px)
- M: `6` (24px)
- L: `8` (32px)
- XL: `12` (48px)
- 2XL: `16` (64px)

## Shadows

### Soft (Subtle depth)

```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
```

### Medium (Card elevation)

```css
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
```

### Lift (Hover state)

```css
box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
```

## Border Radius

- Small: `rounded-lg` (8px) - Buttons, inputs
- Medium: `rounded-xl` (12px) - Cards, nodes
- Large: `rounded-2xl` (16px) - Modals, containers

## Animation Timing

### Duration

- Fast: `200ms` - Micro-interactions
- Medium: `300ms` - Most transitions
- Slow: `500ms` - Mode switches, large movements

### Easing

- Default: `ease-out`
- Never use: `ease-in-out` (feels sluggish)
- Never use: `linear` (feels robotic)

## Component Patterns

### Cards

```css
background: white
border: 1px solid gray-200
border-radius: 12px
padding: 24px
shadow: soft
hover:shadow: medium
transition: 300ms ease-out
```

### Buttons (Primary)

```css
background: accent
color: white
padding: 12px 32px
border-radius: 8px
font-weight: 500
hover:background: accent-dark
shadow: soft
hover:shadow: medium
transition: 300ms ease-out
```

### Buttons (Secondary)

```css
background: white
border: 1px solid gray-300
color: foreground
padding: 12px 24px
border-radius: 8px
font-weight: 500
hover:border: accent
hover:color: accent
transition: 300ms ease-out
```

### Input Fields

```css
background: white
border: 1px solid gray-300
padding: 12px 16px
border-radius: 8px
focus:border: accent
focus:ring: 2px accent/20
transition: 300ms ease-out
```

## Motion Principles

### Entry Animations

- Fade in: Opacity 0 → 1
- Scale in: Scale 0.95 → 1
- Slide up: TranslateY 10px → 0

### Hover States

- Lift: Add shadow, subtle scale (1.02)
- Never: Bounce, shake, or rapid movements

### Exit Animations

- Fade out: Opacity 1 → 0
- Scale out: Scale 1 → 0.95

## Layout Guidelines

### Whitespace

- Generous padding inside containers
- Large gaps between sections (48-64px)
- Breathing room around elements

### Grid System

- Dashboard: 3-column grid
- Max content width: 1280px
- Responsive breakpoints: Tailwind defaults

### Z-Index Scale

- Base: 0
- Elevated: 10
- Dropdown: 20
- Sticky: 30
- Modal Backdrop: 40
- Modal: 50

## Interaction States

### Hover

- Subtle lift (shadow increase)
- Slight scale (1.02x max)
- Color shift (darker/lighter by 10%)

### Active

- Pressed down feel
- Slightly darker color
- No scale change

### Focus

- 2px ring in accent color with 20% opacity
- Never use outline

### Disabled

- 50% opacity
- Cursor: not-allowed
- No hover effects

## Icons

- Library: Heroicons (outline style)
- Size: 20px (w-5 h-5) for UI
- Size: 24px (w-6 h-6) for emphasis
- Color: Inherit from parent
- Stroke width: 2

## Responsive Behavior

### Mobile (<768px)

- Single column layouts
- Larger touch targets (44px min)
- Simplified navigation
- Bottom sheets instead of modals

### Tablet (768px-1024px)

- 2-column grid for dashboard
- Condensed sidebar
- Medium card sizes

### Desktop (>1024px)

- Full 3-column grid
- Icon sidebar
- Optimal card sizes

## Accessibility

### Color Contrast

- Text on background: 7:1 minimum
- Interactive elements: 4.5:1 minimum
- Never rely on color alone

### Keyboard Navigation

- All interactive elements focusable
- Clear focus indicators
- Logical tab order
- Keyboard shortcuts documented

### Screen Readers

- Semantic HTML
- ARIA labels where needed
- Alt text for images
- Live regions for updates

## Performance

### Image Optimization

- Use Next.js Image component
- Lazy load below fold
- WebP format preferred

### Animation Performance

- Use transform and opacity only
- Avoid animating width/height
- Use will-change sparingly

## Do's and Don'ts

### Do

✓ Use soft, muted colors
✓ Give elements space to breathe
✓ Use intentional, slow motion
✓ Maintain high contrast for text
✓ Test with real content

### Don't

✗ Use neon or harsh colors
✗ Cram elements together
✗ Add bouncy animations
✗ Use pure black text
✗ Test with lorem ipsum only

---

**Remember**: If something feels busy → remove it. If it feels loud → soften it. If it feels clever → simplify it.
