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
│   └── src/                    # Source code (6 clean directories)
│       ├── app/                # Next.js App Router (routes only)
│       │   ├── api/           # API routes
│       │   ├── (auth)/        # Auth pages
│       │   ├── assessment/    # Assessment page
│       │   ├── practice/      # Practice page
│       │   ├── results/       # Results page
│       │   └── page.tsx       # Home page
│       │
│       ├── modules/           # Feature-based business logic
│       │   ├── assessment/    # Assessment module
│       │   ├── practice/      # Practice module
│       │   ├── results/       # Results module
│       │   ├── profile/       # Profile module
│       │   ├── questions/     # Questions module
│       │   └── home/          # Home page module
│       │
│       ├── shared/            # Cross-cutting concerns
│       │   ├── ui/           # Design system components
│       │   ├── components/   # Shared layouts
│       │   ├── hooks/        # Reusable React hooks
│       │   ├── utils/        # Utility functions
│       │   ├── constants/    # App constants
│       │   └── mocks/        # Sample/test data
│       │
│       ├── lib/              # External integrations
│       │   ├── claude/       # Claude AI service
│       │   ├── query/        # React Query setup
│       │   └── store/        # Zustand state
│       │
│       ├── styles/           # Design system foundation
│       │   ├── globals.css   # Global CSS
│       │   ├── tokens.ts     # Design tokens
│       │   └── variants.ts   # Component variants
│       │
│       └── types/            # TypeScript definitions
│
├── Docs/                       # Project documentation
│   ├── PRD.md                  # Product requirements
│   ├── technical-architecture.md
│   ├── user-flows.md
│   ├── api-design.md
│   ├── code-standards.md
│   └── next-plan/
│       └── NEXT_STEPS.md       # Development roadmap
└── .claude/                    # AI agent configuration

```

## ✨ Features

- **AI-Powered Questions**: Dynamic question generation based on user profile
- **5-Step Practice Wizard**: Welcome → Profile → Focus → Settings → Ready
- **Technology Focus**: Select specific technologies for targeted practice
- **Assessment Mode**: Timed tests with auto-save
- **Instant Feedback**: AI evaluation with detailed scoring
- **Progress Tracking**: Statistics and performance metrics
- **Modern UI**: Professional design system with smooth animations
- **Responsive Design**: Mobile-first approach

## 🏗️ Component Architecture

The project follows a **feature-based component organization** for better maintainability:

- **`features/`** - Business logic components organized by feature domain
- **`pages/`** - Page-level components that compose features
- **`shared/`** - Reusable components used across features
- **`layout/`** - App structure components (navigation, headers, etc.)
- **`ui/`** - Design system primitives (buttons, cards, inputs, etc.)

### Key Principles:
- Each feature is self-contained with its own components, hooks, and constants
- Components are kept under 100 lines for better maintainability
- Complex logic is extracted into custom hooks
- Consistent folder structure across all features

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom design system
- **AI Integration**: Anthropic Claude API (claude-3-5-sonnet)
- **Code Quality**: ESLint, Husky, Prettier
- **State Management**: Zustand + localStorage

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
- [Progress Plan](./Docs/progress-plan.md) - Current development status
- [Product Requirements](./Docs/PRD.md) - Feature specifications
- [Technical Architecture](./Docs/technical-architecture.md) - System design
- [API Design](./Docs/api-design.md) - Claude AI integration

## 🧪 Code Quality

- Max file size: 180 lines
- Max complexity: 15
- TypeScript strict mode
- 0 ESLint errors