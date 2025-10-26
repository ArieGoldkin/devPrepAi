# Phase B Implementation Checklist with Agent Routing
**Date**: October 26, 2025
**Branch**: `feature/answer-panel-phase-b-hints`
**Status**: 🔄 READY TO START
**Reference**: `phase-b-agent-delegation.md`

---

## Pre-Flight Checklist

### Environment Setup
- [x] ✅ Branch created: `feature/answer-panel-phase-b-hints`
- [x] ✅ Phase A dependencies verified
- [x] ✅ Agent delegation plan created
- [ ] 🔄 Development server running (`npm run dev`)
- [ ] 🔄 VSCode/IDE configured
- [ ] 🔄 Browser DevTools ready

### Phase A Dependencies (All Verified ✅)
- [x] CodeAnswerEditor component exists (`modules/assessment/components/AnswerPanel/CodeEditor/CodeAnswerEditor.tsx`)
- [x] AnswerPanelContainer component exists (`modules/assessment/components/AnswerPanel/AnswerPanelContainer.tsx`)
- [x] useCodeMirrorKeymap hook exists (`shared/hooks/useCodeMirrorConfig.ts`)
- [x] Dark theme implemented (`shared/themes/dark-theme.ts`)
- [x] TestHintsPanel component exists (`modules/practice/components/TestHintsPanel.tsx`)
- [x] Keyboard shortcut (Cmd/Ctrl+/) already wired in useCodeMirrorKeymap (line 70-76)

---

## Phase B Implementation Tasks

### 📋 Task B1: State Management (~2 hours)

**Agent**: backend-system-architect + frontend-ui-developer

#### B1.1: Design State Architecture (1h)
- **Agent**: `backend-system-architect`
- **Command**: Route to backend-system-architect for state design
- [ ] Design Zustand slice interface
- [ ] Define state properties (hintsVisible, currentHints, loading, error)
- [ ] Define actions (toggleHints, setHints, setLoading, setError)
- [ ] Design localStorage persistence strategy
- [ ] Document state architecture
- **Deliverable**: State architecture design doc
- **Next**: Hand off to frontend-ui-developer for implementation

#### B1.2: Implement Zustand Slice (1h)
- **Agent**: `frontend-ui-developer`
- **Command**: Route to frontend-ui-developer for implementation
- [ ] Create `/frontend/src/store/slices/answer-panel-slice.ts`
- [ ] Implement state interface from B1.1 design
- [ ] Add localStorage persistence (key: `devprep-hints-visible`)
- [ ] Implement toggleHints() action
- [ ] Implement setHints() action
- [ ] Write basic unit tests
- [ ] Export slice from store index
- **Deliverable**: Working Zustand slice with tests
- **Files Modified**:
  - `store/slices/answer-panel-slice.ts` (NEW)
  - `store/index.ts` (UPDATE - export slice)

---

### 🎨 Task B2: Layout Updates (~3 hours)

**Agent**: rapid-ui-designer + frontend-ui-developer

#### B2.1: Design Responsive Layout (1h)
- **Agent**: `rapid-ui-designer`
- **Command**: Route to rapid-ui-designer for layout design
- [ ] Design desktop two-column layout (60/40 split)
- [ ] Design tablet stacked layout
- [ ] Design mobile bottom sheet layout
- [ ] Define breakpoints (1024px, 768px)
- [ ] Create visual mockups
- [ ] Document CSS Grid specifications
- **Deliverable**: Layout mockups and specifications
- **Next**: Hand off to frontend-ui-developer

#### B2.2: Implement Two-Column Layout (1.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Route to frontend-ui-developer
- [ ] Update AnswerPanelContainer.tsx
- [ ] Add CSS Grid layout with two columns
- [ ] Implement 60/40 width split for desktop
- [ ] Add glassmorphism styling to container
- [ ] Test layout on desktop (≥1024px)
- **Deliverable**: Desktop two-column layout working
- **Files Modified**: `modules/assessment/components/AnswerPanel/AnswerPanelContainer.tsx`

#### B2.3: Add Responsive Breakpoints (0.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Add Tailwind responsive classes for tablet (768px-1023px)
- [ ] Add Tailwind responsive classes for mobile (<768px)
- [ ] Test tablet layout (stacked)
- [ ] Test mobile layout (full-width editor)
- **Deliverable**: Responsive layout working across all breakpoints
- **Files Modified**: `modules/assessment/components/AnswerPanel/AnswerPanelContainer.tsx`

---

### 🔗 Task B3: Component Integration (~4 hours)

**Agent**: frontend-ui-developer

#### B3.1: Move TestHintsPanel (0.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Route to frontend-ui-developer
- [ ] Move TestHintsPanel from `modules/practice/` to `modules/assessment/components/`
- [ ] Update imports in TestHintsPanel
- [ ] Update barrel exports
- [ ] Verify component still renders
- **Deliverable**: TestHintsPanel in correct module location
- **Files Modified**:
  - `modules/assessment/components/TestHintsPanel.tsx` (MOVED)
  - `modules/assessment/components/index.ts` (UPDATE exports)

#### B3.2: Build AnswerPanelWithHints Composite (1.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Create `/frontend/src/modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`
- [ ] Import AnswerPanelContainer, CodeAnswerEditor, TestHintsPanel
- [ ] Wire Zustand state (useAnswerPanelStore)
- [ ] Implement conditional rendering based on hintsVisible
- [ ] Add proper TypeScript types
- [ ] Test component renders
- **Deliverable**: Composite component working
- **Files Created**: `modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`

#### B3.3: Connect CodeAnswerEditor to Hints Toggle (1h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Wire onToggleHints callback to Zustand toggleHints action
- [ ] Add visual indicator when hints are available
- [ ] Test keyboard shortcut (Cmd/Ctrl+/) toggles hints
- [ ] Add loading state while hints are generated
- **Deliverable**: Toggle integration working
- **Files Modified**: `modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`

#### B3.4: Wire Hints State Across Components (1h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Ensure state syncs between CodeAnswerEditor and TestHintsPanel
- [ ] Handle hints panel mount/unmount
- [ ] Test state persistence across page refreshes
- [ ] Add error boundaries for hints loading errors
- **Deliverable**: State fully synced across all components
- **Files Modified**:
  - `modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`
  - `modules/assessment/components/TestHintsPanel.tsx` (if needed)

---

### ⌨️ Task B4: Keyboard Shortcuts (~2 hours)

**Agent**: frontend-ui-developer + whimsy-injector

#### B4.1: Wire Keyboard Shortcut to State (0.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Route to frontend-ui-developer
- [ ] Ensure onToggleHints callback is wired to Zustand toggleHints
- [ ] Test Cmd/Ctrl+/ toggles hints panel
- [ ] Verify keyboard shortcut works in read-only mode
- [ ] Test all existing shortcuts still work (Cmd+Enter, Cmd+S)
- **Deliverable**: Keyboard shortcut functional
- **Files Modified**: None (already wired in useCodeMirrorKeymap)

#### B4.2: Build Keyboard Shortcuts Help Tooltip (1h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Create `/frontend/src/modules/assessment/components/AnswerPanel/Hints/KeyboardShortcutsHelp.tsx`
- [ ] List all available shortcuts (Cmd+Enter, Cmd+S, Cmd+/)
- [ ] Add glassmorphism styling to tooltip
- [ ] Make tooltip dismissible
- [ ] Add "?" icon button to trigger tooltip
- **Deliverable**: Help tooltip component
- **Files Created**: `modules/assessment/components/AnswerPanel/Hints/KeyboardShortcutsHelp.tsx`

#### B4.3: Add Visual Feedback on Shortcut Use (0.5h)
- **Agent**: `whimsy-injector`
- **Command**: Route to whimsy-injector for animation polish
- [ ] Add smooth fade-in animation when hints panel opens
- [ ] Add smooth fade-out animation when hints panel closes
- [ ] Add subtle pulse animation on toggle
- [ ] Add success state visual feedback
- **Deliverable**: Smooth toggle animations
- **Files Modified**:
  - `modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`
  - `styles/animations.css` (if needed)

---

### 📱 Task B5: Mobile Experience (~3 hours)

**Agent**: rapid-ui-designer + frontend-ui-developer + ux-researcher

#### B5.1: Design Mobile Bottom Sheet UX (1h)
- **Agent**: `rapid-ui-designer`
- **Command**: Route to rapid-ui-designer
- [ ] Design mobile bottom sheet layout
- [ ] Design floating action button (FAB) for toggle
- [ ] Define touch interactions (swipe to dismiss)
- [ ] Create mobile mockups
- [ ] Document mobile UX patterns
- **Deliverable**: Mobile UX mockups and specifications
- **Next**: Hand off to frontend-ui-developer

#### B5.2: Build Floating Action Button (1h)
- **Agent**: `frontend-ui-developer`
- **Command**: Route to frontend-ui-developer
- [ ] Create `/frontend/src/modules/assessment/components/AnswerPanel/Hints/HintsToggleButton.tsx`
- [ ] Implement FAB component with icon
- [ ] Add glassmorphism styling
- [ ] Position button (bottom-right corner)
- [ ] Wire to toggleHints action
- [ ] Show only on mobile (<768px)
- **Deliverable**: Mobile FAB component
- **Files Created**: `modules/assessment/components/AnswerPanel/Hints/HintsToggleButton.tsx`

#### B5.3: Implement Bottom Sheet (0.5h)
- **Agent**: `frontend-ui-developer`
- **Command**: Continue with frontend-ui-developer
- [ ] Implement bottom sheet component for mobile hints
- [ ] Add slide-up animation
- [ ] Add swipe-to-dismiss gesture
- [ ] Add overlay backdrop
- [ ] Test on mobile viewport
- **Deliverable**: Mobile bottom sheet working
- **Files Modified**: `modules/assessment/components/AnswerPanel/Hints/AnswerPanelWithHints.tsx`

#### B5.4: Test Touch Interactions (0.5h)
- **Agent**: `ux-researcher`
- **Command**: Route to ux-researcher for UX testing
- [ ] Test FAB tap interaction
- [ ] Test bottom sheet swipe gesture
- [ ] Test hint cards tap interaction
- [ ] Test on iOS Safari
- [ ] Test on Chrome Android
- [ ] Document UX issues
- **Deliverable**: Mobile UX validation report
- **Next**: Hand off issues to frontend-ui-developer for fixes

---

### 🧪 Task B6: Testing & Quality Assurance (~2 hours)

**Agent**: code-quality-reviewer + ux-researcher

#### B6.1: Unit Tests - State Management (0.5h)
- **Agent**: `code-quality-reviewer`
- **Command**: Route to code-quality-reviewer
- [ ] Write unit tests for toggleHints()
- [ ] Write unit tests for localStorage persistence
- [ ] Write unit tests for setHints()
- [ ] Write unit tests for loading/error states
- [ ] Ensure 100% coverage for state slice
- **Deliverable**: Unit test suite for state management
- **Files Created**: `store/slices/__tests__/answer-panel-slice.test.ts`

#### B6.2: Integration Tests - Keyboard Shortcuts (0.5h)
- **Agent**: `code-quality-reviewer`
- **Command**: Continue with code-quality-reviewer
- [ ] Test Cmd/Ctrl+/ toggles hints panel
- [ ] Test state persists across page reload
- [ ] Test keyboard shortcuts work in all layouts
- [ ] Test shortcuts don't conflict
- **Deliverable**: Integration test suite
- **Files Created**: `modules/assessment/components/AnswerPanel/__tests__/hints-integration.test.tsx`

#### B6.3: Visual Regression Tests (0.5h)
- **Agent**: `code-quality-reviewer`
- **Command**: Continue with code-quality-reviewer
- [ ] Take screenshots of desktop layout (hints visible/hidden)
- [ ] Take screenshots of tablet layout
- [ ] Take screenshots of mobile layout
- [ ] Compare against mockups
- [ ] Document any visual discrepancies
- **Deliverable**: Visual regression test results
- **Files**: Screenshots in `/tests/visual-regression/phase-b/`

#### B6.4: Accessibility Audit (0.5h)
- **Agent**: `ux-researcher`
- **Command**: Route to ux-researcher
- [ ] Test keyboard navigation (Tab, Shift+Tab)
- [ ] Test screen reader announcements
- [ ] Test focus management on toggle
- [ ] Test ARIA labels on all interactive elements
- [ ] Run axe DevTools audit
- [ ] Verify WCAG 2.1 AA compliance
- **Deliverable**: Accessibility audit report
- **Files**: `Docs/testing/phase-b-accessibility-audit.md`

---

## Agent Routing Decision Tree

### When to Route to Each Agent

**Use this decision tree to determine which agent to invoke:**

```
Is the task about...

├─ State management design?
│  └─ Route to: backend-system-architect
│
├─ UI/UX design or mockups?
│  └─ Route to: rapid-ui-designer
│
├─ Component implementation or hooks?
│  └─ Route to: frontend-ui-developer
│
├─ Animations or micro-interactions?
│  └─ Route to: whimsy-injector
│
├─ Testing or code quality?
│  └─ Route to: code-quality-reviewer
│
├─ Accessibility or user testing?
│  └─ Route to: ux-researcher
│
└─ Multi-agent coordination?
   └─ Route to: studio-coach
```

### Example Routing Commands

**State Management**:
```
"Route to backend-system-architect: Design the Zustand state architecture for the Answer Panel hints feature"
```

**Layout Design**:
```
"Route to rapid-ui-designer: Design the responsive layout for the two-column Answer Panel with hints"
```

**Component Implementation**:
```
"Route to frontend-ui-developer: Implement the AnswerPanelWithHints composite component"
```

**Animation Polish**:
```
"Route to whimsy-injector: Add smooth fade-in/fade-out animations for hints panel toggle"
```

**Testing**:
```
"Route to code-quality-reviewer: Write unit tests for the answer-panel-slice state management"
```

**Accessibility**:
```
"Route to ux-researcher: Conduct WCAG 2.1 AA accessibility audit for the hints panel"
```

---

## Success Criteria Verification

Before marking Phase B as complete, verify all success criteria:

### Functional Requirements
- [ ] ✅ Cmd/Ctrl+/ toggles hints panel visibility
- [ ] ✅ Desktop layout shows editor and hints side-by-side (60/40)
- [ ] ✅ Mobile layout shows hints as bottom sheet
- [ ] ✅ Hints visibility preference persists across sessions (localStorage)
- [ ] ✅ All keyboard shortcuts work (submit, save, toggle hints)

### Code Quality Standards
- [ ] ✅ ESLint: Zero errors
- [ ] ✅ TypeScript: Zero type errors
- [ ] ✅ File size: All files ≤180 lines
- [ ] ✅ Complexity: All functions ≤15 complexity
- [ ] ✅ Imports: Proper ordering (@shared, @modules, etc.)

### Testing Standards
- [ ] ✅ Unit tests: State management at 100% coverage
- [ ] ✅ Integration tests: Keyboard shortcuts working
- [ ] ✅ Visual regression: All layouts match mockups
- [ ] ✅ Accessibility: WCAG 2.1 AA compliance verified

### User Experience
- [ ] ✅ Keyboard navigation works (Tab, Shift+Tab)
- [ ] ✅ Screen reader announces hints panel state
- [ ] ✅ Focus management on toggle
- [ ] ✅ Smooth animations (no jank)
- [ ] ✅ Mobile touch interactions feel natural

---

## Handoff Protocol

### Between Tasks
1. **Complete current task** - Mark checklist item as done
2. **Document deliverables** - List all files created/modified
3. **Test changes** - Verify functionality works
4. **Commit work** - `git commit -m "feat(phase-b): <task description>"`
5. **Update next agent** - Route to next agent with context

### Between Agents
**Handoff Message Template**:
```
Task [Task ID] complete.

Deliverables:
- [List files created/modified]

Testing:
- [List what was tested]

Next Steps:
- [What the next agent should do]

Context:
- [Any important decisions or blockers]
```

---

## Phase B Completion Checklist

### Before Creating PR
- [ ] All tasks B1-B6 completed
- [ ] All success criteria verified
- [ ] ESLint passes (`npm run lint`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] Tests pass (`npm test`)
- [ ] Dev server runs without errors
- [ ] Visual QA on desktop/tablet/mobile

### PR Preparation
- [ ] Create PR from `feature/answer-panel-phase-b-hints` to `main`
- [ ] Write descriptive PR title: "feat: Add TestHintsPanel integration with keyboard shortcuts (Phase B)"
- [ ] Fill PR description with:
  - Summary of changes
  - Link to `phase-b-agent-delegation.md`
  - Screenshots of desktop/mobile layouts
  - List of new components
  - Testing notes
- [ ] Request review from `studio-coach` or `code-quality-reviewer`

### After PR Approval
- [ ] Merge PR to main
- [ ] Delete feature branch
- [ ] Update project documentation
- [ ] Notify team of Phase B completion
- [ ] Begin Phase C planning (if applicable)

---

**Document Version**: 1.0
**Last Updated**: October 26, 2025
**Status**: 🔄 READY FOR EXECUTION
**Estimated Completion**: 1.5-2 workdays
