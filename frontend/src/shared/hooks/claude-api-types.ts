/**
 * Type Definitions for Claude API Integration
 */

export interface IQuestionGenerationParams {
  userProfile: {
    experienceLevel: string;
    yearsOfExperience: number;
    roleFocus: string;
    companySize: string;
    previousInterviewExperience: string;
  };
  focus: {
    technologies: string[];
    areas: string[];
  };
  settings: {
    numberOfQuestions: number;
    duration: number;
    difficulty: string;
    questionTypes: string[];
  };
}

export interface IGeneratedQuestion {
  id: string;
  type: "coding" | "system-design" | "behavioral" | "technical";
  difficulty: "easy" | "medium" | "hard";
  title: string;
  content: string;
  context?: string;
  hints?: string[];
  expectedApproach?: string;
  sampleAnswer?: string;
  evaluationCriteria?: string[];
  timeEstimate?: number;
  tags?: string[];
}

export interface IEvaluationParams {
  question: IGeneratedQuestion;
  userAnswer: string;
  timeSpent?: number;
  hintsUsed?: number;
}

export interface IEvaluationResult {
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    suggestions: string[];
  };
  correctness: "correct" | "partially-correct" | "incorrect";
  explanation?: string;
  sampleSolution?: string;
}

export interface IConceptExplanationParams {
  concept: string;
  context?: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

export interface IConceptExplanation {
  title: string;
  summary: string;
  explanation: string;
  examples?: string[];
  relatedConcepts?: string[];
  resources?: Array<{
    title: string;
    url?: string;
    type: "article" | "video" | "documentation" | "tutorial";
  }>;
}

export interface IClaudeAPIError {
  code: string;
  message: string;
  details?: unknown;
  timestamp: string;
}
