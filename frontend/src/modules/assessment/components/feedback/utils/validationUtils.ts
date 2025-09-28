export type ValidationStatus = "valid" | "invalid" | "empty";

// Validation thresholds
const MIN_CODE_LENGTH = 50;
const MIN_DESIGN_LENGTH = 100;
const MIN_BEHAVIORAL_LENGTH = 100;
const MIN_CONCEPTUAL_LENGTH = 50;

export function validateAnswer(
  answer: string,
  questionType: "behavioral" | "system-design" | "coding" | "conceptual"
): ValidationStatus {
  if (!answer.trim()) return "empty";

  switch (questionType) {
    case "coding":
      return validateCodingAnswer(answer);
    case "system-design":
      return validateSystemDesignAnswer(answer);
    case "behavioral":
      return validateBehavioralAnswer(answer);
    default:
      return validateConceptualAnswer(answer);
  }
}

function validateCodingAnswer(answer: string): ValidationStatus {
  // Basic code validation - check for common patterns
  const hasFunction = /function|def|class|const|let|var|=>/.test(answer);
  const hasLogic = answer.length > MIN_CODE_LENGTH && (hasFunction || answer.includes("{"));
  return hasLogic ? "valid" : "invalid";
}

function validateSystemDesignAnswer(answer: string): ValidationStatus {
  // Check for system design elements
  const hasSystemElements = /component|service|database|api|cache|load|scale/.test(answer.toLowerCase());
  return answer.length > MIN_DESIGN_LENGTH && hasSystemElements ? "valid" : "invalid";
}

function validateBehavioralAnswer(answer: string): ValidationStatus {
  // Check for STAR method or structured response
  const hasStructure = answer.length > MIN_BEHAVIORAL_LENGTH && /situation|task|action|result|experience|challenge/.test(answer.toLowerCase());
  return hasStructure ? "valid" : "invalid";
}

function validateConceptualAnswer(answer: string): ValidationStatus {
  // Conceptual questions - basic length check
  return answer.length > MIN_CONCEPTUAL_LENGTH ? "valid" : "invalid";
}