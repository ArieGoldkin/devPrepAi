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
- `ESSENTIAL_TASKS.md` - Priority tasks for immediate implementation
- `IMPLEMENTATION_TASKS.md` - Detailed implementation roadmap
- `unified-implementation-plan.md` - Comprehensive development strategy
- `zustand-react-query-integration.md` - State management architecture
- `complete-implementation-summary.md` - Current implementation status

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


## 🧠 Context Awareness

- Session data: `.claude/context/shared-context.json`
- For full context rules: Read `.claude/instructions/context.md`

## ⚙️ MCP Servers

Configured in `.mcp.json` - includes memory, thinking, browsing, and more.

---
*💡 This minimal CLAUDE.md saves ~80% context tokens through dynamic loading*