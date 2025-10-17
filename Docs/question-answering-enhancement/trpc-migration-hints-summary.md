# tRPC Migration: Hint System Updates

**Created**: October 17, 2025
**Purpose**: Document required changes to Hint System tasks for tRPC compatibility
**Status**: Ready for Notion DATABASE 2 updates

---

## 📋 Overview

Following the completion of the tRPC migration (Phases 1-4), the Hint System (DATABASE 2: Smart Hints System) requires updates to align with the new tRPC architecture instead of the old REST API approach.

**Key Change**: Replace REST API endpoint (`/api/ai/get-hint`) with tRPC procedure (`trpc.ai.getHint`)

---

## 🔄 Affected Tasks

### Task 3.3: Hint API Implementation

#### BEFORE (REST API):
```
**Task 3.3**: Create Hint API Endpoint
**File**: frontend/src/app/api/ai/get-hint/route.ts
**Effort**: 2h
**Implementation**: POST endpoint with 3 prompt templates
```

#### AFTER (tRPC):
```
**Task 3.3**: Create Hint tRPC Procedure
**Files**:
- frontend/src/lib/trpc/routers/ai.ts (add getHint procedure)
- frontend/src/lib/trpc/schemas/hint.schema.ts (NEW - Zod schemas)
- frontend/src/lib/claude/prompts/hints.ts (prompt templates)

**Effort**: 2h (same)

**Implementation**: tRPC procedure with Zod schemas + 3 prompt templates

**Key Changes**:
✅ Add getHint procedure to aiRouter
✅ Create Zod input schema (getHintInputSchema)
✅ Create Zod output schema (getHintOutputSchema)
✅ Use TRPCError for error handling (not NextResponse)
✅ Return type-safe responses

**Acceptance Criteria**:
- ✅ Zod schemas defined (getHintInputSchema, getHintOutputSchema)
- ✅ tRPC procedure added to aiRouter
- ✅ 3 prompts work (getLevel1/2/3Prompt)
- ✅ Claude API calls with TRPCError handling
- ✅ Type-safe responses (auto-inferred from Zod)
```

**Notion Update**: Update Task 3.3 description, files, and acceptance criteria

---

### Task 3.6: useRequestHint Hook

#### BEFORE (Manual React Query):
```
**Task 3.6**: Create useRequestHint Hook
**File**: frontend/src/modules/assessment/hooks/useRequestHint.ts
**Effort**: 2h
**Implementation**: TanStack Query mutation hook, calls API, saves to store
```

#### AFTER (tRPC Auto-Generated):
```
**Task 3.6**: Create useRequestHint Hook (tRPC)
**File**: frontend/src/modules/assessment/hooks/useRequestHint.ts
**Effort**: 1h (reduced from 2h - 50% faster)

**Implementation**: tRPC auto-generated mutation hook

**Key Changes**:
✅ Use trpc.ai.getHint.useMutation() (not manual useMutation)
✅ No manual fetch() calls
✅ No manual type definitions
✅ Automatic TypeScript autocomplete
✅ Built-in React Query caching

**Acceptance Criteria**:
- ✅ tRPC mutation hook used (trpc.ai.getHint.useMutation)
- ✅ Saves hint to store on success
- ✅ Loading and error states exposed (isPending, isError)
- ✅ Type-safe request with automatic Zod validation
- ✅ Integration with existing store actions
```

**Notion Update**: Update Task 3.6 description, effort (1h), and acceptance criteria

---

## 📁 New Files Required

### 1. Zod Schemas File
```
Path: frontend/src/lib/trpc/schemas/hint.schema.ts
Status: NEW FILE
Agent: ai-ml-engineer

Content:
- getHintInputSchema (question, currentAnswer, hintLevel)
- getHintOutputSchema (hint object, success boolean)
- TypeScript types (GetHintInput, GetHintOutput)
```

**Notion Update**: Add note in Task 3.3 about creating this new file

### 2. Prompt Templates File
```
Path: frontend/src/lib/claude/prompts/hints.ts
Status: NEW FILE (or add to existing prompts file)
Agent: ai-ml-engineer

Content:
- getLevel1Prompt() - General approach hint
- getLevel2Prompt() - Specific technique hint
- getLevel3Prompt() - Code skeleton hint
- detectLanguage() - Language detection utility
```

**Notion Update**: Add note in Task 3.3 about prompt organization

---

## ⏱️ Effort Changes

| Task | Old Effort | New Effort | Change | Reason |
|------|------------|------------|--------|--------|
| **Task 3.3** | 2h | 2h | No change | Similar complexity, different approach |
| **Task 3.6** | 2h | **1h** | **-1h** | tRPC auto-generation speeds development |
| **DATABASE 2 Total** | 13.5h | **12.5h** | **-1h saved** | tRPC efficiency gains |

**Notion Update**: Update DATABASE 2 total effort from 13.5h → 12.5h

---

## 🎯 Key Benefits of tRPC Migration

### For Task 3.3 (API Layer):
1. **Runtime Validation**: Zod validates all inputs automatically
2. **Type Safety**: No manual type casting needed
3. **Error Handling**: Structured TRPCError instead of HTTP status codes
4. **Single Source of Truth**: Types inferred from Zod schemas

### For Task 3.6 (Hook Layer):
1. **Auto-Generated Hooks**: No manual `useMutation` setup
2. **Full Autocomplete**: IDE knows exact input/output types
3. **Built-in Caching**: React Query integration automatic
4. **50% Faster Development**: 2h → 1h (documented in tRPC migration)

---

## 📝 Notion Database Update Checklist

Use this checklist when updating the Notion DATABASE 2:

### Task 3.3 Updates:
- [ ] Change task name: "Create Hint API Endpoint" → "Create Hint tRPC Procedure"
- [ ] Update **Component/File** field:
  - Add: `frontend/src/lib/trpc/routers/ai.ts`
  - Add: `frontend/src/lib/trpc/schemas/hint.schema.ts` (NEW)
  - Add: `frontend/src/lib/claude/prompts/hints.ts`
  - Remove: `frontend/src/app/api/ai/get-hint/route.ts`
- [ ] Update **Notes** with:
  - tRPC procedure implementation details
  - Zod schema requirements
  - Reference to [phase-2-progressive-hints.md](./phase-2-progressive-hints.md)
- [ ] Update **Acceptance Criteria**:
  - Add: "Zod schemas defined"
  - Add: "tRPC procedure added to aiRouter"
  - Change: "JSON response" → "Type-safe Zod-validated response"

### Task 3.6 Updates:
- [ ] Change task name: "Create useRequestHint Hook" → "Create useRequestHint Hook (tRPC)"
- [ ] Update **Effort (hrs)**: 2h → **1h**
- [ ] Update **Notes** with:
  - tRPC auto-generated hook usage
  - Reference to [phase-2-progressive-hints.md](./phase-2-progressive-hints.md) Section 3
- [ ] Update **Acceptance Criteria**:
  - Add: "tRPC mutation hook used (trpc.ai.getHint.useMutation)"
  - Add: "Full TypeScript autocomplete working"
  - Add: "Automatic Zod validation"
  - Remove: "Manual TanStack Query setup"

### DATABASE 2 Summary Updates:
- [ ] Update total effort: 13.5 hours → **12.5 hours**
- [ ] Add note: "Updated for tRPC migration (Oct 2025)"
- [ ] Add reference: "See [trpc-migration-hints-summary.md](./trpc-migration-hints-summary.md)"

---

## 🔗 Related Documentation

- **tRPC Migration Guide**: [Docs/api-transition/trpc-migration.md](../api-transition/trpc-migration.md)
- **Updated Phase 2 Docs**: [phase-2-progressive-hints.md](./phase-2-progressive-hints.md)
- **Updated Task Breakdown**: [phase-1-task-breakdown.md](./phase-1-task-breakdown.md)
- **API Design (tRPC)**: [Docs/api-design.md](../api-design.md)

---

## 💡 Implementation Example

### Old REST Approach (DELETE THIS):
```typescript
// ❌ OLD: Manual fetch call
const response = await fetch('/api/ai/get-hint', {
  method: 'POST',
  body: JSON.stringify({ question, currentAnswer, hintLevel })
});
const { hint } = await response.json();
```

### New tRPC Approach (USE THIS):
```typescript
// ✅ NEW: tRPC auto-generated hook
const { mutate: getHint } = trpc.ai.getHint.useMutation();

getHint({
  question: { id, title, content, type, difficulty },
  currentAnswer: draft,
  hintLevel: 1,
});
// Full autocomplete, type-safe, Zod-validated ✅
```

---

## 🚀 Next Steps

1. **Update Notion DATABASE 2** using the checklist above
2. **Notify team** of tRPC migration changes
3. **Begin implementation** with updated task specs
4. **Reference** [phase-2-progressive-hints.md](./phase-2-progressive-hints.md) for complete code examples

---

**Status**: ✅ Documentation Updated
**Last Updated**: October 17, 2025
**Migration Phase**: Post-tRPC Phase 4 Completion
