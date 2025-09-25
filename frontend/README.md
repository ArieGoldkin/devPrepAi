# DevPrep AI - Frontend Application

AI-powered interview preparation platform built with Next.js 15, TypeScript, and Claude AI.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm run start

# Run tests
npm run test

# Run linting
npm run lint

# Run type checking
npm run typecheck
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── api/                 # API routes
│   │   │   └── ai/              # Claude AI endpoints
│   │   │       ├── generate-questions/
│   │   │       ├── evaluate-answer/
│   │   │       └── explain-concept/
│   │   ├── practice/            # Practice mode page
│   │   ├── assessment/          # Assessment mode page
│   │   ├── results/             # Results page
│   │   ├── design-system/       # Design system showcase
│   │   └── layout.tsx           # Root layout
│   │
│   ├── api/                     # API layer (refactored from lib/)
│   │   ├── claude/              # Claude AI integration
│   │   │   ├── client.ts        # API client for Claude
│   │   │   ├── hooks.ts         # React hooks for AI features
│   │   │   └── types.ts         # TypeScript types
│   │   ├── client.ts            # Base HTTP client
│   │   └── errors.ts            # Error handling utilities
│   │
│   ├── query/                   # React Query setup (refactored from lib/)
│   │   ├── client.ts            # Query client configuration
│   │   ├── helpers.ts           # Query utilities
│   │   └── providers.tsx        # React Query providers
│   │
│   ├── design/                  # Design system (refactored from lib/)
│   │   ├── tokens.ts            # Design tokens (colors, spacing, shadows)
│   │   ├── variants.ts          # Component variants
│   │   └── utilities.ts         # Helper functions (cn, etc.)
│   │
│   ├── config/                  # App configuration (refactored from lib/)
│   │   └── app.ts               # Environment and app config
│   │
│   ├── components/
│   │   ├── features/            # Feature-based organization
│   │   │   ├── practice/        # Practice mode components
│   │   │   │   ├── PracticePage.tsx
│   │   │   │   ├── WizardNav.tsx
│   │   │   │   └── constants.ts
│   │   │   ├── profile/         # User profile components
│   │   │   │   ├── UserProfile.tsx
│   │   │   │   └── ProfileWizard.tsx
│   │   │   ├── assessment/      # Assessment mode
│   │   │   │   ├── AssessmentPage.tsx
│   │   │   │   └── TimerDisplay.tsx
│   │   │   ├── questions/       # Question display
│   │   │   │   ├── QuestionDisplay.tsx
│   │   │   │   └── QuestionCard.tsx
│   │   │   ├── results/         # Results & feedback
│   │   │   │   ├── ResultsDisplay.tsx
│   │   │   │   └── ScoreBreakdown.tsx
│   │   │   ├── feedback/        # Feedback components
│   │   │   │   └── FeedbackDisplay.tsx
│   │   │   └── answer/          # Answer input components
│   │   │       └── AnswerInput.tsx
│   │   │
│   │   ├── pages/               # Page-level components
│   │   │   └── HomePage/
│   │   │       ├── HeroSection/
│   │   │       │   └── components/
│   │   │       └── FeaturesSection/
│   │   │           └── components/
│   │   │
│   │   ├── shared/              # Reusable components
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── ErrorFallback.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/              # Layout components
│   │   │   ├── MainLayout.tsx
│   │   │   └── Navigation.tsx
│   │   │
│   │   └── ui/                  # Design system components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       └── ...              # Other UI primitives
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useErrorBoundary.ts
│   │   ├── use-claude-api.ts
│   │   ├── claude-api-types.ts
│   │   └── index.ts
│   │
│   ├── store/                   # Zustand state management
│   │   ├── slices/
│   │   │   └── questionsSlice/
│   │   │       ├── index.ts
│   │   │       ├── types.ts
│   │   │       └── actions.ts
│   │   ├── types.ts
│   │   └── useAppStore.ts
│   │
│   ├── services/                # Business logic
│   │   ├── ai-service.ts
│   │   └── question-service.ts
│   │
│   ├── types/                   # TypeScript types
│   │   ├── global.d.ts
│   │   └── css.d.ts
│   │
│   ├── utils/                   # Utility functions
│   │   └── formatting.ts
│   │
│   └── constants/               # App constants
│       └── index.ts
│
├── public/                      # Static assets
├── .env.example                 # Environment variables template
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🏗️ Architecture Overview

### Domain-Driven Structure

The codebase is organized into domain-specific modules for better maintainability:

- **`api/`** - API layer with Claude AI integration and HTTP client
- **`query/`** - React Query infrastructure for server state management
- **`design/`** - Design system with tokens, variants, and utilities
- **`config/`** - Application configuration and environment settings

### Component Architecture

Following feature-based organization:

- **`features/`** - Business logic components organized by feature domain
- **`pages/`** - Page-level components that compose features
- **`shared/`** - Reusable components used across features
- **`layout/`** - App structure components (navigation, headers, etc.)
- **`ui/`** - Design system primitives (buttons, cards, inputs, etc.)

### State Management

- **Zustand** for global client state
- **React Query** for server state and caching
- **LocalStorage** for persistence

## 🔑 Environment Variables

Create a `.env` file in the frontend directory:

```env
# Claude AI Configuration
ANTHROPIC_API_KEY=your_api_key_here
NEXT_PUBLIC_CLAUDE_MODEL=claude-3-5-sonnet-20241022

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## 📊 Code Quality

- **TypeScript** strict mode enabled
- **ESLint** with complexity rules (max 15, max 180 lines)
- **Prettier** for code formatting
- **Husky** for pre-commit hooks

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Deploy to Vercel

The easiest deployment method is using [Vercel](https://vercel.com):

```bash
npx vercel
```

## 📖 Documentation

For more detailed documentation, see:

- [Product Requirements](../Docs/PRD.md)
- [Technical Architecture](../Docs/technical-architecture.md)
- [API Design](../Docs/api-design.md)
- [Code Standards](../Docs/code-standards.md)

## 🤝 Contributing

1. Follow the code standards in `/Docs/code-standards.md`
2. Ensure all tests pass
3. Run linting and type checking before committing
4. Keep components under 100 lines
5. Extract complex logic into custom hooks

## 📝 License

Proprietary - All rights reserved