# CodeMirror Autocomplete API Notes
**Date**: October 26, 2025
**Phase**: Phase B - Smart Autocomplete Implementation

## Key API Patterns

### 1. Basic Setup

```typescript
import { autocompletion, CompletionContext } from "@codemirror/autocomplete";

// Enable autocomplete extension
const autocompleteExt = autocompletion({
  override: [myCompletionSource],
  activateOnTyping: true,
  maxRenderedOptions: 20
});
```

### 2. Completion Source Structure

```typescript
function myCompletionSource(context: CompletionContext) {
  // Match word before cursor
  let word = context.matchBefore(/\w*/);

  // Skip if no word and not explicitly triggered
  if (word.from === word.to && !context.explicit) {
    return null;
  }

  return {
    from: word.from,
    options: [
      {
        label: "useState",
        type: "function",
        detail: "React Hook",
        info: "Returns stateful value and updater",
        apply: "useState(${1})",
        boost: 1  // Higher = better ranking
      }
    ],
    validFor: /^\w*$/  // IMPORTANT: Caches result for performance
  };
}
```

### 3. CompletionContext API

| Property/Method | Purpose | Example |
|----------------|---------|---------|
| `context.matchBefore(regex)` | Get text before cursor | `context.matchBefore(/\w*/)` |
| `context.explicit` | User triggered (Ctrl+Space) vs auto | `if (!context.explicit) return null` |
| `context.pos` | Current cursor position | `context.pos` |
| `context.state` | Editor state | `context.state.sliceDoc()` |

### 4. Completion Object Properties

```typescript
interface Completion {
  label: string;        // Display text (required)
  type?: string;        // Icon type: "keyword" | "variable" | "function" | "text"
  detail?: string;      // Short suffix after label
  info?: string;        // Extended description in side panel
  apply?: string;       // Replacement text (default: label)
  boost?: number;       // Ranking modifier (higher = better)
}
```

### 5. Performance Optimization

**Critical**: Always provide `validFor` to cache results:

```typescript
return {
  from: word.from,
  options: completions,
  validFor: /^\w*$/  // Reuse result while matching this pattern
};
```

Without `validFor`, completion source is called on every keystroke!

### 6. Context-Aware Completions

```typescript
function contextAwareCompletions(context: CompletionContext) {
  let before = context.state.sliceDoc(Math.max(0, context.pos - 50), context.pos);

  // Method call context: "array."
  if (before.match(/\.\w*$/)) {
    return {
      from: context.pos - before.match(/\w*$/)[0].length,
      options: [
        { label: "map", type: "method", apply: "map((${1:item}) => ${2})" },
        { label: "filter", type: "method", apply: "filter((${1:item}) => ${2})" }
      ]
    };
  }

  // Default completions
  return defaultCompletions(context);
}
```

### 7. Syntax-Aware Completions (Advanced)

```typescript
import { syntaxTree } from "@codemirror/language";

function syntaxAwareCompletions(context: CompletionContext) {
  let nodeBefore = syntaxTree(context.state).resolveInner(context.pos, -1);

  // Only show JSDoc completions in block comments
  if (nodeBefore.name === "BlockComment") {
    return jsDocCompletions(context);
  }

  return null;
}
```

### 8. Configuration Options

```typescript
autocompletion({
  override: [source1, source2],  // Custom completion sources (in priority order)
  activateOnTyping: true,        // Auto-trigger on typing
  maxRenderedOptions: 20,        // Limit displayed suggestions
  defaultKeymap: true,           // Enable default keys (Ctrl+Space, arrows, Enter, Escape)
  closeOnBlur: true              // Close popup when editor loses focus
})
```

### 9. Language Integration

```typescript
import { javascript } from "@codemirror/lang-javascript";

// Add completions to language data
const jsWithCompletions = javascript().data.of({
  autocomplete: myJSCompletions
});
```

## Implementation Strategy for Phase B

### React/TypeScript Patterns

```typescript
const reactCompletions = [
  {
    label: "useState",
    type: "function",
    detail: "React Hook",
    info: "const [state, setState] = useState(initialValue)",
    apply: "useState(${})",
    boost: 2
  },
  {
    label: "useEffect",
    type: "function",
    detail: "React Hook",
    apply: "useEffect(() => {\n  ${}\n}, [])",
    boost: 2
  },
  {
    label: "map",
    type: "method",
    detail: "Array method",
    apply: "map((${1:item}) => ${})",
    boost: 1
  }
];
```

### Python Patterns

```typescript
const pythonCompletions = [
  {
    label: "def",
    type: "keyword",
    apply: "def ${1:function_name}($2):\n    ${}",
    boost: 2
  },
  {
    label: "class",
    type: "keyword",
    apply: "class ${1:ClassName}:\n    def __init__(self$2):\n        ${}",
    boost: 2
  }
];
```

### Context Filtering Logic

```typescript
function getCompletions(context: CompletionContext, language: Language) {
  let word = context.matchBefore(/\w*/);
  if (!word && !context.explicit) return null;

  // Load language-specific patterns
  const patterns = getPatterns(language);

  // Context-based filtering
  let before = context.state.sliceDoc(Math.max(0, context.pos - 50), context.pos);

  let filtered = patterns;

  // Method call context
  if (before.match(/\.\w*$/)) {
    filtered = patterns.filter(p => p.type === "method");
  }
  // Keyword context
  else if (before.match(/^\s*\w*$/m)) {
    filtered = patterns.filter(p => p.type === "keyword" || p.type === "function");
  }

  return {
    from: word.from,
    options: filtered.slice(0, 20),  // Limit to 20
    validFor: /^\w*$/
  };
}
```

## Performance Best Practices

1. **Always use `validFor`**: Prevents unnecessary recalculations
2. **Limit results to 20**: Improves rendering performance
3. **Debounce with `activateOnTyping: false`**: For large pattern sets
4. **Use `boost` wisely**: Higher boost = better ranking
5. **Filter by context**: Show only relevant suggestions
6. **Lazy load patterns**: Load patterns on first trigger, not on editor mount

## Testing Checklist

- [ ] Autocomplete appears on trigger (`.` or keyword start)
- [ ] Suggestions filtered by language (JS/TS/Python)
- [ ] Context filtering works (methods after `.`, keywords at line start)
- [ ] Performance <200ms from trigger to display
- [ ] Keyboard navigation (arrows, Enter, Escape)
- [ ] `validFor` prevents unnecessary re-renders
- [ ] Max 20 suggestions displayed
- [ ] Popup styled with glassmorphism

## References

- Official Docs: https://codemirror.net/examples/autocompletion/
- Package: @codemirror/autocomplete ^6.19.0
- API Reference: https://codemirror.net/docs/ref/#autocomplete
