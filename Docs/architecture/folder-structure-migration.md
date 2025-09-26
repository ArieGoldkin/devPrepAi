# Folder Structure Migration Guide

## Overview
This document outlines the migration from our current 17-folder structure to a simplified 6-folder architecture following Next.js 2025 best practices.

## Migration Philosophy
- **Domain-Driven Design**: Organize by business features, not technical layers
- **Simplicity First**: Reduce cognitive load with fewer top-level folders
- **Clear Boundaries**: Separate routing, business logic, and shared utilities
- **Self-Contained Modules**: Each feature owns its components, hooks, and utils

## Before vs After Structure

### Before (17 folders)
```
frontend/src/
├── api/          # Mixed with app/api
├── app/          # Routes + components mixed
├── components/   # Overlaps with features
├── config/       # App configuration
├── constants/    # Global constants
├── data/         # Static data
├── design/       # Design tokens
├── features/     # Feature components
├── hooks/        # Global hooks
├── query/        # React Query setup
├── services/     # API services
├── store/        # State management
├── types/        # TypeScript types
├── ui/           # UI components
├── utils/        # Utilities
└── (17 total directories)
```

### After (6 folders)
```
frontend/src/
├── app/          # Pure routing layer
├── modules/      # Feature-based modules
├── shared/       # Cross-cutting concerns
├── lib/          # External integrations
├── styles/       # Global styling
└── types/        # TypeScript definitions
```

## Detailed Migration Map

### 1. App Directory (Routes Only)
**Principle**: The app directory should ONLY contain routing files

| From | To | Action |
|------|-----|---------|
| `app/design-system/components/*` | `shared/ui/examples/` | Move component demos |
| `app/*/page.tsx` | Keep in place | Refactor to import from modules |
| `app/api/*` | Keep in place | API routes stay |

### 2. Modules Directory (Feature Logic)
**Principle**: Each module is self-contained with its own components, hooks, and utilities

```
modules/
├── practice/
│   ├── components/
│   │   ├── PracticeWizard.tsx
│   │   └── CodeEditor.tsx
│   ├── hooks/
│   │   └── usePracticeSession.ts
│   ├── utils/
│   │   └── sessionHelpers.ts
│   └── types.ts
├── assessment/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types.ts
├── results/
│   └── (same structure)
└── home/
    └── (same structure)
```

| From | To |
|------|-----|
| `features/practice/*` | `modules/practice/` |
| `features/assessment/*` | `modules/assessment/` |
| `features/results/*` | `modules/results/` |
| `features/home/*` | `modules/home/` |
| `features/profile/*` | `modules/profile/` |

### 3. Shared Directory (Cross-Module Resources)
**Principle**: Only truly shared components and utilities

```
shared/
├── ui/          # Design system components
├── hooks/       # Generic React hooks
├── utils/       # Helper functions
└── constants/   # App-wide constants
```

| From | To |
|------|-----|
| `components/ui/*` | `shared/ui/` |
| `ui/components/*` | `shared/ui/` |
| `components/shared/*` | `shared/ui/` |
| `hooks/*` | `shared/hooks/` |
| `utils/*` | `shared/utils/` |
| `constants/*` | `shared/constants/` |
| `design/utilities.ts` | `shared/utils/` |

### 4. Lib Directory (External Services)
**Principle**: Clean separation of third-party integrations

```
lib/
├── claude/      # AI integration
├── query/       # React Query
└── store/       # Zustand stores
```

| From | To |
|------|-----|
| `api/claude/*` | `lib/claude/` |
| `api/client.ts` | `lib/claude/client.ts` |
| `query/*` | `lib/query/` |
| `store/*` | `lib/store/` |
| `services/*` | `lib/claude/services/` |

### 5. Styles Directory (Global Styling)
**Principle**: Centralized styling foundation

```
styles/
├── globals.css
└── tokens.ts    # Design tokens
```

| From | To |
|------|-----|
| `app/globals.css` | `styles/globals.css` |
| `design/tokens.ts` | `styles/tokens.ts` |
| `design/variants.ts` | `styles/variants.ts` |

### 6. Types Directory (TypeScript)
**Principle**: Global type definitions

| From | To |
|------|-----|
| `types/*` | `types/*` (keep as is) |

## Migration Steps

### Phase 1: Setup New Structure
```bash
# Create new directories
mkdir -p frontend/src/modules
mkdir -p frontend/src/modules/{practice,assessment,results,home,profile}
mkdir -p frontend/src/shared/{ui,hooks,utils,constants}
mkdir -p frontend/src/lib/{claude,query,store}
mkdir -p frontend/src/styles
```

### Phase 2: Move Files
1. Start with `modules/` - move feature folders
2. Consolidate `shared/` resources
3. Organize `lib/` integrations
4. Move styling to `styles/`
5. Clean up `app/` directory

### Phase 3: Update Imports

#### Before
```typescript
import { Button } from '@/components/ui/button'
import { usePractice } from '@/features/practice/hooks'
import { api } from '@/api/client'
```

#### After
```typescript
import { Button } from '@/shared/ui/button'
import { usePractice } from '@/modules/practice/hooks'
import { api } from '@/lib/claude/client'
```

### Phase 4: Update Path Aliases
Update `tsconfig.json`:
```json
{
  "paths": {
    "@/modules/*": ["./src/modules/*"],
    "@/shared/*": ["./src/shared/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/styles/*": ["./src/styles/*"],
    "@/types/*": ["./src/types/*"],
    "@/app/*": ["./src/app/*"]
  }
}
```

## Verification Checklist

- [ ] All feature code moved to `modules/`
- [ ] `app/` directory contains only routing files
- [ ] Shared components consolidated in `shared/ui/`
- [ ] External integrations in `lib/`
- [ ] No duplicate components across folders
- [ ] All imports updated
- [ ] TypeScript compilation passes
- [ ] Linting passes
- [ ] Application runs without errors

## Benefits Achieved

1. **50% Reduction in Folders**: 17 → 6 top-level directories
2. **Clear Mental Model**: Obvious where each piece of code belongs
3. **Better Scalability**: Easy to add new modules
4. **Improved DX**: Faster navigation and understanding
5. **Future-Proof**: Aligns with Next.js 2025 best practices

## Import Update Script
```bash
# Example script to update imports (to be customized)
find frontend/src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's|@/components/ui/|@/shared/ui/|g' \
  -e 's|@/features/|@/modules/|g' \
  -e 's|@/api/|@/lib/claude/|g' \
  -e 's|@/design/|@/styles/|g' \
  {} +
```

## Notes
- This migration maintains all existing functionality
- No business logic changes, only organizational
- Can be done incrementally if needed
- Consider running in a feature branch first