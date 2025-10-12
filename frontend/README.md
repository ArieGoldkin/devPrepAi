# Frontend - DevPrep AI

Next.js 15 application with a clean, domain-driven architecture.

## 🏗️ Architecture

### 6-Folder Structure

```
src/
├── app/          # Next.js App Router (routes only)
├── modules/      # Feature-based business logic
├── shared/       # Cross-cutting concerns
├── lib/          # External integrations
├── styles/       # Design system foundation
└── types/        # TypeScript definitions
```

### Design Principles

- **Domain-Driven**: Features organized by business domain
- **Single Responsibility**: Each folder has one clear purpose
- **Clean Imports**: Using `@modules/`, `@shared/`, `@lib/` aliases
- **No Redundancy**: Single source of truth for all code

## 📦 Module Structure

Each module is self-contained:

```
modules/assessment/
├── components/      # Module-specific components
├── hooks/          # Module-specific hooks
├── utils/          # Module utilities
└── types.ts        # Module types
```

## 🎨 Import Patterns

```typescript
// Clean, intuitive imports
import { Button } from "@shared/ui/button"
import { useAppStore } from "@lib/store/useAppStore"
import { AssessmentView } from "@modules/assessment/components"
import type { IQuestion } from "@/types/ai"
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build
```

## 📊 Key Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State**: Zustand
- **Data Fetching**: React Query
- **AI Integration**: Claude AI via Anthropic SDK
- **Components**: Radix UI primitives

## 🗂️ Folder Details

### `/app`
Pure routing layer - contains only pages and API routes. No business logic.

### `/modules`
Feature modules containing all business logic:
- `assessment` - Test-taking features
- `practice` - Practice mode with AI feedback
- `results` - Analytics and performance tracking
- `profile` - User profile management
- `questions` - Question generation and management
- `home` - Landing page components

### `/shared`
Reusable resources across modules:
- `ui/` - Design system components
- `components/` - Layout components
- `hooks/` - Generic React hooks
- `utils/` - Helper functions
- `constants/` - App-wide constants
- `mocks/` - Sample data for testing

### `/lib`
External service integrations:
- `claude/` - Claude AI API client and services
- `query/` - React Query configuration
- `store/` - Zustand state management

### `/styles`
Design system foundation:
- `globals.css` - Global styles
- `tokens.ts` - Design tokens (colors, spacing, etc.)
- `variants.ts` - Component variant definitions

### `/types`
Global TypeScript type definitions.

## 🔧 Configuration

### TypeScript Path Aliases
```json
{
  "@/*": ["./src/*"],
  "@app/*": ["./src/app/*"],
  "@modules/*": ["./src/modules/*"],
  "@shared/*": ["./src/shared/*"],
  "@lib/*": ["./src/lib/*"],
  "@styles/*": ["./src/styles/*"],
  "@types/*": ["./src/types/*"]
}
```

## 📈 Performance

- **Bundle Size**: ~162KB shared JS
- **Build Time**: <3 seconds
- **Static Generation**: 14 pages pre-rendered
- **Optimized**: Code splitting per route

## 🧪 Quality Checks

All three quality gates pass:
- ✅ ESLint (code style)
- ✅ TypeScript (type safety)
- ✅ Next.js Build (production ready)

## 📝 Migration Notes

Successfully migrated from 17-folder structure to clean 6-folder architecture:
- 65% reduction in top-level folders
- 82 components properly organized
- Zero breaking changes
- Improved developer experience

See `/Docs/architecture/folder-structure-migration.md` for details.