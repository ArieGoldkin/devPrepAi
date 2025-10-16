/**
 * Claude API Hooks - Barrel Export
 * Optimized hooks for Claude AI integration with smart caching
 */

// Question Generation
export {
  useGenerateQuestions,
  useGenerateQuestionsMutation,
  usePrefetchQuestions,
  questionUtils,
} from "./useQuestionGeneration";

// Answer Evaluation
export { useEvaluateAnswer } from "./useAnswerEvaluation";
