# Phase 2: Progressive Hint System

## 🎯 Objective

Implement an **on-demand hint system** that provides scaffolded support when users are stuck, using a 3-level progressive disclosure pattern that guides without giving away the complete solution.

## 📊 Why Progressive Hints?

### Learning Psychology
- **Scaffolding:** Provides just enough support to help learners progress
- **Zone of Proximal Development:** Bridges gap between what user knows and needs to learn
- **Active Learning:** User must still think and apply hints, not copy-paste
- **Metacognition:** Tracking hint usage builds self-awareness

### Interview Authenticity
- Real interviews allow asking clarifying questions
- Interviewers provide hints when candidates are stuck
- Shows problem-solving process, not just final answer

## 🏗️ Technical Architecture

### 1. API Implementation

#### New Hint tRPC Procedure
```typescript
// File: frontend/src/lib/trpc/routers/ai.ts (ADD to existing aiRouter)

import { getHintInputSchema, getHintOutputSchema } from "../schemas/hint.schema";

export const aiRouter = router({
  // ... existing procedures (generateQuestions, evaluateAnswer)

  /**
   * Get Hint Procedure
   * Generate progressive hints (3 levels) for current question
   *
   * @input question, currentAnswer, hintLevel (1-3)
   * @output hint content, level, hasMore
   */
  getHint: publicProcedure
    .input(getHintInputSchema)
    .output(getHintOutputSchema)
    .mutation(async ({ input }) => {
      const { question, currentAnswer, hintLevel } = input;

      // Validate hint level (Zod already validates, but double-check)
      if (hintLevel < 1 || hintLevel > 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid hint level. Must be 1, 2, or 3.",
        });
      }

      // Initialize Claude client
      const apiKey = process.env["ANTHROPIC_API_KEY"];
      if (!apiKey) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "ANTHROPIC_API_KEY environment variable is required",
        });
      }

      const client = new Anthropic({ apiKey });

      // Generate hint using level-specific prompts
      const hint = await generateHint(client, question, currentAnswer, hintLevel);

      return {
        hint: {
          level: hintLevel,
          content: hint,
          hasMore: hintLevel < 3,
        },
        success: true,
      };
    }),
});

async function generateHint(
  client: Anthropic,
  question: IQuestion,
  currentAnswer: string | undefined,
  hintLevel: 1 | 2 | 3
): Promise<string> {
  const hintPrompts = {
    1: getLevel1Prompt(question),
    2: getLevel2Prompt(question, currentAnswer),
    3: getLevel3Prompt(question, currentAnswer),
  };

  const response = await client.messages.create({
    model: process.env["NEXT_PUBLIC_ANTHROPIC_MODEL"] || "claude-3-5-sonnet-latest",
    max_tokens: 500,
    temperature: DEFAULT_TEMPERATURE,
    messages: [
      {
        role: "user",
        content: hintPrompts[hintLevel],
      },
    ],
  });

  const textContent =
    response.content[0]?.type === "text" ? response.content[0].text : "";

  if (!textContent) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "No text content received from Claude API",
    });
  }

  return textContent;
}
```

#### Hint Zod Schemas
```typescript
// File: frontend/src/lib/trpc/schemas/hint.schema.ts (NEW FILE)

import { z } from "zod";

/**
 * Input schema for getHint procedure
 */
export const getHintInputSchema = z.object({
  question: z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    type: z.enum(["coding", "system-design", "behavioral"]),
    difficulty: z.number().min(1).max(10),
  }),
  currentAnswer: z.string().optional(),
  hintLevel: z.number().min(1).max(3), // 1 = general, 2 = specific, 3 = skeleton
});

export type GetHintInput = z.infer<typeof getHintInputSchema>;

/**
 * Output schema for getHint procedure
 */
export const getHintOutputSchema = z.object({
  hint: z.object({
    level: z.number().min(1).max(3),
    content: z.string(),
    hasMore: z.boolean(), // true if more hints available
  }),
  success: z.boolean(),
});

export type GetHintOutput = z.infer<typeof getHintOutputSchema>;
```

#### Level-Specific Prompts
```typescript
// File: frontend/src/lib/claude/prompts/hints.ts

function getLevel1Prompt(question: IQuestion): string {
  return `You are a helpful interviewer providing a GENTLE hint for this question.

QUESTION:
${question.title}
${question.content}

Provide a Level 1 hint that:
- Suggests a general approach or strategy
- Doesn't reveal the specific algorithm or solution
- Encourages thinking about the problem structure
- Is 2-3 sentences maximum
- Uses analogies or high-level concepts

Example: "Think about how you might organize data to quickly look up values..."

Do NOT mention specific data structures or give code examples yet.`;
}

function getLevel2Prompt(question: IQuestion, currentAnswer?: string): string {
  const contextNote = currentAnswer
    ? `\n\nUSER'S CURRENT ATTEMPT:\n${currentAnswer}\n\nProvide guidance that builds on their approach.`
    : '';

  return `You are a helpful interviewer providing a SPECIFIC hint for this question.

QUESTION:
${question.title}
${question.content}${contextNote}

Provide a Level 2 hint that:
- Suggests a specific technique or data structure
- Explains WHY this approach works
- Mentions time/space complexity considerations
- Is 3-4 sentences maximum
- Still requires user to implement

Example: "A hash map would be ideal here because it provides O(1) lookup time. As you iterate through the array, store each number as a key..."

You can mention specific techniques but don't write complete code yet.`;
}

function getLevel3Prompt(question: IQuestion, currentAnswer?: string): string {
  const language = detectLanguage(question);
  const contextNote = currentAnswer
    ? `\n\nUSER'S CURRENT ATTEMPT:\n${currentAnswer}\n\nProvide guidance that helps them complete their solution.`
    : '';

  return `You are a helpful interviewer providing a DETAILED hint for this question.

QUESTION:
${question.title}
${question.content}${contextNote}

Provide a Level 3 hint that:
- Provides a code skeleton or pseudocode
- Shows the key algorithmic pattern
- Includes important edge cases to consider
- Is detailed but leaves some implementation to user
- Uses ${language} syntax

Example structure:
\`\`\`${language}
function solve(input) {
  // Initialize hash map
  const map = new Map();

  // Iterate and check...
  for (let i = 0; i < input.length; i++) {
    // Check if complement exists
    // If yes, return result
    // If no, store current value
  }

  // Handle case when no solution
}
\`\`\`

Provide enough structure to guide them but don't write the complete solution.`;
}

function detectLanguage(question: IQuestion): string {
  const tags = question.tags?.join(' ').toLowerCase() || '';
  const content = question.content.toLowerCase();

  if (tags.includes('python') || content.includes('python')) return 'python';
  if (tags.includes('typescript') || content.includes('typescript')) return 'typescript';
  if (tags.includes('java') || content.includes('java')) return 'java';

  return 'javascript'; // default
}
```

### 2. State Management

#### Extend Assessment Store
```typescript
// File: frontend/src/store/slices/practiceSlice.ts

interface HintUsage {
  level: number;
  content: string;
  timestamp: Date;
}

interface QuestionState {
  questionId: string;
  answer: string;

  // NEW: Hint tracking
  hintsUsed: HintUsage[];
  currentHintLevel: number; // 0-3 (0 = no hints yet)
  hintsPanelOpen: boolean;

  evaluations: Evaluation[];
  revisionCount: number;
  status: QuestionStatus;
}

interface PracticeSliceState {
  // ... existing state

  // NEW: Hint state
  isLoadingHint: boolean;
  hintError: string | null;
}

interface PracticeActions {
  // ... existing actions

  // NEW: Hint actions
  requestHint: () => Promise<void>;
  toggleHintsPanel: () => void;
  closeHintsPanel: () => void;
}

// Implementation
requestHint: async (state) => {
  const currentQ = state.questions[state.currentIndex];
  if (!currentQ) return;

  const nextLevel = currentQ.hintsUsed.length + 1;
  if (nextLevel > 3) return; // Max 3 hints

  set({ isLoadingHint: true, hintError: null });

  try {
    // NOTE: This will be called via tRPC mutation from the component
    // The actual tRPC call is made in the useRequestHint hook
    // This action is for updating state after receiving the hint

    // Add hint to current question
    const updatedQuestions = [...state.questions];
    const qIndex = state.currentIndex;
    updatedQuestions[qIndex] = {
      ...updatedQuestions[qIndex],
      hintsUsed: [
        ...updatedQuestions[qIndex].hintsUsed,
        {
          level: nextLevel,
          content: '', // Will be populated by hook
          timestamp: new Date()
        }
      ],
      currentHintLevel: nextLevel,
      hintsPanelOpen: true
    };

    set({
      questions: updatedQuestions,
      isLoadingHint: false
    });

  } catch (error) {
    set({
      hintError: 'Failed to load hint. Please try again.',
      isLoadingHint: false
    });
  }
}
```

### 3. tRPC Hook Integration

#### useRequestHint Hook (tRPC-based)
```typescript
// File: frontend/src/modules/assessment/hooks/useRequestHint.ts

import { trpc } from "@lib/trpc/Provider";
import { useAppStore } from "@store";
import type { IQuestion } from "@/types/ai";

export function useRequestHint() {
  const currentQuestion = useAppStore((state) => state.currentQuestion);
  const currentDraft = useAppStore((state) => state.currentDraft);
  const hintsUsed = useAppStore((state) => state.hintsUsed);
  const addHint = useAppStore((state) => state.addHint);

  // tRPC mutation - auto-generated hook with full type safety
  const { mutate: requestHint, isPending, isError } = trpc.ai.getHint.useMutation({
    onSuccess: (data) => {
      // Update store with new hint
      addHint({
        level: data.hint.level,
        content: data.hint.content,
        timestamp: new Date(),
      });
    },
    onError: (error) => {
      console.error("Failed to get hint:", error);
      // Error handling (e.g., toast notification)
    },
  });

  const handleRequestHint = () => {
    if (!currentQuestion) return;

    const nextLevel = hintsUsed.length + 1;
    if (nextLevel > 3) return; // Max 3 hints

    // Call tRPC procedure with type-safe input
    requestHint({
      question: {
        id: currentQuestion.id,
        title: currentQuestion.title,
        content: currentQuestion.content,
        type: currentQuestion.type,
        difficulty: currentQuestion.difficulty,
      },
      currentAnswer: currentDraft,
      hintLevel: nextLevel,
    });
  };

  return {
    requestHint: handleRequestHint,
    isLoading: isPending,
    isError,
    hintsUsed: hintsUsed.length,
    canRequestMore: hintsUsed.length < 3,
  };
}
```

**Key Benefits of tRPC Approach:**
- ✅ **100% Type Safety**: Input/output types automatically inferred from Zod schemas
- ✅ **Auto-generated Hook**: No manual `useMutation` setup needed
- ✅ **Runtime Validation**: Zod validates all requests/responses
- ✅ **Integrated Caching**: React Query caching built-in
- ✅ **Error Handling**: Structured tRPC error types
- ✅ **Development Speed**: 6x faster than old REST approach

### 4. Component Architecture

#### HintButton Component
```typescript
// File: frontend/src/modules/assessment/components/HintButton.tsx

interface IHintButtonProps {
  hintsUsed: number;
  maxHints: number;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
}

export function HintButton({
  hintsUsed,
  maxHints,
  disabled = false,
  loading = false,
  onClick
}: IHintButtonProps): React.JSX.Element {
  const hintsRemaining = maxHints - hintsUsed;
  const allHintsUsed = hintsRemaining === 0;

  return (
    <div className="glass-card rounded-2xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-400 rounded-xl flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white icon-glow" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white text-glow">
              Need help getting started?
            </h3>
            <p className="text-xs text-gray-400">
              {allHintsUsed
                ? 'All hints used'
                : `${hintsRemaining} hint${hintsRemaining !== 1 ? 's' : ''} available`
              }
            </p>
          </div>
        </div>

        <Button
          variant="glass"
          onClick={onClick}
          disabled={disabled || allHintsUsed || loading}
          className="min-w-[120px]"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              <Lightbulb className="w-4 h-4 mr-2" />
              Get a Hint
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
```

#### HintsPanel Component
```typescript
// File: frontend/src/modules/assessment/components/HintsPanel.tsx

interface IHintsPanelProps {
  hints: Array<{
    level: number;
    content: string;
    timestamp: Date;
  }>;
  isOpen: boolean;
  onClose: () => void;
}

export function HintsPanel({
  hints,
  isOpen,
  onClose
}: IHintsPanelProps): React.JSX.Element {
  if (!isOpen || hints.length === 0) return null;

  return (
    <div className="glass-card rounded-2xl p-6 mb-6 border-l-4 border-yellow-400">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-bold text-white text-glow">
            Hints ({hints.length} of 3)
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {hints.map((hint, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                Hint {hint.level}
              </Badge>
              <span className="text-xs text-gray-400">
                {formatTimestamp(hint.timestamp)}
              </span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {hint.content}
            </p>
          </div>
        ))}
      </div>

      {hints.length < 3 && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-blue-300">
            💡 Try applying this hint first. If you're still stuck, you can request another hint.
          </p>
        </div>
      )}
    </div>
  );
}
```

#### Integration in AssessmentLayout
```typescript
// File: frontend/src/modules/assessment/components/AssessmentLayout.tsx

export function AssessmentLayout() {
  const {
    currentQuestion,
    currentAnswer,
    handleAnswerChange,
    // NEW: Hint state
    hintsUsed,
    hints,
    hintsPanelOpen,
    isLoadingHint,
    // NEW: Hint actions
    handleRequestHint,
    toggleHintsPanel,
    closeHintsPanel
  } = useAssessment();

  const canRequestHint = currentAnswer.length >= MIN_ANSWER_LENGTH_FOR_HINT;

  return (
    <div className="min-h-screen flex flex-col">
      <AssessmentHeader />

      <main className="flex-1">
        <QuestionDisplay question={currentQuestion} />

        {/* NEW: Hint Button */}
        <div className="container max-w-4xl mx-auto px-6">
          <HintButton
            hintsUsed={hintsUsed.length}
            maxHints={MAX_HINTS}
            disabled={!canRequestHint}
            loading={isLoadingHint}
            onClick={handleRequestHint}
          />

          {/* NEW: Hints Panel */}
          <HintsPanel
            hints={hintsUsed}
            isOpen={hintsPanelOpen}
            onClose={closeHintsPanel}
          />
        </div>

        <AnswerInput
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswerChange}
        />

        {/* Helper text */}
        {!canRequestHint && (
          <div className="container max-w-4xl mx-auto px-6 mb-4">
            <p className="text-xs text-gray-400 italic">
              💭 Start typing your approach (at least {MIN_ANSWER_LENGTH_FOR_HINT} characters) before requesting hints
            </p>
          </div>
        )}

        {/* Submit button */}
        <SubmitButton />
      </main>

      <FeedbackModal />
    </div>
  );
}
```

## 🎨 UI/UX Specifications

### Visual Design

**Hint Button Card:**
- Glass card with subtle glow
- Yellow/orange gradient icon (lightbulb)
- Shows hints remaining count
- Disabled state when all used

**Hints Panel:**
- Expandable glass card
- Yellow-400 left border for emphasis
- Each hint in separate sub-card
- Level badges and timestamps
- Close button in header

**Progressive Disclosure:**
1. **Closed state:** Just hint button visible
2. **After click:** Panel expands below, shows hint
3. **Multiple hints:** All hints displayed in sequence
4. **Max reached:** Button disabled, shows "All hints used"

### Interaction Flow

```
User reads question
  ↓
Starts typing (50+ chars minimum)
  ↓
Clicks "Get a Hint"
  ↓
Loading state (500-2000ms)
  ↓
Hint Level 1 appears in panel
  ↓
User applies hint, continues coding
  ↓
[Optional] Click "Get a Hint" again
  ↓
Hint Level 2 appears below Level 1
  ↓
User applies hint, continues coding
  ↓
[Optional] Click "Get a Hint" final time
  ↓
Hint Level 3 appears (code skeleton)
  ↓
User completes solution
```

## ⚙️ Configuration

```typescript
// File: frontend/src/modules/assessment/constants.ts

export const HINT_CONFIG = {
  // Maximum hints per question
  MAX_HINTS: 3,

  // Minimum answer length before allowing hints (prevent lazy requests)
  MIN_ANSWER_LENGTH_FOR_HINT: 50,

  // Hint request timeout
  HINT_REQUEST_TIMEOUT: 10000, // 10 seconds

  // Animation durations
  HINT_PANEL_ANIMATION: 300,
  HINT_FADE_IN: 200,

  // Level descriptions (for UI)
  HINT_LEVELS: {
    1: 'General approach',
    2: 'Specific technique',
    3: 'Code skeleton'
  }
};
```

## 🧪 Testing Checklist

### Unit Tests
- [ ] HintButton renders with correct hints remaining
- [ ] HintButton disabled when all hints used
- [ ] HintsPanel displays hints in order
- [ ] Level badges show correct numbers
- [ ] Timestamps formatted correctly

### Integration Tests
- [ ] Request hint API call triggers correctly
- [ ] Hint response updates panel
- [ ] Multiple hints accumulate in panel
- [ ] Min answer length enforced
- [ ] Max hints enforced (button disabled at 3)

### E2E Tests
- [ ] Complete flow: Type → Hint 1 → Apply → Hint 2 → Apply → Hint 3 → Complete
- [ ] Hints persist when navigating back to question
- [ ] Hints shown in final results
- [ ] Error handling for failed hint requests

## 📊 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Hint Usage Rate** | 40-60% | % users requesting at least 1 hint |
| **Average Hints per Question** | 1.2-1.5 | Mean hints used across all questions |
| **Hint Effectiveness** | 70%+ | % users who complete after using hint |
| **Early Hint Requests** | <20% | % hints requested before 50 char threshold |

## 🚀 Rollout Plan

### Week 1: Development
- **Days 1-2:** API endpoint and prompt engineering
- **Days 3-4:** HintButton and HintsPanel components
- **Day 5:** Integration and state management

### Week 2: Testing & Refinement
- **Days 1-2:** Unit and integration tests
- **Days 3-4:** Prompt optimization based on testing
- **Day 5:** UI polish and edge case handling

---

**Status:** 📋 Ready for Implementation (after Phase 1)
**Estimated Effort:** 1 week (5 days)
**Priority:** High (Core feature)
**Dependencies:** Phase 1 complete
