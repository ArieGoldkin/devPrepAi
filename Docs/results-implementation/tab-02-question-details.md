# Results Analytics - Tab 2: Question Details Implementation Plan

**Version**: 1.0.0
**Created**: October 27, 2025
**Status**: 📋 Planning Phase
**Complexity**: Medium-High (List rendering, expandable items)

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Component Breakdown](#component-breakdown)
4. [Data Flow](#data-flow)
5. [Implementation Tasks](#implementation-tasks)
6. [Quality Standards](#quality-standards)
7. [Testing Strategy](#testing-strategy)
8. [Dependencies](#dependencies)

---

## Overview

### Purpose

The Question Details tab provides a comprehensive question-by-question breakdown of the practice session, showing:
- Question title, difficulty, type, and score
- Time spent on each question
- Number of hints used
- Detailed feedback (strengths and improvements)
- Visual badges for metadata

### Design Reference

**Prototype**: `.superdesign/design_iterations/glassmorphism_results_analytics.html` (Tab 2)

### Key Features

1. **Question List**: Vertical list of all questions with expandable details
2. **Score Display**: Large, color-coded score on the right
3. **Metadata Badges**: Difficulty, type, hints used, time
4. **Feedback Section**: Strengths and improvements for each answer
5. **Hover Effects**: Cards lift and glow on hover

---

## Architecture Decisions

### Component Placement

Following the 7-folder architecture with tab-based organization:

```
modules/results/
├── components/
│   ├── overview/                       # Tab 1: Overview (completed)
│   ├── question-details/               # Tab 2: Question Details (subfolder)
│   │   ├── QuestionDetailsTab.tsx     # Main container (≤150 lines)
│   │   ├── QuestionResultCard.tsx     # Individual question card (≤180 lines)
│   │   ├── QuestionMetaBadges.tsx     # Badge group component (≤80 lines)
│   │   ├── FeedbackSection.tsx        # Strengths/improvements display (≤100 lines)
│   │   └── index.ts                    # Barrel export for question-details components
│   ├── hint-analytics/                 # Tab 3: Hint Analytics (future)
│   ├── learning-insights/              # Tab 4: Learning Insights (future)
│   └── index.ts                        # Main barrel export
├── hooks/
│   └── useQuestionResults.ts          # Data fetching/formatting (≤120 lines)
└── utils/
    └── scoreFormatting.ts             # Score color/text utilities (≤60 lines)
```

### Why This Structure?

- **Tab-Based Organization**: Each tab gets its own subfolder for scalability (4 tabs × 4-6 components each)
- **Single Responsibility**: Each component handles one aspect
- **Reusability**: Shared hooks and utils remain at parent level for cross-tab usage
- **Maintainability**: Breaking down the card into sub-components keeps files small
- **Testability**: Each component can be tested in isolation
- **Scalability**: Prevents root `components/` folder from becoming cluttered

### Import Flow

```
QuestionDetailsTab
  ↓ imports
QuestionResultCard
  ↓ imports
[QuestionMetaBadges, FeedbackSection]
  ↓ uses
shared/ui/* (shadcn Badge, Card)
  ↓ accesses
store/resultsSlice (via useQuestionResults hook)
```

**Valid**: `modules/` → `shared/` → `store/` (allowed import direction)

---

## Component Breakdown

### 1. QuestionDetailsTab (Container)

**File**: `modules/results/components/question-details/QuestionDetailsTab.tsx`

**Responsibility**: Render list of question cards

**Props Interface**:
```typescript
interface IQuestionDetailsTabProps {
  // No props - gets data from store
}
```

**Key Elements**:
- Uses `useQuestionResults()` hook to get array of questions
- Maps over questions to render `QuestionResultCard`
- Handles empty state (no questions)
- Applies glass-card wrapper for the list

**shadcn Components**:
- `Card` (wrapper for the entire list)
- `CardHeader` (title section)

**Glassmorphism Classes**:
- `glass-card` (main container)
- `neon-glow-blue` (header icon)

**Complexity Target**: ≤5 (simple list rendering)

---

### 2. QuestionResultCard

**File**: `modules/results/components/question-details/QuestionResultCard.tsx`

**Responsibility**: Display individual question with score, metadata, and feedback

**Props Interface**:
```typescript
interface IQuestionResultCardProps {
  question: IQuestionResult; // From types/ai/assessment.ts
  index: number;             // For numbering (1-based)
}

interface IQuestionResult {
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback;
  timeSpent: number;        // in seconds
  hintsUsed?: IHint[];      // Added in Tab 1 implementation
}
```

**Key Elements**:
- Header: Question number + title + score
- Metadata: `QuestionMetaBadges` component
- Feedback: `FeedbackSection` component
- Hover effect: translateX(4px) + border color change

**Component Structure**:
```tsx
<div className="question-item">
  {/* Header */}
  <div className="question-header">
    <div className="question-title">{index}. {question.question.text}</div>
    <div className={`question-score ${getScoreClass(score)}`}>{score}</div>
  </div>

  {/* Metadata Badges */}
  <QuestionMetaBadges
    difficulty={question.question.difficulty}
    type={question.question.type}
    hintsUsed={question.hintsUsed?.length ?? 0}
    timeSpent={question.timeSpent}
  />

  {/* Feedback */}
  <FeedbackSection feedback={question.feedback} />
</div>
```

**shadcn Components**: None (custom styled div)

**Glassmorphism Classes**:
- `question-item` (card styling)
- `question-score` with conditional class:
  - `score-excellent` (90-100)
  - `score-good` (75-89)
  - `score-fair` (60-74)
  - `score-poor` (<60)

**Complexity Target**: ≤10 (card layout + conditional rendering)

---

### 3. QuestionMetaBadges

**File**: `modules/results/components/question-details/QuestionMetaBadges.tsx`

**Responsibility**: Display difficulty, type, hints, time as badges

**Props Interface**:
```typescript
interface IQuestionMetaBadgesProps {
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'coding' | 'system-design' | 'behavioral';
  hintsUsed: number;
  timeSpent: number; // in seconds
}
```

**Key Elements**:
- 4 badges in a flex row
- Each badge has icon + label
- Color-coded by type:
  - Difficulty: purple
  - Type: blue
  - Hints: orange
  - Time: gray

**Badge Examples**:
```tsx
<Badge className="badge-difficulty">Easy</Badge>
<Badge className="badge-type">Coding</Badge>
<Badge className="badge-hints">💡 1 Hint</Badge>
<span className="time-badge">⏱️ 7m 23s</span>
```

**shadcn Components**:
- `Badge` (from `@shared/ui/badge`)

**Glassmorphism Classes**:
- `badge-difficulty`, `badge-type`, `badge-hints` (from prototype)

**Complexity Target**: ≤6 (simple badge rendering)

**Utility Needed**: `formatTime(seconds: number): string`
- Example: `443` → `"7m 23s"`

---

### 4. FeedbackSection

**File**: `modules/results/components/question-details/FeedbackSection.tsx`

**Responsibility**: Display strengths and improvements from AI feedback

**Props Interface**:
```typescript
interface IFeedbackSectionProps {
  feedback: IAnswerFeedback;
}

interface IAnswerFeedback {
  score: number;
  strengths: string[];
  improvements: string[];
  // ... other fields
}
```

**Key Elements**:
- Two-line layout: Strengths | Improvements
- Each with icon (✅ for strengths, 📝 for improvements)
- Text in muted color
- Word wrap for long feedback

**Layout**:
```tsx
<p className="feedback-text">
  ✅ <strong>Strengths:</strong> {feedback.strengths.join(', ')}<br />
  📝 <strong>Improvements:</strong> {feedback.improvements.join(', ')}
</p>
```

**shadcn Components**: None

**Glassmorphism Classes**: None (just text styling)

**Complexity Target**: ≤4 (simple text rendering)

---

## Data Flow

### 1. Data Source

**Store**: `store/slices/resultsSlice.ts`

**State Shape** (from Tab 1 extension):
```typescript
interface IAssessmentResults {
  questions: IQuestionResult[];
  totalTimeSpent: number;
  totalTimeAllocated: number;
  completedAt: string;
}

interface IQuestionResult {
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback;
  timeSpent: number;
  hintsUsed?: IHint[]; // ← Added in Tab 1
}
```

**Data is Ready**: All fields needed for this tab are in the store.

### 2. Data Hook

**File**: `modules/results/hooks/useQuestionResults.ts`

**Purpose**: Get question results from store and format for display

**Returns**:
```typescript
interface IQuestionResultsData {
  questions: IQuestionResult[];
  isLoading: boolean;
  error: string | null;
}
```

**Logic**:
1. Get `currentResults` from `useAppStore((state) => state.currentResults)`
2. Return `questions` array directly
3. Handle loading/error states

**Why Separate Hook?**
- Encapsulates store access logic
- Makes component easier to test (mock hook)
- Could add filtering/sorting logic later

---

## Implementation Tasks

### Phase 1: Data Layer (1-2 hours)

#### Task 1.1: Create useQuestionResults Hook
**File**: `modules/results/hooks/useQuestionResults.ts`

**Implementation**:
- [ ] Import `useAppStore` hook
- [ ] Get `currentResults?.questions` from store
- [ ] Handle null case (return empty array)
- [ ] Add TypeScript return type

**Code Skeleton**:
```typescript
import { useAppStore } from '@/store';
import type { IQuestionResult } from '@/types/ai/assessment';

interface IQuestionResultsData {
  questions: IQuestionResult[];
  isLoading: boolean;
}

export const useQuestionResults = (): IQuestionResultsData => {
  const currentResults = useAppStore((state) => state.currentResults);

  return {
    questions: currentResults?.questions ?? [],
    isLoading: !currentResults,
  };
};
```

**Acceptance Criteria**:
- ✅ Hook returns typed data
- ✅ Handles null results gracefully
- ✅ File ≤120 lines
- ✅ No side effects

---

#### Task 1.2: Create Score Formatting Utilities
**File**: `modules/results/utils/scoreFormatting.ts`

**Functions to implement**:
- [ ] `getScoreClass(score: number): string`
  - Returns: `'score-excellent' | 'score-good' | 'score-fair' | 'score-poor'`
  - Logic:
    - 90-100: `'score-excellent'`
    - 75-89: `'score-good'`
    - 60-74: `'score-fair'`
    - <60: `'score-poor'`

- [ ] `formatTime(seconds: number): string`
  - Returns: `"7m 23s"` format
  - Logic:
    ```typescript
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
    ```

**Acceptance Criteria**:
- ✅ Pure functions (no side effects)
- ✅ Unit tests pass
- ✅ File ≤60 lines
- ✅ TypeScript strict mode

**Test Cases**:
```typescript
describe('getScoreClass', () => {
  it('returns score-excellent for 90+', () => {
    expect(getScoreClass(95)).toBe('score-excellent');
  });

  it('returns score-poor for <60', () => {
    expect(getScoreClass(45)).toBe('score-poor');
  });
});

describe('formatTime', () => {
  it('formats seconds correctly', () => {
    expect(formatTime(443)).toBe('7m 23s');
  });

  it('handles 0 seconds', () => {
    expect(formatTime(0)).toBe('0m 0s');
  });
});
```

---

### Phase 2: UI Components (3-4 hours)

#### Task 2.1: Create FeedbackSection Component
**File**: `modules/results/components/question-details/FeedbackSection.tsx`

**Implementation**:
- [ ] Define `IFeedbackSectionProps` interface
- [ ] Render strengths with ✅ icon
- [ ] Render improvements with 📝 icon
- [ ] Apply muted text color (`text-gray-300`)
- [ ] Handle empty arrays gracefully

**Code Structure**:
```typescript
interface IFeedbackSectionProps {
  feedback: IAnswerFeedback;
}

export const FeedbackSection: React.FC<IFeedbackSectionProps> = ({ feedback }) => {
  return (
    <p className="feedback-text">
      ✅ <strong>Strengths:</strong> {feedback.strengths.join(', ')}<br />
      📝 <strong>Improvements:</strong> {feedback.improvements.join(', ')}
    </p>
  );
};
```

**Acceptance Criteria**:
- ✅ Renders both sections
- ✅ File ≤100 lines
- ✅ Handles missing feedback gracefully
- ✅ Text wraps correctly

---

#### Task 2.2: Create QuestionMetaBadges Component
**File**: `modules/results/components/question-details/QuestionMetaBadges.tsx`

**Implementation**:
- [ ] Define `IQuestionMetaBadgesProps` interface
- [ ] Import shadcn `Badge` component
- [ ] Render 4 badges (difficulty, type, hints, time)
- [ ] Use `formatTime()` utility for time display
- [ ] Apply color classes from glassmorphism.css

**Code Structure**:
```typescript
import { Badge } from '@/shared/ui/badge';
import { formatTime } from '../utils/scoreFormatting';

interface IQuestionMetaBadgesProps {
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'coding' | 'system-design' | 'behavioral';
  hintsUsed: number;
  timeSpent: number;
}

export const QuestionMetaBadges: React.FC<IQuestionMetaBadgesProps> = ({
  difficulty,
  type,
  hintsUsed,
  timeSpent,
}) => {
  return (
    <div className="question-meta">
      <Badge className="badge-difficulty">{difficulty}</Badge>
      <Badge className="badge-type">{type}</Badge>
      <Badge className="badge-hints">💡 {hintsUsed} Hint{hintsUsed !== 1 ? 's' : ''}</Badge>
      <span className="time-badge">⏱️ {formatTime(timeSpent)}</span>
    </div>
  );
};
```

**Acceptance Criteria**:
- ✅ All 4 badges render
- ✅ File ≤80 lines
- ✅ Uses shadcn Badge component
- ✅ Handles pluralization ("1 Hint" vs "2 Hints")

---

#### Task 2.3: Create QuestionResultCard Component
**File**: `modules/results/components/question-details/QuestionResultCard.tsx`

**Implementation**:
- [ ] Define `IQuestionResultCardProps` interface
- [ ] Import child components (QuestionMetaBadges, FeedbackSection)
- [ ] Create card layout with header, metadata, feedback
- [ ] Use `getScoreClass()` for score color
- [ ] Add hover effect (translateX + border color)

**Code Structure**:
```typescript
import { QuestionMetaBadges } from './QuestionMetaBadges';
import { FeedbackSection } from './FeedbackSection';
import { getScoreClass } from '../utils/scoreFormatting';
import type { IQuestionResult } from '@/types/ai/assessment';

interface IQuestionResultCardProps {
  question: IQuestionResult;
  index: number;
}

export const QuestionResultCard: React.FC<IQuestionResultCardProps> = ({
  question,
  index,
}) => {
  const score = question.feedback.score;
  const scoreClass = getScoreClass(score);

  return (
    <div className="question-item">
      <div className="question-header">
        <div className="question-title">
          {index}. {question.question.text}
        </div>
        <div className={`question-score ${scoreClass}`}>{score}</div>
      </div>

      <QuestionMetaBadges
        difficulty={question.question.difficulty}
        type={question.question.type}
        hintsUsed={question.hintsUsed?.length ?? 0}
        timeSpent={question.timeSpent}
      />

      <FeedbackSection feedback={question.feedback} />
    </div>
  );
};
```

**Acceptance Criteria**:
- ✅ Card renders all sections
- ✅ File ≤180 lines
- ✅ Score color changes based on value
- ✅ Hover effect works
- ✅ Responsive layout

---

#### Task 2.4: Create QuestionDetailsTab Container
**File**: `modules/results/components/question-details/QuestionDetailsTab.tsx`

**Implementation**:
- [ ] Use `useQuestionResults()` hook
- [ ] Map over questions to render cards
- [ ] Handle empty state (no questions)
- [ ] Apply glass-card wrapper
- [ ] Add header with icon

**Code Structure**:
```typescript
import { Card, CardHeader, CardContent } from '@/shared/ui/card';
import { QuestionResultCard } from './QuestionResultCard';
import { useQuestionResults } from '../hooks/useQuestionResults';

export const QuestionDetailsTab: React.FC = () => {
  const { questions, isLoading } = useQuestionResults();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (questions.length === 0) {
    return <div>No questions to display</div>;
  }

  return (
    <Card className="glass-card">
      <CardHeader className="glass-card-header">
        <div className="icon-wrapper icon-blue">📝</div>
        <div>
          <div className="card-title">Question-by-Question Breakdown</div>
          <div className="card-subtitle">Detailed performance on each question</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="question-list">
          {questions.map((question, index) => (
            <QuestionResultCard
              key={question.question.id}
              question={question}
              index={index + 1}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
```

**Acceptance Criteria**:
- ✅ All questions render
- ✅ File ≤150 lines
- ✅ Empty state handled
- ✅ Loading state handled
- ✅ Uses glassmorphism classes

---

### Phase 3: Styling & Polish (1-2 hours)

#### Task 3.1: Verify Glassmorphism Classes
**File**: `frontend/src/styles/glassmorphism.css`

**Classes Needed**:
- [ ] `.question-item` (card styling with hover)
- [ ] `.question-header` (flex layout)
- [ ] `.question-title` (font styling)
- [ ] `.question-score` (large score display)
- [ ] `.question-meta` (flex gap for badges)
- [ ] `.badge-difficulty`, `.badge-type`, `.badge-hints` (badge colors)
- [ ] `.feedback-text` (muted text color)

**If Missing**: Extract from prototype HTML and add to CSS file

**Acceptance Criteria**:
- ✅ All classes exist
- ✅ Styles match prototype
- ✅ Hover effects work

---

#### Task 3.2: Add Question List Container Styles
**File**: Component-level or `globals.css`

**CSS Needed**:
```css
.question-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.question-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.question-item:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(120, 119, 198, 0.3);
}

.question-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.question-title {
  font-size: 16px;
  font-weight: 600;
  color: #e5e5ff;
}

.question-score {
  font-size: 24px;
  font-weight: 700;
}

.question-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
```

**Acceptance Criteria**:
- ✅ Styles applied correctly
- ✅ No style conflicts
- ✅ Responsive on all screen sizes

---

### Phase 4: Integration & Testing (2-3 hours)

#### Task 4.1: Integrate with Results Page
**File**: `modules/results/ResultsDisplay.tsx`

**Changes**:
- [ ] Import `QuestionDetailsTab`
- [ ] Add to tab navigation (after OverviewTab)
- [ ] Render when "Question Details" tab is active

**Code Addition**:
```typescript
import { QuestionDetailsTab } from './components/QuestionDetailsTab';

// In render:
<TabsContent value="questions">
  <QuestionDetailsTab />
</TabsContent>
```

**Acceptance Criteria**:
- ✅ Tab renders when selected
- ✅ Data loads from store
- ✅ No console errors

---

#### Task 4.2: Write Unit Tests
**Files**: `modules/results/__tests__/`

**Test Coverage**:
- [ ] `scoreFormatting.test.ts` (utilities)
- [ ] `useQuestionResults.test.ts` (hook)
- [ ] `FeedbackSection.test.tsx` (component)
- [ ] `QuestionMetaBadges.test.tsx` (component)
- [ ] `QuestionResultCard.test.tsx` (component)

**Example Tests**:
```typescript
// QuestionResultCard.test.tsx
describe('QuestionResultCard', () => {
  const mockQuestion: IQuestionResult = {
    question: { id: '1', text: 'Two Sum Problem', difficulty: 'easy', type: 'coding' },
    userAnswer: 'function twoSum() {...}',
    feedback: { score: 92, strengths: ['Good approach'], improvements: ['Add comments'] },
    timeSpent: 443,
    hintsUsed: [{ level: 1, content: 'Use hash map' }],
  };

  it('renders question title with index', () => {
    render(<QuestionResultCard question={mockQuestion} index={1} />);
    expect(screen.getByText(/1\. Two Sum Problem/)).toBeInTheDocument();
  });

  it('displays correct score with color', () => {
    render(<QuestionResultCard question={mockQuestion} index={1} />);
    const scoreEl = screen.getByText('92');
    expect(scoreEl).toHaveClass('score-excellent');
  });

  it('shows correct number of hints', () => {
    render(<QuestionResultCard question={mockQuestion} index={1} />);
    expect(screen.getByText(/1 Hint/)).toBeInTheDocument();
  });
});
```

**Acceptance Criteria**:
- ✅ Test coverage ≥80%
- ✅ All tests pass
- ✅ No flaky tests

---

#### Task 4.3: Manual Testing Checklist
**Scenarios**:
- [ ] Load results page with 5 questions
- [ ] Verify all question cards render
- [ ] Check score colors match expected ranges
- [ ] Verify hints count displays correctly
- [ ] Test hover effects on cards
- [ ] Check responsive layout (mobile, tablet, desktop)
- [ ] Test with edge cases:
  - [ ] Question with 0 hints
  - [ ] Question with maximum hints (3)
  - [ ] Very long question text (overflow handling)
  - [ ] Very long feedback text (wrapping)
- [ ] Verify accessibility (keyboard navigation)

**Acceptance Criteria**:
- ✅ All scenarios pass
- ✅ No visual regressions
- ✅ No console warnings
- ✅ Lighthouse score ≥90

---

## Quality Standards

### Code Quality Checklist

- [ ] **File Size**: All files ≤180 lines
- [ ] **Complexity**: Cyclomatic complexity ≤15 per function
- [ ] **TypeScript**: Strict mode enabled, no `any` types
- [ ] **Naming**: Interfaces use `I` prefix
- [ ] **Imports**: Use path aliases (`@shared/ui/*`)
- [ ] **Components**: Functional components with TypeScript
- [ ] **Props**: Destructure at function signature
- [ ] **Styles**: Use Tailwind + glassmorphism utilities

### ESLint Rules

Run before committing:
```bash
npm run lint
npm run type-check
```

**Zero tolerance for**:
- ESLint errors
- TypeScript errors
- Unused imports
- Console.log statements

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)

**What to Test**:
- [ ] Utility functions return correct values
- [ ] Components render with correct props
- [ ] Score colors match score ranges
- [ ] Badges display correct metadata

**Coverage Target**: ≥80%

### Integration Tests

**What to Test**:
- [ ] Data flows from store to components
- [ ] All questions render in list
- [ ] Click interactions work (if any)

---

## Dependencies

### Existing Dependencies (✅ Already Installed)

All dependencies from Tab 1 are sufficient.

### shadcn/ui Components (✅ Check Installation)

**Required**:
- `badge.tsx` (for metadata badges)

**If Missing**:
```bash
npx shadcn@latest add badge
```

### New Dependencies (❌ None Required)

---

## Constraints & Risks

### Technical Constraints

1. **File Size Limit**: ≤180 lines per file
   - **Mitigation**: QuestionResultCard is broken into 3 child components

2. **Long Text Handling**: Question/feedback text could be very long
   - **Mitigation**: Use `line-clamp-2` for titles, full wrap for feedback

3. **List Performance**: Could have 20+ questions in a session
   - **Mitigation**: Use React.memo() for QuestionResultCard if needed

### Data Availability Risks

**Risk**: Hint data not in IQuestionResult

**Status**: Resolved in Tab 1 implementation
- `hintsUsed` field added to `IQuestionResult`

**Fallback**: If hints missing, show `0 Hints` badge

---

## Success Metrics

### Definition of Done

- [ ] All 4 components implemented and tested
- [ ] Data flows correctly from store to UI
- [ ] Visual design matches prototype
- [ ] All quality standards met
- [ ] Unit tests pass with ≥80% coverage
- [ ] Manual testing checklist complete
- [ ] No ESLint/TypeScript errors
- [ ] Code reviewed and approved

### Performance Targets

- [ ] List render: <150ms (for 10 questions)
- [ ] Card hover response: <16ms (60fps)
- [ ] Lighthouse Performance score: ≥90

---

## Next Steps

After completing Question Details tab:
1. **Review feedback display**: Ensure it's helpful to users
2. **Proceed to Tab 3**: Hint Analytics implementation
3. **Iterate on UI**: Refine card spacing/colors as needed

---

**📝 Notes**:
- Badge component must be installed before Phase 2
- Score color classes must exist in glassmorphism.css
- Consider adding expand/collapse for long feedback (future enhancement)

**🔗 Related Docs**:
- `tab-01-overview.md` (Overview tab implementation)
- `Docs/code-standards.md` (quality guidelines)
