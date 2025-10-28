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
- **Practice Wizard**: 4-step guided flow with glassmorphism design
- **Progressive Hints System**: 3-level hints (conceptual → approach → implementation)
- **Results Analytics**: 4-tab dashboard with interactive insights and learning recommendations
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
| `.claude/instructions/agent-routing.md` | Agent routing rules | **EVERY development task** |
| `.claude/instructions/orchestration.md` | Routing & coordination | Complex tasks, multi-agent work |
| `.claude/instructions/agents.md` | Agent capabilities | When invoking specific agents |
| `.claude/instructions/context.md` | Context system | Session continuity, handoffs |
| `.claude/instructions/workflows.md` | Workflow patterns | Multi-step projects |
| `.claude/instructions/cli-integration.md` | CLI auto-detection | Claude Code CLI interactions |
| `.claude/instructions/superdesign.md` | UI/UX design workflow | UI design, mockups, HTML prototypes |

## 🎯 Quick Start

1. **Development workflows**: See `Docs/developer-guide.md` for setup, commands, patterns
2. **Simple tasks**: Work directly without loading extra instructions
3. **Agent work**: Read `.claude/instructions/agents.md` for capabilities
4. **Complex projects**: Read `.claude/instructions/orchestration.md` for routing
5. **Multi-session**: Read `.claude/instructions/context.md` for continuity
6. **CLI usage**: Read `.claude/instructions/cli-integration.md` for auto-detection
7. **UI/UX design**: Read `.claude/instructions/superdesign.md` for design workflow

## 📚 Project Documentation

### Core Documentation (`/Docs`) - ✅ Updated Oct 2025
- `developer-guide.md` - **Quick reference**: Setup, workflows, commands, patterns
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

### Design Transitions (`/Docs/design-transition/`)
- `wizard-refactor.md` - ✅ Complete (Practice Wizard 5→4 step glassmorphism)
- `home-page-glassmorphism-plan.md` - 📋 Planning phase

### Task Tracking (Notion) - 🔗 Connected
- **Main Hub**: [DevPrepAI Workspace](https://www.notion.so/DevPrepAI-2874489affb980fab76afc9789d813bd)
  - 💡 DATABASE 2: Smart Hints System (Active)
  - ✏️ DATABASE 3: Answer Panel (Active)
  - 📋 Design System Implementation v2 (Future)

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

## 🤖 Agent Routing Policy

**CRITICAL**: For development tasks, route to specialist agents. Don't do the work yourself.

| Task Type | Agent | Auto-Trigger Keywords |
|-----------|-------|----------------------|
| React/UI work | frontend-ui-developer | component, React, UI, form, page |
| API/Backend | backend-system-architect | API, endpoint, database, auth |
| AI/ML integration | ai-ml-engineer | AI, ML, LLM, Claude, prompt |
| Design/Mockups | rapid-ui-designer | design, mockup, wireframe |
| Code review | code-quality-reviewer | review, test, lint, refactor |
| Planning | sprint-prioritizer | sprint, plan, roadmap |
| Multi-domain | studio-coach | full app, build from scratch |

**Full routing rules**: Load `.claude/instructions/agent-routing.md` for routing decision tree.
**Keyword reference**: See `.claude/context-triggers.md` for complete keyword lists.


## 📁 Architecture & Organization

### Clean 7-Folder Structure

The project uses a **simplified domain-driven architecture**:

- **app/** - Next.js App Router (routes only)
- **modules/** - Feature-based business logic (assessment, practice, questions, results, profile, home)
- **shared/** - Cross-cutting concerns (UI components, hooks, utils, themes)
- **lib/** - External integrations (tRPC, Claude AI, React Query)
- **store/** - Global state management (Zustand slices with modular actions)
- **styles/** - Design system (globals, glassmorphism, tokens)
- **types/** - Global TypeScript definitions (AI, store, components)

**Key Benefits**:
- 7 folders instead of 17 (60% reduction)
- Domain-driven organization with clear separation
- Zero redundancy, single source of truth

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
- **`ai.generateQuestions`** - Generate interview questions based on user profile
- **`ai.evaluateAnswer`** - Evaluate user answers with AI feedback
- **`hints.getHint`** - Get progressive hints (3 levels: conceptual → approach → implementation)

### Migration Notes
- All API types are now Zod-inferred (see [types/ai/api.ts](frontend/src/types/ai/api.ts))
- Old HTTP client and React Query hooks removed
- Legacy validation layers consolidated into tRPC schemas
- Full migration documentation: [Docs/api-transition/trpc-migration.md](Docs/api-transition/trpc-migration.md)

## 📊 Results Analytics (Oct 2025)

**Status**: ✅ Complete - All 4 Tabs Implemented
**Location**: `frontend/src/modules/results/`
**Architecture**: Tab-based organization with glassmorphism design
**Documentation**: `Docs/results-implementation/`

### Overview

Comprehensive analytics dashboard providing detailed performance insights after practice sessions. Features 4 specialized tabs with interactive visualizations and AI-powered recommendations.

### Tab Structure

#### 📊 Tab 1: Overview (5 components)
**Purpose**: High-level session summary with performance metrics

**Components**:
- `PerformanceSummary` - 4-metric grid (avg score, completion rate, total time, improvement)
- `DifficultyBreakdown` - Progress bars by difficulty level (easy/medium/hard)
- `HintUsageSummary` - Hint metrics (total hints, effectiveness, avg per question)
- `RecommendationCard` - AI-generated next steps
- `OverviewTab` - Main container orchestrating layout

**Key Features**:
- Color-coded scores (excellent/good/fair/poor)
- Two-column responsive layout
- Real-time metric calculations

#### 📝 Tab 2: Question Details (2 components)
**Purpose**: Question-by-question breakdown with detailed feedback

**Components**:
- `QuestionResult` - Individual question card with score, feedback, metadata
- `QuestionDetailsTab` - Container rendering list of question cards

**Key Features**:
- Comprehensive feedback (strengths & improvements)
- Visual badges (difficulty, type, hints used, time)
- Hover effects (card lift + glow)
- Time formatting (e.g., "7m 23s")

#### 💡 Tab 3: Hint Analytics (6 components)
**Purpose**: Timeline visualization of hint usage journey

**Components**:
- `HintLegend` - Color key for hint levels
- `HintJourney` - Timeline container with vertical flow
- `JourneyQuestionCard` - Individual question with hint dots
- `HintDots` - 3-dot hint indicator (Level 1/2/3, used/unused)
- `HintInsightCard` - Recommendation card with hint usage insights
- `HintAnalyticsTab` - Main container

**Key Features**:
- Timeline visualization with numbered bubbles
- Colored hint dots (🔵 Level 1 / 🔴 Level 2 / 🟢 Level 3)
- Narrative generation (storytelling for each question)
- Interactive hover tooltips on dots

**Complexity**: Highest (cross-slice data retrieval from `resultsSlice` + `practiceSlice`)

#### 🎯 Tab 4: Learning Insights (5 components) - ✅ NEW (Oct 28, 2025)
**Purpose**: Interactive AI-powered insights with clickable learning paths

**Components**:
- `InsightItem` - Individual clickable insight with shimmer effect
- `InteractiveInsightCard` - Category card (Strengths/Growth/Strategies)
- `LearningStyleCard` - Learning profile with progress bar
- `RecommendationsList` - 4 personalized recommendation cards
- `LearningInsightsTab` - Main container

**Key Features**:
- ✨ **Interactive Insights**: 12 clickable items (3 categories × 4 insights each)
  - 🟢 Strengths: "Strong understanding of hash maps" (CTA: Practice)
  - 🟠 Growth Opportunities: "Review advanced data structures" (CTA: Learn)
  - 🔵 Effective Strategies: "Using Level 1 hints effectively" (CTA: Deepen)
- 🎨 **Visual Effects**:
  - Shimmer animation on hover (gradient sweep)
  - Category-colored glow borders (green/orange/cyan)
  - Action button scale on hover
- 🎯 **Learning Style Analysis**:
  - Classification: Independent / Strategic / Guided
  - Based on hint usage patterns (< 1, 1-2, > 2 hints/question)
  - Visual progress bar showing hint utilization %
- 🚀 **Personalized Recommendations**: 4 cards (Study Focus, Practice Plan, Skill Development, Next Milestone)
- 🔮 **Future Integration**: Click handlers ready for AI learning tool connection

**Data Layer**:
- `useLearningInsights()` hook - Aggregates data from store
- `insightsGeneration.ts` - 6 pure functions for rule-based analysis
  - `analyzePerformance()` - Calculate metrics (score, hints, difficulty, time)
  - `generateStrengthInsights()` - Return 3-4 strength insights
  - `generateImprovementInsights()` - Return 3-4 growth opportunities
  - `generateStrategyInsights()` - Return 3-4 effective strategies
  - `determineLearningStyle()` - Classify learning profile
  - `generateRecommendations()` - Return 4 personalized next steps

**Styling**: 227 lines of CSS added to `glassmorphism.css` with responsive breakpoints

### Technical Architecture

**Total Components**: 20 components across 4 tabs
**Total Files**: 43 files in `modules/results/`
**Lines of Code**: ~2,500 lines (components + hooks + utils + styles)

**Data Flow**:
```
Zustand Store (assessmentResults + hints)
    ↓
Custom Hooks (useResultsMetrics, useHintAnalytics, useLearningInsights)
    ↓
Utility Functions (pure business logic)
    ↓
Tab Components (presentation layer)
```

**Import Direction** (enforced):
```
modules/results/ → shared/ui/ → store/ → types/
✅ VALID                       ❌ INVALID (circular)
```

### Quality Standards

**All tabs meet strict quality requirements**:
- ✅ File size: All files ≤180 lines
- ✅ Complexity: All functions ≤15 cyclomatic complexity
- ✅ TypeScript: 0 errors (strict mode enabled)
- ✅ ESLint: 0 errors, 0 warnings
- ✅ Testing: Unit tests for utilities (≥80% coverage target)
- ✅ Responsive: Works at 375px, 768px, 1440px breakpoints
- ✅ Accessibility: Keyboard navigation, ARIA labels, focus states

### Design System

**Glassmorphism Theme** (`styles/glassmorphism.css`):
- Blur effects with transparency
- Neon glow accents (purple, blue, orange, green, pink)
- Category-colored borders and shadows
- Smooth hover transitions (0.3s ease)
- Hardware-accelerated animations

**Component Reuse**:
- shadcn/ui components (`Card`, `Badge`, `Progress`)
- Shared utility functions (time formatting, score calculations)
- Consistent color system across all tabs

### Documentation

**Implementation Plans** (`Docs/results-implementation/`):
- `README.md` - Overview and tracking (67 tasks across 37-52 hours)
- `tab-01-overview.md` - Overview tab implementation plan
- `tab-02-question-details.md` - Question Details tab plan
- `tab-03-hint-analytics.md` - Hint Analytics tab plan (most complex)
- `tab-04-learning-insights.md` - Learning Insights tab plan

**Design Prototype**:
- `.superdesign/design_iterations/glassmorphism_results_analytics.html`
- Complete visual design for all 4 tabs
- Used as reference for pixel-perfect implementation

### Future Enhancements

**Phase 5 (Future)**:
1. **AI Learning Path Integration**: Connect insight clicks to learning tool API
2. **Real-time Insights**: Use Claude AI to generate personalized insight text
3. **Export Results**: PDF/CSV export functionality
4. **Comparison View**: Compare performance across multiple sessions
5. **Custom Metrics**: User-defined KPIs and goals

## 🧠 Context Awareness

- Session data: `.claude/context/shared-context.json`
- For full context rules: Read `.claude/instructions/context.md`

## ⚙️ MCP Servers

Configured in `.mcp.json` - includes memory, thinking, browsing, and more.

---
*💡 This minimal CLAUDE.md saves ~80% context tokens through dynamic loading*