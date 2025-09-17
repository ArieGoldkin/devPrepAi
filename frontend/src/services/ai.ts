/**
 * DevPrep AI - Simple AI Service
 * Clean Claude API integration for interview prep
 */

import Anthropic from '@anthropic-ai/sdk';

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IExplainConceptRequest,
  IExplainConceptResponse,
  ICompletionOptions,
  IAPIResponse
} from '../types/ai';

import { 
  buildQuestionsPrompt, 
  buildEvaluationPrompt, 
  buildConceptPrompt 
} from './ai-prompts';

const DEFAULT_MAX_TOKENS = 1000;
const DEFAULT_TEMPERATURE = 0.7;
const GENERATION_MAX_TOKENS = 2000;

class AIService {
  private client: Anthropic;

  constructor() {
    const apiKey = process.env['NEXT_PUBLIC_ANTHROPIC_API_KEY'];
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY is required');
    }
    this.client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  private async callClaude(
    prompt: string,
    options: ICompletionOptions = {}
  ): Promise<string> {
    try {
      const maxTokens = options.maxTokens ?? DEFAULT_MAX_TOKENS;
      const temperature = options.temperature ?? DEFAULT_TEMPERATURE;
      
      const response = await this.client.messages.create({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: maxTokens,
        temperature,
        messages: [{ role: 'user', content: prompt }]
      });

      return response.content[0]?.type === 'text' 
        ? response.content[0].text 
        : '';
    } catch (error) {
      console.error('Claude API error:', error);
      throw new Error('Failed to get response from Claude API');
    }
  }

  async generateQuestions(
    request: IGenerateQuestionsRequest
  ): Promise<IAPIResponse<IGenerateQuestionsResponse>> {
    try {
      const prompt = buildQuestionsPrompt(request);
      const response = await this.callClaude(prompt, { maxTokens: GENERATION_MAX_TOKENS });
      const parsedResponse = JSON.parse(response);

      return {
        data: {
          questions: parsedResponse.questions,
          totalGenerated: parsedResponse.questions.length
        },
        success: true
      };
    } catch (error) {
      return {
        data: { questions: [], totalGenerated: 0 },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async evaluateAnswer(
    request: IEvaluateAnswerRequest
  ): Promise<IAPIResponse<IEvaluateAnswerResponse>> {
    try {
      const prompt = buildEvaluationPrompt(request);
      const response = await this.callClaude(prompt);
      const parsedResponse = JSON.parse(response);

      return {
        data: {
          feedback: parsedResponse.feedback,
          success: true
        },
        success: true
      };
    } catch (error) {
      return {
        data: {
          feedback: {
            score: 0,
            strengths: [],
            improvements: [],
            suggestions: [],
            overallFeedback: 'Unable to evaluate answer'
          },
          success: false
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async explainConcept(
    request: IExplainConceptRequest
  ): Promise<IAPIResponse<IExplainConceptResponse>> {
    try {
      const prompt = buildConceptPrompt(request);
      const response = await this.callClaude(prompt);
      const parsedResponse = JSON.parse(response);

      return {
        data: {
          explanation: parsedResponse.explanation,
          success: true
        },
        success: true
      };
    } catch (error) {
      return {
        data: {
          explanation: {
            concept: request.concept,
            explanation: 'Unable to generate explanation',
            examples: [],
            keyPoints: [],
            relatedConcepts: []
          },
          success: false
        },
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const aiService = new AIService();
