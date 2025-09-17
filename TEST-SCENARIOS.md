# 🧪 Orchestration Test Scenarios

## Setup Complete ✅
- **Location**: `/tmp/test-orchestration-demo`
- **Mode**: Squad (Parallel execution)
- **Orchestration**: Fully installed with all instruction modules

## How to Test the Orchestration

### 1. Simple Task (Single Agent)
**Say**: "Create a simple button component"
- **Expected**: Routes directly to `frontend-ui-developer`
- **Orchestration**: Minimal, single agent activation

### 2. Medium Complexity (2-3 Agents)
**Say**: "Build a login form with validation"
- **Expected**: Routes to `rapid-ui-designer` → `frontend-ui-developer`
- **Orchestration**: Sequential pattern

### 3. High Complexity (Multiple Agents)
**Say**: "Build a dashboard with real-time data, charts, and user authentication"
- **Expected**: Activates `studio-coach` as orchestrator
- **Orchestration**: Parallel execution with multiple agents

### 4. Test Session Continuity
**Say**: "What were we working on?"
- **Expected**: Reads context from `.claude/context/shared-context.json`
- **Orchestration**: Context-aware response

### 5. Test Intelligent Routing
**Say**: "Fix the performance issues"
- **Expected**: Routes to `code-quality-reviewer` + relevant specialist
- **Orchestration**: Semantic analysis of "performance"

## Files to Check During Testing

### Orchestration Instructions
- `.claude/instructions/orchestration.md` - Routing logic
- `.claude/instructions/workflows.md` - Workflow patterns
- `.claude/instructions/cli-integration.md` - CLI detection

### Context Tracking
- `.claude/context/shared-context.json` - Session data
- `.claude/context-triggers.md` - Auto-activation rules

### Squad Mode Files
- `.claude/parallel-execution-rules.md` - Parallel execution
- `.claude/squad-roster.md` - Agent coordination
- `.claude/communication-protocol.md` - Agent communication

## What You'll See

1. **Auto-Detection**: Claude will detect the `.claude/` directory
2. **Dynamic Loading**: Only loads needed instructions
3. **Intelligent Routing**: Based on task complexity
4. **Parallel Execution**: Multiple agents working together
5. **Context Preservation**: Remembers previous work

## Testing the System

Open this folder in Claude Code and try the scenarios above. Watch how:
- Simple tasks go directly to specialists
- Complex tasks activate Studio Coach
- Context persists between sessions
- Agents work in parallel (Squad mode)