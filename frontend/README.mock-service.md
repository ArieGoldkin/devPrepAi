# Mock Evaluation Service

## Overview

The mock evaluation service simulates Claude AI responses **without making real API calls**, saving API credits and enabling faster development.

## Configuration

### Enable Mock Service

Set in `.env.local`:
```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

### Disable Mock Service (Use Real API)

Set in `.env.local`:
```bash
NEXT_PUBLIC_USE_MOCK_API=false
```

Or remove the variable entirely to use the real Claude API.

## How It Works

### 1. Automatic Routing
When `NEXT_PUBLIC_USE_MOCK_API=true`, the API route automatically uses mock data:

```typescript
// src/app/api/ai/evaluate-answer/route.ts
if (shouldUseMockService()) {
  console.log("🎭 Using mock evaluation service (no API call)");
  return mockEvaluateAnswer(request);
}
```

### 2. Realistic Feedback
The mock service generates varied feedback based on:
- **Answer length** (longer = higher score)
- **Word count** (more detailed = better)
- **Code examples** (for coding questions)
- **Explanation quality** (examples, structure)

### 3. Score Tiers

| Score Range | Quality | Feedback Type |
|-------------|---------|---------------|
| 85-100 | Excellent | Praise + minor improvements |
| 70-84 | Good | Solid work + depth suggestions |
| 50-69 | Fair | Basic understanding + needs development |
| 0-49 | Needs Work | Fundamental gaps + detailed guidance |

## Files

```
frontend/src/shared/mocks/
├── mockEvaluationService.ts    # Mock service implementation
├── sampleQuestions.ts          # Sample questions for testing
└── question-generator.ts       # Question generation (existing)
```

## Development Workflow

### Quick Testing
1. Enable mock service in `.env.local`
2. Submit any answer in the assessment
3. Get instant feedback (0.8s delay)
4. No API credits used! 💰

### Production Testing
1. Disable mock service
2. Test with real Claude API
3. Verify production behavior

## Features

✅ **No API calls** - Zero cost during development
✅ **Instant feedback** - 800ms simulated delay
✅ **Realistic responses** - Varied feedback based on quality
✅ **Easy toggle** - Single environment variable
✅ **Type-safe** - Uses same types as real API
✅ **Console logs** - Shows when mock is active

## Example Response

```typescript
{
  data: {
    feedback: {
      score: 75,
      strengths: [
        "Solid grasp of core concepts",
        "Logical flow in explanation"
      ],
      improvements: [
        "Add more specific examples",
        "Expand on implications"
      ],
      suggestions: [
        "Add real-world examples",
        "Discuss common pitfalls"
      ],
      overallFeedback: "Good answer with solid fundamentals..."
    },
    success: true
  },
  success: true
}
```

## When to Use Each Mode

### Use Mock Service When:
- 👨‍💻 Developing UI components
- 🧪 Testing evaluation flow
- 🔄 Iterating on design
- 💰 Conserving API credits
- ⚡ Need fast feedback loops

### Use Real API When:
- ✅ Final integration testing
- 🚀 Pre-deployment validation
- 📊 Testing actual AI quality
- 🎯 Validating prompts

## Notes

- Mock responses are deterministic based on answer quality
- Real API provides more nuanced, context-aware feedback
- Switch modes anytime by changing env variable
- Restart dev server after changing `.env.local`

---

**Created**: October 15, 2025
**Status**: ✅ Active and tested
