/**
 * API Client
 * HTTP client for frontend-to-backend communication
 */

import type {
  IGenerateQuestionsRequest,
  IGenerateQuestionsResponse,
  IEvaluateAnswerRequest,
  IEvaluateAnswerResponse,
  IExplainConceptRequest,
  IExplainConceptResponse,
  IAPIResponse,
} from "@/types/ai";

// Base configuration
const API_BASE_URL = "/api";
const DEFAULT_TIMEOUT = 120000; // 120 seconds (2 minutes) for Claude API calls

// Error classes
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: Response,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

// Generic HTTP client
class HTTPClient {
  private baseURL: string;
  private timeout: number;

  constructor(
    baseURL: string = API_BASE_URL,
    timeout: number = DEFAULT_TIMEOUT,
  ) {
    this.baseURL = baseURL;
    this.timeout = timeout;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorMessage = await this.getErrorMessage(response);
        throw new APIError(errorMessage, response.status, response);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      throw this.processError(error);
    }
  }

  private async getErrorMessage(response: Response): Promise<string> {
    const defaultMessage = `HTTP ${response.status}: ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (this.hasErrorProperty(errorData)) {
        return String(errorData.error);
      }
    } catch {
      // If we can't parse error JSON, use the default message
    }

    return defaultMessage;
  }

  private hasErrorProperty(data: unknown): data is { error: unknown } {
    return typeof data === "object" && data !== null && "error" in data;
  }

  private processError(error: unknown): never {
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new NetworkError(`Request timeout after ${this.timeout}ms`);
      }
      throw new NetworkError(`Network error: ${error.message}`);
    }

    throw new NetworkError("Unknown network error");
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const requestInit: RequestInit = {
      method: "POST",
    };

    if (data !== undefined) {
      requestInit.body = JSON.stringify(data);
    }

    return this.request<T>(endpoint, requestInit);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "GET",
    });
  }
}

// API Client class with typed methods
class APIClient {
  private http: HTTPClient;

  constructor() {
    this.http = new HTTPClient();
  }

  /**
   * Generate interview questions
   */
  async generateQuestions(
    request: IGenerateQuestionsRequest,
  ): Promise<IAPIResponse<IGenerateQuestionsResponse>> {
    return this.http.post<IAPIResponse<IGenerateQuestionsResponse>>(
      "/ai/generate-questions",
      request,
    );
  }

  /**
   * Evaluate an answer
   */
  async evaluateAnswer(
    request: IEvaluateAnswerRequest,
  ): Promise<IAPIResponse<IEvaluateAnswerResponse>> {
    return this.http.post<IAPIResponse<IEvaluateAnswerResponse>>(
      "/ai/evaluate-answer",
      request,
    );
  }

  /**
   * Explain a concept
   */
  async explainConcept(
    request: IExplainConceptRequest,
  ): Promise<IAPIResponse<IExplainConceptResponse>> {
    return this.http.post<IAPIResponse<IExplainConceptResponse>>(
      "/ai/explain-concept",
      request,
    );
  }
}

// Export singleton instance
export const apiClient = new APIClient();

// Export utility functions for backward compatibility
export { APIClient, HTTPClient };
