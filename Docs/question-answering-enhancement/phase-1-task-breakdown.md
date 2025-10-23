# Phase 1: Split-Screen Q&A Interface - Complete Task Breakdown

## 📋 Overview

Implementation plan for the **20-80 split-screen Question & Answer interface** based on prototype (`glassmorphism_session_split_1.html`) using established design system and shadcn/ui components.

**Approach**: 3 Notion databases for organized tracking
**Total Tasks**: 32 tasks (10 + 9 + 13)
**Total Effort**: ~47 hours (~6 days)
**Design**: glassmorphism.css + shad cn/ui + prototype specs

---

## ✅ Pre-Implementation: Install Packages

**Run these commands first:**
```bash
# shadcn UI components
npx shadcn@latest add @shadcn/scroll-area @shadcn/tooltip

# NPM packages
npm install @monaco-editor/react use-debounce react-hotkeys-hook
npm install -D monaco-editor
```

---

## 🗂️ DATABASE 1: Split Screen & Question Display (Left 20%)

**Purpose**: Layout container + Question content display with all sections
**Tasks**: 10 | **Effort**: ~15.5 hours | **Focus**: Question panel on left side

---

### TASK 2.1: Create SplitScreenContainer Component
**Priority**: P0 | **Effort**: 2h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/SplitScreenContainer.tsx`

**Implementation**: Grid layout 20-80 split (desktop), vertical stack (mobile), proper height calculation
**Key Specs**: `grid-cols-[minmax(320px,25%)_1fr]`, `gap-5`, `h-[calc(100vh-100px)]`
**Accept**: ✅ 20-80 split desktop, ✅ stack mobile (<1024px), ✅ no scrollbars, ✅ types
**Design Ref**: Prototype lines 131-142, 777-881

---

### TASK 2.2: Create QuestionPanel with ScrollArea
**Priority**: P0 | **Effort**: 1.5h | **Deps**: 2.1, scroll-area | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/index.tsx`

**Implementation**: shadcn ScrollArea wrapper with custom purple scrollbar, flex-col gap-4
**Key Specs**: 8px scrollbar, `rgba(120,119,198,0.3)` thumb, smooth scroll
**Accept**: ✅ custom scrollbar, ✅ hover state, ✅ smooth scroll, ✅ contains QuestionCard + HintsCard
**Design Ref**: Prototype lines 144-152, 166-182

---

### TASK 2.3: Build QuestionCard Component
**Priority**: P0 | **Effort**: 2h | **Deps**: 2.2 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/QuestionCard.tsx`

**Implementation**: Glassmorphism card with exact prototype colors, backdrop blur, shadows
**Key Specs**: `bg-[rgba(20,15,40,0.85)]`, `border-[rgba(120,119,198,0.3)]`, `backdrop-blur-[20px]`
**Accept**: ✅ exact glass styling, ✅ renders all sections, ✅ conditional rendering
**Design Ref**: Prototype lines 154-163, 781-821

---

### TASK 2.4: Create QuestionHeader with Badge
**Priority**: P1 | **Effort**: 1.5h | **Deps**: 2.3 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/QuestionHeader.tsx`

**Implementation**: Flex layout with question number + difficulty badge (cyan/pink/purple)
**Key Specs**: Badge colors by difficulty (Easy=cyan, Medium=pink, Hard=purple)
**Accept**: ✅ correct colors, ✅ number display, ✅ badge rounded-full, ✅ justify-between
**Design Ref**: Prototype lines 184-204

---

### TASK 2.5: Build QuestionContent Component
**Priority**: P1 | **Effort**: 2h | **Deps**: 2.3 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/QuestionContent.tsx`

**Implementation**: Title + content with inline code parsing (backticks and <code> tags)
**Key Specs**: Title 18px/bold, content 13px, inline code: cyan bg + blue text
**Accept**: ✅ parses code, ✅ proper styling, ✅ line-height 1.7, ✅ monospace for code
**Design Ref**: Prototype lines 206-228

---

### TASK 2.6: Create ConstraintsSection Component
**Priority**: P1 | **Effort**: 1.5h | **Deps**: 2.3 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/ConstraintsSection.tsx`

**Implementation**: Section title + bulleted list with custom purple bullets
**Key Specs**: 12px uppercase title, custom `::before` bullet color `#7877c6`
**Accept**: ✅ custom bullets, ✅ proper spacing, ✅ uppercase title, ✅ responsive
**Design Ref**: Prototype lines 230-264

---

### TASK 2.7: Create ExamplesSection Component
**Priority**: P1 | **Effort**: 2h | **Deps**: 2.3 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/ExamplesSection.tsx`

**Implementation**: Example boxes with input/output/explanation in monospace
**Key Specs**: Box `bg-[rgba(120,119,198,0.05)]`, 11px Monaco font, bold labels
**Accept**: ✅ boxes styled, ✅ monospace font, ✅ optional explanation, ✅ gap between
**Design Ref**: Prototype lines 266-281

---

### TASK 2.8: Update AssessmentLayout to Use SplitScreen
**Priority**: P0 | **Effort**: 1.5h | **Deps**: 2.1, 2.2 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AssessmentLayout.tsx`

**Implementation**: Replace old layout with SplitScreenContainer, pass questionPanel + answerPanel
**Key Specs**: Remove QuestionDisplay, use new components, maintain functionality
**Accept**: ✅ split screen renders, ✅ no breaks, ✅ existing handlers work
**Design Ref**: Full prototype structure

---

### TASK 2.9: Mobile Responsive Adjustments
**Priority**: P2 | **Effort**: 1h | **Deps**: 2.1-2.8 | **Agent**: frontend-ui-developer
**File**: Update `SplitScreenContainer.tsx`

**Implementation**: Add responsive classes for mobile stack, adjust heights
**Key Specs**: Breakpoint 1024px, vertical stack, question panel max-h-50vh
**Accept**: ✅ stacks mobile, ✅ heights adjust, ✅ no overflow, ✅ tested 3 sizes
**Design Ref**: Prototype lines 742-751

---

### TASK 2.10: CLEANUP - Remove Old QuestionDisplay
**Priority**: P2 | **Effort**: 0.5h | **Deps**: 2.8 complete | **Agent**: frontend-ui-developer
**Files to Delete**: QuestionDisplay.tsx, QuestionCard/* (5 files in shared/ui)

**Implementation**: Search imports, replace references, delete files, verify build
**Key Specs**: `git rm` files, run build, commit with proper message
**Accept**: ✅ files deleted, ✅ no import errors, ✅ build succeeds, ✅ git clean

---

## 🗂️ DATABASE 2: Smart Hints System

**Purpose**: Progressive 3-level AI hints with animations and state management
**Tasks**: 9 | **Effort**: ~13.5 hours | **Focus**: Hint card within question panel

---

### TASK 3.1: Create HintsCard Container
**Priority**: P1 | **Effort**: 1.5h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/HintsCard.tsx`

**Implementation**: Glass card with gradient title, hint counter badge, button, list
**Key Specs**: Gradient text animation (6s loop), badge `0/3 used`, encouragement at max
**Accept**: ✅ gradient animates, ✅ badge updates, ✅ encouragement shows, ✅ glass styled
**Design Ref**: Prototype lines 358-384, 512-521, 824-838

---

### TASK 3.2: Build HintButton Component
**Priority**: P1 | **Effort**: 1.5h | **Deps**: 3.1 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/HintButton.tsx`

**Implementation**: Full-width button with 3 states (default/loading/disabled), gradient bg
**Key Specs**: Purple-pink gradient, shows "Get Hint" → "Get Next Hint" → "All Used"
**Accept**: ✅ 3 states work, ✅ gradient styled, ✅ hover lift, ✅ disabled at max
**Design Ref**: Prototype lines 386-412

---

### TASK 3.3: Create Hint tRPC Procedure
**Priority**: P0 | **Effort**: 2h | **Deps**: None | **Agent**: ai-ml-engineer
**Files**:
- `frontend/src/lib/trpc/routers/ai.ts` (add getHint procedure)
- `frontend/src/lib/trpc/schemas/hint.schema.ts` (NEW - Zod schemas)
- `frontend/src/lib/claude/prompts/hints.ts` (prompt templates)

**Implementation**: tRPC procedure with Zod schemas + 3 prompt templates (general/specific/skeleton)
**Key Specs**:
- Level 1=approach, 2=technique, 3=code skeleton
- Input: question object, currentAnswer (optional), hintLevel (1-3)
- Output: hint object with level/content/hasMore, success boolean
- Zod validates all inputs/outputs at runtime
- Returns typed response with full TypeScript inference

**Accept**:
- ✅ Zod schemas defined (getHintInputSchema, getHintOutputSchema)
- ✅ tRPC procedure added to aiRouter
- ✅ 3 prompts work (getLevel1/2/3Prompt)
- ✅ Claude API calls with error handling
- ✅ Type-safe responses (no manual typing needed)

**Design Ref**: See [phase-2-progressive-hints.md](../question-answering-enhancement/phase-2-progressive-hints.md) for full tRPC implementation

---

### TASK 3.4: Extend Store with Hint State
**Priority**: P0 | **Effort**: 1.5h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/store/slices/practice/actions/hints.ts` (NEW)

**Implementation**: New actions file with hintsList Map, hintsUsed Map, 4 actions
**Key Specs**: `saveHint()`, `getHintsForQuestion()`, `getHintsUsedCount()`, `clearHints()`
**Accept**: ✅ actions work, ✅ Maps update, ✅ integrated in slice, ✅ types exported
**Design Ref**: Store architecture

---

### TASK 3.5: Build HintDisplay with Level Variants
**Priority**: P1 | **Effort**: 2h | **Deps**: 3.1 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/QuestionPanel/HintDisplay.tsx`

**Implementation**: 3 colored variants (cyan/pink/purple), fade-in animation, inline code
**Key Specs**: Level 1=cyan, 2=pink, 3=purple borders/badges, 400ms fade-in
**Accept**: ✅ 3 variants styled, ✅ animation smooth, ✅ code parsing, ✅ stagger delay
**Design Ref**: Prototype lines 429-510

---

### TASK 3.6: Create useRequestHint Hook (tRPC)
**Priority**: P1 | **Effort**: 1h | **Deps**: 3.3, 3.4 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/hooks/useRequestHint.ts`

**Implementation**: tRPC auto-generated mutation hook, saves to store on success
**Key Specs**:
- Uses `trpc.ai.getHint.useMutation()` (auto-generated, type-safe)
- onSuccess callback saves hint to store
- Returns `requestHint`, `isLoading`, `isError`, `canRequestMore`
- Full TypeScript autocomplete for input/output
- No manual type definitions needed

**Accept**:
- ✅ tRPC mutation hook used (not manual useMutation)
- ✅ Saves hint to store on success
- ✅ Loading and error states exposed
- ✅ Type-safe request with Zod validation
- ✅ Integration with existing store actions

**Design Ref**: See [phase-2-progressive-hints.md](../question-answering-enhancement/phase-2-progressive-hints.md) Section 3 for full implementation

---

### TASK 3.7: Add Hint Animations to CSS
**Priority**: P2 | **Effort**: 0.5h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/styles/glassmorphism.css`

**Implementation**: Add `@keyframes hintFadeIn` and gradient text animation
**Key Specs**: 400ms ease-out, translateY(10px→0), opacity(0→1)
**Accept**: ✅ animation defined, ✅ works across browsers, ✅ performant
**Design Ref**: Prototype animations

---

### TASK 3.8: Integration Testing - Hints Flow
**Priority**: P2 | **Effort**: 1.5h | **Deps**: 3.1-3.7 | **Agent**: frontend-ui-developer

**Implementation**: Manual test 5 scenarios (first/second/third hint, navigation, errors)
**Key Specs**: All hints display correctly, state persists, animations smooth
**Accept**: ✅ 5 scenarios pass, ✅ no errors, ✅ mobile works, ✅ state correct

---

### TASK 3.9: CLEANUP - Remove Unused Hint Code
**Priority**: P2 | **Effort**: 0.5h | **Deps**: 3.8 | **Agent**: frontend-ui-developer

**Implementation**: Search for old hint code, remove duplicates, run eslint
**Key Specs**: No duplicate types, no unused imports, build succeeds
**Accept**: ✅ duplicates removed, ✅ eslint passes, ✅ build succeeds, ✅ committed

---

## 🗂️ DATABASE 3: Answer Panel (Right 80%)

**Purpose**: Text input + Monaco code editor with submission flow and autosave
**Tasks**: 13 | **Effort**: ~18 hours | **Focus**: Right panel (80% width)

---

### TASK 4.1: Create AnswerPanel Container
**Priority**: P0 | **Effort**: 1h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/index.tsx`

**Implementation**: Flex-col container with EditorCard + SubmitButton
**Key Specs**: Full height, no overflow, gap-4, passes all props
**Accept**: ✅ renders both components, ✅ full height, ✅ no scroll
**Design Ref**: Prototype lines 283-289, 841-881

---

### TASK 4.2: Build Question Type Detection
**Priority**: P1 | **Effort**: 0.5h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/utils/questionType.ts`

**Implementation**: 3 utility functions (getAnswerInputType, getDefaultLanguage, getPlaceholder)
**Key Specs**: Returns 'code' for coding, 'text' for others, default language JS
**Accept**: ✅ 3 functions work, ✅ types defined, ✅ JSDoc comments
**Design Ref**: Question type logic

---

### TASK 4.3: Create TextAnswerInput Component
**Priority**: P1 | **Effort**: 1.5h | **Deps**: 4.2 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/TextAnswerInput.tsx`

**Implementation**: shadcn Textarea with glass styling, auto-resize, custom scrollbar
**Key Specs**: Min-height 400px, `bg-[rgba(10,1,24,0.6)]`, focus glow
**Accept**: ✅ auto-resizes, ✅ styled correctly, ✅ scrollbar custom, ✅ focus state
**Design Ref**: Prototype lines 327-345

---

### TASK 4.4: Install Monaco Editor
**Priority**: P0 | **Effort**: 0.25h | **Deps**: None | **Agent**: frontend-ui-developer

**Implementation**: Run `npm install @monaco-editor/react monaco-editor`
**Key Specs**: Both packages installed, no errors, import works
**Accept**: ✅ packages installed, ✅ package.json updated, ✅ import works

---

### TASK 4.5: Create CodeEditorWrapper Component
**Priority**: P0 | **Effort**: 3h | **Deps**: 4.4 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/CodeEditorWrapper.tsx`

**Implementation**: Monaco Editor with custom dark theme, full height, all options
**Key Specs**: Theme 'devprep-dark' (purple/pink/cyan), minimap, line numbers, autocomplete
**Accept**: ✅ theme applied, ✅ full height, ✅ options work, ✅ onChange fires
**Design Ref**: Monaco docs + prototype styling

---

### TASK 4.6: Build LanguageSelector Component
**Priority**: P1 | **Effort**: 1.5h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/LanguageSelector.tsx`

**Implementation**: shadcn Select with badge-style trigger, 7 languages (JS/TS/Py/Java/C++/Go/Rust)
**Key Specs**: Badge trigger (not full dropdown), glass dropdown, icons for languages
**Accept**: ✅ 7 languages, ✅ badge styled, ✅ dropdown glass, ✅ onChange fires
**Design Ref**: Prototype lines 318-325

---

### TASK 4.7: Create EditorHeader Component
**Priority**: P1 | **Effort**: 1h | **Deps**: 4.6 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/EditorHeader.tsx`

**Implementation**: Flex layout with "Your Solution" label + LanguageSelector (code only)
**Key Specs**: Justify-between, 14px label, selector only for code questions
**Accept**: ✅ flex layout, ✅ conditional selector, ✅ styled correctly
**Design Ref**: Prototype lines 305-310, 844-848

---

### TASK 4.8: Build EditorCard Component
**Priority**: P0 | **Effort**: 2h | **Deps**: 4.3, 4.5, 4.7 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/EditorCard.tsx`

**Implementation**: Glass card combining Text/Code editors, auto-detects question type
**Key Specs**: Flex-1 height, min-500px, glass styling, switches editor by type
**Accept**: ✅ detects type, ✅ renders correct editor, ✅ glass styled, ✅ full height
**Design Ref**: Prototype lines 291-303, 843-869

---

### TASK 4.9: Create EditorFooter Component
**Priority**: P1 | **Effort**: 1h | **Deps**: 4.8 | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/EditorFooter.tsx`

**Implementation**: Flex footer with tip + count (char for text, lines for code)
**Key Specs**: 12px text, tip with 💡, real-time count update
**Accept**: ✅ tips correct, ✅ count updates, ✅ font-mono for count
**Design Ref**: Prototype lines 348-355, 865-868

---

### TASK 4.10: Build SubmitButton Component
**Priority**: P0 | **Effort**: 2h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: `frontend/src/modules/assessment/components/AnswerPanel/SubmitButton.tsx`

**Implementation**: Full-width gradient button in glass container, 3 states
**Key Specs**: Purple-pink gradient, "Submit Answer →", loading with spinner, disabled state
**Accept**: ✅ 3 states work, ✅ gradient styled, ✅ hover lift + glow, ✅ disabled correct
**Design Ref**: Prototype lines 524-577, 871-879

---

### TASK 4.11: Implement Autosave with Debounce
**Priority**: P2 | **Effort**: 2h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: Update `useAssessment.ts` hook

**Implementation**: Install use-debounce, add 500ms debounced save, show save indicator
**Key Specs**: 500ms delay, saves to draft, indicator: idle/saving/saved
**Accept**: ✅ debounce works, ✅ saves to store, ✅ indicator shows, ✅ no lag
**Design Ref**: Best practices for autosave

---

### TASK 4.12: Add Keyboard Shortcuts
**Priority**: P2 | **Effort**: 1h | **Deps**: None | **Agent**: frontend-ui-developer
**File**: Update `AnswerPanel/index.tsx`

**Implementation**: Install react-hotkeys-hook, add Cmd/Ctrl+Enter to submit
**Key Specs**: Works in textarea + Monaco, hint in footer "⌘+Enter to submit"
**Accept**: ✅ shortcut works, ✅ cross-platform, ✅ hint shown, ✅ disabled when evaluating
**Design Ref**: Keyboard shortcuts UX

---

### TASK 4.13: CLEANUP - Remove Old AnswerInput
**Priority**: P2 | **Effort**: 0.5h | **Deps**: 4.1-4.12 | **Agent**: frontend-ui-developer
**Files to Delete**: AnswerInput.tsx, CodeMirrorEditor.tsx (if exists)

**Implementation**: Search imports, delete files, verify build, commit
**Key Specs**: Remove 2 files, no import errors, build succeeds
**Accept**: ✅ files deleted, ✅ no errors, ✅ build succeeds, ✅ committed

---

## 📊 Summary & Timeline

### Database Totals:
- **DATABASE 1** (Split Screen & Question): 10 tasks, ~15.5 hours
- **DATABASE 2** (Smart Hints): 9 tasks, ~13.5 hours
- **DATABASE 3** (Answer Panel): 13 tasks, ~18 hours
- **TOTAL**: 32 tasks, ~47 hours (~6 days)

### Week 1: Foundation (Days 1-3)
- Day 1: DATABASE 1 Tasks 2.1-2.5 (split screen + question card)
- Day 2: DATABASE 1 Tasks 2.6-2.10 (sections + cleanup)
- Day 3: DATABASE 3 Tasks 4.1-4.6 (answer panel + editors)

### Week 2: Features (Days 4-6)
- Day 4: DATABASE 3 Tasks 4.7-4.13 (editor features + cleanup)
- Day 5: DATABASE 2 Tasks 3.1-3.6 (hints card + API + store)
- Day 6: DATABASE 2 Tasks 3.7-3.9 (animations + testing + cleanup)

---

## 🎯 Success Criteria

**Feature complete when all checked:**
- [ ] Split-screen layout works (20-80 desktop, stacked mobile)
- [ ] Question panel scrolls smoothly
- [ ] All question sections render correctly
- [ ] Hints request and display (3 levels with colors)
- [ ] Text input for behavioral/system-design questions
- [ ] Monaco editor for coding questions
- [ ] Language selector changes editor language
- [ ] Submit button states work correctly
- [ ] Autosave works (500ms debounce)
- [ ] Keyboard shortcut (Cmd+Enter) submits
- [ ] All animations smooth (60fps)
- [ ] Mobile responsive at all breakpoints
- [ ] No console errors or warnings
- [ ] Build succeeds with no TypeScript errors
- [ ] ESLint passes with no warnings

---

## 🔗 Related Files

- **Prototype**: `.superdesign/design_iterations/glassmorphism_session_split_1.html`
- **Design System**: `frontend/src/styles/glassmorphism.css`
- **Colors**: `frontend/src/styles/globals.css`
- **Types**: `frontend/src/types/ai/questions.ts`
- **Store**: `frontend/src/store/slices/practice/`

---

**Status**: 📋 Ready to Implement
**Last Updated**: October 15, 2025
**Next Action**: Create 3 Notion databases from this breakdown
