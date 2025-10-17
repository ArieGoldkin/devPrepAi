---
name: DevPrep AI
description: AI-Powered Technical Interview Preparation Platform
version: 2.0.0
---

# 🎯 DevPrep AI - Interview Preparation Platform

**Project**: AI-powered platform for developer interview preparation
**Stack**: Next.js 15, TypeScript, Tailwind CSS, tRPC, Zod, Claude AI, Zustand
**Mode**: ⚡ Squad (Parallel)
**Status**: ✅ Phase 4 Complete - MVP Done (Oct 2025)
**Documentation**: All core docs updated to v2.0.0

## 🎓 Project Overview

DevPrep AI helps developers prepare for technical interviews with:
- **AI-Generated Questions**: Personalized based on role & experience
- **Real-time Evaluation**: Claude AI provides instant feedback with code execution
- **Practice Wizard**: 4-step guided flow (🔄 Refactoring to glassmorphism design - see `Docs/design-transition/wizard-refactor.md`)
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
- `user-flows.md` - User journey maps & wizard flow (v2.0.0)
- `future-enhancements.md` - Completed features & roadmap (v2.0.0)
- `README.md` - Documentation overview

### API Transition (`/Docs/api-transition/`) - ✅ Complete (Oct 2025)
- `trpc-migration.md` - Complete tRPC migration guide (28 tasks, 4 phases, ~10-12 hrs)
  - **Status**: ✅ Migration Complete - All 4 phases finished
  - **Purpose**: Migrated from custom HTTP client to tRPC for type-safe APIs
  - **Results**: 790+ lines removed, 100% type safety achieved
  - **Notion**: [tRPC Migration Database](https://www.notion.so/28e4489affb981c3b9f3c3c192612859)
  - **Docs**: `README.md`, `trpc-migration.md`, `trpc-setup-guide.md`, `before-after-comparison.md`

### Design Transitions (`/Docs/design-transition/`) - 🔄 Active
- `wizard-refactor.md` - Practice Wizard 5→4 step glassmorphism refactor (30 hrs, 13 tasks)
  - **Status**: Planning complete, ready for Phase 1 implementation
  - **Notion**: All tasks tracked with dependencies and agent assignments

### Task Tracking (Notion) - 🔗 Connected
- **Main Hub**: [DevPrepAI Workspace](https://www.notion.so/DevPrepAI-2874489affb980fab76afc9789d813bd)
  - 🔄 [tRPC Migration](https://www.notion.so/28e4489affb981c3b9f3c3c192612859) (28 tasks, 4 phases, ~10-12 hrs)
  - 🎨 Home Page Glassmorphism - Implementation Tracker (19 tasks)
  - 🧙‍♂️ Practice Wizard Glassmorphism Refactor (13 tasks, 6 phases, 30 hrs)
  - 📝 [Phase 1: Immediate Evaluation - Task Tracker](https://www.notion.so/2874489affb9810fa1d1f8723a497f05) **(54 tasks, 8 sessions, ~94 hrs)**
    - SESSION 1-6D: Complete Q&A interface with evaluation, hints, code editor, testing
    - **Documentation**: `Docs/notion-task-trackers.md`

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

### Clean 6-Folder Structure

The project uses a **simplified domain-driven architecture**:

- **app/** - Next.js App Router (routes only)
- **modules/** - Feature-based business logic (assessment, practice, results, etc.)
- **shared/** - Cross-cutting concerns (UI, components, hooks, utils)
- **lib/** - External integrations (tRPC, Claude AI, React Query)
- **store/** - Global state (Zustand slices)
- **styles/** - Design system (globals, glassmorphism, tokens)

**Key Benefits**:
- 6 folders instead of 17 (65% reduction)
- Domain-driven organization
- Zero redundancy

**Full Details**: See [Docs/technical-architecture.md](Docs/technical-architecture.md)

## 🔧 API Layer (tRPC)

**Architecture**: End-to-end type-safe APIs with tRPC + Zod
**Location**: `frontend/src/lib/trpc/`
**Integration**: React Query (TanStack Query v5)
**Status**: ✅ Migration Complete (Oct 2025)

### Key Benefits
- **100% Type Safety**: Full type inference from backend to frontend
- **Runtime Validation**: Zod schemas validate all requests/responses
- **Auto-generated Hooks**: React Query hooks created automatically
- **Single Source of Truth**: Types cannot drift between client/server
- **35% Code Reduction**: 790+ lines of legacy code removed
- **6x Faster Development**: No manual hook creation or type definitions

### Quick Example
```typescript
// Backend procedure (lib/trpc/routers/ai.ts)
generateQuestions: publicProcedure
  .input(generateQuestionsInputSchema)
  .output(generateQuestionsOutputSchema)
  .mutation(async ({ input }) => {
    return generateQuestions(input);
  }),

// Frontend usage (automatic hook generation)
const { mutate, isPending, data } = trpc.ai.generateQuestions.useMutation();

mutate({
  profile: { role: 'frontend', experienceLevel: 'mid' },
  count: 5,
  difficulty: 7,
  type: 'coding',
});
// ✅ Full autocomplete
// ✅ Runtime validation
// ✅ Type-safe responses
```

### Available Endpoints
- **`ai.generateQuestions`** - Generate interview questions
- **`ai.evaluateAnswer`** - Evaluate user answers with AI feedback

### Migration Notes
- All API types are now Zod-inferred (see [types/ai/api.ts](frontend/src/types/ai/api.ts))
- Old HTTP client and React Query hooks removed
- Legacy validation layers consolidated into tRPC schemas
- Full migration documentation: [Docs/api-transition/trpc-migration.md](Docs/api-transition/trpc-migration.md)

## 🧠 Context Awareness

- Session data: `.claude/context/shared-context.json`
- For full context rules: Read `.claude/instructions/context.md`

## ⚙️ MCP Servers

Configured in `.mcp.json` - includes memory, thinking, browsing, and more.

---
*💡 This minimal CLAUDE.md saves ~80% context tokens through dynamic loading*