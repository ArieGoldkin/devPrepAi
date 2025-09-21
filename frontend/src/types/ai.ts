/**
 * DevPrep AI - Simple Type Definitions
 * Clean types for interview prep platform
 */

// Interview type options
export type InterviewType = "coding" | "system-design" | "behavioral";

// Company size preference
export type CompanySize = "startup" | "mid-size" | "enterprise" | "any";

// Role focus areas
export type RoleFocus =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "mobile";

// User profile for interview preparation
export interface IUserProfile {
  experienceLevel: "junior" | "mid" | "senior";
  yearsOfExperience: number;
  technologies: string[];
  roleFocus: RoleFocus;
  interviewType: InterviewType;
  companySizePreference: CompanySize;
  previousInterviewExperience: "none" | "some" | "extensive";
  targetRole?: string; // Optional field for specific role targeting
}

// Interview question structure
export interface IQuestion {
  id: string;
  title: string;
  content: string;
  type: "behavioral" | "system-design" | "coding" | "conceptual";
  difficulty: number;
  category: string;
  hints: string[];
  solution: string;
  timeEstimate: number; // in minutes
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Request/Response types for AI service
export interface IGenerateQuestionsRequest {
  profile: IUserProfile;
  count: number;
  difficulty: number;
  type: IQuestion["type"];
}

export interface IGenerateQuestionsResponse {
  questions: IQuestion[];
  totalGenerated: number;
}

export interface IEvaluateAnswerRequest {
  question: IQuestion;
  answer: string;
}

export interface IAnswerFeedback {
  score: number; // 0-100
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  overallFeedback: string;
}

export interface IEvaluateAnswerResponse {
  feedback: IAnswerFeedback;
  success: boolean;
}

export interface IExplainConceptRequest {
  concept: string;
  userLevel: IUserProfile["experienceLevel"];
  includeExamples: boolean;
}

export interface IConceptExplanation {
  concept: string;
  explanation: string;
  examples: string[];
  keyPoints: string[];
  relatedConcepts: string[];
}

export interface IExplainConceptResponse {
  explanation: IConceptExplanation;
  success: boolean;
}

// AI Service types
export interface IClaudeResponse {
  content: Array<{
    type: "text";
    text: string;
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface ICompletionOptions {
  maxTokens?: number;
  temperature?: number;
}

// API response wrapper
export interface IAPIResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// Assessment results types
export interface IQuestionResult {
  question: IQuestion;
  userAnswer: string;
  feedback: IAnswerFeedback;
  timeSpent: number; // in seconds
}

export interface IAssessmentResults {
  questions: IQuestionResult[];
  totalTimeSpent: number; // in seconds
  totalTimeAllocated: number; // in seconds
  completedAt: string;
}
