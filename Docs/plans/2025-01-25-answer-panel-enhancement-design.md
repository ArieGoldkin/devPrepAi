# Answer Panel Enhancement Design
**Date**: January 25, 2025
**Status**: Approved Design
**Implementation Strategy**: Hybrid 3-Phase Approach

---

## Executive Summary

This design document outlines the enhancement of the Answer Panel component for DevPrep AI's practice session. The solution focuses on two primary pain points: **visual/theme compatibility** with the glassmorphism design system and **missing editor features** (syntax highlighting, autocomplete, language switching, code formatting).

**Key Decision**: Continue with **CodeMirror 6** (not Monaco) due to superior mobile support, smaller bundle size (300KB vs 5-10MB), and CSS-first theming that aligns with our glassmorphism design system.

**Implementation Approach**: Hybrid 3-phase progressive delivery
- **Phase A** (Week 1): Theme + Syntax Highlighting → Visual impact
- **Phase B** (Week 2): Language Switching + Autocomplete → UX features
- **Phase C** (Week 3): Code Formatting + Polish → Quality improvements

---

## Design Principles

1. **Enhanced, Not Pixel-Perfect**: Use prototype as inspiration but improve with syntax-aware glows, better highlighting, and smoother animations
2. **Progressive Delivery**: Ship value incrementally rather than big-bang release
3. **Mobile-First**: Ensure excellent experience on all devices (320px → 1920px)
4. **Design System Consistency**: Use CSS variables from `globals.css` and `glassmorphism.css`
5. **Accessibility**: WCAG 2.1 AA compliance with keyboard navigation and screen reader support

---

## Architecture

### Component Structure

```
modules/practice/components/
├── AnswerPanel/
│   ├── index.tsx                    # Main export
│   ├── AnswerPanelContainer.tsx     # Layout wrapper with glassmorphism
│   ├── CodeEditor/
│   │   ├── CodeAnswerEditor.tsx     # Enhanced CodeMirror wrapper
│   │   ├── EditorToolbar.tsx        # Language selector, format, copy
│   │   ├── EditorFooter.tsx         # Stats, shortcuts, actions
│   │   └── hooks/
│   │       ├── useEditorTheme.ts    # Glassmorphism theme hook
│   │       ├── useAutoComplete.ts   # Smart suggestions
│   │       └── useCodeFormatter.ts  # Prettier integration
│   ├── TextEditor/
│   │   └── TextAnswerEditor.tsx     # Enhanced textarea (conceptual)
│   └── types.ts                     # Shared types
│
shared/themes/
└── codemirror-glassmorphism.ts      # Custom CodeMirror theme
```

### Key Architectural Decisions

| Decision | Rationale |
|----------|-----------|
| **Module-based organization** | Self-contained in `modules/practice/components/AnswerPanel/` for clear boundaries |
| **Separation of concerns** | Code editor vs text editor separated, toolbar/footer extracted for reusability |
| **Reusable theme** | Glassmorphism theme in `shared/themes/` for potential reuse across app |
| **Custom hooks** | Complex logic (autocomplete, formatting) isolated for testability |
| **TypeScript strict mode** | All components <180 lines, complexity <15 per ESLint rules |

---

## Phase A: Theme + Syntax Highlighting

### Glassmorphism Theme Specification

**File**: `shared/themes/codemirror-glassmorphism.ts`

#### Color Mapping

```typescript
const theme = EditorView.theme({
  // Base colors
  "&": {
    backgroundColor: "rgba(10, 1, 24, 0.6)",
    color: "#e5e5ff",
    fontSize: "14px",
    fontFamily: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Gutter
  ".cm-gutters": {
    backgroundColor: "rgba(20, 15, 40, 0.5)",
    color: "rgba(229, 229, 255, 0.6)",
    border: "none",
  },

  // Active line
  ".cm-activeLine": {
    backgroundColor: "rgba(120, 119, 198, 0.15)",
    boxShadow: "0 0 10px rgba(120, 119, 198, 0.3)",
  },

  // Selection
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "rgba(120, 119, 198, 0.3)",
    boxShadow: "0 0 10px hsl(var(--brand-primary) / 0.4)",
  },

  // Cursor
  ".cm-cursor": {
    borderLeftColor: "#ff77c6",
    borderLeftWidth: "2px",
    filter: "drop-shadow(0 0 4px #ff77c6)",
  },

  // Matching brackets
  ".cm-matchingBracket": {
    backgroundColor: "rgba(120, 119, 198, 0.2)",
    border: "1px solid hsl(var(--brand-primary))",
    borderRadius: "2px",
  },
}, { dark: true });
```

#### Enhanced Syntax Highlighting

```typescript
const syntaxHighlighting = HighlightStyle.define([
  // Keywords: if, const, function, async, await
  {
    tag: tags.keyword,
    color: "hsl(var(--brand-primary))",      // Purple #7877c6
    textShadow: "0 0 8px hsl(var(--brand-primary) / 0.5)",
  },

  // Strings: "hello", 'world', `template`
  {
    tag: tags.string,
    color: "hsl(var(--brand-accent))",       // Cyan #78dbff
    textShadow: "0 0 6px hsl(var(--brand-accent) / 0.4)",
  },

  // Function names: map, filter, useState
  {
    tag: tags.function(tags.variableName),
    color: "hsl(var(--brand-secondary))",    // Pink #ff77c6
    fontWeight: "600",
  },

  // Numbers and booleans
  {
    tag: [tags.number, tags.bool],
    color: "#00ff88",                         // Success green
    textShadow: "0 0 4px rgba(0, 255, 136, 0.3)",
  },

  // Comments
  {
    tag: tags.comment,
    color: "rgba(229, 229, 255, 0.5)",       // Muted
    fontStyle: "italic",
  },

  // Operators: +, -, =>, etc.
  {
    tag: tags.operator,
    color: "rgba(229, 229, 255, 0.9)",
  },

  // Type annotations (TypeScript)
  {
    tag: tags.typeName,
    color: "hsl(var(--brand-accent))",
    fontWeight: "500",
  },
]);
```

#### Container Styling

```typescript
// Wrapper card styling
.editor-card {
  background: rgba(20, 15, 40, 0.85);
  border: 1px solid rgba(120, 119, 198, 0.3);
  border-radius: 20px;
  padding: 24px;
  backdrop-filter: blur(20px);
  box-shadow:
    0 0 60px rgba(120, 119, 198, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

// Inner editor
.code-editor {
  border: 1px solid rgba(120, 119, 198, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease;
}

.code-editor:focus-within {
  border-color: rgba(120, 119, 198, 0.5);
  box-shadow: 0 0 20px rgba(120, 119, 198, 0.2);
}

// Custom scrollbar (matching glassmorphism.css)
.code-editor ::-webkit-scrollbar {
  width: 8px;
}

.code-editor ::-webkit-scrollbar-track {
  background: rgba(120, 119, 198, 0.1);
  border-radius: 4px;
}

.code-editor ::-webkit-scrollbar-thumb {
  background: rgba(120, 119, 198, 0.3);
  border-radius: 4px;
}

.code-editor ::-webkit-scrollbar-thumb:hover {
  background: rgba(120, 119, 198, 0.5);
}
```

### Deliverables (Phase A)

- [ ] `shared/themes/codemirror-glassmorphism.ts` - Complete theme implementation
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/CodeAnswerEditor.tsx` - Basic wrapper with theme
- [ ] `modules/practice/components/AnswerPanel/AnswerPanelContainer.tsx` - Layout with glassmorphism card
- [ ] Update `shared/hooks/useCodeMirrorConfig.ts` - Integrate new theme
- [ ] Visual QA: Theme matches design system colors and glow effects

---

## Phase B: Language Switching + Autocomplete

### Language Switching UI

**Component**: `EditorToolbar.tsx`

#### Features

1. **Language Selector Dropdown**
   - Options: JavaScript, TypeScript, Python
   - Visual: Glassmorphism pill with icon
   - Position: Top-right of editor (matches prototype badge)
   - Preserve code content when switching
   - Show warning modal if syntax incompatible

2. **Language Badge**
   - Always visible indicator
   - Styled to match current language
   - Smooth transition animation on change

#### Visual Specification

```typescript
// Language selector dropdown
.language-selector {
  background: rgba(120, 119, 198, 0.1);
  border: 1px solid rgba(120, 119, 198, 0.3);
  border-radius: 10px;
  padding: 8px 16px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
}

.language-selector:hover {
  background: rgba(120, 119, 198, 0.2);
  box-shadow: 0 4px 20px rgba(120, 119, 198, 0.3);
  transform: translateY(-2px);
}

// Active language badge
.language-badge {
  background: linear-gradient(135deg,
    hsl(var(--brand-primary) / 0.3),
    hsl(var(--brand-secondary) / 0.2));
  color: hsl(var(--brand-accent));
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 12px;
}

// Dropdown menu
.language-dropdown {
  background: rgba(20, 15, 40, 0.95);
  border: 1px solid rgba(120, 119, 198, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 8px;
}

.language-option {
  padding: 10px 16px;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.language-option:hover {
  background: rgba(120, 119, 198, 0.2);
}

.language-option.active {
  background: rgba(120, 119, 198, 0.3);
  border-left: 3px solid hsl(var(--brand-primary));
}
```

### Smart Autocomplete

**Hook**: `useAutoComplete.ts`

#### Context-Aware Suggestions

**React/JavaScript Patterns:**

```typescript
const reactCompletions = [
  // React Hooks
  {
    label: "useState",
    type: "function",
    detail: "React Hook",
    info: "const [state, setState] = useState(initialValue);",
    apply: "const [${1:state}, set${1/(.*)/${1:/capitalize}/}] = useState($2);",
  },
  {
    label: "useEffect",
    type: "function",
    detail: "React Hook",
    info: "useEffect(() => { /* effect */ }, [dependencies]);",
    apply: "useEffect(() => {\n  $1\n}, [$2]);",
  },
  {
    label: "useCallback",
    type: "function",
    detail: "React Hook",
    apply: "useCallback(() => {\n  $1\n}, [$2]);",
  },

  // Array Methods
  {
    label: "map",
    type: "method",
    detail: "Array method",
    apply: "map((${1:item}) => $2)",
  },
  {
    label: "filter",
    type: "method",
    detail: "Array method",
    apply: "filter((${1:item}) => $2)",
  },
  {
    label: "reduce",
    type: "method",
    detail: "Array method",
    apply: "reduce((${1:acc}, ${2:item}) => $3, $4)",
  },

  // Async/Await
  {
    label: "async function",
    type: "keyword",
    apply: "async function ${1:name}($2) {\n  $3\n}",
  },
  {
    label: "try/catch",
    type: "keyword",
    apply: "try {\n  $1\n} catch (error) {\n  $2\n}",
  },
];
```

**TypeScript Additions:**

```typescript
const typescriptCompletions = [
  {
    label: "interface",
    type: "keyword",
    apply: "interface ${1:Name} {\n  $2\n}",
  },
  {
    label: "type",
    type: "keyword",
    apply: "type ${1:Name} = $2;",
  },
  {
    label: "as const",
    type: "keyword",
    apply: "as const",
  },
];
```

**Python Patterns (Future):**

```typescript
const pythonCompletions = [
  {
    label: "def",
    type: "keyword",
    apply: "def ${1:function_name}($2):\n    $3",
  },
  {
    label: "class",
    type: "keyword",
    apply: "class ${1:ClassName}:\n    def __init__(self$2):\n        $3",
  },
];
```

#### Autocomplete UI Styling

```typescript
.cm-tooltip-autocomplete {
  background: rgba(20, 15, 40, 0.95);
  border: 1px solid rgba(120, 119, 198, 0.4);
  border-radius: 8px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 4px;
}

.cm-completionLabel {
  color: #e5e5ff;
  font-weight: 500;
}

.cm-completionDetail {
  color: hsl(var(--brand-accent));
  font-size: 11px;
  font-style: italic;
}

ul li[aria-selected] {
  background: rgba(120, 119, 198, 0.3);
  border-left: 3px solid hsl(var(--brand-primary));
}
```

### Deliverables (Phase B)

- [ ] `EditorToolbar.tsx` - Language selector with glassmorphism dropdown
- [ ] `useAutoComplete.ts` - React/TS/Python completion patterns
- [ ] Language switching logic with code preservation
- [ ] Autocomplete UI styling matching design system
- [ ] User testing: Autocomplete suggestions feel helpful and fast

---

## Phase C: Code Formatting + Polish

### Prettier Integration

**Hook**: `useCodeFormatter.ts`

#### Features

1. **Manual Format Button**
   - Toolbar button with glassmorphism style
   - Loading state during formatting
   - Success feedback with glow animation

2. **Auto-Format Options**
   - Format on save (Ctrl+S) - optional setting
   - Format on paste - clean up copied code
   - Language-specific Prettier configs

3. **Format Button States**

```typescript
// Default state
.format-button {
  background: rgba(120, 119, 198, 0.15);
  border: 1px solid rgba(120, 119, 198, 0.3);
  border-radius: 10px;
  padding: 8px 16px;
  color: #e5e5ff;
  font-weight: 600;
  transition: all 0.2s ease;
}

.format-button::before {
  content: "✨ Format Code";
}

// Hover state
.format-button:hover {
  background: rgba(120, 119, 198, 0.25);
  box-shadow: 0 4px 20px rgba(120, 119, 198, 0.3);
  transform: translateY(-2px);
}

// Loading state
.format-button.loading::before {
  content: "⏳ Formatting...";
}

.format-button.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

// Success state (2s duration)
.format-button.success {
  background: rgba(0, 255, 136, 0.2);
  border-color: rgba(0, 255, 136, 0.4);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
  animation: success-pulse 0.5s ease-out;
}

.format-button.success::before {
  content: "✓ Formatted";
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes success-pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}
```

#### Toast Notification

```typescript
// Success toast (auto-dismiss after 3s)
.format-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: rgba(20, 15, 40, 0.9);
  border: 1px solid rgba(0, 255, 136, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 255, 136, 0.3);
  padding: 16px 24px;
  color: #e5e5ff;
  animation: slide-up-fade-in 0.3s ease-out;
  z-index: 1000;
}

.format-toast::before {
  content: "✓";
  color: #00ff88;
  font-size: 20px;
  margin-right: 12px;
}

@keyframes slide-up-fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Polish Features

#### EditorFooter Component

```typescript
// Character and line count
.editor-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid rgba(120, 119, 198, 0.2);
  font-size: 12px;
  color: rgba(229, 229, 255, 0.7);
}

.editor-stats {
  display: flex;
  gap: 24px;
}

// Gradient color for milestone achievements
.char-count {
  color: rgba(229, 229, 255, 0.6);
}

.char-count.milestone-50 {
  color: hsl(var(--brand-accent));
  text-shadow: 0 0 4px hsl(var(--brand-accent) / 0.4);
}

.char-count.milestone-100 {
  color: hsl(var(--brand-secondary));
  text-shadow: 0 0 4px hsl(var(--brand-secondary) / 0.4);
}

// Keyboard shortcuts tooltip
.shortcuts-tooltip {
  background: rgba(20, 15, 40, 0.95);
  border: 1px solid rgba(120, 119, 198, 0.4);
  border-radius: 8px;
  padding: 12px;
  font-size: 11px;
  backdrop-filter: blur(20px);
}

.shortcut-item {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 6px;
}

.shortcut-key {
  color: hsl(var(--brand-primary));
  font-family: monospace;
  background: rgba(120, 119, 198, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
}
```

#### Additional Polish

1. **Copy Code Button**
   - Icon button in toolbar
   - Success feedback: "✓ Copied" tooltip
   - Haptic feedback on mobile

2. **Clear Editor Button**
   - Confirmation modal (glassmorphism)
   - "Are you sure? This cannot be undone"
   - Preserve in undo history

3. **Smooth Animations**
   - Language switch: 300ms ease
   - Theme toggle: 200ms ease
   - All interactions: 200ms default

### Deliverables (Phase C)

- [ ] `useCodeFormatter.ts` - Prettier integration hook
- [ ] `EditorFooter.tsx` - Stats, shortcuts, actions
- [ ] Format button with all states (default, loading, success)
- [ ] Toast notification system
- [ ] Copy/clear buttons with feedback
- [ ] Keyboard shortcuts: Ctrl+Enter (submit), Ctrl+S (save), Ctrl+/ (hints)
- [ ] Final visual polish and animation tuning

---

## Mobile Responsiveness

### Responsive Layout Strategy

#### Desktop (≥1024px)

```css
.split-container {
  display: grid;
  grid-template-columns: minmax(320px, 30%) 1fr;
  gap: 2rem;
  max-height: calc(100vh - 280px);
}

.answer-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.code-editor {
  flex: 1;
  min-height: 400px;
  max-height: calc(100vh - 360px);
}
```

#### Tablet (768-1023px)

```css
.split-container {
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.question-panel {
  /* Collapsible accordion */
  max-height: 300px;
  overflow-y: auto;
}

.code-editor {
  min-height: 350px;
  max-height: 500px;
}
```

#### Mobile (≤767px)

```css
.split-container {
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

.code-editor {
  min-height: 300px;
  max-height: 400px;
}

/* Sticky floating action button */
.fab-actions {
  position: fixed;
  bottom: 80px;
  right: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 100;
}

.fab-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: linear-gradient(135deg,
    hsl(var(--brand-primary)),
    hsl(var(--brand-secondary)));
  box-shadow: 0 4px 20px rgba(120, 119, 198, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Touch Optimizations

1. **Larger Touch Targets**
   - All buttons: min 44x44px (iOS HIG standard)
   - Toolbar items: 48x48px (Material Design standard)
   - Language selector: 52x40px

2. **Gesture Support**
   - Swipe left on question: Collapse panel
   - Swipe right: Expand question panel
   - Swipe up on editor: Show keyboard shortcuts
   - Double-tap prevention in editor

3. **Performance**
   - Debounce onChange: 300ms (reduce re-renders)
   - Lazy load Prettier (only when format button clicked)
   - Native scrolling (no custom scrollbar on mobile)
   - Reduce backdrop-blur to 10px on low-end devices

4. **Keyboard Handling**
   - Editor resizes when mobile keyboard appears
   - iOS: `visualViewport.height` calculation
   - Android: `window.innerHeight` adjustment

---

## State Management

### Zustand Store Integration

**Update**: `store/slices/practice/index.ts`

```typescript
interface AnswerPanelState {
  // Content
  currentAnswer: string;
  language: 'javascript' | 'typescript' | 'python';

  // UI State
  editorTheme: 'glassmorphism'; // locked for now, future: light mode
  fontSize: number; // 12-18px range
  isFullscreen: boolean;

  // Auto-save
  lastSaved: Date | null;
  isDirty: boolean; // unsaved changes flag

  // Feature flags
  autoFormatOnSave: boolean;
  autoFormatOnPaste: boolean;
}

interface AnswerPanelActions {
  // Content actions
  setAnswer: (answer: string) => void;
  setLanguage: (language: 'javascript' | 'typescript' | 'python') => void;
  clearAnswer: () => void;

  // UI actions
  setFontSize: (size: number) => void;
  toggleFullscreen: () => void;

  // Format actions
  formatCode: () => Promise<void>;

  // Auto-save
  autoSave: () => void;
  markClean: () => void;

  // Settings
  toggleAutoFormatOnSave: () => void;
  toggleAutoFormatOnPaste: () => void;
}

// Auto-save implementation
const autoSaveInterval = setInterval(() => {
  const state = useAppStore.getState();
  if (state.answerPanel.isDirty) {
    state.answerPanel.autoSave();
  }
}, 30000); // Save every 30 seconds if dirty
```

### LocalStorage Persistence

```typescript
// Persist answer panel state
const persistConfig = {
  name: 'devprep-answer-panel',
  storage: localStorage,
  partialize: (state) => ({
    currentAnswer: state.currentAnswer,
    language: state.language,
    fontSize: state.fontSize,
    autoFormatOnSave: state.autoFormatOnSave,
    autoFormatOnPaste: state.autoFormatOnPaste,
  }),
};
```

---

## Accessibility

### WCAG 2.1 AA Compliance

1. **Keyboard Navigation**
   - Tab: Navigate between toolbar buttons
   - Shift+Tab: Reverse navigation
   - Enter/Space: Activate buttons
   - Escape: Close dropdowns/modals
   - All shortcuts shown in help tooltip

2. **Keyboard Shortcuts**
   - `Ctrl+Enter`: Submit answer
   - `Ctrl+S`: Save answer (auto-format if enabled)
   - `Ctrl+/`: Toggle hints panel
   - `Ctrl+L`: Open language selector
   - `Ctrl+Shift+F`: Format code
   - `Esc`: Exit fullscreen mode

3. **ARIA Labels**
   ```html
   <div
     role="group"
     aria-label="Code editor for JavaScript"
     aria-describedby="editor-shortcuts"
   >
     <CodeMirror ... />
   </div>

   <button
     aria-label="Format code"
     aria-pressed={isFormatting}
   >
     Format Code
   </button>

   <select
     aria-label="Select programming language"
     aria-describedby="language-description"
   >
     <option value="javascript">JavaScript</option>
   </select>
   ```

4. **Screen Reader Announcements**
   ```typescript
   // Live region for announcements
   <div
     role="status"
     aria-live="polite"
     aria-atomic="true"
     className="sr-only"
   >
     {statusMessage}
   </div>

   // Examples:
   "Code formatted successfully"
   "Switched to TypeScript language"
   "Answer auto-saved"
   "3 autocomplete suggestions available"
   ```

5. **Focus Management**
   - Trap focus in modal dialogs
   - Return focus to trigger button on modal close
   - Visible focus indicators (purple ring)
   - Skip to editor link for keyboard users

6. **High Contrast Mode**
   ```css
   @media (prefers-contrast: high) {
     .editor-card {
       border: 2px solid #ffffff;
       background: #000000;
     }

     .code-editor {
       border: 2px solid #ffffff;
     }

     /* Remove all glow effects */
     * {
       text-shadow: none !important;
       box-shadow: none !important;
     }
   }
   ```

---

## Implementation Timeline

### Phase A: Theme + Syntax Highlighting (Week 1)

**Days 1-2**: Theme Development
- [ ] Create `codemirror-glassmorphism.ts`
- [ ] Implement color mapping from design system
- [ ] Add syntax highlighting rules
- [ ] Test with sample code (JS/TS/Python)

**Days 3-4**: Component Integration
- [ ] Build `CodeAnswerEditor.tsx` wrapper
- [ ] Build `AnswerPanelContainer.tsx` layout
- [ ] Integrate theme into editor
- [ ] Style container with glassmorphism

**Day 5**: Testing & Polish
- [ ] Visual QA across browsers
- [ ] Mobile responsive testing
- [ ] Adjust glow effects and shadows
- [ ] Commit and create PR

**Deliverable**: Visual impact - editor matches glassmorphism design

---

### Phase B: Language Switching + Autocomplete (Week 2)

**Days 1-2**: Language Switching
- [ ] Build `EditorToolbar.tsx`
- [ ] Implement language selector dropdown
- [ ] Add language switching logic
- [ ] Code preservation on switch
- [ ] Warning modal for incompatible syntax

**Days 3-4**: Autocomplete
- [ ] Create `useAutoComplete.ts` hook
- [ ] Implement React/TS completion patterns
- [ ] Style autocomplete popup
- [ ] Test suggestion accuracy
- [ ] Add Python patterns (basic)

**Day 5**: Integration & Testing
- [ ] Connect toolbar to editor
- [ ] Test language switching flow
- [ ] Test autocomplete UX
- [ ] Commit and create PR

**Deliverable**: UX features - language switching + smart autocomplete

---

### Phase C: Code Formatting + Polish (Week 3)

**Days 1-2**: Prettier Integration
- [ ] Create `useCodeFormatter.ts` hook
- [ ] Integrate Prettier library
- [ ] Implement format button with states
- [ ] Add toast notification system
- [ ] Format on save/paste options

**Days 3-4**: Polish Features
- [ ] Build `EditorFooter.tsx`
- [ ] Add copy/clear buttons
- [ ] Implement keyboard shortcuts
- [ ] Character count with milestones
- [ ] Shortcuts tooltip

**Day 5**: Final Testing & Documentation
- [ ] Cross-browser testing
- [ ] Mobile testing (iOS/Android)
- [ ] Accessibility audit
- [ ] Create component README
- [ ] Commit and create PR

**Deliverable**: Quality improvements - formatting + full polish

---

## Testing Checklist

### Visual/Theme Testing

- [ ] Theme colors match CSS variables (`--brand-primary`, etc.)
- [ ] Syntax highlighting uses correct colors (purple keywords, cyan strings, pink functions)
- [ ] Glow effects visible but not overwhelming
- [ ] Active line highlight works
- [ ] Selection background with glow
- [ ] Cursor color and glow (pink)
- [ ] Matching brackets styled correctly
- [ ] Scrollbar matches glassmorphism style
- [ ] Container glassmorphism (blur, shadows, border)

### Feature Testing

- [ ] Language switching preserves code
- [ ] Language selector dropdown styled correctly
- [ ] Autocomplete suggestions appear
- [ ] Autocomplete matches context (React hooks, Array methods)
- [ ] Format button changes states (default → loading → success)
- [ ] Format actually formats code (Prettier)
- [ ] Toast notification appears and dismisses
- [ ] Copy button copies to clipboard
- [ ] Clear button shows confirmation
- [ ] Character count updates
- [ ] Line count updates

### Responsive Testing

- [ ] Desktop (1920px): Split-screen layout
- [ ] Laptop (1280px): Comfortable sizing
- [ ] Tablet (768px): Stacked layout
- [ ] Mobile (375px): Single column, FAB buttons
- [ ] Mobile (320px): Minimum width works
- [ ] Landscape mode on mobile works
- [ ] Editor resizes when keyboard appears (mobile)

### Touch Testing (Mobile/Tablet)

- [ ] All buttons ≥44x44px touch targets
- [ ] Swipe gestures work (question collapse)
- [ ] No zoom on double-tap in editor
- [ ] Native scrolling smooth
- [ ] Toolbar items easily tappable
- [ ] Language selector dropdown usable on touch

### Accessibility Testing

- [ ] Tab navigation through all controls
- [ ] Keyboard shortcuts work (Ctrl+Enter, Ctrl+S, etc.)
- [ ] ARIA labels present and correct
- [ ] Screen reader announces state changes
- [ ] Focus visible (purple ring)
- [ ] High contrast mode supported
- [ ] Reduced motion support (no animations)

### Performance Testing

- [ ] Editor loads in <2s on 3G
- [ ] Typing feels instant (no lag)
- [ ] Autocomplete appears within 100ms
- [ ] Language switching smooth (<300ms)
- [ ] Format operation <500ms
- [ ] onChange debounced (300ms)
- [ ] No memory leaks on unmount

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Risk Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|-----------|------------|
| **Theme doesn't match prototype** | Medium | Low | Iterative approval after Phase A, use design-to-production skill for CSS extraction |
| **CodeMirror performance on old devices** | Medium | Medium | Lazy loading, reduced motion support, bundle analysis |
| **Prettier bundle size** | Low | Low | Lazy load only when format button clicked (~200KB) |
| **Mobile keyboard covers editor** | High | Medium | Viewport height calculation, iOS-specific fixes, test on real devices |
| **Autocomplete suggestions irrelevant** | Medium | Low | User testing, refinement based on feedback, allow disabling |
| **Accessibility gaps** | High | Low | Dedicated accessibility testing phase, WCAG audit |

---

## Success Metrics

**Phase A Success:**
- [ ] Visual theme matches design system (subjective approval)
- [ ] Syntax colors use brand palette
- [ ] Glow effects visible in screenshots

**Phase B Success:**
- [ ] Language switching works without losing code
- [ ] Autocomplete shows relevant suggestions >80% of time
- [ ] Users find autocomplete helpful (feedback)

**Phase C Success:**
- [ ] Code formatting works for JS/TS/Python
- [ ] Toast notifications feel polished
- [ ] All keyboard shortcuts functional

**Overall Success:**
- [ ] Answer Panel visually stunning (matches brand)
- [ ] Editor feels professional and modern
- [ ] Mobile experience smooth on iOS/Android
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Performance: <2s load, instant typing feel

---

## Future Enhancements (Out of Scope)

1. **Code Execution** (Phase 2 of DevPrep AI)
   - Sandbox environment for running code
   - Test cases with pass/fail indicators
   - Console output display

2. **AI Code Review** (Phase 2)
   - Inline suggestions from Claude
   - Code quality hints
   - Performance improvement suggestions

3. **Collaborative Editing** (Phase 3)
   - Real-time multi-cursor
   - Pair programming mode
   - Code review annotations

4. **Advanced Language Support** (Phase 2)
   - Java, Go, Rust, C++
   - Language-specific linters
   - Framework-specific autocomplete (Next.js, Express)

5. **Theme Customization** (Phase 2)
   - User-selectable themes
   - Light mode support
   - Custom color picker

---

## Appendix

### File Checklist

**New Files Created:**
- [ ] `shared/themes/codemirror-glassmorphism.ts`
- [ ] `modules/practice/components/AnswerPanel/index.tsx`
- [ ] `modules/practice/components/AnswerPanel/AnswerPanelContainer.tsx`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/CodeAnswerEditor.tsx`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/EditorToolbar.tsx`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/EditorFooter.tsx`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/hooks/useEditorTheme.ts`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/hooks/useAutoComplete.ts`
- [ ] `modules/practice/components/AnswerPanel/CodeEditor/hooks/useCodeFormatter.ts`
- [ ] `modules/practice/components/AnswerPanel/TextEditor/TextAnswerEditor.tsx`
- [ ] `modules/practice/components/AnswerPanel/types.ts`
- [ ] `modules/practice/components/AnswerPanel/README.md`

**Modified Files:**
- [ ] `shared/utils/editor-extensions.ts`
- [ ] `shared/hooks/useCodeMirrorConfig.ts`
- [ ] `store/slices/practice/index.ts`
- [ ] `shared/constants/editor-config.ts`

### Dependencies

**Required Packages:**
```json
{
  "@uiw/react-codemirror": "^4.x", // Already installed
  "@codemirror/lang-javascript": "^6.x",
  "@codemirror/lang-python": "^6.x",
  "@codemirror/autocomplete": "^6.x",
  "prettier": "^3.x",
  "@types/prettier": "^3.x"
}
```

**Bundle Impact:**
- CodeMirror core: 300KB (already installed)
- Language support: ~50KB per language
- Prettier: ~200KB (lazy loaded)
- **Total added**: ~300KB (lazy loaded features)

---

**Document Version**: 1.0
**Last Updated**: January 25, 2025
**Next Review**: After Phase A completion
**Status**: Ready for Implementation
