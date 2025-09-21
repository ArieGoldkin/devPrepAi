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
devprep-ai/
├── frontend/          # Next.js application
├── Docs/             # Project documentation
│   ├── PRD.md        # Product requirements
│   ├── technical-architecture.md
│   ├── user-flows.md
│   ├── api-design.md
│   ├── code-standards.md
│   ├── progress-plan.md
│   └── execution-plan.md
└── .claude/          # AI agent configuration

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