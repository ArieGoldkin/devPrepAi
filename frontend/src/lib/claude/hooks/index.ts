/**
 * Claude API Hooks - Barrel Export
 * Optimized hooks for Claude AI integration with smart caching
 */

// Question Generation
export {
  useGenerateQuestions,
  usePrefetchQuestions,
  questionUtils,
} from "./useQuestionGeneration";

// Answer Evaluation
export { useEvaluateAnswer } from "./useAnswerEvaluation";

// Assessment Results & Sessions
export {
  usePracticeSession,
  useApiCostTracking,
  assessmentUtils,
} from "./useAssessmentResults";

// Legacy compatibility - combine utils under original export name
import { assessmentUtils } from "./useAssessmentResults";
import { questionUtils } from "./useQuestionGeneration";

export const claudeQueryUtils = {
  ...questionUtils,
  ...assessmentUtils,
};
