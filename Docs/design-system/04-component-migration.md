# Component Migration Guide

**Version**: 1.0.0
**Status**: Active
**Last Updated**: October 2025
**Notion Database**: [Design System Components](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)

## Overview

This guide provides a comprehensive checklist for migrating existing components to the glassmorphism design system. Follow this process to ensure consistency, maintainability, and proper integration with the token system.

---

## Migration Process

### Phase 1: Planning (Before Code)

#### 1.1 Audit Current Component

- [ ] Document current props and API
- [ ] List all variants and states
- [ ] Identify hardcoded values (colors, spacing, etc.)
- [ ] Check for accessibility issues
- [ ] Review usage across codebase (use Grep/Search)
- [ ] Note breaking changes needed

**Tools**:
```bash
# Find all component usages
grep -r "import.*ComponentName" frontend/src

# Find hardcoded colors
grep -r "bg-\[#" frontend/src

# Find inline styles
grep -r "style={{" frontend/src
```

#### 1.2 Design Review

- [ ] Check for `.superdesign` prototype reference
- [ ] Verify glassmorphism variant exists
- [ ] Confirm token mappings in `/src/styles/tokens.ts`
- [ ] Validate responsive behavior
- [ ] Test dark mode appearance

#### 1.3 Create Migration Plan

- [ ] List token replacements needed
- [ ] Identify new variants to add
- [ ] Plan prop API changes
- [ ] Schedule breaking change communication
- [ ] Estimate migration time

---

### Phase 2: Implementation

#### 2.1 Token Integration

Replace hardcoded values with token references:

```typescript
// BEFORE
const Button = styled.button`
  background: #A855F7;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
`;

// AFTER
import { components, semantic, primitives } from '@/styles/tokens';

const Button = styled.button`
  background: ${semantic.color.primary};
  padding: ${primitives.spacing[3]} ${primitives.spacing[6]};
  border-radius: ${components.button.base.borderRadius};
  font-size: ${primitives.fontSize.base};
`;
```

**Checklist**:
- [ ] Replace all color values with semantic tokens
- [ ] Replace spacing with primitive spacing tokens
- [ ] Replace font sizes with primitive fontSize tokens
- [ ] Replace border radius with primitive borderRadius tokens
- [ ] Add component-specific tokens if patterns repeat

#### 2.2 Add Glassmorphism Variant

Every interactive component needs a `glass` variant:

```tsx
// Button component with glass variant
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-all',
  {
    variants: {
      variant: {
        primary: 'bg-purple-500 text-white hover:bg-purple-600',
        glass: [
          'bg-white/5',
          'border border-white/10',
          'backdrop-blur-md',
          'text-white',
          'hover:bg-white/10',
          'transition-all duration-200',
        ].join(' '),
      },
      size: {
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-13 px-8 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

**Checklist**:
- [ ] Add `glass` to variant enum/type
- [ ] Implement glassmorphism styles (backdrop-blur, border, etc.)
- [ ] Test hover/active/focus states
- [ ] Ensure proper contrast for accessibility
- [ ] Add dark mode overrides if needed

#### 2.3 Update Component API

Standardize props across components:

```typescript
// Standard component props pattern
export interface ComponentProps {
  // Variants
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';

  // State
  disabled?: boolean;
  loading?: boolean;

  // Styling
  className?: string;
  style?: React.CSSProperties;

  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;

  // Children
  children?: React.ReactNode;
}
```

**Checklist**:
- [ ] Follow naming conventions (variant, size, disabled)
- [ ] Add TypeScript types for all props
- [ ] Provide sensible defaults
- [ ] Support className for customization
- [ ] Add ARIA props for accessibility

#### 2.4 Import Path Updates

Migrate to new import paths:

```typescript
// OLD
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/common/Card';

// NEW
import { Button } from '@shared/ui/button';
import { Card } from '@shared/ui/card';
```

**Checklist**:
- [ ] Move component to `/src/shared/ui/{component-name}/`
- [ ] Update all import statements
- [ ] Update barrel exports in `/src/shared/ui/index.ts`
- [ ] Remove old component files
- [ ] Update path aliases in `tsconfig.json`

#### 2.5 Add CSS Utility Classes

Use glassmorphism utilities from `/src/styles/glassmorphism.css`:

```tsx
// Use pre-defined glass utilities
<div className="glass-card glass-hover">
  Content
</div>

// Available utilities:
// - glass-card
// - glass-panel
// - glass-button
// - glass-input
// - glass-hover
// - glass-active
// - glass-border
// - glass-glow
```

**Checklist**:
- [ ] Import glassmorphism.css in component
- [ ] Use utility classes instead of inline styles
- [ ] Combine with Tailwind utilities as needed
- [ ] Test visual consistency across components

---

### Phase 3: Testing

#### 3.1 Visual Testing

- [ ] Test all variants (primary, glass, outline, etc.)
- [ ] Test all sizes (sm, md, lg)
- [ ] Test all states (default, hover, active, focus, disabled)
- [ ] Test with different content lengths
- [ ] Test responsive behavior on mobile/tablet/desktop
- [ ] Test in light and dark modes
- [ ] Compare with `.superdesign` prototype

#### 3.2 Accessibility Testing

```tsx
// Add accessibility tests
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Button Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA attributes', () => {
    render(<Button aria-label="Submit form">Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Submit form');
  });

  it('should be keyboard accessible', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
```

**Checklist**:
- [ ] Run axe accessibility tests
- [ ] Test keyboard navigation (Tab, Enter, Space)
- [ ] Test screen reader announcements
- [ ] Verify ARIA labels and roles
- [ ] Check color contrast ratios (WCAG AA minimum)
- [ ] Test focus indicators

#### 3.3 Unit Testing

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies glass variant styles', () => {
    render(<Button variant="glass">Glass Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-white/5', 'backdrop-blur-md');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

**Checklist**:
- [ ] Test all props combinations
- [ ] Test event handlers (onClick, onChange, etc.)
- [ ] Test disabled and loading states
- [ ] Test edge cases (empty children, long text)
- [ ] Achieve >80% code coverage

#### 3.4 Integration Testing

- [ ] Test component in real page contexts
- [ ] Test with other migrated components
- [ ] Test form integrations
- [ ] Test with state management (Zustand)
- [ ] Test API integrations (React Query)

---

### Phase 4: Documentation

#### 4.1 Create Storybook Story

See [Storybook Guide](./05-storybook-guide.md) for details.

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'glass', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Glass: Story = {
  args: {
    children: 'Glass Button',
    variant: 'glass',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-end">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
```

**Checklist**:
- [ ] Create `.stories.tsx` file
- [ ] Add Meta configuration
- [ ] Create stories for each variant
- [ ] Add interactive controls (argTypes)
- [ ] Include usage examples
- [ ] Add dark background for glass variants
- [ ] Enable autodocs

#### 4.2 Update Component Documentation

Add JSDoc comments to component:

```tsx
/**
 * Button component with glassmorphism support
 *
 * @example
 * ```tsx
 * <Button variant="glass" size="lg">
 *   Click me
 * </Button>
 * ```
 *
 * @see {@link https://notion.so/28a4489affb9812d9ae1e0c23903c44c Design System}
 */
export function Button({ variant, size, className, ...props }: ButtonProps) {
  // ...
}
```

**Checklist**:
- [ ] Add component description
- [ ] Add usage examples
- [ ] Document all props with @param
- [ ] Link to Notion design specs
- [ ] Include accessibility notes

#### 4.3 Create Migration Guide

Document breaking changes and migration path:

```markdown
## Migration from v1 to v2

### Breaking Changes
- `color` prop renamed to `variant`
- `fullWidth` prop removed (use `className="w-full"` instead)
- Import path changed to `@shared/ui/button`

### Before
\`\`\`tsx
import { Button } from '@/components/Button';
<Button color="primary" fullWidth>Click</Button>
\`\`\`

### After
\`\`\`tsx
import { Button } from '@shared/ui/button';
<Button variant="primary" className="w-full">Click</Button>
\`\`\`
```

**Checklist**:
- [ ] List all breaking changes
- [ ] Provide before/after examples
- [ ] Create codemod if possible
- [ ] Update CHANGELOG.md
- [ ] Notify team in Slack/Discord

---

### Phase 5: Rollout

#### 5.1 Gradual Migration

Don't migrate everything at once. Use phased approach:

```typescript
// Phase 1: Add new component alongside old one
import { Button as ButtonV1 } from '@/components/Button';
import { Button as ButtonV2 } from '@shared/ui/button';

// Phase 2: Migrate page by page
// - Start with low-traffic pages
// - Monitor for issues
// - Gather feedback

// Phase 3: Deprecate old component
/**
 * @deprecated Use Button from '@shared/ui/button' instead
 */
export { Button as ButtonV1 };

// Phase 4: Remove old component
// - Ensure all usages migrated
// - Delete old files
// - Clean up dependencies
```

**Checklist**:
- [ ] Deploy new component in parallel with old
- [ ] Add feature flag if needed
- [ ] Monitor error rates
- [ ] Collect user feedback
- [ ] Fix issues before full rollout
- [ ] Remove old component after validation

#### 5.2 Update Dependents

Find and update all components that depend on migrated component:

```bash
# Find all files importing the component
grep -r "from '@/components/Button'" frontend/src

# Update imports programmatically
find frontend/src -name "*.tsx" -type f -exec sed -i '' 's/@\/components\/Button/@shared\/ui\/button/g' {} +
```

**Checklist**:
- [ ] Update all import statements
- [ ] Update prop usage (variant, size, etc.)
- [ ] Test each dependent component
- [ ] Update tests for dependents
- [ ] Update Storybook stories

---

## Component Checklist

Track migration status for all 21 components:

### Core Components (Priority 1)

- [ ] **Button** (`@shared/ui/button`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Card** (`@shared/ui/card`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Input** (`@shared/ui/input`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Badge** (`@shared/ui/badge`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

### Form Components (Priority 2)

- [ ] **Select** (`@shared/ui/select`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Checkbox** (`@shared/ui/checkbox`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Radio** (`@shared/ui/radio`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Switch** (`@shared/ui/switch`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Textarea** (`@shared/ui/textarea`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

### Navigation Components (Priority 3)

- [ ] **Tabs** (`@shared/ui/tabs`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Breadcrumb** (`@shared/ui/breadcrumb`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Pagination** (`@shared/ui/pagination`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

### Overlay Components (Priority 4)

- [ ] **Dialog** (`@shared/ui/dialog`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Popover** (`@shared/ui/popover`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Tooltip** (`@shared/ui/tooltip`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Sheet** (`@shared/ui/sheet`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

### Feedback Components (Priority 5)

- [ ] **Alert** (`@shared/ui/alert`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Toast** (`@shared/ui/toast`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Progress** (`@shared/ui/progress`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Spinner** (`@shared/ui/spinner`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

- [ ] **Skeleton** (`@shared/ui/skeleton`)
  - [ ] Glass variant
  - [ ] Token integration
  - [ ] Storybook story
  - [ ] Tests (unit + a11y)
  - [ ] Documentation

---

## Automation Scripts

### Bulk Import Update

```bash
#!/bin/bash
# scripts/update-imports.sh

# Update all Button imports
find frontend/src -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i '' 's/from ["'\'']@\/components\/ui\/Button["'\'']/from "@shared\/ui\/button"/g'

# Update all Card imports
find frontend/src -name "*.tsx" -o -name "*.ts" | \
  xargs sed -i '' 's/from ["'\'']@\/components\/common\/Card["'\'']/from "@shared\/ui\/card"/g'

echo "Imports updated successfully!"
```

### Component Generator

```bash
#!/bin/bash
# scripts/generate-component.sh

COMPONENT_NAME=$1
COMPONENT_PATH="frontend/src/shared/ui/${COMPONENT_NAME,,}"

mkdir -p $COMPONENT_PATH

# Create component file
cat > "$COMPONENT_PATH/${COMPONENT_NAME}.tsx" << EOF
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const ${COMPONENT_NAME,,}Variants = cva(
  'base-styles',
  {
    variants: {
      variant: {
        primary: 'primary-styles',
        glass: 'glass-styles',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  }
);

export interface ${COMPONENT_NAME}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${COMPONENT_NAME,,}Variants> {}

export function ${COMPONENT_NAME}({ variant, className, ...props }: ${COMPONENT_NAME}Props) {
  return (
    <div
      className={cn(${COMPONENT_NAME,,}Variants({ variant }), className)}
      {...props}
    />
  );
}
EOF

# Create story file
cat > "$COMPONENT_PATH/${COMPONENT_NAME}.stories.tsx" << EOF
import type { Meta, StoryObj } from '@storybook/react';
import { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';

const meta: Meta<typeof ${COMPONENT_NAME}> = {
  title: 'Components/${COMPONENT_NAME}',
  component: ${COMPONENT_NAME},
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ${COMPONENT_NAME}>;

export const Default: Story = {
  args: {},
};
EOF

# Create test file
cat > "$COMPONENT_PATH/${COMPONENT_NAME}.test.tsx" << EOF
import { render, screen } from '@testing-library/react';
import { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';

describe('${COMPONENT_NAME}', () => {
  it('renders correctly', () => {
    render(<${COMPONENT_NAME}>Test</${COMPONENT_NAME}>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
EOF

# Create index file
cat > "$COMPONENT_PATH/index.ts" << EOF
export { ${COMPONENT_NAME} } from './${COMPONENT_NAME}';
export type { ${COMPONENT_NAME}Props } from './${COMPONENT_NAME}';
EOF

echo "Component ${COMPONENT_NAME} generated at $COMPONENT_PATH"
```

---

## Common Migration Issues

### Issue 1: Backdrop Filter Not Working

**Problem**: `backdrop-filter: blur()` not rendering

**Solution**:
```css
/* Ensure backdrop-filter support */
.glass-card {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px); /* Safari support */
}

/* Fallback for older browsers */
@supports not (backdrop-filter: blur()) {
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
  }
}
```

### Issue 2: Token Imports Not Resolving

**Problem**: TypeScript can't find token imports

**Solution**:
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/styles/*": ["./src/styles/*"],
      "@shared/*": ["./src/shared/*"]
    }
  }
}
```

### Issue 3: Glass Variant Invisible

**Problem**: Glass elements not visible on certain backgrounds

**Solution**:
```tsx
// Add proper background context
<div className="bg-gradient-to-br from-purple-900 via-gray-900 to-black min-h-screen">
  <Card variant="glass">
    Now visible!
  </Card>
</div>
```

### Issue 4: Storybook Not Loading Styles

**Problem**: Glassmorphism styles missing in Storybook

**Solution**:
```typescript
// .storybook/preview.tsx
import '../src/styles/globals.css';
import '../src/styles/glassmorphism.css';

export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      { name: 'dark', value: '#0a0a0a' },
      { name: 'gradient', value: 'linear-gradient(to bottom right, #581C87, #0a0a0a)' },
    ],
  },
};
```

---

## Resources

- **Notion Database**: [Component Migration Tracker](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)
- **Token System**: [Token System Documentation](./03-token-system.md)
- **Storybook Guide**: [Storybook Guide](./05-storybook-guide.md)
- **Design Prototypes**: `/.superdesign/design_iterations/`
- **Component Library**: `/frontend/src/shared/ui/`

---

**Next Steps**:
- Start with high-priority components (Button, Card, Input)
- Create Storybook stories as you migrate
- Update Notion tracker with progress
- Review [Consumption Guide](./06-consumption-guide.md) for publishing
