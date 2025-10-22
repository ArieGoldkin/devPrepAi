# Developer Quick Reference

**Purpose**: Fast-track guide for development workflows and patterns.

---

## 🚀 Quick Start

```bash
# 1. Setup environment
./setup.sh  # Links .env file to frontend

# 2. Install & run
cd frontend
npm install
npm run dev  # http://localhost:3000
```

---

## 📁 Where Things Are

```
frontend/src/
├── app/                    # Routes only (Next.js App Router)
│   ├── page.tsx           # Home page → calls modules/home
│   └── practice/page.tsx  # Practice → calls modules/practice
│
├── modules/               # Feature logic (self-contained)
│   ├── practice/         # Practice wizard & session
│   ├── assessment/       # Timed assessments
│   ├── questions/        # Question generation
│   ├── results/          # Results display
│   ├── profile/          # User profile
│   └── home/             # Landing page
│
├── shared/               # Cross-cutting concerns
│   ├── ui/              # shadcn components (Button, Card, etc.)
│   ├── components/      # Layouts (AppLayout, AuthLayout)
│   ├── hooks/           # Reusable hooks
│   └── utils/           # Helpers (cn, formatters)
│
├── lib/                  # External integrations
│   ├── trpc/            # API layer (routers, procedures)
│   └── claude/          # Claude AI service
│
├── store/                # Global state (Zustand)
│   └── slices/          # practice/, user, results, streak
│
└── styles/               # Design system
    ├── globals.css      # Base styles + design tokens
    └── glassmorphism.css # Glass effects, glows, animations
```

---

## 🛠 Development Workflows

### Adding a New Feature

1. **Create module** (if new domain):
   ```
   modules/new-feature/
   ├── components/      # Feature-specific components
   ├── hooks/          # Feature-specific hooks
   └── types.ts        # Feature types
   ```

2. **Use existing UI**: Import from `@shared/ui` (shadcn)
3. **Add state**: Create slice in `store/slices/`
4. **API needed?**: Add router in `lib/trpc/routers/`

### Adding a Component

**Option 1: Use shadcn** (preferred)
```bash
npx shadcn@latest add button  # Adds to shared/ui/
```

**Option 2: Custom component**
- **Shared across features?** → `shared/components/`
- **Feature-specific?** → `modules/{feature}/components/`

### Styling Pattern

```tsx
import { Button } from "@shared/ui/button";
import { cn } from "@shared/utils/cn";

// Combine shadcn + glassmorphism
<Button className={cn("btn-glass", "neon-glow")}>
  Click Me
</Button>
```

---

## 🔗 Integration Patterns

### tRPC + React Query + Zustand

```tsx
// 1. Define API procedure (lib/trpc/routers/ai.ts)
generateQuestions: publicProcedure
  .input(schema)
  .mutation(async ({ input }) => { ... })

// 2. Call from component (auto-typed hook)
const { mutate } = trpc.ai.generateQuestions.useMutation();

// 3. Store in Zustand (if needed globally)
const setQuestions = usePracticeStore(s => s.setQuestions);
mutate(input, {
  onSuccess: (data) => setQuestions(data)
});
```

**When to use what:**
- **tRPC**: Server calls (AI, API routes)
- **React Query**: Automatic via tRPC hooks
- **Zustand**: Cross-component state (wizard progress, user profile)

---

## ⚙️ Common Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack)
npm run build           # Production build

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Auto-fix issues
npm run type-check      # TypeScript validation
npm run test            # Type-check + file size check

# Formatting
npm run format          # Format with Prettier
npm run format:check    # Check formatting
```

---

## 📏 Code Conventions

### File Limits (ESLint enforced)
- **Max 180 lines** per file (code only, excludes blanks/comments)
- **Max complexity 15** per function
- **Break up large files** into sub-components

### Import Patterns
```tsx
// Path aliases (configured in tsconfig.json)
import { Button } from "@shared/ui/button";
import { usePractice } from "@modules/practice/hooks/usePractice";
import { trpc } from "@lib/trpc/client";
import { usePracticeStore } from "@store/hooks";
```

### Naming Conventions
- **Interfaces**: `I` prefix → `IButtonProps`, `IUserProfile`
- **Types**: No prefix → `QuestionType`, `Difficulty`
- **Components**: PascalCase → `PracticeWizard.tsx`
- **Hooks**: camelCase → `usePractice.ts`

### Component Structure
```tsx
import type { ReactElement } from "react";

interface IComponentProps {
  // props
}

export function Component({ props }: IComponentProps): ReactElement {
  return <div>...</div>;
}
```

---

## 🎨 Design System

### Glassmorphism Utilities (styles/glassmorphism.css)

```css
/* Glass Effects */
.glass-card              /* Frosted glass container */
.glass-card-static       /* No hover effect */
.btn-glass               /* Glass button */
.btn-primary-glass       /* Primary gradient glass */

/* Glow Effects */
.neon-glow               /* Primary purple glow */
.neon-glow-pink          /* Pink glow */
.neon-glow-blue          /* Blue glow */
.neon-glow-green         /* Green glow (success) */
.neon-glow-orange        /* Orange glow (warning) */

/* Text Effects */
.gradient-text           /* Animated gradient text */
.text-glow               /* Subtle text shadow */

/* Animations */
.fade-in                 /* Fade in with glass */
.fade-in-delay-{1-4}     /* Staggered delays */
.pulse-glow              /* Pulsing glow */
```

### Color Tokens (styles/globals.css)
```css
--brand-primary: 236 86% 63%     /* Purple */
--brand-secondary: 259 100% 71%  /* Pink */
--brand-accent: 200 98% 39%      /* Blue */
--brand-success: 142 76% 36%     /* Green */
```

---

## 🏗️ Architecture Principles

1. **Domain-driven modules**: Each module is self-contained
2. **Single source of truth**: No duplicate logic
3. **Code quality**: ESLint enforces limits
4. **Clean imports**: Use path aliases
5. **Component reuse**: shadcn + custom styling
6. **Zero redundancy**: Extract to hooks/utils

---

## 📚 Related Docs

- [CLAUDE.md](../CLAUDE.md) - Project overview & task tracking
- [technical-architecture.md](./technical-architecture.md) - Detailed architecture
- [code-standards.md](./code-standards.md) - ESLint rules & patterns
- [design-system.md](./design-system.md) - Component library
- [api-design.md](./api-design.md) - tRPC patterns

---

**Last Updated**: Oct 2025 (v2.0.0)
