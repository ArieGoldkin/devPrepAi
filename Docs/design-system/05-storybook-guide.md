# Storybook Guide

**Version**: 1.0.0
**Status**: Active
**Last Updated**: October 2025
**Notion Database**: [Design System Storybook](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)

## Overview

Storybook is the single source of truth for component documentation, visual testing, and interactive development. This guide covers writing stories, configuring controls, testing accessibility, and best practices for the DevPrep AI design system.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Writing Stories](#writing-stories)
3. [Interactive Controls](#interactive-controls)
4. [Glassmorphism Setup](#glassmorphism-setup)
5. [Accessibility Testing](#accessibility-testing)
6. [Story Organization](#story-organization)
7. [Best Practices](#best-practices)
8. [Examples](#examples)

---

## Getting Started

### Installation

```bash
# Install Storybook dependencies
npm install --save-dev @storybook/react @storybook/react-vite
npm install --save-dev @storybook/addon-essentials @storybook/addon-a11y
npm install --save-dev @storybook/addon-interactions @storybook/test
```

### Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../frontend/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../frontend/src/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;
```

### Global Styles

```typescript
// .storybook/preview.tsx
import React from 'react';
import type { Preview } from '@storybook/react';
import '../frontend/src/styles/globals.css';
import '../frontend/src/styles/glassmorphism.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0a0a0a',
        },
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #581C87 0%, #1F2937 50%, #0a0a0a 100%)',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="font-sans antialiased">
        <Story />
      </div>
    ),
  ],
};

export default preview;
```

### Run Storybook

```bash
# Start development server
npm run storybook

# Build static version
npm run build-storybook

# Preview build
npx http-server storybook-static
```

---

## Writing Stories

### Basic Story Structure

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Meta configuration defines component metadata
const meta: Meta<typeof Button> = {
  title: 'Components/Button',          // Path in sidebar
  component: Button,                    // Component to document
  tags: ['autodocs'],                   // Enable auto-generated docs
  parameters: {
    layout: 'centered',                 // Center component in canvas
  },
};

export default meta;

// Story type with component props
type Story = StoryObj<typeof Button>;

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
  },
};
```

### Meta Configuration

```typescript
const meta: Meta<typeof Component> = {
  // Required fields
  title: 'Category/ComponentName',      // Sidebar navigation path
  component: Component,                  // React component

  // Optional fields
  tags: ['autodocs'],                   // Generate docs page
  parameters: {
    layout: 'centered' | 'fullscreen' | 'padded',
    backgrounds: { default: 'dark' },   // Background preset
    docs: {
      description: {
        component: 'Component description',
      },
    },
  },
  decorators: [(Story) => <div><Story /></div>],
  argTypes: {
    // Control configurations (see below)
  },
};
```

### Story Types

#### 1. Simple Story

```tsx
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

#### 2. Story with Render Function

```tsx
export const AllSizes: Story = {
  render: (args) => (
    <div className="flex gap-4 items-center">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
```

#### 3. Story with Play Function (Interactions)

```tsx
import { userEvent, within, expect } from '@storybook/test';

export const Clickable: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Simulate user interaction
    await userEvent.click(button);

    // Assert expected behavior
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  },
};
```

#### 4. Story with Parameters

```tsx
export const DarkBackground: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Button',
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Glass variant works best on dark backgrounds',
      },
    },
  },
};
```

---

## Interactive Controls

### ArgTypes Configuration

ArgTypes define how props appear in the Controls panel.

```typescript
const meta: Meta<typeof Button> = {
  // ...
  argTypes: {
    // Select dropdown
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'glass', 'outline'],
      description: 'Visual style variant',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'primary' },
      },
    },

    // Radio buttons
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },

    // Boolean toggle
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },

    // Text input
    children: {
      control: 'text',
      description: 'Button content',
    },

    // Color picker
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },

    // Number slider
    width: {
      control: { type: 'range', min: 100, max: 500, step: 10 },
      description: 'Button width in pixels',
    },

    // Object editor
    style: {
      control: 'object',
      description: 'Custom CSS styles',
    },

    // Date picker
    date: {
      control: 'date',
      description: 'Select a date',
    },

    // Disable control
    onClick: {
      control: false,
      description: 'Click event handler',
    },
  },
};
```

### Control Types Reference

| Type | Usage | Example |
|------|-------|---------|
| `boolean` | True/false toggle | `disabled: true` |
| `text` | Text input | `children: "Button"` |
| `number` | Number input | `width: 200` |
| `range` | Slider | `{ type: 'range', min: 0, max: 100 }` |
| `color` | Color picker | `backgroundColor: "#A855F7"` |
| `date` | Date picker | `createdAt: new Date()` |
| `select` | Dropdown | `options: ['sm', 'md', 'lg']` |
| `radio` | Radio buttons | `options: ['left', 'center', 'right']` |
| `inline-radio` | Inline radios | Same as radio, inline layout |
| `check` | Checkboxes | `options: ['bold', 'italic']` |
| `inline-check` | Inline checkboxes | Same as check, inline |
| `multi-select` | Multi-select | `options: ['a', 'b', 'c']` |
| `object` | JSON editor | `config: { theme: 'dark' }` |
| `array` | Array editor | `items: [1, 2, 3]` |
| `file` | File upload | `avatar: File` |

### Dynamic Controls

```typescript
export const DynamicExample: Story = {
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'glass'],
      // Conditionally show 'glowIntensity' only for glass variant
      if: { arg: 'variant', eq: 'glass' },
    },
    glowIntensity: {
      control: { type: 'range', min: 0, max: 100 },
      if: { arg: 'variant', eq: 'glass' },
    },
  },
};
```

---

## Glassmorphism Setup

### Background Decorators

Create consistent backgrounds for glass components:

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <div className="min-h-[300px] p-8 bg-gradient-to-br from-purple-900 via-gray-900 to-black rounded-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Glass: Story = {
  args: {
    variant: 'glass',
    children: 'Glass Button',
  },
};
```

### Custom Backgrounds

```typescript
// .storybook/preview.tsx
export const parameters = {
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#0a0a0a',
      },
      {
        name: 'gradient-purple',
        value: 'linear-gradient(135deg, #581C87 0%, #1F2937 50%, #0a0a0a 100%)',
      },
      {
        name: 'gradient-blue',
        value: 'linear-gradient(135deg, #1E3A8A 0%, #1F2937 50%, #0a0a0a 100%)',
      },
      {
        name: 'image',
        value: 'url("/storybook-assets/bg-pattern.png")',
      },
    ],
  },
};
```

### Glass Showcase Story

```tsx
export const GlassShowcase: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-6 p-8 bg-gradient-to-br from-purple-900 via-gray-900 to-black rounded-2xl">
      <Card variant="glass" className="p-6">
        <h3 className="text-xl font-bold mb-2">Glass Card</h3>
        <p className="text-gray-300">With backdrop blur and borders</p>
      </Card>

      <Card variant="glass" className="p-6 glass-hover">
        <h3 className="text-xl font-bold mb-2">Hoverable Card</h3>
        <p className="text-gray-300">Try hovering over this</p>
      </Card>

      <div className="col-span-2 flex gap-4 justify-center">
        <Button variant="glass" size="sm">Small</Button>
        <Button variant="glass" size="md">Medium</Button>
        <Button variant="glass" size="lg">Large</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
};
```

---

## Accessibility Testing

### Enable A11y Addon

```typescript
// .storybook/main.ts
export default {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',  // Accessibility testing
  ],
};
```

### A11y Parameters

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    a11y: {
      // Configure accessibility rules
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
        ],
      },
      // Test specific elements
      element: '#root',
      // Manual checks
      manual: true,
    },
  },
};

export default meta;
```

### Testing ARIA Attributes

```tsx
export const WithARIA: Story = {
  args: {
    children: 'Submit Form',
    'aria-label': 'Submit the contact form',
    'aria-describedby': 'submit-description',
  },
  render: (args) => (
    <>
      <Button {...args} />
      <p id="submit-description" className="sr-only">
        Clicking this button will submit your contact form
      </p>
    </>
  ),
};
```

### Keyboard Navigation Test

```tsx
import { userEvent, within, expect } from '@storybook/test';

export const KeyboardNavigation: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    // Tab through buttons
    await userEvent.tab();
    await expect(buttons[0]).toHaveFocus();

    await userEvent.tab();
    await expect(buttons[1]).toHaveFocus();

    await userEvent.tab();
    await expect(buttons[2]).toHaveFocus();

    // Activate with Enter
    await userEvent.keyboard('{Enter}');
  },
};
```

### Screen Reader Testing

```tsx
export const ScreenReaderOptimized: Story = {
  render: () => (
    <Button
      aria-label="Delete item"
      aria-describedby="delete-help"
    >
      <TrashIcon className="w-5 h-5" aria-hidden="true" />
      <span className="sr-only">Delete</span>
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon button with proper screen reader support',
      },
    },
  },
};
```

---

## Story Organization

### File Structure

```
src/shared/ui/
├── button/
│   ├── Button.tsx
│   ├── Button.stories.tsx       # Component stories
│   ├── Button.test.tsx
│   └── index.ts
├── card/
│   ├── Card.tsx
│   ├── Card.stories.tsx
│   └── index.ts
└── form/
    ├── Input.tsx
    ├── Input.stories.tsx
    ├── Select.tsx
    ├── Select.stories.tsx
    ├── Form.stories.tsx          # Composite stories
    └── index.ts
```

### Naming Conventions

```typescript
// Title format: Category/SubCategory/ComponentName
title: 'Components/Button'           // Basic component
title: 'Components/Forms/Input'      // Nested category
title: 'Patterns/Authentication'     // Design pattern
title: 'Pages/Dashboard'             // Full page
```

### Story Naming

```typescript
// Story export names should be descriptive
export const Default: Story = {};              // Default state
export const Primary: Story = {};              // Primary variant
export const WithIcon: Story = {};             // With additional feature
export const LongText: Story = {};             // Edge case
export const Loading: Story = {};              // Loading state
export const Error: Story = {};                // Error state
export const Disabled: Story = {};             // Disabled state
export const Responsive: Story = {};           // Responsive behavior
export const DarkMode: Story = {};             // Theme variant
export const Playground: Story = {};           // Interactive sandbox
```

### Categories

```
📁 Components/          # Atomic components
  ├── Button
  ├── Card
  ├── Input
  └── Badge

📁 Patterns/           # Composite patterns
  ├── LoginForm
  ├── DashboardCard
  └── NavigationMenu

📁 Pages/              # Full page layouts
  ├── Landing
  ├── Dashboard
  └── Profile

📁 Utilities/          # Utility components
  ├── Toast
  ├── Modal
  └── Spinner

📁 Examples/           # Usage examples
  ├── FormExamples
  └── LayoutExamples
```

---

## Best Practices

### 1. Write Comprehensive Stories

Cover all variants, states, and edge cases:

```tsx
// ✅ GOOD - Comprehensive coverage
export const Primary: Story = { args: { variant: 'primary' } };
export const Glass: Story = { args: { variant: 'glass' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const WithIcon: Story = { args: { icon: <Icon /> } };
export const LongText: Story = { args: { children: 'Very long text...' } };

// ❌ BAD - Only default state
export const Default: Story = {};
```

### 2. Use Decorators for Context

```tsx
// Provide necessary context for components
const meta: Meta<typeof Toast> = {
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};
```

### 3. Document Component Behavior

```tsx
export const HoverState: Story = {
  args: {
    variant: 'glass',
  },
  parameters: {
    docs: {
      description: {
        story: 'Glass variant includes hover effects with backdrop blur transitions',
      },
    },
  },
};
```

### 4. Test Interactive Behavior

```tsx
import { userEvent, within, expect } from '@storybook/test';

export const FormSubmission: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Fill form
    await userEvent.type(canvas.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(canvas.getByLabelText('Password'), 'password123');

    // Submit
    await userEvent.click(canvas.getByRole('button', { name: /submit/i }));

    // Verify
    await expect(canvas.getByText('Success!')).toBeInTheDocument();
  },
};
```

### 5. Use Args Composition

```tsx
// Base args for reuse
const baseArgs = {
  variant: 'glass',
  size: 'md',
};

export const Glass: Story = {
  args: {
    ...baseArgs,
    children: 'Glass Button',
  },
};

export const GlassLarge: Story = {
  args: {
    ...baseArgs,
    size: 'lg',
    children: 'Large Glass Button',
  },
};
```

### 6. Create Playground Stories

```tsx
export const Playground: Story = {
  args: {
    variant: 'glass',
    size: 'md',
    disabled: false,
    loading: false,
    children: 'Customize me',
  },
  argTypes: {
    variant: { control: 'select' },
    size: { control: 'radio' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    children: { control: 'text' },
  },
};
```

### 7. Document Usage Patterns

```tsx
export const FormExample: Story = {
  render: () => (
    <form className="space-y-4 max-w-md">
      <Input label="Email" type="email" variant="glass" />
      <Input label="Password" type="password" variant="glass" />
      <Button variant="glass" type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using glass variant inputs in a form',
      },
    },
  },
};
```

---

## Examples

### Button Component

```tsx
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { PlusIcon, TrashIcon, CheckIcon } from '@/shared/ui/icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'glass', 'outline', 'ghost'],
      description: 'Visual style variant',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
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
  decorators: [
    (Story) => (
      <div className="p-8 bg-gradient-to-br from-purple-900 to-black rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export const WithIcon: Story = {
  args: {
    children: 'Add Item',
    variant: 'glass',
  },
  render: (args) => (
    <Button {...args}>
      <PlusIcon className="w-5 h-5 mr-2" />
      {args.children}
    </Button>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <div className="flex gap-4 p-6 bg-gradient-to-br from-purple-900 to-black rounded-xl">
        <Button variant="glass">Glass</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading...',
    loading: true,
    variant: 'glass',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
    variant: 'glass',
  },
};

export const Playground: Story = {
  args: {
    children: 'Customize Me',
    variant: 'glass',
    size: 'md',
    disabled: false,
    loading: false,
  },
};
```

### Card Component

```tsx
// Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Button } from '../button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="min-w-[400px] p-8 bg-gradient-to-br from-purple-900 via-gray-900 to-black">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card variant="glass">
      <CardContent className="p-6">
        <p>Basic card content</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card variant="glass">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Main content area</p>
      </CardContent>
    </Card>
  ),
};

export const FullFeatured: Story = {
  render: () => (
    <Card variant="glass" className="glass-hover">
      <CardHeader>
        <CardTitle>Feature Card</CardTitle>
        <CardDescription>Complete card with all sections</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This card demonstrates all available sections:</p>
          <ul className="list-disc list-inside text-gray-300">
            <li>Header with title and description</li>
            <li>Content area</li>
            <li>Footer with actions</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="glass" size="sm">Confirm</Button>
      </CardFooter>
    </Card>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} variant="glass">
          <CardHeader>
            <CardTitle>Card {i}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Content for card {i}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};
```

### Form Components

```tsx
// Form.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';
import { Button } from '../button';

const meta: Meta = {
  title: 'Patterns/Form',
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="w-[500px] p-8 bg-gradient-to-br from-purple-900 to-black rounded-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const ContactForm: Story = {
  render: () => (
    <form className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>

      <Input
        label="Name"
        variant="glass"
        placeholder="Your name"
        required
      />

      <Input
        label="Email"
        type="email"
        variant="glass"
        placeholder="you@example.com"
        required
      />

      <Select
        label="Subject"
        variant="glass"
        options={[
          { value: 'support', label: 'Support' },
          { value: 'sales', label: 'Sales' },
          { value: 'other', label: 'Other' },
        ]}
      />

      <Textarea
        label="Message"
        variant="glass"
        placeholder="How can we help?"
        rows={4}
        required
      />

      <Button variant="glass" className="w-full" size="lg">
        Send Message
      </Button>
    </form>
  ),
};

export const SignupForm: Story = {
  render: () => (
    <form className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">Create Account</h2>
        <p className="text-gray-400 mt-2">Get started with DevPrep AI</p>
      </div>

      <Input
        label="Email"
        type="email"
        variant="glass"
        placeholder="you@example.com"
      />

      <Input
        label="Password"
        type="password"
        variant="glass"
        placeholder="••••••••"
      />

      <Input
        label="Confirm Password"
        type="password"
        variant="glass"
        placeholder="••••••••"
      />

      <Button variant="primary" className="w-full" size="lg">
        Sign Up
      </Button>

      <p className="text-center text-sm text-gray-400">
        Already have an account?{' '}
        <a href="#" className="text-purple-400 hover:text-purple-300">
          Sign in
        </a>
      </p>
    </form>
  ),
};
```

---

## Resources

- **Notion Database**: [Storybook Documentation](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)
- **Storybook Docs**: [https://storybook.js.org](https://storybook.js.org)
- **A11y Addon**: [https://storybook.js.org/addons/@storybook/addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y)
- **Component Library**: `/frontend/src/shared/ui/`

---

**Next Steps**:
- Write stories for all migrated components
- Set up CI/CD for Storybook deployment
- Share Storybook URL with team
- Review [Consumption Guide](./06-consumption-guide.md)
