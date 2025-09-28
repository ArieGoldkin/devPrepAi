/**
 * Helper function to determine language based on role focus
 */
function getLanguageForRole(roleFocus: string): string {
  if (roleFocus === "frontend") return "javascript";
  if (roleFocus === "backend") return "python";
  return "typescript";
}
/**
 * DevPrep AI - Prompt Building Utilities
 * Separated prompt building logic for better organization
 */

import type {
  IGenerateQuestionsRequest,
  IEvaluateAnswerRequest,
  IExplainConceptRequest,
} from "@/types/ai";

export function buildQuestionsPrompt(
  request: IGenerateQuestionsRequest,
): string {
  const technologies = request.profile.technologies.join(", ");
  const currentDate = new Date().toISOString();

  return `Generate ${request.count} ${request.type} interview questions for a ${request.profile.experienceLevel} ${request.profile.roleFocus} developer.

Technologies: ${technologies}
Difficulty: ${request.difficulty}/10
Interview Type: ${request.profile.interviewType}

CRITICAL: Return ONLY a valid JSON object. No markdown, no code blocks, no explanations. Just pure JSON that starts with { and ends with }

Required JSON structure with Phase II fields:
{
  "questions": [
    {
      "id": "q-1",
      "title": "Clear, concise title",
      "content": "Main question content",
      "type": "${request.type}",
      "difficulty": ${request.difficulty},
      "category": "Main category",
      "subcategory": "Specific subcategory",
      "hints": ["Basic hint", "Intermediate hint", "Advanced hint", "Solution approach"],
      "solution": "Detailed solution explanation",
      "timeEstimate": 30,
      "tags": ["tag1", "tag2", "tag3"],
      "sections": [
        {
          "type": "examples",
          "title": "Examples",
          "content": "<pre>Input: [1,2,3]\\nOutput: [3,2,1]</pre><pre>Input: []\\nOutput: []</pre>",
          "priority": "high"
        },
        {
          "type": "context",
          "title": "Context",
          "content": "This problem tests understanding of...",
          "priority": "medium"
        },
        {
          "type": "constraints",
          "title": "Constraints",
          "content": "• Array length: 0 <= n <= 10^5\\n• Time complexity: O(n)\\n• Space complexity: O(1)",
          "priority": "medium"
        },
        {
          "type": "edge-cases",
          "title": "Edge Cases",
          "content": "• Empty array\\n• Single element\\n• Null input",
          "priority": "low"
        }
      ],
      "expectedLanguage": "${getLanguageForRole(request.profile.roleFocus)}",
      "createdAt": "${currentDate}",
      "updatedAt": "${currentDate}"
    }
  ]
}

Guidelines:
- Provide exactly 4 hints of increasing detail for the 4-level hint system
- Include all 4 section types (examples, context, constraints, edge-cases)
- Use HTML formatting in section content for better display
- Ensure valid JSON with proper escaping of quotes and newlines`;
}

export function buildEvaluationPrompt(request: IEvaluateAnswerRequest): string {
  return `Evaluate this interview answer:

Question: ${request.question.title}
${request.question.content}

Answer: ${request.answer}

Expected solution: ${request.question.solution}

Provide feedback as JSON:
{
  "feedback": {
    "score": 85,
    "strengths": ["strength1", "strength2"],
    "improvements": ["improvement1", "improvement2"],
    "suggestions": ["suggestion1", "suggestion2"],
    "overallFeedback": "Overall assessment"
  }
}`;
}

export function buildConceptPrompt(request: IExplainConceptRequest): string {
  const exampleText = request.includeExamples
    ? "Include practical examples."
    : "";

  return `Explain the concept "${request.concept}" for a ${request.userLevel} developer.

${exampleText}

Return as JSON:
{
  "explanation": {
    "concept": "${request.concept}",
    "explanation": "detailed explanation",
    "examples": ["example1", "example2"],
    "keyPoints": ["point1", "point2"],
    "relatedConcepts": ["concept1", "concept2"]
  }
}`;
}
