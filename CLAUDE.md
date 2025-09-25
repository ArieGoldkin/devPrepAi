---
name: DevPrep AI
description: AI-Powered Technical Interview Preparation Platform
version: 2.0.0
---

# 🎯 DevPrep AI - Interview Preparation Platform

**Project**: AI-powered platform for developer interview preparation
**Stack**: Next.js 15, TypeScript, Tailwind CSS, Claude AI, Zustand, React Query
**Mode**: ⚡ Squad (Parallel)
**Status**: 🚀 Phase 4 Complete - Ready for Next Phase

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

## 🎯 Quick Start

1. **Simple tasks**: Work directly without loading extra instructions
2. **Agent work**: Read `.claude/instructions/agents.md` for capabilities
3. **Complex projects**: Read `.claude/instructions/orchestration.md` for routing
4. **Multi-session**: Read `.claude/instructions/context.md` for continuity
5. **CLI usage**: Read `.claude/instructions/cli-integration.md` for auto-detection

## 📚 Project Documentation

### Core Documentation (`/Docs`)
- `PRD.md` - Product requirements & features
- `technical-architecture.md` - System design & architecture
- `design-system.md` - Component library & styling guide
- `api-design.md` - Claude AI integration specs
- `code-standards.md` - Development guidelines
- `user-flows.md` - User journey maps and flow diagrams
- `future-enhancements.md` - Roadmap and future features
- `COMPLETED_MILESTONES.md` - Achieved project milestones
- `README.md` - Documentation overview

### Next Phase Planning (`/Docs/next-plan`)
- `NEXT_STEPS.md` - Single source of truth for development roadmap
- `README.md` - Development overview and planning documentation

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

### Domain-Driven Structure (NEW - Refactored from lib/)

The project now uses a **domain-driven organization** with dedicated modules:

```
frontend/src/
├── api/              # API layer - Claude AI integration & HTTP client
│   ├── claude/       # Claude-specific client, hooks, and types
│   ├── client.ts     # Base HTTP client with error handling
│   └── errors.ts     # Centralized error management
│
├── query/            # React Query infrastructure
│   ├── client.ts     # Query client with caching strategies
│   ├── helpers.ts    # Query utilities and helpers
│   └── providers.tsx # React Query context providers
│
├── design/           # Design system foundation
│   ├── tokens.ts     # Colors, spacing, typography, shadows
│   ├── variants.ts   # Component variant definitions
│   └── utilities.ts  # Helper functions (cn, formatters)
│
├── config/           # Application configuration
│   └── app.ts        # Environment vars and app settings
│
└── components/       # Component architecture (unchanged)
    ├── features/     # Business logic by feature
    ├── pages/        # Page-level compositions
    ├── shared/       # Reusable components
    ├── layout/       # App structure
    └── ui/          # Design system primitives
```

### Architectural Benefits:
- **Clear separation of concerns** - Each domain has its own directory
- **Better maintainability** - Related files grouped together
- **Improved imports** - Clean TypeScript path aliases (@/api, @/query, etc.)
- **Reduced complexity** - No more bloated lib/ folder
- **Domain expertise** - Each module has a single responsibility

### Component Guidelines:
- Max 100 lines per component file
- Complex logic extracted to custom hooks
- Self-contained features with own components/hooks/constants
- Consistent folder structure across all features

## 🧠 Context Awareness

- Session data: `.claude/context/shared-context.json`
- For full context rules: Read `.claude/instructions/context.md`

## ⚙️ MCP Servers

Configured in `.mcp.json` - includes memory, thinking, browsing, and more.

---
*💡 This minimal CLAUDE.md saves ~80% context tokens through dynamic loading*