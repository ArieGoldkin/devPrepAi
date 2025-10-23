# Agent Routing Instructions

**CRITICAL**: Route to specialist agents. Don't do the work yourself.

---

## Routing Rules

**Before ANY development task:**
1. Check user message for keywords
2. Match against table below
3. Invoke agent if 2+ keywords match
4. Default: Use specialist over doing it yourself

---

## Quick Reference

| Agent | When to Use | Keywords |
|-------|-------------|----------|
| **frontend-ui-developer** | ANY React/UI work | component, React, UI, button, form, page, hooks |
| **backend-system-architect** | ANY API/backend work | API, endpoint, database, auth, server, route |
| **ai-ml-engineer** | ANY AI/ML integration | AI, ML, LLM, GPT, Claude, model, prompt |
| **rapid-ui-designer** | Design needed OR user says | design, mockup, wireframe, layout, prototype |
| **code-quality-reviewer** | After code changes | review, test, lint, refactor, quality, check |
| **ux-researcher** | User research tasks | user research, persona, journey, feedback |
| **sprint-prioritizer** | Planning tasks | sprint, plan, roadmap, prioritize, backlog |
| **whimsy-injector** | Fun/delight features | animation, fun, delight, playful, easter egg |
| **studio-coach** | Multi-domain OR full app | full app, entire system, build from scratch |

---

## Decision Tree

```
User request
    ↓
Check keywords (`.claude/context-triggers.md`)
    ↓
Match agent? → YES → Invoke agent
    ↓
    NO → Complex task? → YES → studio-coach
    ↓
    NO → Simple & clear? → Do it yourself
```

---

## Mandatory Invocation

**ALWAYS invoke these:**
- code-quality-reviewer → After writing ANY code
- rapid-ui-designer → User says "design" OR no mockup exists
- studio-coach → User says "build", "create app", "full"

---

## Full keyword list: `.claude/context-triggers.md`
