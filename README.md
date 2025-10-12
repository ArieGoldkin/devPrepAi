# DevPrep AI - Interview Preparation Platform

AI-powered interview preparation platform built with Next.js 15 and Claude AI.

## 🚀 Quick Start

1. **Set up environment variables:**
   ```bash
   # Run setup script to link environment variables
   ./setup.sh
   ```

2. **Install and run:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Visit http://localhost:3000**

## 🔐 Environment Variables

- **Single `.env` file at root**: Contains all API keys and configurations
- **Frontend uses symlink**: `frontend/.env` → `../.env` (created by setup.sh)
- **Security**: API keys are server-side only, never exposed to browser

## 📁 Project Structure

```
test-orchestration-demo/
├── frontend/                    # Next.js 15 application
│   └── src/                    # Source code (6-folder architecture)
│       ├── app/                # Next.js App Router (routes only)
│       │   ├── api/           # API routes
│       │   └── (pages)/       # Page components
│       │
│       ├── modules/           # Feature-based business logic
│       │   ├── assessment/    # Assessment module
│       │   ├── practice/      # Practice module (wizard refactoring)
│       │   ├── results/       # Results module
│       │   ├── profile/       # Profile module
│       │   ├── questions/     # Questions module
│       │   └── home/          # Home page module
│       │
│       ├── shared/            # Cross-cutting concerns
│       │   ├── ui/           # shadcn/ui design system components
│       │   ├── components/   # Shared layouts
│       │   ├── hooks/        # Reusable React hooks
│       │   ├── utils/        # Utility functions
│       │   ├── constants/    # App constants
│       │   └── mocks/        # Sample/test data
│       │
│       ├── lib/              # External integrations
│       │   ├── claude/       # Claude AI service
│       │   └── query/        # React Query setup
│       │
│       ├── store/            # Global state (Zustand)
│       │   ├── slices/       # State slices
│       │   ├── hooks.ts      # Typed selectors
│       │   └── index.ts      # Main export
│       │
│       ├── styles/           # Design system foundation
│       │   ├── globals.css       # Global CSS
│       │   ├── glassmorphism.css # Glassmorphism utilities
│       │   ├── tokens.ts         # Design tokens
│       │   └── variants.ts       # Component variants
│       │
│       └── types/            # TypeScript definitions
│
├── Docs/                       # Project documentation
│   ├── PRD.md                  # Product requirements
│   ├── technical-architecture.md
│   ├── user-flows.md
│   ├── api-design.md
│   ├── code-standards.md
│   ├── design-system.md
│   └── design-transition/      # Design refactor plans
│       └── wizard-refactor.md  # Practice Wizard glassmorphism
│
├── .superdesign/               # UI/UX design prototypes
│   └── design_iterations/      # HTML mockups
│
└── .claude/                    # AI agent configuration
    └── instructions/           # Modular agent instructions

```

## ✨ Features

- **AI-Powered Questions**: Dynamic question generation based on user profile
- **Practice Wizard**: 4-step guided flow (🔄 refactoring to glassmorphism design)
- **Technology Focus**: Select specific technologies for targeted practice
- **Assessment Mode**: Timed tests with auto-save
- **Instant Feedback**: AI evaluation with detailed scoring
- **Progress Tracking**: Statistics and performance metrics
- **Glassmorphism Design**: Modern frosted glass UI with neon accents
- **Responsive Design**: Mobile-first approach with adaptive layouts

## 🏗️ Architecture Principles

The project follows a **6-folder domain-driven architecture** for simplicity and maintainability:

### Key Principles:
- **Domain-driven modules**: Each module (`practice/`, `assessment/`, etc.) is self-contained
- **Single source of truth**: No duplicate files or overlapping concerns
- **Code quality enforcement**: Max 180 lines per file, complexity <15 (ESLint enforced)
- **Clean imports**: Using `@modules/`, `@shared/`, `@store/`, `@lib/` path aliases
- **Component reuse**: Leverage shadcn/ui components with custom styling
- **Zero redundancy**: Extract shared logic into hooks and utilities

See [Docs/technical-architecture.md](./Docs/technical-architecture.md) for detailed design decisions.

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with glassmorphism design system
- **AI Integration**: Anthropic Claude API (claude-3-5-sonnet)
- **State Management**: Zustand (global) + React Query (server state)
- **Code Quality**: ESLint, Husky, TypeScript strict mode
- **Task Tracking**: [Notion Workspace](https://www.notion.so/DevPrepAI-2874489affb980fab76afc9789d813bd)

## 📊 Development Status

### ✅ Completed Phases

**Phase 1: Foundation Setup** ✅ Complete
- Next.js 15 setup with TypeScript strict mode
- ESLint with complexity rules (max 15, max 180 lines)
- Tailwind CSS v4 + shadcn/ui components
- Claude AI integration with Anthropic SDK
- Git hooks with Husky

**Phase 2: Core Features** ✅ Complete
- User profiling with wizard interface
- AI-powered question generation
- Practice mode with feedback
- Answer evaluation system
- LocalStorage persistence

**Phase 3: Assessment System** ✅ Complete
- Timed assessment mode
- Question flow navigation
- Auto-save functionality
- Results display components
- Performance statistics

**Phase 4: UX/UI Redesign** ✅ Complete
- Professional design system (blue-purple theme)
- Modular component architecture
- Enhanced Practice page with wizard UI
- Logo and branding
- 23+ components updated
- 0 ESLint/TypeScript errors

## 📖 Documentation

See `/Docs` folder for detailed documentation:
- [CLAUDE.md](./CLAUDE.md) - **Start here**: Project overview, dynamic instructions, task tracking
- [Product Requirements](./Docs/PRD.md) - Feature specifications (v2.0.0)
- [Technical Architecture](./Docs/technical-architecture.md) - 6-folder architecture & design decisions
- [API Design](./Docs/api-design.md) - Claude AI integration patterns
- [Design System](./Docs/design-system.md) - Component library & glassmorphism utilities
- [Design Transitions](./Docs/design-transition/) - Refactoring plans (wizard, home page)

## 🧪 Code Quality

- Max file size: 180 lines
- Max complexity: 15
- TypeScript strict mode
- 0 ESLint errors