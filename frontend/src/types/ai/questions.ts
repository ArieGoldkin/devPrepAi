/**
 * Question Types
 * Types for questions, hints, examples, and progressive disclosure
 */

// Phase II: Question section types for progressive disclosure
export interface IQuestionSection {
  type: "context" | "examples" | "constraints" | "edge-cases";
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
}

// Phase II: Hint level structure
export interface IHintLevel {
  level: number; // 1-4
  content: string;
  penalty: number; // Point deduction
  icon: string; // Emoji or icon identifier
}

// Phase II: Example structure for questions
export interface IQuestionExample {
  input: string;
  output: string;
  explanation?: string;
}

// Phase II: Progressive disclosure state
export interface IProgressiveDisclosureState {
  questionId: string;
  expandedSections: string[];
}

// Phase II: Auto-save status tracking
export interface IAutoSaveStatus {
  status: "typing" | "saving" | "saved" | "error";
  lastSaved?: string;
  error?: string;
}

// Interview question structure (enhanced for Phase II)
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
  // Phase II additions
  sections?: IQuestionSection[]; // Progressive disclosure content
  hintLevels?: string[]; // 4-level Socratic hints
  expectedLanguage?: string; // For CodeMirror language detection
  examples?: IQuestionExample[]; // Code examples with input/output
  constraints?: string[]; // Technical constraints
  edgeCases?: string[]; // Edge cases to consider
  subcategory?: string; // More specific categorization
}
