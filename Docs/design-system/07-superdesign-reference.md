# SuperDesign Reference Guide

**Purpose**: Reference guide for extracting design decisions from `.superdesign/` prototypes
**Status**: Reference Document
**Created**: October 2025

---

## 📁 SuperDesign Structure

```
.superdesign/design_iterations/
├── README.md                                    # SuperDesign overview
├── glassmorphism_colorscheme_1.html             # ⭐ COLOR REFERENCE
├── glassmorphism_home_1.html                    # Production home page
├── glassmorphism_practice_setup_1.html          # Practice config screen
├── glassmorphism_wizard_step1_1.html            # Wizard: Welcome
├── glassmorphism_wizard_step2_1.html            # Wizard: Profile
├── glassmorphism_wizard_step5_1.html            # Wizard: Ready
├── glassmorphism_session_split_1.html           # ⭐ LATEST: Coding session
├── glassmorphism_session_opentext_split_1.html  # Behavioral session
├── glassmorphism_feedback_modal_1.html          # Feedback modal
├── glassmorphism_hints_panel_1.html             # Progressive hints
└── themes/
    ├── glassmorphism.css                        # ⭐ CSS TOKENS SOURCE
    ├── cyberpunk_neon.css
    ├── elegant_minimalist.css
    ├── modern_dashboard.css
    └── default_ui.css
```

**Total**: 17 HTML prototypes, 5 CSS themes

---

## 🎨 Color System Extraction

### Primary Reference: `glassmorphism_colorscheme_1.html`

This file is the **single source of truth** for all colors in the design system.

#### Brand Colors (oklch format)

```css
/* From .superdesign/design_iterations/themes/glassmorphism.css */

:root {
  /* Primary - Purple */
  --primary: oklch(0.6500 0.2800 280);         /* #7877c6 */

  /* Accent - Pink */
  --accent: oklch(0.7200 0.3000 320);          /* #ff77c6 */

  /* Cyan Blue */
  --chart-5: oklch(0.6600 0.2900 200);         /* #78dbff */

  /* Background */
  --background: oklch(0.0800 0.0200 240);      /* Dark slate */

  /* Foreground */
  --foreground: oklch(0.9500 0.0100 240);      /* Light text */
}
```

#### Why oklch()?
- **Perceptually uniform**: Equal changes in values = equal visual differences
- **Better gradients**: Smoother color transitions
- **Wide gamut**: Access to more vivid colors
- **Predictable lightness**: L channel directly controls brightness

#### Conversion to Design Tokens

```typescript
// packages/design-system/src/tokens/primitive.ts

export const colors = {
  // Brand palette (oklch source)
  purple: {
    500: '#7877c6',  // oklch(0.6500 0.2800 280)
    oklch: 'oklch(0.6500 0.2800 280)',
  },
  pink: {
    500: '#ff77c6',  // oklch(0.7200 0.3000 320)
    oklch: 'oklch(0.7200 0.3000 320)',
  },
  cyan: {
    500: '#78dbff',  // oklch(0.6600 0.2900 200)
    oklch: 'oklch(0.6600 0.2900 200)',
  },
  slate: {
    900: '#0a0a0f',  // oklch(0.0800 0.0200 240)
    50: '#f8fafc',   // oklch(0.9500 0.0100 240)
  },
} as const;
```

---

## 💎 Glassmorphism Effects

### Source: `themes/glassmorphism.css`

#### Glass Card Effect

```css
/* From line 44-52 in glassmorphism.css */
.glass-card {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  box-shadow:
    0 8px 32px 0 rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;
  transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1) !important;
}
```

#### Conversion to Design Tokens

```typescript
// packages/design-system/src/tokens/component.ts

export const glass = {
  blur: {
    light: '10px',
    medium: '20px',
    heavy: '30px',
  },
  background: {
    light: 'rgba(255, 255, 255, 0.05)',
    medium: 'rgba(255, 255, 255, 0.1)',
    heavy: 'rgba(255, 255, 255, 0.15)',
  },
  border: {
    subtle: 'rgba(255, 255, 255, 0.1)',
    visible: 'rgba(255, 255, 255, 0.2)',
  },
  shadow: {
    sm: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    md: '0 20px 40px 0 rgba(31, 38, 135, 0.5)',
  },
  insetHighlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
} as const;
```

---

## 🌈 Gradient Background

### Source: Multiple prototypes (lines 29-42)

```css
/* Animated gradient background */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}
```

#### Design System Usage

```typescript
// packages/design-system/src/tokens/component.ts

export const gradients = {
  backgroundOverlay: `
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
  `,
  primary: 'linear-gradient(90deg, rgba(120, 119, 198, 1) 0%, rgba(255, 119, 198, 1) 50%, rgba(120, 219, 255, 1) 100%)',
} as const;
```

---

## ✨ Neon Glow Effects

### Source: `glassmorphism.css` (lines 69-74)

```css
.neon-glow {
  box-shadow:
    0 0 20px rgba(120, 119, 198, 0.5),
    0 0 40px rgba(120, 119, 198, 0.3),
    0 0 60px rgba(120, 119, 198, 0.1) !important;
}
```

#### Token Conversion

```typescript
export const glow = {
  primary: {
    sm: '0 0 20px rgba(120, 119, 198, 0.5)',
    md: '0 0 20px rgba(120, 119, 198, 0.5), 0 0 40px rgba(120, 119, 198, 0.3)',
    lg: '0 0 20px rgba(120, 119, 198, 0.5), 0 0 40px rgba(120, 119, 198, 0.3), 0 0 60px rgba(120, 119, 198, 0.1)',
  },
  secondary: {
    md: '0 0 20px rgba(255, 119, 198, 0.5), 0 0 40px rgba(255, 119, 198, 0.3)',
  },
  accent: {
    md: '0 0 20px rgba(120, 219, 255, 0.5), 0 0 40px rgba(120, 219, 255, 0.3)',
  },
} as const;
```

---

## 📐 Layout Patterns

### 20/80 Split Layout

**Source**: `glassmorphism_session_split_1.html` (LATEST)

- **Left Panel**: 20% width, question + hints + controls
- **Right Panel**: 80% width, code editor (no scrolling)
- **Breakpoint**: 768px (switches to stacked on mobile)

```css
/* Layout pattern */
.split-layout {
  display: grid;
  grid-template-columns: 20% 80%;
  gap: 1rem;
  height: calc(100vh - header-height);
}

@media (max-width: 768px) {
  .split-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}
```

---

## 🔤 Typography System

### Font Stack (from prototypes)

```css
:root {
  /* UI Text */
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  /* Code */
  --font-mono: JetBrains Mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Alternative serif (unused in current design) */
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
```

### Font Sizes (narrow panels)

```css
/* For 20% left panel */
font-size: 13px;  /* Body text in narrow panels */
line-height: 1.4;

/* For main content */
font-size: 16px;  /* Standard body text */
line-height: 1.6;
```

---

## 🎭 Animation Patterns

### Fade In Glass Effect

```css
@keyframes fadeInGlass {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    backdrop-filter: blur(0px);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
    backdrop-filter: blur(20px);
  }
}

.fade-in {
  animation: fadeInGlass 600ms ease-out forwards;
}
```

### Staggered Delays

```css
.fade-in-delay-1 { animation-delay: 150ms; }
.fade-in-delay-2 { animation-delay: 300ms; }
.fade-in-delay-3 { animation-delay: 450ms; }
```

### Pulse Glow

```css
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 10px rgba(120, 119, 198, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(120, 119, 198, 0.8);
  }
}
```

---

## 📦 Component References

### Button Styles

**Source**: Multiple prototypes, line ~85-117

```css
.btn-glass {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  transition: all 200ms ease-out !important;
  position: relative;
  overflow: hidden;
}

.btn-glass:hover {
  transform: scale(1.05) !important;
  background: rgba(255, 255, 255, 0.15) !important;
  box-shadow: 0 8px 25px rgba(120, 119, 198, 0.4) !important;
}
```

### Progress Bar

```css
.progress-bar {
  transition: width 1000ms cubic-bezier(0.4, 0, 0.2, 1) !important;
  background: linear-gradient(90deg,
    rgba(120, 119, 198, 1) 0%,
    rgba(255, 119, 198, 1) 50%,
    rgba(120, 219, 255, 1) 100%) !important;
  box-shadow: 0 0 20px rgba(120, 119, 198, 0.6) !important;
}
```

### Score Badge

```css
.score-badge {
  background: rgba(120, 119, 198, 0.2) !important;
  backdrop-filter: blur(10px) !important;
  border: 1px solid rgba(120, 119, 198, 0.3) !important;
  animation: pulseGlow 2s ease-in-out infinite;
}
```

---

## 🚀 Implementation Checklist

When implementing the design system, extract values in this order:

### Phase 1: Colors
- [ ] Extract oklch values from `themes/glassmorphism.css`
- [ ] Create primitive color tokens
- [ ] Map to semantic purposes (primary, secondary, accent)

### Phase 2: Glass Effects
- [ ] Extract blur values (10px, 20px, 30px)
- [ ] Extract background opacities (0.05, 0.1, 0.15)
- [ ] Extract border opacities (0.1, 0.2)
- [ ] Extract shadow values

### Phase 3: Typography
- [ ] Define font stacks (Inter, JetBrains Mono)
- [ ] Extract font sizes (13px for narrow, 16px standard)
- [ ] Define line heights (1.4, 1.6)

### Phase 4: Animations
- [ ] Create fadeInGlass keyframes
- [ ] Define stagger delays (150ms, 300ms, 450ms)
- [ ] Create pulseGlow for interactive elements

### Phase 5: Components
- [ ] Button variants (glass, primary-glass)
- [ ] Card variants (glass-card, glass-header)
- [ ] Progress bars with gradient
- [ ] Badges with glow effects

---

## 🔗 File Locations

### Reference Files (Read-Only)
- Color source: `/.superdesign/design_iterations/glassmorphism_colorscheme_1.html`
- CSS tokens: `/.superdesign/design_iterations/themes/glassmorphism.css`
- Layout reference: `/.superdesign/design_iterations/glassmorphism_session_split_1.html`

### Implementation Files (To Create)
- Primitive tokens: `/packages/design-system/src/tokens/primitive.ts`
- Semantic tokens: `/packages/design-system/src/tokens/semantic.ts`
- Component tokens: `/packages/design-system/src/tokens/component.ts`
- Global styles: `/packages/design-system/src/styles/glassmorphism.css`

---

## 💡 Key Insights

1. **Use oklch() throughout**: Better perceptual uniformity than rgb/hsl
2. **Maintain the 3-color system**: Purple (#7877c6), Pink (#ff77c6), Cyan (#78dbff)
3. **Keep blur values consistent**: 10px/20px/30px progression
4. **Preserve animation timings**: 600ms fade, 2s pulse, staggered delays
5. **20/80 split is finalized**: Don't deviate from this layout pattern

---

**Last Updated**: October 2025
**Next Review**: After token extraction in Phase 3
