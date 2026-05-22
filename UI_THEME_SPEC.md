# Lucent UI Theme Spec

## Selected Direction
- **Homepage strategy:** Option 1 (Immediate Audit layout)
- **Theme style:** Clean SaaS utility interface (trust-first, low-noise, conversion-focused)
- **Visual tone:** Professional, modern, finance-friendly

## 1) Layout System
### Global Container
- Max width: `1200px` (`max-w-6xl`)
- Horizontal padding:
  - Mobile: `px-4`
  - Tablet: `px-6`
  - Desktop: `px-8`

### Grid
- Desktop: 12-column grid
- Tablet: 8-column grid
- Mobile: single column

### Vertical Rhythm
- Section spacing:
  - Mobile: `py-12`
  - Desktop: `py-16`
- Internal block spacing: `gap-4` to `gap-8`

## 2) Homepage (Option 1) Block Order
1. Header (simple, sticky optional)
2. Hero (one-line value + supporting line)
3. Supported tools strip
4. Quick Start Presets
5. Full audit input form (primary interaction)
6. “How it works” (3 steps)
7. Output preview snapshot
8. FAQ
9. Footer (privacy/terms)

## 3) Color Selection
### Role Colors
- **Background:** `#F8FAFC` (slate-50)
- **Surface / cards:** `#FFFFFF`
- **Primary text:** `#0F172A` (slate-900)
- **Secondary text:** `#475569` (slate-600)
- **Border:** `#E2E8F0` (slate-200)
- **Primary accent (actions):** `#0EA5E9` (sky-500)
- **Primary accent hover:** `#0284C7` (sky-600)
- **Success/savings positive:** `#16A34A` (green-600)
- **Warning/assumptions:** `#D97706` (amber-600)
- **Error:** `#DC2626` (red-600)

### Why this palette
- Neutral base keeps financial data readable.
- Sky accent gives modern product feel without aggressive branding.
- Green/amber/red provide clear recommendation state cues.

## 4) Theme Rules
- Default theme: **light**
- No gradients/orbs/decorative blobs.
- Keep radius subtle (`rounded-md` to `rounded-lg`, max 8px visual feel).
- Shadows minimal (`shadow-sm` only where needed).
- Emphasize hierarchy using spacing and typography, not heavy effects.

## 5) Typography
- Font: Inter/system sans
- Hero heading: large but restrained
- Panel/form headings: medium scale
- Body copy: short and direct
- Avoid oversized marketing typography

## 6) Component Styling Principles
- Form controls full-width, clear labels, helper text only when needed.
- CTA buttons:
  - Primary: solid accent
  - Secondary: outline neutral
- Recommendation rows:
  - Left: tool + current plan
  - Middle: recommended action + reason
  - Right: monthly savings + confidence badge

## 7) Savings Visualization
- Hero metrics:
  - Monthly savings: most prominent
  - Annual savings: secondary but bold
- Confidence badges:
  - High: green
  - Medium: amber
  - Low: slate

## 8) Accessibility Targets
- Contrast AA+ for all text and action controls
- Visible focus states on keyboard navigation
- Minimum touch target 44px on mobile
- No overlapping text/components on small screens

