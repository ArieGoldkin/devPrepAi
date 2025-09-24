# Zustand + React Query State Management Guide
## Complete Q&A State Management Implementation

---

## 📊 State Management Architecture

### Clear Separation of Concerns

```typescript
// ✅ React Query: Server State (External Data)
- Question content from AI
- Evaluation results from AI  
- User progress from API
- Session history from database

// ✅ Zustand: Client State (UI & Interactions)
- Current question index
- Hints revealed count
- Timer/stopwatch state
- User's current input
- UI preferences
- Temporary session data
```

---

## 🏗 Updated Store Structure

### 1. Add Questions Slice to Your Store (`/frontend/src/store/useAppStore.ts`)

```typescript
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

// Import existing slices
import { createUserSlice } from "./slices/userSlice";
import { createAssessmentSlice } from "./slices/assessmentSlice";
import { createResultsSlice } from "./slices/resultsSlice";
import { createStreakSlice } from "./slices/streakSlice";

// NEW: Import questions slice
import {
  createQuestionsSlice,
  type IQuestionsState,
  type IQuestionsActions,
} from "./slices/questionsSlice";

// === UPDATED COMBINED TYPES ===
export interface IAppState
  extends IUserState,
    IAssessmentState,
    IResultsState,
    IStreakState,
    IQuestionsState {} // Added

export interface IAppActions
  extends IUserActions,
    IAssessmentActions,
    IResultsActions,
    IStreakActions,
    IQuestionsActions {} // Added

// === UPDATED STORE ===
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
        userProfile: state.userProfile,
        assessmentResults: state.assessmentResults,
        streak: state.streak,
        // Persist some question state
        topicPerformance: state.topicPerformance,
        currentDifficulty: state.currentDifficulty,
        weakAreas: state.weakAreas,
        strongAreas: state.strongAreas,
        // Don't persist active session data
      }),
    },
  ),
);

// === NEW SELECTORS ===
export const useQuestionsState = () =>
  useAppStore((state) => ({
    currentQuestionIndex: state.currentQuestionIndex,
    isAnswering: state.isAnswering,
    showSolution: state.showSolution,
    currentHintsRevealed: state.currentHintsRevealed,
    currentAnswer: state.currentAnswer,
    sessionQuestions: state.sessionQuestions,
  }));

export const useQuestionsActions = () =>
  useAppStore((state) => ({
    startQuestionSession: state.startQuestionSession,
    nextQuestion: state.nextQuestion,
    previousQuestion: state.previousQuestion,
    revealNextHint: state.revealNextHint,
    setCurrentAnswer: state.setCurrentAnswer,
    completeQuestion: state.completeQuestion,
    toggleSolution: state.toggleSolution,
  }));

export const useAdaptiveLearning = () =>
  useAppStore((state) => ({
    currentDifficulty: state.currentDifficulty,
    recommendedDifficulty: state.recommendedDifficulty,
    topicPerformance: state.topicPerformance,
    weakAreas: state.weakAreas,
    calculateRecommendedDifficulty: state.calculateRecommendedDifficulty,
    identifyWeakAreas: state.identifyWeakAreas,
  }));
```

---

## 🔄 React Query + Zustand Integration Pattern

### 2. Create React Query Hooks (`/frontend/src/hooks/queries/useQuestionsQuery.ts`)

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aiService } from '@/services/ai-service';
import { useAppStore } from '@/store/useAppStore';
import type { IQuestion, IGenerateQuestionsRequest } from '@/types/ai';

// Hook for generating questions
export function useGenerateQuestions(
  params?: Partial<IGenerateQuestionsRequest>,
  options?: { enabled?: boolean }
) {
  const userProfile = useAppStore(state => state.userProfile);
  const currentDifficulty = useAppStore(state => state.currentDifficulty);
  
  const finalParams: IGenerateQuestionsRequest = {
    profile: userProfile!,
    difficulty: currentDifficulty,
    count: 5,
    ...params,
  };

  return useQuery({
    queryKey: ['questions', finalParams],
    queryFn: async () => {
      // Fetch from AI
      const questions = await aiService.generateQuestions(finalParams);
      
      // Store in Zustand for UI state management
      useAppStore.getState().startQuestionSession(questions);
      
      return questions;
    },
    enabled: !!userProfile && (options?.enabled ?? true),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for evaluating answers
export function useEvaluateAnswer() {
  const queryClient = useQueryClient();
  const { completeQuestion, updatePerformance } = useAppStore.getState();

  return useMutation({
    mutationFn: async (data: {
      questionId: string;
      question: string;
      userAnswer: string;
      correctAnswer?: string;
    }) => {
      return await aiService.evaluateAnswer(data);
    },
    
    onMutate: async (data) => {
      // Optimistic update - show loading state
      useAppStore.setState({ isAnswering: true });
      
      // Cancel any in-flight queries
      await queryClient.cancelQueries({ 
        queryKey: ['evaluation', data.questionId] 
      });
      
      return { questionId: data.questionId };
    },
    
    onSuccess: (result, variables) => {
      // Cache the evaluation result
      queryClient.setQueryData(
        ['evaluation', variables.questionId],
        result
      );
      
      // Update Zustand with performance metrics
      const currentQuestion = useAppStore.getState().sessionQuestions
        .find(q => q.id === variables.questionId);
        
      if (currentQuestion) {
        completeQuestion(
          variables.questionId,
          result.score >= 70, // Consider 70+ as solved
          result.feedback
        );
        
        updatePerformance(
          result.score >= 70,
          currentQuestion.category || 'general',
          Date.now() - new Date().getTime() // Calculate time spent
        );
      }
    },
    
    onError: (error, variables) => {
      console.error('Evaluation failed:', error);
      // Reset answering state
      useAppStore.setState({ isAnswering: false });
    },
    
    onSettled: () => {
      useAppStore.setState({ isAnswering: false });
    },
  });
}

// Hook for fetching hints (if hints come from API)
export function useQuestionHints(questionId: string) {
  return useQuery({
    queryKey: ['hints', questionId],
    queryFn: async () => {
      // If hints are generated separately
      return await aiService.generateHints(questionId);
    },
    staleTime: Infinity, // Hints don't change
    enabled: !!questionId,
  });
}
```

---

## 🎮 Usage in Components

### 3. Practice Page Implementation

```typescript
// /frontend/src/app/practice/page.tsx
'use client';

import { useEffect } from 'react';
import { useGenerateQuestions, useEvaluateAnswer } from '@/hooks/queries/useQuestionsQuery';
import { useAppStore, useQuestionsState, useQuestionsActions } from '@/store/useAppStore';
import { QuestionCard } from '@/components/features/QuestionCard';
import { HintSystem } from '@/components/features/HintSystem';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

export default function PracticePage() {
  // React Query: Server state
  const { data: questions, isLoading, error } = useGenerateQuestions();
  const evaluateMutation = useEvaluateAnswer();
  
  // Zustand: UI state
  const {
    currentQuestionIndex,
    currentAnswer,
    showSolution,
    currentHintsRevealed,
    sessionQuestions,
  } = useQuestionsState();
  
  const {
    nextQuestion,
    previousQuestion,
    setCurrentAnswer,
    revealNextHint,
    toggleSolution,
    startAnswering,
  } = useQuestionsActions();
  
  // Current question from Zustand (populated by React Query)
  const currentQuestion = sessionQuestions[currentQuestionIndex];
  
  // Handle answer submission
  const handleSubmit = async () => {
    if (!currentQuestion || !currentAnswer.trim()) return;
    
    // Start interaction tracking
    startAnswering(currentQuestion.id);
    
    // Use React Query mutation
    await evaluateMutation.mutateAsync({
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: currentAnswer,
    });
  };
  
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} />;
  if (!currentQuestion) return <NoQuestionsDisplay />;
  
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Question Progress */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Question {currentQuestionIndex + 1} of {sessionQuestions.length}
        </span>
        <div className="flex gap-2">
          <Button 
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button 
            onClick={nextQuestion}
            disabled={currentQuestionIndex === sessionQuestions.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
      
      {/* Question Display */}
      <QuestionCard
        question={currentQuestion}
        value={currentAnswer}
        onChange={setCurrentAnswer}
        onSubmit={handleSubmit}
        isEvaluating={evaluateMutation.isPending}
      />
      
      {/* Hint System (UI state from Zustand) */}
      <HintSystem
        hints={currentQuestion.hints || []}
        revealedCount={currentHintsRevealed}
        onRevealHint={() => revealNextHint(currentQuestion.id, currentQuestion.hints?.length || 0)}
      />
      
      {/* Solution Toggle (UI state from Zustand) */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={toggleSolution}
        >
          {showSolution ? 'Hide' : 'Show'} Solution
        </Button>
      </div>
      
      {/* Solution Display */}
      {showSolution && (
        <SolutionDisplay solution={currentQuestion.solution} />
      )}
      
      {/* Evaluation Result (from React Query cache) */}
      {evaluateMutation.isSuccess && (
        <EvaluationResult 
          result={evaluateMutation.data}
          onContinue={() => {
            setCurrentAnswer('');
            nextQuestion();
          }}
        />
      )}
    </div>
  );
}
```

### 4. Hint System Component

```typescript
// /frontend/src/components/features/HintSystem.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Lightbulb, Eye, Brain, Code } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HintSystemProps {
  hints: string[];
  revealedCount: number;
  onRevealHint: () => void;
}

export function HintSystem({ 
  hints, 
  revealedCount, 
  onRevealHint 
}: HintSystemProps) {
  const [showHints, setShowHints] = useState(false);
  
  const hintIcons = [Lightbulb, Eye, Brain, Code];
  const hintLabels = ['Gentle Nudge', 'Concept', 'Approach', 'Pseudocode'];
  
  if (!hints || hints.length === 0) return null;
  
  return (
    <div className="space-y-4">
      {/* Toggle Hints Section */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowHints(!showHints)}
        className="gap-2"
      >
        <Lightbulb className="w-4 h-4" />
        {showHints ? 'Hide' : 'Show'} Hints ({revealedCount}/{hints.length})
      </Button>
      
      {/* Hints Display */}
      {showHints && (
        <div className="space-y-3">
          {hints.slice(0, revealedCount).map((hint, index) => {
            const Icon = hintIcons[index] || Lightbulb;
            const label = hintLabels[index] || `Hint ${index + 1}`;
            
            return (
              <div
                key={index}
                className={cn(
                  "flex gap-3 p-4 rounded-lg border",
                  "bg-gradient-to-r from-blue-50 to-purple-50",
                  "animate-fade-in"
                )}
              >
                <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-medium text-blue-700">
                    {label}
                  </p>
                  <p className="text-sm text-gray-700">{hint}</p>
                </div>
              </div>
            );
          })}
          
          {/* Reveal Next Hint Button */}
          {revealedCount < hints.length && (
            <Button
              onClick={onRevealHint}
              variant="ghost"
              size="sm"
              className="w-full justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Reveal Next Hint ({revealedCount + 1}/{hints.length})
            </Button>
          )}
          
          {/* All Hints Revealed */}
          {revealedCount === hints.length && (
            <p className="text-sm text-center text-gray-500 italic">
              All hints revealed. Try solving it now! 💪
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## 📊 Performance Tracking Integration

### 5. Adaptive Learning Dashboard

```typescript
// /frontend/src/components/features/AdaptiveLearningStats.tsx
import { useAdaptiveLearning } from '@/store/useAppStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';

export function AdaptiveLearningStats() {
  const {
    currentDifficulty,
    recommendedDifficulty,
    topicPerformance,
    weakAreas,
    identifyWeakAreas,
  } = useAdaptiveLearning();
  
  useEffect(() => {
    identifyWeakAreas();
  }, [topicPerformance]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Difficulty Adjustment */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Current Difficulty</span>
          <div className="flex items-center gap-2">
            <span className="font-semibold">{currentDifficulty}/10</span>
            {recommendedDifficulty > currentDifficulty && (
              <TrendingUp className="w-4 h-4 text-green-600" />
            )}
            {recommendedDifficulty < currentDifficulty && (
              <TrendingDown className="w-4 h-4 text-orange-600" />
            )}
          </div>
        </div>
        
        {/* Topic Performance */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Topic Performance</h4>
          {Array.from(topicPerformance.entries()).map(([topic, score]) => (
            <div key={topic} className="flex justify-between">
              <span className="text-sm">{topic}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${score * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600">
                  {Math.round(score * 100)}%
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Weak Areas */}
        {weakAreas.length > 0 && (
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-600" />
              <h4 className="text-sm font-medium text-orange-900">
                Focus Areas
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {weakAreas.map(area => (
                <span
                  key={area}
                  className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
```

---

## 🎯 Key Patterns & Best Practices

### Pattern 1: Data Flow
```typescript
// 1. Fetch with React Query
const { data } = useGenerateQuestions();

// 2. Store in Zustand for UI state
useEffect(() => {
  if (data) {
    startQuestionSession(data);
  }
}, [data]);

// 3. Read from Zustand for UI
const { currentQuestionIndex } = useQuestionsState();
```

### Pattern 2: Optimistic Updates
```typescript
// Update UI immediately
setCurrentAnswer(newAnswer);

// Then sync with server
evaluateMutation.mutate({ answer: newAnswer });
```

### Pattern 3: Cache Invalidation
```typescript
// After completing a session
queryClient.invalidateQueries({ 
  queryKey: ['questions'] 
});
```

---

## 📁 File Structure

```
frontend/src/
├── store/
│   ├── useAppStore.ts          # Main store (updated)
│   └── slices/
│       ├── questionsSlice.ts   # NEW: Questions state
│       ├── userSlice.ts        # Existing
│       ├── assessmentSlice.ts  # Existing
│       ├── resultsSlice.ts     # Existing
│       └── streakSlice.ts      # Existing
├── hooks/
│   ├── queries/                # React Query hooks
│   │   ├── useQuestionsQuery.ts
│   │   └── useEvaluationQuery.ts
│   └── mutations/              # React Query mutations
│       └── useAnswerMutation.ts
└── components/
    └── features/
        ├── HintSystem.tsx      # Hint UI component
        ├── QuestionCard.tsx    # Question display
        └── AdaptiveLearning.tsx # Stats dashboard
```

---

## ✅ Implementation Checklist

### Step 1: Add Questions Slice (30 min)
- [ ] Copy questionsSlice.ts to your project
- [ ] Import in useAppStore.ts
- [ ] Add to store creation
- [ ] Update type definitions

### Step 2: Setup React Query (1 hour)
- [ ] Install packages
- [ ] Create query hooks
- [ ] Add to components

### Step 3: Update Components (2 hours)
- [ ] Update PracticePage
- [ ] Create HintSystem component
- [ ] Add adaptive learning stats

### Step 4: Test Integration (1 hour)
- [ ] Verify data flow
- [ ] Check persistence
- [ ] Test hint system
- [ ] Monitor performance

---

## 🎉 Result

With this setup, you have:
- **Clean separation** between server and client state
- **Type-safe** state management with TypeScript
- **Optimistic updates** for better UX
- **Persistent** learning metrics
- **Adaptive** difficulty adjustment
- **Progressive** hint system

The architecture scales well and maintains your clean code principles!