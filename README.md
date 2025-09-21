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

## 🛠 Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **AI Integration**: Anthropic Claude API
- **Code Quality**: ESLint, Husky, Prettier

## 📊 Development Status

Phase 1: Foundation Setup ✅ Complete
- Next.js setup with TypeScript
- ESLint with strict rules
- Tailwind CSS + shadcn/ui
- Claude AI integration
- Git hooks configured

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