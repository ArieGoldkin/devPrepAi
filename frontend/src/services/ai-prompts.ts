/**
 * DevPrep AI - Prompt Building Utilities
 * Separated prompt building logic for better organization
 */

import type {
  IGenerateQuestionsRequest,
  IEvaluateAnswerRequest,
  IExplainConceptRequest
} from '../types/ai';

export function buildQuestionsPrompt(request: IGenerateQuestionsRequest): string {
  const technologies = request.profile.technologies.join(', ');
  const currentDate = new Date().toISOString();
  
  return `Generate ${request.count} ${request.type} interview questions for a ${request.profile.experienceLevel} ${request.profile.role} developer.

Technologies: ${technologies}
Difficulty: ${request.difficulty}/10
Interview Type: ${request.profile.interviewType}

Return a JSON array of questions with this structure:
{
  "questions": [
    {
      "id": "unique-id",
      "title": "Question Title",
      "content": "Question content",
      "type": "${request.type}",
      "difficulty": ${request.difficulty},
      "category": "category",
      "hints": ["hint1", "hint2"],
      "solution": "expected solution",
      "timeEstimate": 30,
      "tags": ["tag1", "tag2"],
      "createdAt": "${currentDate}",
      "updatedAt": "${currentDate}"
    }
  ]
}`;
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
  const exampleText = request.includeExamples ? 'Include practical examples.' : '';
  
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
