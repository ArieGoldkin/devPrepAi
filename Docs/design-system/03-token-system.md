# Token System

**Version**: 1.0.0
**Status**: Active
**Last Updated**: October 2025
**Notion Database**: [Design System Tokens](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)

## Overview

The DevPrep AI design system uses a **three-tier token hierarchy** that creates a scalable foundation for consistent design. This approach separates primitive values from their semantic meaning and component-specific usage.

### Benefits of Token Hierarchy

- **Scalability**: Easy to add new themes or rebrand
- **Consistency**: Single source of truth for design values
- **Maintainability**: Changes cascade through semantic layers
- **Type Safety**: Full TypeScript support with IntelliSense
- **Flexibility**: Mix CSS variables with TypeScript tokens

---

## Token Hierarchy

```
┌─────────────────────────────────────────┐
│       Primitive Tokens                  │
│  Raw values: colors, sizes, spacing     │
│  #8B5CF6, 16px, 1.5rem                  │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       Semantic Tokens                   │
│  Intent-based: primary, danger, bg      │
│  Uses primitives: color.primary.500     │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│       Component Tokens                  │
│  Component-specific: button.bg.primary  │
│  Uses semantic: semantic.color.primary  │
└─────────────────────────────────────────┘
```

### 1. Primitive Tokens

**Raw design values** - the foundation layer that defines actual colors, sizes, and spacing.

```typescript
// src/styles/tokens.ts
export const primitives = {
  color: {
    purple: {
      50: '#FAF5FF',
      100: '#F3E8FF',
      200: '#E9D5FF',
      300: '#D8B4FE',
      400: '#C084FC',
      500: '#A855F7',  // Primary brand color
      600: '#9333EA',
      700: '#7E22CE',
      800: '#6B21A8',
      900: '#581C87',
    },
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    // ... other color scales
  },
  spacing: {
    0: '0px',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
  },
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
  },
  borderRadius: {
    none: '0px',
    sm: '0.125rem',   // 2px
    base: '0.25rem',  // 4px
    md: '0.375rem',   // 6px
    lg: '0.5rem',     // 8px
    xl: '0.75rem',    // 12px
    '2xl': '1rem',    // 16px
    '3xl': '1.5rem',  // 24px
    full: '9999px',
  },
} as const;
```

### 2. Semantic Tokens

**Intent-based values** - describes the purpose or meaning of design decisions.

```typescript
// src/styles/tokens.ts
export const semantic = {
  color: {
    primary: primitives.color.purple[500],
    primaryHover: primitives.color.purple[600],
    primaryActive: primitives.color.purple[700],

    background: {
      primary: primitives.color.gray[900],
      secondary: primitives.color.gray[800],
      tertiary: primitives.color.gray[700],
      elevated: primitives.color.gray[800],
    },

    text: {
      primary: primitives.color.gray[50],
      secondary: primitives.color.gray[300],
      tertiary: primitives.color.gray[400],
      inverse: primitives.color.gray[900],
    },

    border: {
      default: 'rgba(255, 255, 255, 0.1)',
      focus: primitives.color.purple[500],
      error: primitives.color.red[500],
    },

    status: {
      success: primitives.color.green[500],
      warning: primitives.color.yellow[500],
      error: primitives.color.red[500],
      info: primitives.color.blue[500],
    },

    // Glassmorphism specific
    glass: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: 'rgba(255, 255, 255, 0.1)',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
  },

  spacing: {
    component: {
      xs: primitives.spacing[2],   // 8px
      sm: primitives.spacing[3],   // 12px
      md: primitives.spacing[4],   // 16px
      lg: primitives.spacing[6],   // 24px
      xl: primitives.spacing[8],   // 32px
    },
    layout: {
      xs: primitives.spacing[4],   // 16px
      sm: primitives.spacing[6],   // 24px
      md: primitives.spacing[8],   // 32px
      lg: primitives.spacing[12],  // 48px
      xl: primitives.spacing[16],  // 64px
    },
  },

  typography: {
    heading: {
      size: primitives.fontSize['4xl'],
      weight: '700',
      lineHeight: '1.2',
    },
    subheading: {
      size: primitives.fontSize['2xl'],
      weight: '600',
      lineHeight: '1.3',
    },
    body: {
      size: primitives.fontSize.base,
      weight: '400',
      lineHeight: '1.5',
    },
    caption: {
      size: primitives.fontSize.sm,
      weight: '400',
      lineHeight: '1.4',
    },
  },
} as const;
```

### 3. Component Tokens

**Component-specific values** - design decisions for individual components.

```typescript
// src/styles/tokens.ts
export const components = {
  button: {
    base: {
      borderRadius: primitives.borderRadius.lg,
      fontWeight: '500',
      transition: 'all 0.2s ease',
    },
    size: {
      sm: {
        padding: `${primitives.spacing[2]} ${primitives.spacing[4]}`,
        fontSize: primitives.fontSize.sm,
        height: '36px',
      },
      md: {
        padding: `${primitives.spacing[3]} ${primitives.spacing[6]}`,
        fontSize: primitives.fontSize.base,
        height: '44px',
      },
      lg: {
        padding: `${primitives.spacing[4]} ${primitives.spacing[8]}`,
        fontSize: primitives.fontSize.lg,
        height: '52px',
      },
    },
    variant: {
      primary: {
        background: semantic.color.primary,
        color: semantic.color.text.primary,
        border: 'transparent',
        hover: {
          background: semantic.color.primaryHover,
        },
      },
      glass: {
        background: semantic.color.glass.background,
        color: semantic.color.text.primary,
        border: semantic.color.glass.border,
        backdropFilter: 'blur(12px)',
        hover: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },

  card: {
    base: {
      borderRadius: primitives.borderRadius['2xl'],
      padding: primitives.spacing[6],
    },
    variant: {
      glass: {
        background: semantic.color.glass.background,
        border: `1px solid ${semantic.color.glass.border}`,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      },
      solid: {
        background: semantic.color.background.secondary,
        border: `1px solid ${semantic.color.border.default}`,
      },
    },
  },

  input: {
    base: {
      borderRadius: primitives.borderRadius.lg,
      fontSize: primitives.fontSize.base,
      padding: `${primitives.spacing[3]} ${primitives.spacing[4]}`,
      height: '44px',
    },
    variant: {
      glass: {
        background: semantic.color.glass.background,
        border: `1px solid ${semantic.color.glass.border}`,
        color: semantic.color.text.primary,
        backdropFilter: 'blur(12px)',
        focus: {
          border: semantic.color.border.focus,
          boxShadow: `0 0 0 3px ${semantic.color.primary}33`,
        },
      },
    },
  },
} as const;
```

---

## Extracting Tokens from .superdesign Prototypes

When creating prototypes in `.superdesign/design_iterations/`, follow this process to extract tokens:

### Step 1: Identify Repeated Values

```html
<!-- landing_1.html - Before token extraction -->
<div style="
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  backdrop-filter: blur(12px);
">
  <h2 style="
    font-size: 36px;
    font-weight: 700;
    color: #F9FAFB;
  ">Heading</h2>
</div>
```

### Step 2: Categorize by Token Type

| Value | Type | Category | Token Name |
|-------|------|----------|------------|
| `rgba(255, 255, 255, 0.05)` | Primitive | Color | `glass.background` |
| `rgba(255, 255, 255, 0.1)` | Primitive | Color | `glass.border` |
| `24px` | Primitive | Border Radius | `borderRadius.2xl` |
| `24px` | Primitive | Spacing | `spacing.6` |
| `blur(12px)` | Primitive | Effect | `blur.md` |
| `36px` | Primitive | Font Size | `fontSize.4xl` |
| `700` | Primitive | Font Weight | `fontWeight.bold` |
| `#F9FAFB` | Primitive | Color | `gray.50` |

### Step 3: Create Semantic Mappings

```typescript
// Map primitives to semantic meanings
export const semantic = {
  color: {
    glass: {
      background: 'rgba(255, 255, 255, 0.05)', // From prototype
      border: 'rgba(255, 255, 255, 0.1)',
    },
    text: {
      primary: primitives.color.gray[50],
    },
  },
  effects: {
    blur: {
      sm: 'blur(8px)',
      md: 'blur(12px)',  // From prototype
      lg: 'blur(16px)',
    },
  },
};
```

### Step 4: Create Component Tokens

```typescript
// Map to component-specific usage
export const components = {
  card: {
    variant: {
      glass: {
        background: semantic.color.glass.background,
        border: `1px solid ${semantic.color.glass.border}`,
        borderRadius: primitives.borderRadius['2xl'],
        padding: primitives.spacing[6],
        backdropFilter: semantic.effects.blur.md,
      },
    },
  },
};
```

### Step 5: Replace with Token Usage

```tsx
// After token extraction
import { components } from '@/styles/tokens';

<Card variant="glass">
  <Heading size="4xl">Heading</Heading>
</Card>
```

---

## CSS Variable Generation

Convert TypeScript tokens to CSS variables for Tailwind integration:

### Automatic Generation Script

```typescript
// scripts/generate-css-vars.ts
import { primitives, semantic, components } from '../src/styles/tokens';

function generateCSSVars(obj: Record<string, any>, prefix = ''): string {
  let css = '';

  for (const [key, value] of Object.entries(obj)) {
    const varName = prefix ? `${prefix}-${key}` : key;

    if (typeof value === 'object' && !Array.isArray(value)) {
      css += generateCSSVars(value, varName);
    } else {
      css += `  --${varName}: ${value};\n`;
    }
  }

  return css;
}

const cssVars = `
:root {
${generateCSSVars({ primitives, semantic, components })}
}
`;

console.log(cssVars);
```

### Generated Output

```css
/* src/styles/generated-tokens.css */
:root {
  /* Primitive Tokens */
  --color-purple-50: #FAF5FF;
  --color-purple-500: #A855F7;
  --color-gray-50: #F9FAFB;
  --color-gray-900: #111827;

  --spacing-0: 0px;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;

  --fontSize-base: 1rem;
  --fontSize-4xl: 2.25rem;

  --borderRadius-lg: 0.5rem;
  --borderRadius-2xl: 1rem;

  /* Semantic Tokens */
  --color-primary: var(--color-purple-500);
  --color-text-primary: var(--color-gray-50);
  --color-background-primary: var(--color-gray-900);

  --color-glass-background: rgba(255, 255, 255, 0.05);
  --color-glass-border: rgba(255, 255, 255, 0.1);

  /* Component Tokens */
  --button-borderRadius: var(--borderRadius-lg);
  --button-size-md-height: 44px;
  --card-borderRadius: var(--borderRadius-2xl);
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import { primitives, semantic } from './src/styles/tokens';

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: semantic.color.primary,
        'text-primary': semantic.color.text.primary,
        'glass-bg': semantic.color.glass.background,
      },
      spacing: primitives.spacing,
      fontSize: primitives.fontSize,
      borderRadius: primitives.borderRadius,
    },
  },
};

export default config;
```

---

## Usage Examples

### TypeScript Component

```tsx
import { components, semantic } from '@/styles/tokens';

export function GlassButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        ...components.button.base,
        ...components.button.size.md,
        ...components.button.variant.glass,
      }}
    >
      {children}
    </button>
  );
}
```

### CSS Modules with Tokens

```css
/* Button.module.css */
.button {
  border-radius: var(--button-borderRadius);
  font-weight: var(--button-base-fontWeight);
  transition: var(--button-base-transition);
}

.button-glass {
  background: var(--color-glass-background);
  border: 1px solid var(--color-glass-border);
  backdrop-filter: blur(12px);
}

.button-glass:hover {
  background: rgba(255, 255, 255, 0.1);
}
```

### Tailwind with Custom Classes

```tsx
// Using Tailwind classes mapped to tokens
<button className="
  px-6 py-3
  rounded-lg
  bg-glass-bg
  border border-glass-border
  backdrop-blur-md
  text-text-primary
  hover:bg-white/10
  transition-all
">
  Click me
</button>
```

### React with Theme Hook

```tsx
import { useTokens } from '@/hooks/useTokens';

export function ThemedCard() {
  const { components } = useTokens();

  return (
    <div style={components.card.variant.glass}>
      <h2>Glassmorphism Card</h2>
    </div>
  );
}
```

---

## Complete Token Reference

### Color System

```typescript
primitives.color
├── purple (50-900)    // Primary brand
├── gray (50-900)      // Neutrals
├── red (50-900)       // Error/danger
├── green (50-900)     // Success
├── yellow (50-900)    // Warning
└── blue (50-900)      // Info

semantic.color
├── primary            // Main brand color
├── primaryHover       // Interactive states
├── background         // Surface colors
│   ├── primary
│   ├── secondary
│   └── tertiary
├── text               // Typography colors
│   ├── primary
│   ├── secondary
│   └── tertiary
├── border             // Border colors
│   ├── default
│   ├── focus
│   └── error
├── status             // State colors
│   ├── success
│   ├── warning
│   ├── error
│   └── info
└── glass              // Glassmorphism
    ├── background
    ├── border
    └── shadow
```

### Spacing System

```typescript
primitives.spacing
├── 0  → 0px
├── 1  → 4px
├── 2  → 8px
├── 3  → 12px
├── 4  → 16px
├── 6  → 24px
├── 8  → 32px
├── 12 → 48px
└── 16 → 64px

semantic.spacing
├── component    // Element spacing
│   ├── xs → 8px
│   ├── sm → 12px
│   ├── md → 16px
│   ├── lg → 24px
│   └── xl → 32px
└── layout       // Page spacing
    ├── xs → 16px
    ├── sm → 24px
    ├── md → 32px
    ├── lg → 48px
    └── xl → 64px
```

### Typography System

```typescript
primitives.fontSize
├── xs   → 12px
├── sm   → 14px
├── base → 16px
├── lg   → 18px
├── xl   → 20px
├── 2xl  → 24px
├── 3xl  → 30px
├── 4xl  → 36px
└── 5xl  → 48px

semantic.typography
├── heading      // h1, h2
├── subheading   // h3, h4
├── body         // p, div
└── caption      // small text
```

### Effect System

```typescript
semantic.effects
├── blur
│   ├── sm → blur(8px)
│   ├── md → blur(12px)
│   └── lg → blur(16px)
├── shadow
│   ├── sm → 0 2px 4px rgba(0,0,0,0.1)
│   ├── md → 0 4px 8px rgba(0,0,0,0.1)
│   └── lg → 0 8px 32px rgba(0,0,0,0.1)
└── gradient
    ├── primary
    └── glass
```

---

## Token Best Practices

### DO ✅

- **Use semantic tokens in components**: `semantic.color.primary` not `primitives.color.purple[500]`
- **Create component tokens for repeated patterns**: `components.button.variant.glass`
- **Extract tokens from prototypes**: Use `.superdesign` files as source of truth
- **Keep primitives pure**: No logic, just raw values
- **Document token purpose**: Add JSDoc comments for intent

```typescript
/**
 * Primary brand color used for CTAs and key interactions
 */
export const primary = primitives.color.purple[500];
```

### DON'T ❌

- **Don't skip semantic layer**: Never use primitives directly in components
- **Don't hardcode values**: Always reference tokens
- **Don't create one-off tokens**: Extract to primitives if used more than once
- **Don't mix concerns**: Keep color tokens separate from spacing tokens

```typescript
// BAD
<button style={{ background: '#A855F7' }}>

// GOOD
<button style={{ background: semantic.color.primary }}>
```

---

## Migration Checklist

When migrating existing components to the token system:

- [ ] Identify all hardcoded values (colors, spacing, sizes)
- [ ] Check if tokens exist in primitives
- [ ] Create new primitives if needed
- [ ] Map primitives to semantic tokens
- [ ] Create component tokens if reusable pattern
- [ ] Replace hardcoded values with token references
- [ ] Update Tailwind config if using utility classes
- [ ] Test component in light/dark themes
- [ ] Document new tokens in Storybook
- [ ] Update component stories with token controls

---

## Resources

- **Notion Database**: [Design System Tokens](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)
- **Token Files**: `/src/styles/tokens.ts`
- **CSS Variables**: `/src/styles/generated-tokens.css`
- **Tailwind Config**: `/tailwind.config.ts`
- **Prototypes**: `/.superdesign/design_iterations/`

---

**Next Steps**:
- Review [Component Migration Guide](./04-component-migration.md)
- Explore [Storybook Guide](./05-storybook-guide.md)
- See [Consumption Guide](./06-consumption-guide.md)
