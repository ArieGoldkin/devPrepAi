# DevPrep AI - Unified Implementation Plan
## Q&A Platform with React Query, AI Hints & Conversational Features

---

## 📊 Current Status Overview

### ✅ Completed (Based on progress-plan.md)
- **Phase 1-4**: Foundation, Core Features, Assessment System, UX/UI Redesign
- **Tech Stack**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **AI Integration**: Anthropic Claude API (claude-3-5-sonnet)
- **State Management**: Zustand with localStorage persistence
- **Code Quality**: ESLint (max complexity 15, max 180 lines per file)

### 🎯 Next Focus Areas
1. **React Query Integration** - Better server state management
2. **AI Hint System** - Progressive hints for learning
3. **Conversational Q&A** - More engaging interaction flow
4. **Adaptive Learning** - Difficulty adjustment based on performance

---

## 🏗 Architecture Strategy

### State Management Separation

Your current Zustand setup (userSlice, assessmentSlice, resultsSlice, streakSlice) is well-structured. We'll add a questionsSlice for Q&A state management:

```typescript
// ✅ React Query: Server State (API calls, caching)
- Question generation from AI (Claude API)
- Answer evaluation from AI
- Hints generation (if separate API call)
- User progress fetching (future)
- Session history (future database)

// ✅ Zustand: Client State (UI interactions) 
// You already have these slices:
- userSlice: User profile, preferences
- assessmentSlice: Assessment state, timer, answers
- resultsSlice: Assessment results history
- streakSlice: Activity tracking

// NEW questionsSlice will handle:
- currentQuestionIndex: Navigation position
- sessionQuestions: Current session's questions
- hintUsage: Map of hints revealed per question
- questionInteractions: Time spent, attempts, completion
- currentAnswer: User's input (temporary)
- showSolution: UI toggle state
- adaptiveLearning: Difficulty, performance metrics
```

### Questions Slice Integration
The new questionsSlice.ts (see file created) provides:
- Complete session management
- Hint revelation tracking
- Performance metrics
- Adaptive difficulty calculation
- Topic performance tracking
- Weak area identification

---

## 📦 Phase 5: Zustand Questions State Setup (Week 7 - Day 1)

### Integrate Questions Slice with Your Existing Store

#### 1. Add Questions Slice (`/frontend/src/store/slices/questionsSlice.ts`)
Use the complete questionsSlice.ts file created, which includes:
- Session management (start, end, navigation)
- Hint tracking (per question, with usage stats)
- Performance metrics (success rate, time tracking)
- Adaptive learning (difficulty adjustment, weak areas)
- Question interactions (attempts, completion, time spent)

#### 2. Update Your Store (`/frontend/src/store/useAppStore.ts`)
```typescript
// Import the new slice
import {
  createQuestionsSlice,
  type IQuestionsState,
  type IQuestionsActions,
} from "./slices/questionsSlice";

// Update combined types
export interface IAppState
  extends IUserState,
    IAssessmentState,
    IResultsState,
    IStreakState,
    IQuestionsState {} // Added

// Update store creation
export const useAppStore = create<IAppState & IAppActions>()(
  persist(
    (...args) => ({
      ...createUserSlice(...args),
      ...createAssessmentSlice(...args),
      ...createResultsSlice(...args),
      ...createStreakSlice(...args),
      ...createQuestionsSlice(...args), // NEW
    }),
    {
      name: "devprep-app-store",
      partialize: (state) => ({
        // Existing persistence
        userProfile: state.userProfile,
        assessmentResults: state.assessmentResults,
        streak: state.streak,
        // NEW: Persist learning metrics
        topicPerformance: state.topicPerformance,
        currentDifficulty: state.currentDifficulty,
        weakAreas: state.weakAreas,
      }),
    },
  ),
);
```

---

## 📦 Phase 6: React Query Integration (Week 7 - Days 2-5)

### Day 1-2: Setup & Configuration
```bash
# Install dependencies
npm install @tanstack/react-query @tanstack/react-query-devtools
```

#### 1. Create Query Client (`/frontend/src/lib/query-client.ts`)
```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});
```

#### 2. Wrap App with Provider (`/frontend/src/app/layout.tsx`)
```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/query-client';

export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

### Day 3-4: Create React Query Hooks with Zustand Integration

#### Questions Hook (`/frontend/src/hooks/useQuestionsQuery.ts`)
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '@/services/ai-service';
import { useAppStore } from '@/store/useAppStore';

export const useGenerateQuestions = (params: QuestionParams) => {
  const userProfile = useAppStore(state => state.userProfile);
  const currentDifficulty = useAppStore(state => state.currentDifficulty);
  
  return useQuery({
    queryKey: ['questions', params.technology, params.difficulty],
    queryFn: async () => {
      // Fetch from AI
      const questions = await aiService.generateQuestions({
        ...params,
        profile: userProfile,
        difficulty: currentDifficulty,
      });
      
      // Store in Zustand for UI state management
      useAppStore.getState().startQuestionSession(questions);
      
      return questions;
    },
    enabled: !!params.technology && !!userProfile,
    staleTime: 10 * 60 * 1000, // Cache for 10 minutes
  });
};

export const useEvaluateAnswer = () => {
  const queryClient = useQueryClient();
  const { completeQuestion, updatePerformance } = useAppStore.getState();
  
  return useMutation({
    mutationFn: (data: EvaluationData) => 
      aiService.evaluateAnswer(data),
    onSuccess: (result, variables) => {
      // Update React Query cache
      queryClient.setQueryData(
        ['evaluation', variables.questionId],
        result
      );
      
      // Update Zustand performance metrics
      completeQuestion(variables.questionId, result.score >= 70);
      updatePerformance(
        result.score >= 70,
        variables.topic,
        variables.timeSpent
      );
    },
  });
};
```

### Day 5: Migrate Existing API Calls

#### Before (Direct Fetch):
```typescript
// ❌ Old approach
const [loading, setLoading] = useState(false);
const [questions, setQuestions] = useState([]);

const fetchQuestions = async () => {
  setLoading(true);
  try {
    const data = await aiService.generateQuestions(params);
    setQuestions(data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
```

#### After (React Query):
```typescript
// ✅ New approach
const { data: questions, isLoading, error } = useGenerateQuestions(params);
```

---

## 🎯 Phase 7: AI Hint System (Week 8)

### Progressive Hint Levels
```typescript
interface HintSystem {
  level1: string;    // Gentle nudge (e.g., "Think about the data structure")
  level2: string;    // Concept hint (e.g., "Consider using a hash map")
  level3: string;    // Approach hint (e.g., "Track frequency with a map")
  level4: string;    // Pseudocode (partial solution structure)
  solution: string;  // Full explanation (only after attempt)
}
```

### Implementation (`/frontend/src/components/features/HintSystem.tsx`)
```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Brain, Code, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

interface HintSystemProps {
  hints: string[];
  questionId: string;
  onHintUsed: (level: number) => void;
}

export function HintSystem({ hints, questionId, onHintUsed }: HintSystemProps) {
  const [revealedLevel, setRevealedLevel] = useState(0);
  const { incrementHintUsage } = useAppStore();
  
  const revealNextHint = () => {
    if (revealedLevel < hints.length) {
      setRevealedLevel(prev => prev + 1);
      onHintUsed(revealedLevel + 1);
      incrementHintUsage(questionId);
    }
  };
  
  const hintIcons = [Lightbulb, Brain, Code, CheckCircle];
  
  return (
    <div className="space-y-3">
      {hints.slice(0, revealedLevel).map((hint, index) => (
        <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
          {React.createElement(hintIcons[index], { 
            className: "w-5 h-5 text-blue-600" 
          })}
          <p className="text-sm text-gray-700">{hint}</p>
        </div>
      ))}
      
      {revealedLevel < hints.length && (
        <Button 
          onClick={revealNextHint}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          Show Hint ({revealedLevel + 1}/{hints.length})
        </Button>
      )}
    </div>
  );
}
```

### AI Prompt for Hint Generation
```typescript
// /frontend/src/services/anthropic/prompts/hints.ts
export const generateHintsPrompt = (question: string) => `
Generate 4 progressive hints for this coding question:
"${question}"

Return JSON with this exact structure:
{
  "hints": [
    "Level 1: Gentle conceptual nudge without revealing approach",
    "Level 2: Mention relevant data structure or algorithm category",
    "Level 3: Describe the approach without code",
    "Level 4: Provide pseudocode structure"
  ]
}

Make hints progressively more revealing but never give the complete solution.
`;
```

---

## 💬 Phase 8: Conversational Q&A Flow (Week 8-9)

### Enhanced Question Generation
```typescript
// /frontend/src/services/anthropic/prompts/conversational.ts
export const conversationalQuestionPrompt = (profile: UserProfile) => `
You're a friendly technical interviewer. Generate questions that:
1. Start with context ("Let's imagine you're building...")
2. Include real-world scenarios
3. Have follow-up questions ready
4. Vary in type (coding, system design, debugging, behavioral)

User Profile:
- Level: ${profile.experienceLevel}
- Technologies: ${profile.technologies.join(', ')}
- Interview Type: ${profile.interviewType}

Generate 5 diverse questions with conversational intros and hints.
Return as JSON with structure:
{
  "questions": [{
    "id": "q1",
    "type": "coding|system|debug|behavioral",
    "intro": "Conversational introduction...",
    "question": "The actual question...",
    "hints": ["hint1", "hint2", "hint3", "hint4"],
    "followUp": ["What if...", "How would you handle..."]
  }]
}
`;
```

### Interactive Question Component
```typescript
// /frontend/src/components/features/ConversationalQuestion.tsx
export function ConversationalQuestion({ question, onAnswer }) {
  const [stage, setStage] = useState<'intro' | 'question' | 'followup'>('intro');
  const [showHints, setShowHints] = useState(false);
  
  return (
    <Card className="p-6">
      {/* Conversational intro with typing animation */}
      {stage === 'intro' && (
        <div className="space-y-4">
          <TypewriterText text={question.intro} />
          <Button onClick={() => setStage('question')}>
            Let's dive in →
          </Button>
        </div>
      )}
      
      {/* Main question with hints */}
      {stage === 'question' && (
        <>
          <QuestionDisplay question={question} />
          <HintSystem hints={question.hints} />
          <AnswerInput onSubmit={(answer) => {
            onAnswer(answer);
            setStage('followup');
          }} />
        </>
      )}
      
      {/* Follow-up questions */}
      {stage === 'followup' && (
        <FollowUpQuestions 
          questions={question.followUp}
          onComplete={() => /* next question */}
        />
      )}
    </Card>
  );
}
```

---

## 📈 Phase 9: Adaptive Learning System (Week 9)

### Performance Tracking
```typescript
// /frontend/src/store/slices/adaptiveLearning.ts
interface AdaptiveState {
  performance: {
    correctRate: number;
    avgTimePerQuestion: number;
    hintsUsedRate: number;
    topicScores: Map<string, number>;
  };
  difficulty: {
    current: number; // 1-10
    recommended: number;
    momentum: 'improving' | 'stable' | 'struggling';
  };
  actions: {
    updatePerformance: (result: QuestionResult) => void;
    calculateNextDifficulty: () => number;
    getWeakAreas: () => string[];
  };
}
```

### Difficulty Adjustment Algorithm
```typescript
export const calculateDifficulty = (performance: Performance): number => {
  const { correctRate, hintsUsedRate, avgTime } = performance;
  
  // Factors for adjustment
  const correctFactor = correctRate > 0.8 ? 1.2 : 
                        correctRate < 0.5 ? 0.8 : 1.0;
  const hintFactor = hintsUsedRate > 0.6 ? 0.9 : 1.0;
  const timeFactor = avgTime < 120 ? 1.1 : // Fast solver
                     avgTime > 600 ? 0.9 : 1.0; // Struggling
  
  const adjustment = correctFactor * hintFactor * timeFactor;
  
  return Math.max(1, Math.min(10, 
    Math.round(performance.currentDifficulty * adjustment)
  ));
};
```

---

## 🔄 Integration with Existing Codebase

### Update Zustand Store (`/frontend/src/store/useAppStore.ts`)
```typescript
// Add new slices for questions and hints
import { createQuestionsSlice } from './slices/questions';
import { createHintsSlice } from './slices/hints';
import { createAdaptiveSlice } from './slices/adaptive';

export const useAppStore = create((...args) => ({
  ...createProfileSlice(...args),
  ...createQuestionsSlice(...args),
  ...createHintsSlice(...args),
  ...createAdaptiveSlice(...args),
}));
```

### Update Practice Page to Use React Query
```typescript
// /frontend/src/app/practice/page.tsx
export default function PracticePage() {
  const profile = useAppStore(state => state.profile);
  
  // React Query for API calls
  const { data: questions, isLoading } = useGenerateQuestions({
    ...profile,
    difficulty: adaptiveDifficulty,
  });
  
  const evaluateMutation = useEvaluateAnswer();
  
  // Zustand for UI state
  const { currentQuestionIndex, setCurrentQuestion } = useAppStore();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <ConversationalQuestion
      question={questions[currentQuestionIndex]}
      onAnswer={(answer) => {
        evaluateMutation.mutate({ 
          question: questions[currentQuestionIndex],
          answer 
        });
      }}
    />
  );
}
```

---

## 📊 Implementation Checklist

### Week 7: React Query Foundation
- [ ] Install and configure React Query
- [ ] Create query client with optimal settings
- [ ] Implement useGenerateQuestions hook
- [ ] Implement useEvaluateAnswer mutation
- [ ] Add React Query DevTools
- [ ] Migrate existing API calls
- [ ] Setup error boundaries
- [ ] Add loading skeletons

### Week 8: Hint System & Conversational UI
- [ ] Create HintSystem component
- [ ] Implement progressive hint levels
- [ ] Add hint generation to AI prompts
- [ ] Build ConversationalQuestion component
- [ ] Add typing animation for intros
- [ ] Implement follow-up questions
- [ ] Track hint usage metrics
- [ ] Update question generation prompts

### Week 9: Adaptive Learning
- [ ] Create adaptive learning slice
- [ ] Implement performance tracking
- [ ] Build difficulty adjustment algorithm
- [ ] Add weak area identification
- [ ] Create personalized practice sessions
- [ ] Implement spaced repetition logic
- [ ] Add progress visualization
- [ ] Setup performance analytics

---

## 🚀 Migration Strategy

### Step 1: Non-Breaking Additions (Week 7)
```typescript
// Keep existing code working while adding React Query
// Old code continues to work
const [questions, setQuestions] = useState([]);

// New code runs in parallel
const { data: queryQuestions } = useGenerateQuestions(params);

// Gradually migrate components
```

### Step 2: Component Migration (Week 8)
- Start with leaf components (QuestionCard, HintSystem)
- Move to container components (PracticePage, AssessmentPage)
- Update parent components last

### Step 3: Cleanup (Week 9)
- Remove old API service calls
- Delete unused state management
- Consolidate duplicate logic
- Update documentation

---

## 📈 Success Metrics

### Technical Metrics
- **API Call Reduction**: 40% fewer calls via caching
- **Load Time**: <2s for question generation
- **Cache Hit Rate**: >60% for repeated queries
- **Error Rate**: <1% for API failures

### User Engagement Metrics
- **Hint Usage**: 30-40% of questions (healthy range)
- **Completion Rate**: >70% of started sessions
- **Difficulty Progression**: Steady increase over time
- **Return Rate**: >50% weekly active users

### Performance Thresholds
```typescript
const PERFORMANCE_GOALS = {
  apiResponseTime: 1500, // ms
  cacheHitRate: 0.6,     // 60%
  errorRate: 0.01,       // 1%
  bundleSize: 500,       // KB
  lighthouseScore: 90,   // /100
};
```

---

## ⚠️ Risk Mitigation

### Potential Issues & Solutions

| Risk | Impact | Solution |
|------|--------|----------|
| React Query learning curve | Medium | Start with simple queries, use DevTools |
| Cache invalidation complexity | High | Clear naming conventions, document strategy |
| Hint quality from AI | High | Validate with prompt engineering, add fallbacks |
| State synchronization | Medium | Clear separation of concerns, use React Query for server state only |
| Bundle size increase | Low | Use code splitting, lazy load React Query DevTools |

---

## 🎯 Immediate Next Steps

### This Week (Priority Order)
1. **Install React Query** (30 min)
   ```bash
   npm install @tanstack/react-query @tanstack/react-query-devtools
   ```

2. **Create Query Client** (30 min)
   - Setup with conservative cache settings
   - Add to app layout provider

3. **First Hook Migration** (2 hours)
   - Start with `useGenerateQuestions`
   - Test thoroughly before proceeding

4. **Add Hint System** (3 hours)
   - Create component
   - Update AI prompts
   - Wire to existing QuestionCard

5. **Deploy & Monitor** (1 hour)
   - Check bundle size impact
   - Monitor API call reduction
   - Gather user feedback

---

## 📚 Resources

### Documentation
- [React Query Docs](https://tanstack.com/query/latest)
- [React Query with Next.js](https://tanstack.com/query/latest/docs/react/guides/nextjs)
- [Zustand + React Query Pattern](https://tkdodo.eu/blog/zustand-and-react-query)

### Code Examples
- [React Query Examples](https://github.com/TanStack/query/tree/main/examples)
- [Progressive Hints Pattern](https://github.com/algolia/docsearch/blob/main/packages/docsearch-react/src/Hit.tsx)
- [Adaptive Learning Algorithm](https://github.com/Khan/khan-exercises)

---

## 🔄 Continuous Improvement

### Weekly Reviews
- Monitor React Query cache performance
- Analyze hint usage patterns
- Review difficulty progression data
- Gather user feedback on conversational flow

### Monthly Optimizations
- Adjust cache times based on usage patterns
- Refine hint generation prompts
- Optimize difficulty algorithm
- Improve question variety

---

## Summary

This plan integrates React Query while maintaining your clean architecture and YAGNI principle. The phased approach allows you to:

1. **Immediately benefit** from React Query's caching
2. **Enhance user experience** with progressive hints
3. **Increase engagement** through conversational UI
4. **Personalize learning** with adaptive difficulty

Each phase is independently valuable and can be deployed separately, reducing risk and allowing for quick wins.

**Estimated Total Time**: 2-3 weeks for full implementation
**Recommended Approach**: Start with React Query (biggest immediate impact), then add features based on user feedback.