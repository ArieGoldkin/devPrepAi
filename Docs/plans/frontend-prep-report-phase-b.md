# Frontend UI Developer - Phase B Preparation Report
**Date**: October 25, 2025
**Agent**: frontend-ui-developer
**Project**: Answer Panel Enhancement - Smart Hints Integration
**Phase**: Phase B - TestHintsPanel Integration + Keyboard Shortcuts
**Status**: 🔄 READY TO START

---

## Executive Summary

**Status**: 🔄 AWAITING KICKOFF

Phase B focuses on integrating the existing TestHintsPanel component with the Answer Panel to provide AI-powered test hints. This phase will implement keyboard shortcuts (Cmd/Ctrl+/) to toggle hints and ensure seamless UX integration.

**Foundation**: Phase A completed successfully with dark theme CodeMirror editor and Answer Panel components. Phase B builds upon this foundation to add intelligent assistance features.

**⚠️ Important Architectural Update (Phase A)**:
During Phase A completion, AnswerPanel was moved from `modules/practice/` to `modules/assessment/` to align with QuestionPanel location. This improves module cohesion and follows the 6-folder architecture pattern. All file paths in this report reflect this change.

---

## 1. Phase B Scope

### 1.1 Core Features

**TestHintsPanel Integration**:
- Display AI-generated test hints alongside code editor
- Toggle visibility with keyboard shortcut (Cmd/Ctrl+/)
- Responsive layout (side-by-side on desktop, stacked on mobile)
- Real-time hint updates based on answer progress

**Keyboard Shortcuts**:
- ✅ Already implemented: Cmd/Ctrl+Enter (submit), Cmd/Ctrl+S (save)
- 🆕 To implement: Cmd/Ctrl+/ (toggle hints panel)
- Visual feedback on keyboard shortcut usage
- Help tooltip showing available shortcuts

**State Management**:
- Track hints panel visibility state
- Persist hint preferences (localStorage)
- Sync hint state across components
- Handle hint loading and error states

### 1.2 Components to Build/Update

**New Components** (Phase B):
1. `AnswerPanelWithHints.tsx` - Composite component combining CodeAnswerEditor + TestHintsPanel
2. `KeyboardShortcutsHelp.tsx` - Floating help tooltip component
3. `HintsToggleButton.tsx` - Manual toggle button for hints panel

**Existing Components to Update**:
1. `CodeAnswerEditor.tsx` - Add `onToggleHints` prop handling (already has prop, just needs wiring)
2. `AnswerPanelContainer.tsx` - Support two-column layout for hints
3. `TestHintsPanel.tsx` - Integrate into Answer Panel context (currently standalone)

### 1.3 Out of Scope (Reserved for Phase C)

- Advanced IDE features (autocomplete, linting)
- Code formatting/beautification
- Multi-file support
- Version history/undo enhancements

---

## 2. Current State Analysis

### 2.1 TestHintsPanel Component

**Location**: `/frontend/src/modules/practice/components/TestHintsPanel.tsx`
**Note**: ⚠️ Architectural consideration - This component may need to move to `modules/assessment/` to align with AnswerPanel location.

**Current Features**:
- Displays test cases as collapsible cards
- Shows pass/fail status for each test
- AI-powered hints on test failures
- Glassmorphism styling matching design system

**Integration Needed**:
- Context awareness of current question/answer
- Communication channel with CodeAnswerEditor
- Keyboard shortcut support (Cmd/Ctrl+/)
- Responsive layout adaptation

### 2.2 CodeAnswerEditor Component

**Location**: `/frontend/src/modules/assessment/components/AnswerPanel/CodeEditor/CodeAnswerEditor.tsx`
**Parent Module**: `assessment` (moved from `practice` in Phase A - architectural fix)

**Current State** (Phase A - ✅ Updated):
- ✅ Has `onToggleHints` prop in interface
- ✅ Wired to useCodeMirrorKeymap hook
- ✅ Keyboard shortcut registered (Cmd/Ctrl+/)
- ✅ Integrated into AssessmentLayout via AnswerPanelContainer
- ❌ Not connected to any hints panel yet

**What's Needed**:
- Callback implementation to toggle hints panel visibility
- Visual indicator when hints are available
- Loading state while hints are being generated

### 2.3 Keyboard Shortcuts Implementation

**Already Implemented**:
```typescript
// In useCodeMirrorKeymap hook
{
  key: "Ctrl-/",
  mac: "Cmd-/",
  run: () => {
    onToggleHints?.();
    return true;
  },
}
```

**Status**: ✅ Infrastructure ready, just needs state management

---

## 3. Architecture Plan

### 3.1 Component Hierarchy

**Current Module Location**: `modules/assessment/components/AnswerPanel/`

```
AnswerPanelWithHints (NEW - to be created)
├── AnswerPanelContainer (✅ EXISTS - wrapper with glassmorphism)
│   ├── CodeAnswerEditor (✅ EXISTS - left/top: code editor)
│   │   └── CodeMirrorEditor (✅ EXISTS - core editor)
│   └── TestHintsPanel (⚠️ EXISTS in practice module - needs integration)
│       ├── HintCard (individual test case)
│       └── AIHintContent (AI-generated advice)
└── KeyboardShortcutsHelp (NEW - floating tooltip)
```

**Note**: All AnswerPanel components now live in `modules/assessment/` alongside QuestionPanel for better cohesion.

### 3.2 State Management

**Zustand Store Slice** (new):
```typescript
// store/slices/answer-panel-slice.ts
interface IAnswerPanelState {
  hintsVisible: boolean;
  hintsLoading: boolean;
  hintsError: string | null;
  currentHints: ITestHint[];
  toggleHints: () => void;
  setHints: (hints: ITestHint[]) => void;
  setHintsLoading: (loading: boolean) => void;
  setHintsError: (error: string | null) => void;
}
```

**LocalStorage Persistence**:
- Key: `devprep-hints-visible`
- Restore on mount, save on change

### 3.3 Responsive Layout Strategy

**Desktop (≥1024px)**:
```
┌─────────────────────────────────────┐
│  AnswerPanelContainer               │
│  ┌──────────────┬──────────────┐    │
│  │ Code Editor  │ Hints Panel  │    │
│  │ (60% width)  │ (40% width)  │    │
│  │              │              │    │
│  └──────────────┴──────────────┘    │
└─────────────────────────────────────┘
```

**Tablet (768px - 1023px)**:
```
┌─────────────────────────────┐
│  AnswerPanelContainer       │
│  ┌──────────────────────┐   │
│  │ Code Editor          │   │
│  │ (full width)         │   │
│  └──────────────────────┘   │
│  ┌──────────────────────┐   │
│  │ Hints Panel          │   │
│  │ (collapsed by default)│   │
│  └──────────────────────┘   │
└─────────────────────────────┘
```

**Mobile (<768px)**:
- Code editor: full width, 300px min-height
- Hints panel: bottom sheet / modal overlay
- Toggle button: floating action button (FAB)

---

## 4. Implementation Checklist

### 4.1 File Structure

**📋 Updated File Paths** (Phase A architectural fix - AnswerPanel moved to assessment module)

```
frontend/src/
├── modules/assessment/components/AnswerPanel/
│   ├── AnswerPanelContainer.tsx           ← ✅ EXISTS (Phase A) - UPDATE for layout
│   ├── CodeEditor/
│   │   └── CodeAnswerEditor.tsx           ← ✅ EXISTS (Phase A) - UPDATE for hints callback
│   ├── Hints/                              ← NEW FOLDER
│   │   ├── AnswerPanelWithHints.tsx       ← NEW (composite)
│   │   ├── KeyboardShortcutsHelp.tsx      ← NEW (tooltip)
│   │   └── HintsToggleButton.tsx          ← NEW (mobile FAB)
│   ├── types.ts                            ← ✅ EXISTS (Phase A) - UPDATE for hints types
│   └── index.ts                            ← ✅ EXISTS (Phase A) - UPDATE for exports
├── store/slices/
│   └── answer-panel-slice.ts               ← NEW (state management)
└── modules/practice/components/
    └── TestHintsPanel.tsx                  ← ⚠️ EXISTS - UPDATE for integration
                                              (consider moving to assessment module)
```

**Key Changes from Phase A**:
- AnswerPanel is now in `assessment/components/` (not `practice/components/`)
- CodeAnswerEditor is already integrated into AssessmentLayout
- New `Hints/` subfolder will contain Phase B components

### 4.2 Phase B Tasks

**Task B1: State Management** (~2 hours)
- [ ] Create Zustand slice for Answer Panel state
- [ ] Implement hints visibility toggle logic
- [ ] Add localStorage persistence
- [ ] Wire up hints loading/error states

**Task B2: Layout Updates** (~3 hours)
- [ ] Update AnswerPanelContainer for two-column layout
- [ ] Add responsive breakpoints (desktop/tablet/mobile)
- [ ] Implement resize handle for adjustable split (optional)
- [ ] Test layout on different screen sizes

**Task B3: Component Integration** (~4 hours)
- [ ] Build AnswerPanelWithHints composite component
- [ ] Connect CodeAnswerEditor to hints toggle
- [ ] Integrate TestHintsPanel into layout
- [ ] Handle hints panel mount/unmount

**Task B4: Keyboard Shortcuts** (~2 hours)
- [ ] Wire onToggleHints callback to state management
- [ ] Build KeyboardShortcutsHelp tooltip
- [ ] Add visual feedback on shortcut usage
- [ ] Test all shortcuts (submit, save, toggle hints)

**Task B5: Mobile Experience** (~3 hours)
- [ ] Build HintsToggleButton FAB
- [ ] Implement bottom sheet for hints on mobile
- [ ] Test touch interactions
- [ ] Optimize for small screens

**Task B6: Testing** (~2 hours)
- [ ] Unit tests for state management
- [ ] Integration tests for keyboard shortcuts
- [ ] Visual regression tests for layouts
- [ ] Browser/device compatibility testing

**Total Estimated Time**: ~16 hours (2 workdays)

---

## 5. Technical Decisions

### 5.1 State Management: Zustand vs React Context

**Decision**: Use Zustand slice

**Rationale**:
- Already using Zustand in project
- Better performance than Context for frequent updates
- Easy to persist to localStorage
- Simpler testing
- Can be used outside React components

**Alternative Considered**: React Context
- Rejected: More boilerplate, performance concerns

### 5.2 Layout: CSS Grid vs Flexbox

**Decision**: CSS Grid for desktop, Flexbox for mobile

**Rationale**:
- Grid: Better for two-column layout with adjustable widths
- Flexbox: Better for stacked mobile layout
- Both well-supported in modern browsers

### 5.3 Hints Panel: Side Panel vs Modal

**Decision**: Side panel (desktop), Bottom sheet (mobile)

**Rationale**:
- Side panel: Better UX for coding (see hints while typing)
- Bottom sheet: More natural on mobile, saves screen space
- Matches common IDE patterns (VS Code, IntelliJ)

---

## 6. Dependencies

### 6.1 From Phase A

**Required**:
- ✅ CodeAnswerEditor component (with onToggleHints prop)
- ✅ AnswerPanelContainer component
- ✅ useCodeMirrorKeymap hook (keyboard shortcuts)
- ✅ Dark theme implementation

**Status**: All dependencies from Phase A are complete and ready

### 6.2 External Dependencies

**Already Installed**:
- Zustand (state management)
- Tailwind CSS (styling)
- React (v18+)

**No New Dependencies Needed** for Phase B

---

## 7. Testing Strategy

### 7.1 Unit Tests

```typescript
describe('AnswerPanelSlice', () => {
  it('toggles hints visibility', () => { /* ... */ });
  it('persists to localStorage', () => { /* ... */ });
  it('handles loading states', () => { /* ... */ });
});
```

### 7.2 Integration Tests

- Keyboard shortcut (Cmd/Ctrl+/) toggles hints panel
- Hints panel visibility syncs across components
- LocalStorage persistence works across sessions

### 7.3 Visual Regression Tests

- Desktop layout: side-by-side
- Tablet layout: stacked
- Mobile layout: bottom sheet
- Keyboard shortcuts tooltip visibility

### 7.4 Accessibility Tests

- Keyboard navigation (Tab, Shift+Tab)
- Screen reader announces hints panel state
- Focus management when toggling hints
- ARIA labels for all interactive elements

---

## 8. Risk Assessment

### 8.1 Low Risk

- Keyboard shortcuts infrastructure already exists
- TestHintsPanel component is functional
- State management pattern is established
- No new dependencies needed

### 8.2 Medium Risk

- **Responsive layout complexity**: Needs careful testing across devices
  - **Mitigation**: Use CSS Grid/Flexbox best practices, test on real devices

- **State sync between editor and hints**: Potential race conditions
  - **Mitigation**: Use Zustand for centralized state, React Query for async hints

- **Mobile UX**: Bottom sheet interaction may need refinement
  - **Mitigation**: User testing, iterate on feedback

### 8.3 No High Risks Identified

---

## 9. Success Criteria

**Phase B is complete when**:
1. ✅ Cmd/Ctrl+/ toggles hints panel visibility
2. ✅ Desktop layout shows editor and hints side-by-side
3. ✅ Mobile layout shows hints as bottom sheet
4. ✅ Hints visibility preference persists across sessions
5. ✅ All keyboard shortcuts work (submit, save, toggle hints)
6. ✅ Code quality standards met (ESLint, TypeScript, file size)
7. ✅ Accessibility tests pass (keyboard navigation, screen readers)
8. ✅ Visual regression tests pass (desktop, tablet, mobile)

---

## 10. Next Steps

### 10.1 Before Starting Phase B

1. ✅ Complete Phase A (DONE)
2. ✅ Get Phase A approved and merged
3. 🔄 Review TestHintsPanel component API
4. 🔄 Create Phase B branch from main

### 10.2 Phase B Kickoff Checklist

- [ ] Create feature branch: `feature/answer-panel-phase-b-hints`
- [ ] Review Phase A implementation for context
- [ ] Set up development environment
- [ ] Create skeleton files for new components
- [ ] Stub out Zustand slice

### 10.3 Coordination

**No agent coordination needed for Phase B** (self-contained frontend work)

---

## 11. Conclusion

**Ready to Start**: 🔄 AWAITING KICKOFF

Phase B has a clear scope and implementation plan. All Phase A dependencies are complete. The TestHintsPanel component exists and just needs integration. Estimated timeline is 2 workdays (~16 hours).

**Blocking On**: Phase A approval and merge to main branch

**Next Action**: Create Phase B branch and begin implementation once Phase A is merged

---

**Report Prepared By**: frontend-ui-developer
**Date**: October 25, 2025
**Phase B Status**: 🔄 READY TO START (awaiting Phase A merge)
