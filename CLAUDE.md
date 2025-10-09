---
name: DevPrep AI
description: AI-Powered Technical Interview Preparation Platform
version: 2.0.0
---

# 🎯 DevPrep AI - Interview Preparation Platform

**Project**: AI-powered platform for developer interview preparation
**Stack**: Next.js 15, TypeScript, Tailwind CSS, Claude AI, Zustand, React Query
**Mode**: ⚡ Squad (Parallel)
**Status**: ✅ Phase 4 Complete - MVP Done (Oct 2025)
**Documentation**: All core docs updated to v2.0.0

## 🎓 Project Overview

DevPrep AI helps developers prepare for technical interviews with:
- **AI-Generated Questions**: Personalized based on role & experience
- **Real-time Evaluation**: Claude AI provides instant feedback with code execution
- **5-Step Practice Wizard**: Guided practice flow with Focus, Configure, Practice, Review, and Summary steps
- **Multiple Practice Modes**: Quick Practice, Assessment Mode, Mock Interview
- **Progress Tracking**: Comprehensive analytics and performance metrics
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **State Management**: Zustand for global state, React Query for server state

## 📋 Dynamic Instruction Loading

This project uses a modular instruction system to optimize token usage.

**IMPORTANT**: Load instructions dynamically based on the task:

### 📁 Available Instruction Modules

| Module | Purpose | When to Load |
|--------|---------|--------------|
| `.claude/instructions/orchestration.md` | Routing & coordination | Complex tasks, multi-agent work |
| `.claude/instructions/agents.md` | Agent capabilities | When invoking specific agents |
| `.claude/instructions/context.md` | Context system | Session continuity, handoffs |
| `.claude/instructions/workflows.md` | Workflow patterns | Multi-step projects |
| `.claude/instructions/cli-integration.md` | CLI auto-detection | Claude Code CLI interactions |
| `.claude/instructions/superdesign.md` | UI/UX design workflow | UI design, mockups, HTML prototypes |

## 🎯 Quick Start

1. **Simple tasks**: Work directly without loading extra instructions
2. **Agent work**: Read `.claude/instructions/agents.md` for capabilities
3. **Complex projects**: Read `.claude/instructions/orchestration.md` for routing
4. **Multi-session**: Read `.claude/instructions/context.md` for continuity
5. **CLI usage**: Read `.claude/instructions/cli-integration.md` for auto-detection
6. **UI/UX design**: Read `.claude/instructions/superdesign.md` for design workflow

## 📚 Project Documentation

### Core Documentation (`/Docs`) - ✅ Updated Oct 2025
- `PRD.md` - Product requirements & features (v2.0.0)
- `technical-architecture.md` - System design & 6-folder architecture (v2.0.0)
- `design-system.md` - Component library & styling guide (v2.0.0)
- `api-design.md` - Claude AI integration & API endpoints (v2.0.0)
- `code-standards.md` - ESLint rules & development guidelines (v2.0.0)
- `user-flows.md` - User journey maps & 5-step wizard flow (v2.0.0)
- `future-enhancements.md` - Completed features & roadmap (v2.0.0)
- `README.md` - Documentation overview

**All docs synchronized to v2.0.0 reflecting Phase 4 completion**

### Design Prototypes (`.superdesign/design_iterations/`)
- **Location**: All UI/UX design prototypes and iterations
- **Naming**: `{design_name}_{version}.html` (e.g., `landing_1.html`, `landing_1_1.html`)
- **Workflow**: Create → Review → Iterate → Finalize → Implement
- **Files**: HTML prototypes, CSS themes, design assets
- **Purpose**: Sandbox for design exploration before production implementation

## 🔍 Auto-Detection

Check `.claude/context-triggers.md` for keyword-based agent activation.
For semantic routing beyond keywords, load `.claude/instructions/orchestration.md`.

## 👥 Available Agents

- **ai-ml-engineer**
- **backend-system-architect**
- **code-quality-reviewer**
- **frontend-ui-developer**
- **rapid-ui-designer**
- **sprint-prioritizer**
- **studio-coach**
- **ux-researcher**
- **whimsy-injector**


## 📁 Architecture & Organization

### Clean 6-Folder Structure (Final Architecture)

The project uses a **simplified domain-driven architecture** with just 6 focused directories:

```
frontend/src/
├── app/              # Next.js App Router (routes only)
│   ├── api/         # API routes
│   └── (pages)/     # Page components
│
├── modules/         # Feature-based business logic
│   ├── assessment/  # Assessment module
│   ├── practice/    # Practice module
│   ├── results/     # Results module
│   ├── profile/     # Profile module
│   ├── questions/   # Questions module
│   └── home/       # Home page module
│
├── shared/          # Cross-cutting concerns
│   ├── ui/         # Design system components
│   ├── components/ # Shared layouts
│   ├── hooks/      # Reusable React hooks
│   ├── utils/      # Utility functions
│   ├── constants/  # App constants
│   └── mocks/      # Sample data
│
├── lib/            # External integrations
│   ├── claude/     # Claude AI service
│   └── query/      # React Query setup
│
├── store/          # Global state (Zustand) - Root level!
│   ├── slices/     # State slices (practice, user, results, streak)
│   ├── hooks.ts    # Typed selectors
│   └── index.ts    # Main export
│
├── styles/         # Design system foundation
│   ├── globals.css # Global CSS
│   ├── tokens.ts   # Design tokens
│   └── variants.ts # Component variants
│
└── types/          # TypeScript definitions
    └── ai/         # AI-related types only
```

### Import Patterns (Clean & Intuitive):
```typescript
import { Button } from "@shared/ui/button"
import { useAppStore } from "@store"
import { AssessmentLayout } from "@modules/assessment/components"
import type { IQuestion } from "@/types/ai"
```

### Architectural Benefits:
- **6 folders instead of 17** - 65% reduction in complexity
- **Single source of truth** - No duplicate files or overlapping concerns
- **Clean imports** - Using @modules/, @shared/, @lib/ aliases
- **Domain-driven** - Features organized by business logic
- **Zero redundancy** - Each folder has one clear purpose

### Module Structure:
Each module is self-contained with:
- `components/` - Module-specific components
- `hooks/` - Module-specific hooks
- `utils/` - Module utilities
- `types.ts` - Module types

## 🧠 Context Awareness

- Session data: `.claude/context/shared-context.json`
- For full context rules: Read `.claude/instructions/context.md`

## ⚙️ MCP Servers

Configured in `.mcp.json` - includes memory, thinking, browsing, and more.

---
*💡 This minimal CLAUDE.md saves ~80% context tokens through dynamic loading*