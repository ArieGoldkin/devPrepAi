# HintSystem Component

## Overview
The HintSystem component provides a 4-level progressive hint system for assessment questions. It integrates with the Zustand store to track hint usage and apply score penalties.

## Features
- 4-level progressive hints with increasing penalties (5, 10, 15, 20 points)
- Smart timing - disables hints for first 2 minutes to encourage independent thinking
- Confirmation dialogs for higher-level hints (levels 3-4)
- Real-time score impact display
- Progressive disclosure - only shows next hint level
- Smooth animations and accessibility support

## Usage

```tsx
import { HintSystem } from "@modules/assessment/components/hints";

<HintSystem
  question={currentQuestion}
  questionId={currentQuestion.id}
  className="mb-4"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| question | IQuestion | Yes | The question object containing hints array |
| questionId | string | Yes | Unique identifier for the question |
| className | string | No | Additional CSS classes |

## Hint Levels

1. **Level 1: Gentle Nudge** (💡 -5 points) - Subtle guidance
2. **Level 2: Conceptual Hint** (🧠 -10 points) - Key concepts
3. **Level 3: Structural Guidance** (📝 -15 points) - Solution structure
4. **Level 4: Near-Solution** (✅ -20 points) - Detailed solution approach

## State Integration

The component connects to the questionsSlice in Zustand:
- `revealHint(questionId, hintIndex)` - Reveals a hint and applies penalty
- `hintUsage` - Array tracking hints revealed per question
- `totalHintPenalty` - Total penalty across all questions

## Accessibility

- ARIA labels and live regions for screen readers
- Keyboard navigation support
- High contrast colors and clear visual hierarchy
- Voice announcements for hint reveals