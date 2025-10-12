# Phase 1: Immediate Evaluation - Task Breakdown

## 📋 Overview

This document breaks down Phase 1 implementation into **8 incremental, deliverable tasks**. Each task is self-contained and can be completed independently without adding unnecessary complexity.

**Total Estimated Effort:** 32 hours (~1.5 weeks)
**Approach:** Build → Test Manually → Deploy → Iterate

---

## Task 1: Update API Endpoint with Revision Support

**Effort:** 4 hours
**Priority:** High
**Dependencies:** None

### 📝 Description
Add `attemptNumber` parameter to the existing evaluation endpoint to track revision attempts and provide context-aware feedback.

### 📂 Files to Modify
- `src/app/api/ai/evaluate-answer/route.ts`
- `src/types/ai/index.ts` (update IEvaluateAnswerRequest type)

### ✅ Acceptance Criteria
- [x] `attemptNumber` parameter accepted in request body
- [x] Parameter passed to evaluation prompt for context
- [x] Response includes revision-specific guidance when applicable
- [x] Existing functionality remains unchanged (backward compatible)

### 🔧 Implementation Notes
```typescript
// Update IEvaluateAnswerRequest type
interface IEvaluateAnswerRequest {
  question: IQuestion;
  answer: string;
  attemptNumber?: number; // NEW: defaults to 1
}

// In route handler
const body: IEvaluateAnswerRequest = await request.json();
const attemptNumber = body.attemptNumber ?? 1;

// Pass to prompt builder
const prompt = buildEvaluationPrompt({
  ...body,
  attemptNumber,
});
```

### 🧪 Manual Test Cases
1. Submit answer without attemptNumber → works as before
2. Submit answer with attemptNumber: 1 → initial evaluation
3. Submit answer with attemptNumber: 2 → revision feedback
4. Submit answer with attemptNumber: 3 → final attempt feedback

---

## Task 2: Create Centralized Evaluation Constants

**Effort:** 2 hours
**Priority:** Medium
**Dependencies:** None

### 📝 Description
Consolidate all evaluation-related constants into a single, centralized file to eliminate duplication and improve maintainability.

### 📂 Files to Create
- `src/shared/constants/evaluation.ts`

### 📂 Files to Update (Remove Duplicates)
- `src/modules/practice/components/PracticeWizard/constants.ts` (if any overlap)
- Any components using hardcoded evaluation values

### ✅ Acceptance Criteria
- [x] All evaluation constants in one file
- [x] Type-safe with const assertions
- [x] Helper functions for common operations (getScoreColor)
- [x] Zero duplicate constants across codebase
- [x] Proper JSDoc documentation

### 🔧 Implementation
```typescript
// src/shared/constants/evaluation.ts

/**
 * Evaluation & Feedback Constants
 * Centralized configuration for immediate answer evaluation
 */

// Revision Limits
export const MAX_REVISIONS = 2;
export const MIN_ANSWER_LENGTH = 10;

// Timeouts
export const EVALUATION_TIMEOUT = 30000; // 30 seconds

// Score Thresholds (0-100 scale)
export const SCORE_THRESHOLDS = {
  EXCELLENT: 90,
  GOOD: 75,
  FAIR: 60,
  PASS: 50,
} as const;

// Animation Durations (milliseconds)
export const FEEDBACK_ANIMATIONS = {
  MODAL_DURATION: 300,
  SCORE_COUNT_DURATION: 800,
  SECTION_STAGGER: 150,
} as const;

// Score Color Mapping
export const SCORE_COLORS = {
  EXCELLENT: 'gradient-green-glow',
  GOOD: 'gradient-blue-glow',
  FAIR: 'gradient-orange-glow',
  POOR: 'gradient-red-glow',
} as const;

/**
 * Get color class for score
 */
export function getScoreColor(score: number): string {
  if (score >= SCORE_THRESHOLDS.EXCELLENT) return SCORE_COLORS.EXCELLENT;
  if (score >= SCORE_THRESHOLDS.GOOD) return SCORE_COLORS.GOOD;
  if (score >= SCORE_THRESHOLDS.FAIR) return SCORE_COLORS.FAIR;
  return SCORE_COLORS.POOR;
}
```

### 🧪 Manual Test Cases
1. Import constants in multiple files → no TypeScript errors
2. Use getScoreColor with various scores → correct colors returned
3. Verify no duplicate constants exist via grep

---

## Task 3: Extend Practice Store with Evaluation State

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 2 (Constants)

### 📝 Description
Add evaluation-related state to the practice slice to track evaluations, revisions, and feedback for each question.

### 📂 Files to Modify
- `src/store/slices/practice/index.ts`
- `src/types/store/index.ts` (update IPracticeState)

### ✅ Acceptance Criteria
- [x] QuestionAnswer type includes evaluation history
- [x] Revision count tracked per question
- [x] Current evaluation state stored
- [x] Status field tracks submission state
- [x] Store actions for evaluation workflow
- [x] Existing state structure unchanged

### 🔧 Implementation
```typescript
// Update QuestionAnswer type
interface QuestionAnswer {
  questionId: string;
  answer: string;
  timestamp: Date;

  // NEW: Evaluation tracking
  evaluations: Array<{
    attemptNumber: number;
    score: number;
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    overallFeedback: string;
    timestamp: Date;
  }>;

  // NEW: Revision tracking
  revisionCount: number;
  status: 'unanswered' | 'in-progress' | 'submitted' | 'revised';
}

// NEW: Store actions
interface PracticeActions {
  // ... existing actions

  // Evaluation actions
  saveEvaluation: (questionId: string, evaluation: Evaluation) => void;
  incrementRevisionCount: (questionId: string) => void;
  updateQuestionStatus: (questionId: string, status: QuestionStatus) => void;
  getCurrentEvaluation: (questionId: string) => Evaluation | null;
  canReviseAnswer: (questionId: string) => boolean;
}
```

### 🧪 Manual Test Cases
1. Save evaluation → appears in question's evaluation history
2. Increment revision → count increases, max enforced
3. Check revision eligibility → correct based on count
4. Get current evaluation → returns latest evaluation

---

## Task 4: Build FeedbackModal Component

**Effort:** 6 hours
**Priority:** High
**Dependencies:** Task 2 (Constants)

### 📝 Description
Create the glassmorphic feedback modal that displays evaluation results with smooth animations and clear action buttons.

### 📂 Files to Create
- `src/modules/assessment/components/FeedbackModal/index.tsx`
- `src/modules/assessment/components/FeedbackModal/ScoreDisplay.tsx`
- `src/modules/assessment/components/FeedbackModal/FeedbackSection.tsx`
- `src/modules/assessment/components/FeedbackModal/DetailedFeedback.tsx`

### ✅ Acceptance Criteria
- [x] Modal displays all evaluation data clearly
- [x] Score color-coded based on thresholds
- [x] Strengths, improvements, suggestions well-organized
- [x] Revision button shows remaining attempts
- [x] Revision button disabled when max reached
- [x] Smooth entrance/exit animations
- [x] Keyboard navigation (Tab, Escape)
- [x] Mobile responsive layout

### 🔧 Component Structure
```typescript
// Main Modal Component
interface IFeedbackModalProps {
  isOpen: boolean;
  evaluation: {
    score: number;
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    overallFeedback: string;
  };
  attemptNumber: number;
  maxAttempts: number;
  onRevise: () => void;
  onNext: () => void;
  onClose: () => void;
  loading?: boolean;
}

export function FeedbackModal(props: IFeedbackModalProps) {
  // Implementation
}
```

### 🎨 Design Specs
- **Modal**: Glass card with backdrop blur
- **Score Badge**: Large, animated count-up, color-coded glow
- **Sections**: Icon + title + list items with staggered animation
- **Buttons**: Full-width on mobile, side-by-side on desktop
- **Animations**:
  - Modal: slide-up + fade (300ms)
  - Score: count-up (800ms)
  - Sections: stagger (150ms delay)

### 🧪 Manual Test Cases
1. Open modal → smooth entrance animation
2. Score displays correctly with right color
3. Revise button shows "2 left" → "1 left" → disabled
4. Close with X or Escape → modal closes
5. Mobile view → responsive layout works

---

## Task 5: Integrate FeedbackModal with AssessmentLayout

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 4 (FeedbackModal)

### 📝 Description
Update AssessmentLayout to replace "Next" button with "Submit Answer" and integrate the FeedbackModal.

### 📂 Files to Modify
- `src/modules/assessment/components/AssessmentLayout.tsx`
- `src/modules/assessment/components/AnswerInput.tsx` (disable during evaluation)

### ✅ Acceptance Criteria
- [x] "Submit Answer" button replaces "Next" button
- [x] Button disabled when answer empty or evaluating
- [x] Loading state shows spinner + "Evaluating..."
- [x] FeedbackModal appears after evaluation
- [x] Answer input disabled during evaluation
- [x] Layout remains responsive

### 🔧 Implementation
```typescript
export function AssessmentLayout() {
  const {
    currentQuestion,
    currentAnswer,
    handleAnswerChange,
    isEvaluating,
    currentEvaluation,
    showFeedback,
    handleSubmitAnswer,
    handleReviseAnswer,
    handleNextQuestion,
    closeFeedbackModal,
    currentAttemptNumber,
  } = useAssessment();

  return (
    <div className="min-h-screen flex flex-col">
      <AssessmentHeader />

      <main className="flex-1">
        <QuestionDisplay question={currentQuestion} />

        <AnswerInput
          question={currentQuestion}
          value={currentAnswer}
          onChange={handleAnswerChange}
          disabled={isEvaluating}
        />

        {/* Submit Button */}
        <div className="container max-w-4xl mx-auto px-6 pb-8">
          <Button
            variant="primary"
            onClick={handleSubmitAnswer}
            disabled={!currentAnswer.trim() || isEvaluating}
            className="w-full"
          >
            {isEvaluating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Evaluating...
              </>
            ) : (
              <>
                Submit Answer
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </main>

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={showFeedback}
        evaluation={currentEvaluation}
        attemptNumber={currentAttemptNumber}
        maxAttempts={MAX_REVISIONS}
        onRevise={handleReviseAnswer}
        onNext={handleNextQuestion}
        onClose={closeFeedbackModal}
        loading={isEvaluating}
      />
    </div>
  );
}
```

### 🧪 Manual Test Cases
1. Empty answer → Submit disabled
2. Type answer → Submit enabled
3. Click Submit → Loading state appears
4. Evaluation complete → Modal shows
5. Answer input disabled during evaluation

---

## Task 6: Update useAssessment Hook with TanStack Query

**Effort:** 4 hours
**Priority:** High
**Dependencies:** Task 3 (Store), Task 1 (API)

### 📝 Description
Refactor useAssessment hook to use TanStack Query mutation instead of raw fetch, leveraging existing useEvaluateAnswer hook.

### 📂 Files to Modify
- `src/modules/assessment/hooks/useAssessment.ts`
- `src/lib/claude/hooks/useAnswerEvaluation.ts` (if adjustments needed)

### ✅ Acceptance Criteria
- [x] Uses `useEvaluateAnswer` mutation hook
- [x] `isPending` state from mutation controls UI
- [x] onSuccess callback stores evaluation
- [x] onError callback shows error toast
- [x] No more manual fetch/loading state
- [x] Request cancellation on unmount

### 🔧 Implementation
```typescript
import { useEvaluateAnswer } from "@lib/claude/hooks/useAnswerEvaluation";

export function useAssessment() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState(null);

  const store = useAppStore();
  const { mutate: evaluateAnswer, isPending: isEvaluating } = useEvaluateAnswer();

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || !currentAnswer.trim()) return;

    const attemptNumber = store.getRevisionCount(currentQuestion.id) + 1;

    evaluateAnswer(
      {
        question: currentQuestion,
        answer: currentAnswer,
        attemptNumber,
      },
      {
        onSuccess: (response) => {
          if (response.success && response.data.feedback) {
            setCurrentEvaluation(response.data.feedback);
            store.saveEvaluation(currentQuestion.id, {
              ...response.data.feedback,
              attemptNumber,
              timestamp: new Date(),
            });
            setShowFeedback(true);
          }
        },
        onError: (error) => {
          console.error('Evaluation failed:', error);
          toast.error('Failed to evaluate answer. Please try again.');
        },
      }
    );
  }, [currentQuestion, currentAnswer, evaluateAnswer, store]);

  const handleReviseAnswer = useCallback(() => {
    setShowFeedback(false);
    store.incrementRevisionCount(currentQuestion.id);
    store.updateQuestionStatus(currentQuestion.id, 'in-progress');
  }, [currentQuestion, store]);

  const handleNextQuestion = useCallback(() => {
    setShowFeedback(false);
    store.updateQuestionStatus(currentQuestion.id, 'submitted');
    store.goToNextQuestion();
  }, [currentQuestion, store]);

  return {
    // ... existing
    isEvaluating,
    showFeedback,
    currentEvaluation,
    currentAttemptNumber: store.getRevisionCount(currentQuestion?.id ?? ''),
    handleSubmitAnswer,
    handleReviseAnswer,
    handleNextQuestion,
    closeFeedbackModal: () => setShowFeedback(false),
  };
}
```

### 🧪 Manual Test Cases
1. Submit answer → TanStack Query mutation fires
2. During evaluation → isPending = true
3. Success → feedback modal opens
4. Error → toast notification appears
5. Check DevTools → mutation tracked correctly

---

## Task 7: Add Revision Tracking and Limits

**Effort:** 4 hours
**Priority:** Medium
**Dependencies:** Task 3 (Store), Task 6 (Hook)

### 📝 Description
Implement revision count tracking with max limit enforcement and appropriate UI feedback.

### 📂 Files to Modify
- `src/store/slices/practice/index.ts` (revision logic)
- `src/modules/assessment/components/FeedbackModal/index.tsx` (revision UI)

### ✅ Acceptance Criteria
- [x] Revision count increments on "Revise Answer"
- [x] Max revisions enforced (2 attempts)
- [x] Revise button disabled at limit
- [x] Revision count displays correctly ("2 left", "1 left", disabled)
- [x] Each revision creates new evaluation entry
- [x] Question status tracks revision state

### 🔧 Implementation
```typescript
// Store action
incrementRevisionCount: (questionId: string) => {
  set((state) => {
    const answer = state.savedAnswers.get(questionId);
    if (answer) {
      answer.revisionCount = Math.min(
        answer.revisionCount + 1,
        MAX_REVISIONS
      );
      answer.status = 'in-progress';
    }
  });
},

canReviseAnswer: (questionId: string) => {
  const answer = get().savedAnswers.get(questionId);
  return answer ? answer.revisionCount < MAX_REVISIONS : true;
},

// FeedbackModal
const canRevise = attemptNumber < maxAttempts;
const attemptsLeft = maxAttempts - attemptNumber;

<Button
  variant="glass"
  onClick={onRevise}
  disabled={!canRevise}
>
  <RefreshCw className="w-4 h-4 mr-2" />
  Revise Answer
  {canRevise && (
    <span className="text-xs ml-2">
      ({attemptsLeft} {attemptsLeft === 1 ? 'left' : 'left'})
    </span>
  )}
</Button>
```

### 🧪 Manual Test Cases
1. First submission → "Revise Answer (2 left)"
2. First revision → "Revise Answer (1 left)"
3. Second revision → Button disabled
4. Check store → 3 evaluation entries
5. Status updates correctly through flow

---

## Task 8: Polish UI/UX and Animations

**Effort:** 4 hours
**Priority:** Low
**Dependencies:** Task 4 (FeedbackModal), Task 5 (Integration)

### 📝 Description
Add final polish with smooth animations, transitions, and micro-interactions for a premium user experience.

### 📂 Files to Modify
- `src/modules/assessment/components/FeedbackModal/index.tsx`
- `src/modules/assessment/components/FeedbackModal/ScoreDisplay.tsx`
- `src/modules/assessment/components/AssessmentLayout.tsx`

### ✅ Acceptance Criteria
- [x] Modal entrance: slide-up + fade (300ms)
- [x] Score badge: count-up animation (800ms)
- [x] Feedback sections: staggered fade-in (150ms delay)
- [x] Button hover states with scale effect
- [x] Loading spinner smooth rotation
- [x] Toast notifications for errors
- [x] Keyboard shortcuts documented

### 🎨 Animation Details
```typescript
// Modal entrance
const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Score count-up
const scoreRef = useRef(null);
useEffect(() => {
  if (isOpen && scoreRef.current) {
    animateValue(scoreRef.current, 0, score, 800);
  }
}, [isOpen, score]);

// Staggered sections
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};
```

### 🎯 Micro-interactions
- **Submit button**: Scale 0.95 on click, pulse when enabled
- **Revise button**: Subtle rotate icon on hover
- **Next button**: Arrow slides right on hover
- **Modal close**: Scale down + fade out
- **Feedback items**: Slide in from left with fade

### 🧪 Manual Test Cases
1. Open modal → smooth slide-up animation
2. Score counts from 0 to actual value
3. Sections appear with stagger effect
4. Hover buttons → scale/movement effects
5. Close modal → smooth exit animation

---

## 📊 Implementation Checklist

### Week 1 (Core Development)
- [ ] **Task 1**: API endpoint updated (4h)
- [ ] **Task 2**: Constants centralized (2h)
- [ ] **Task 3**: Store extended (4h)
- [ ] **Task 4**: FeedbackModal built (6h)
- [ ] **Task 5**: Layout integration (4h)
- [ ] **Task 6**: Hook refactored (4h)
- [ ] **Task 7**: Revision tracking (4h)
- [ ] **Task 8**: UI polish (4h)

### Week 2 (Testing & Deployment)
- [ ] Manual testing all flows
- [ ] Bug fixes and refinements
- [ ] Staging deployment
- [ ] Production deployment (feature flag)
- [ ] Monitor metrics and gather feedback

---

## 🎯 Success Criteria

**Feature is considered complete when:**
1. ✅ User can submit answer and get immediate evaluation
2. ✅ Feedback modal displays all evaluation details clearly
3. ✅ User can revise answer up to 2 times with feedback
4. ✅ Revision limits enforced and communicated clearly
5. ✅ All animations smooth and polished
6. ✅ Mobile experience is responsive and usable
7. ✅ No console errors or warnings
8. ✅ TanStack Query integration working correctly

---

## 🚀 Getting Started

**To begin implementation:**

1. **Create a feature branch**: `git checkout -b feature/immediate-evaluation`
2. **Start with Task 1**: API endpoint (foundation)
3. **Work sequentially**: Each task builds on previous
4. **Test incrementally**: Manual testing after each task
5. **Commit frequently**: Small, atomic commits per task

**Branch naming convention:**
- Main feature: `feature/immediate-evaluation`
- Individual tasks: `feature/immediate-evaluation/task-{number}`

**Commit message format:**
```
feat(assessment): [Task N] Brief description

- Detailed change 1
- Detailed change 2

Related: Phase 1 Task N
```

---

**Status:** 📋 Ready to Start
**Next Step:** Create feature branch and begin Task 1
**Estimated Completion:** 1.5 weeks (32 hours)
