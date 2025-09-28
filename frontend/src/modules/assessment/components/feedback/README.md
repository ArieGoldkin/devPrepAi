# StatusBar Component

## Overview
The StatusBar component provides comprehensive status information during assessments, including auto-save status, timer progress, validation feedback, and connection status.

## Features
- Auto-save functionality with 30-second intervals and typing detection
- Progress ring showing time remaining with color transitions
- Smart validation for different question types (coding, system-design, behavioral, conceptual)
- Connection status monitoring (online/offline)
- Hint penalty tracking
- Keyboard shortcut indicators
- ARIA live regions for accessibility

## Usage

```tsx
import { StatusBar } from "@modules/assessment/components/feedback";

<StatusBar
  currentAnswer={userAnswer}
  onAutoSave={(answer) => saveAnswerDraft(answer)}
  questionType="coding"
  className="mb-4"
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| currentAnswer | string | Yes | Current user answer text |
| onAutoSave | (answer: string) => void | No | Callback for auto-save functionality |
| questionType | "behavioral" \| "system-design" \| "coding" \| "conceptual" | No | Question type for validation |
| className | string | No | Additional CSS classes |

## Auto-Save States

- **Typing...** - User is actively typing (debounced 1 second)
- **Saving...** - Auto-save in progress
- **Saved ✅** - Successfully saved
- **Save failed** - Error occurred during save

## Progress Ring

Color-coded based on time remaining:
- **Green**: > 25% time remaining
- **Yellow**: 10-25% time remaining
- **Red**: < 10% time remaining

## Validation Logic

### Coding Questions
- Checks for functions, logic structures, and code patterns
- Minimum 50 characters with programming constructs

### System Design Questions
- Looks for system architecture keywords
- Minimum 100 characters with design elements

### Behavioral Questions
- Checks for STAR method or structured responses
- Minimum 100 characters with experience keywords

### Conceptual Questions
- Basic length validation (50+ characters)

## State Integration

The component integrates with:
- `timeRemaining` and `settings` from assessmentSlice
- `hintUsage` from questionsSlice for penalty tracking
- Browser online/offline events

## Keyboard Shortcuts

- **Ctrl+S**: Manual save (displayed on desktop)

## Accessibility

- ARIA live regions announce save status and time warnings
- Screen reader friendly status updates
- High contrast indicators for all states