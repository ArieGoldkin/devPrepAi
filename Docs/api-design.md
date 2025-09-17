# API Design & Anthropic Integration
## DevPrep AI - Claude API Integration Specification

### Version 1.0.0 | September 2025

---

## 1. Anthropic Claude Integration Overview

### 1.1 API Configuration

```typescript
// Environment Variables
ANTHROPIC_API_KEY=sk-ant-api03-...
ANTHROPIC_MODEL=claude-3-5-sonnet-20241022
ANTHROPIC_MAX_TOKENS=1000
ANTHROPIC_TEMPERATURE=0.7
```

### 1.2 Rate Limits & Quotas

| Tier | Requests/min | Tokens/min | Tokens/day |
|------|-------------|------------|------------|
| Tier 1 | 50 | 50,000 | 1,000,000 |
| Tier 2 | 100 | 100,000 | 2,500,000 |
| Tier 3 | 200 | 200,000 | 5,000,000 |

### 1.3 Token Optimization Strategy

```typescript
interface TokenOptimization {
  maxInputTokens: 2000;      // Per request limit
  maxOutputTokens: 1000;      // Response limit
  cacheStrategy: 'aggressive'; // Cache similar prompts
  compressionEnabled: true;    // Compress prompts
}
```

---

## 2. API Endpoints

### 2.1 AI Generation Endpoints

#### Generate Questions
**POST** `/api/ai/questions/generate`

```typescript
// Request
interface GenerateQuestionsRequest {
  profile: {
    seniorityLevel: 'junior' | 'mid' | 'senior' | 'staff' | 'lead';
    technologies: string[];
    yearsExperience: number;
  };
  options?: {
    category?: QuestionCategory;
    difficulty?: 1 | 2 | 3 | 4 | 5;
    count?: number; // Default: 5, Max: 10
    type?: 'conceptual' | 'coding' | 'debug' | 'design';
  };
}

// Response
interface GenerateQuestionsResponse {
  questions: Question[];
  metadata: {
    generationTime: number;
    tokensUsed: number;
    cacheHit: boolean;
  };
}

// Example
{
  "profile": {
    "seniorityLevel": "senior",
    "technologies": ["react", "typescript"],
    "yearsExperience": 6
  },
  "options": {
    "category": "hooks",
    "difficulty": 4,
    "count": 5
  }
}
```

#### Evaluate Answer
**POST** `/api/ai/assessment/evaluate`

```typescript
// Request
interface EvaluateAnswerRequest {
  questionId: string;
  question: string;
  answer: string;
  expectedTopics?: string[];
  evaluationCriteria?: {
    checkAccuracy: boolean;
    checkCompleteness: boolean;
    checkBestPractices: boolean;
    checkPerformance: boolean;
  };
}

// Response
interface EvaluateAnswerResponse {
  feedback: {
    score: 'excellent' | 'good' | 'satisfactory' | 'needs-improvement';
    strengths: string[];
    improvements: string[];
    suggestions: string[];
    codeQuality?: {
      readability: number; // 1-5
      efficiency: number;  // 1-5
      correctness: number; // 1-5
    };
  };
  metadata: {
    evaluationTime: number;
    tokensUsed: number;
  };
}
```

#### Get Learning Explanation
**POST** `/api/ai/learn/explain`

```typescript
// Request
interface ExplainConceptRequest {
  topic: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  context?: string;
  includeExamples: boolean;
  includePitfalls: boolean;
}

// Response
interface ExplainConceptResponse {
  explanation: {
    summary: string;
    detailed: string;
    examples?: CodeExample[];
    commonPitfalls?: string[];
    bestPractices?: string[];
    relatedTopics?: string[];
  };
  metadata: {
    generationTime: number;
    readingTime: number; // Estimated minutes
  };
}
```

### 2.2 Question Management Endpoints

#### List Questions
**GET** `/api/questions`

```typescript
// Query Parameters
interface ListQuestionsQuery {
  category?: string;
  difficulty?: number;
  technology?: string;
  limit?: number;     // Default: 20, Max: 50
  offset?: number;    // For pagination
  sort?: 'difficulty' | 'popularity' | 'recent';
}

// Response
interface ListQuestionsResponse {
  questions: Question[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}
```

#### Get Question by ID
**GET** `/api/questions/:id`

```typescript
// Response
interface GetQuestionResponse {
  question: Question;
  relatedQuestions?: Question[];
  userProgress?: {
    attempted: boolean;
    completed: boolean;
    lastAttempt?: Date;
  };
}
```

### 2.3 Assessment Endpoints

#### Start Assessment
**POST** `/api/assessment/start`

```typescript
// Request
interface StartAssessmentRequest {
  type: 'quick' | 'standard' | 'comprehensive';
  duration: 15 | 30 | 45; // minutes
  topics?: string[];
  difficulty?: 'adaptive' | 'fixed';
}

// Response
interface StartAssessmentResponse {
  assessmentId: string;
  questions: Question[];
  startTime: Date;
  endTime: Date;
  instructions: string;
}
```

#### Submit Assessment
**POST** `/api/assessment/:id/submit`

```typescript
// Request
interface SubmitAssessmentRequest {
  answers: Array<{
    questionId: string;
    answer: string;
    timeSpent: number; // seconds
    hintsUsed: number;
  }>;
  completed: boolean;
}

// Response
interface SubmitAssessmentResponse {
  results: {
    overall: AssessmentScore;
    byCategory: Record<string, CategoryScore>;
    feedback: AssessmentFeedback[];
    recommendations: string[];
  };
  certificate?: {
    url: string;
    validUntil: Date;
  };
}
```

### 2.4 Progress Tracking Endpoints

#### Get User Progress
**GET** `/api/progress`

```typescript
// Response
interface GetProgressResponse {
  statistics: {
    questionsAttempted: number;
    questionsCompleted: number;
    totalTimeSpent: number; // minutes
    currentStreak: number;  // days
    longestStreak: number;
  };
  skillLevels: Record<string, {
    level: number;      // 1-5
    progress: number;   // 0-100
    lastPracticed: Date;
  }>;
  recentActivity: Activity[];
  achievements: Achievement[];
}
```

#### Update Progress
**POST** `/api/progress/update`

```typescript
// Request
interface UpdateProgressRequest {
  event: 'question_completed' | 'assessment_taken' | 'concept_learned';
  data: {
    questionId?: string;
    assessmentId?: string;
    topic?: string;
    score?: number;
    timeSpent?: number;
  };
}

// Response
interface UpdateProgressResponse {
  updated: boolean;
  newAchievements?: Achievement[];
  levelUp?: {
    skill: string;
    newLevel: number;
  };
}
```

---

## 3. Claude Prompt Templates

### 3.1 Question Generation Prompts

#### System Prompt Template
```typescript
const QUESTION_GENERATION_SYSTEM = `
You are an expert technical interviewer specializing in ${technology}.
Generate interview questions appropriate for a ${seniorityLevel} developer with ${years} years of experience.

Guidelines:
- Focus on practical, real-world scenarios
- Include code examples when relevant
- Match difficulty to experience level
- Avoid abstract puzzles unless specifically requested
- Include modern best practices and patterns

Output format:
Return a JSON array of question objects with:
- title: Brief question title
- content: Full question text
- type: 'conceptual' | 'coding' | 'debug' | 'design'
- difficulty: 1-5 scale
- hints: Array of progressive hints
- solution: Detailed solution with explanation
- timeEstimate: Minutes to solve
`;
```

#### User Prompt Template
```typescript
const generateUserPrompt = (params: GenerateParams) => `
Generate ${params.count} interview questions for:
- Technology: ${params.technology}
- Category: ${params.category}
- Difficulty: ${params.difficulty}/5
- Focus areas: ${params.focusAreas.join(', ')}

Ensure questions test practical knowledge and problem-solving skills.
`;
```

### 3.2 Answer Evaluation Prompts

#### Evaluation System Prompt
```typescript
const EVALUATION_SYSTEM = `
You are an experienced technical interviewer evaluating candidate responses.

Evaluate based on:
1. Technical accuracy and correctness
2. Code quality and best practices
3. Problem-solving approach
4. Communication clarity
5. Understanding of underlying concepts

Provide constructive feedback that:
- Highlights what was done well
- Identifies areas for improvement
- Suggests specific learning resources
- Encourages continued learning

Be supportive and educational, not harsh or discouraging.
`;
```

### 3.3 Learning Explanation Prompts

#### Explanation System Prompt
```typescript
const EXPLANATION_SYSTEM = `
You are a patient, expert programming tutor.

When explaining concepts:
1. Start with a clear, simple summary
2. Build up complexity gradually
3. Use relevant, practical examples
4. Highlight common mistakes
5. Connect to related concepts
6. Keep explanations concise but complete

Adapt explanation depth to the learner's level.
Format code examples with syntax highlighting markers.
`;
```

---

## 4. API Response Formats

### 4.1 Success Response
```json
{
  "success": true,
  "data": {},
  "metadata": {
    "timestamp": "2025-09-17T10:30:00Z",
    "requestId": "req_abc123",
    "version": "1.0.0"
  }
}
```

### 4.2 Error Response
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "retryAfter": 60,
      "limit": 50,
      "remaining": 0
    }
  },
  "metadata": {
    "timestamp": "2025-09-17T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

### 4.3 Error Codes

| Code | HTTP Status | Description |
|------|------------|-------------|
| INVALID_REQUEST | 400 | Malformed request data |
| UNAUTHORIZED | 401 | Missing or invalid API key |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests |
| ANTHROPIC_ERROR | 502 | Claude API error |
| INTERNAL_ERROR | 500 | Server error |
| TIMEOUT | 504 | Request timeout |

---

## 5. Implementation Details

### 5.1 API Client Setup

```typescript
// services/anthropic/client.ts
import Anthropic from '@anthropic-ai/sdk';

export class AnthropicClient {
  private client: Anthropic;
  private cache: Map<string, CachedResponse>;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
    this.cache = new Map();
  }

  async generateCompletion(
    prompt: string,
    options: CompletionOptions
  ): Promise<ClaudeResponse> {
    const cacheKey = this.getCacheKey(prompt, options);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      const response = await this.client.messages.create({
        model: options.model || 'claude-3-5-sonnet-20241022',
        max_tokens: options.maxTokens || 1000,
        temperature: options.temperature || 0.7,
        system: options.systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      });

      this.cache.set(cacheKey, response);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  private getCacheKey(prompt: string, options: CompletionOptions): string {
    return crypto
      .createHash('sha256')
      .update(`${prompt}-${JSON.stringify(options)}`)
      .digest('hex');
  }

  private handleError(error: any): never {
    if (error.status === 429) {
      throw new RateLimitError('Rate limit exceeded', error.headers);
    }
    throw new AnthropicError('Claude API error', error);
  }
}
```

### 5.2 Request Validation

```typescript
// middleware/validation.ts
import { z } from 'zod';

const GenerateQuestionsSchema = z.object({
  profile: z.object({
    seniorityLevel: z.enum(['junior', 'mid', 'senior', 'staff', 'lead']),
    technologies: z.array(z.string()).min(1),
    yearsExperience: z.number().min(0).max(30),
  }),
  options: z.object({
    category: z.string().optional(),
    difficulty: z.number().min(1).max(5).optional(),
    count: z.number().min(1).max(10).optional(),
    type: z.enum(['conceptual', 'coding', 'debug', 'design']).optional(),
  }).optional(),
});

export function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T {
  return schema.parse(data);
}
```

### 5.3 Rate Limiting

```typescript
// middleware/rateLimiter.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(50, '1 m'),
});

export async function rateLimitMiddleware(
  request: Request
): Promise<void> {
  const identifier = getClientIdentifier(request);
  const { success, limit, reset, remaining } = await ratelimit.limit(
    identifier
  );

  if (!success) {
    throw new RateLimitError({
      limit,
      remaining,
      reset: new Date(reset),
    });
  }
}
```

### 5.4 Response Caching

```typescript
// services/cache.ts
import { Redis } from '@upstash/redis';

export class ResponseCache {
  private redis: Redis;
  private ttl: number = 300; // 5 minutes

  constructor() {
    this.redis = Redis.fromEnv();
  }

  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    if (cached) {
      return JSON.parse(cached as string);
    }
    return null;
  }

  async set<T>(key: string, value: T, ttl?: number): Promise<void> {
    await this.redis.set(
      key,
      JSON.stringify(value),
      { ex: ttl || this.ttl }
    );
  }

  async invalidate(pattern: string): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length > 0) {
      await this.redis.del(...keys);
    }
  }
}
```

---

## 6. Security Considerations

### 6.1 API Key Management

```typescript
// Secure API key validation
function validateApiKey(request: Request): boolean {
  const apiKey = request.headers.get('X-API-Key');
  if (!apiKey) return false;

  // In production, validate against database
  return crypto.timingSafeEqual(
    Buffer.from(apiKey),
    Buffer.from(process.env.API_KEY!)
  );
}
```

### 6.2 Input Sanitization

```typescript
// Sanitize user inputs before sending to Claude
function sanitizePrompt(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .slice(0, MAX_INPUT_LENGTH) // Limit length
    .trim();
}
```

### 6.3 Response Filtering

```typescript
// Filter sensitive information from Claude responses
function filterResponse(response: string): string {
  // Remove any potential API keys, secrets, etc.
  return response.replace(
    /(?:api[_-]?key|secret|token|password)[\s:=]*['"]?[\w-]+['"]?/gi,
    '[REDACTED]'
  );
}
```

---

## 7. Monitoring & Analytics

### 7.1 Metrics to Track

```typescript
interface APIMetrics {
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  tokensUsed?: number;
  cacheHit: boolean;
  userId?: string;
  timestamp: Date;
}

// Log metrics for analysis
async function logMetrics(metrics: APIMetrics): Promise<void> {
  await analytics.track('api_request', metrics);
}
```

### 7.2 Claude API Usage Monitoring

```typescript
interface ClaudeUsageMetrics {
  daily: {
    requests: number;
    tokensUsed: number;
    cost: number;
  };
  byEndpoint: Record<string, {
    calls: number;
    avgTokens: number;
  }>;
  errorRate: number;
  avgLatency: number;
}
```

---

## 8. Testing

### 8.1 API Testing Strategy

```typescript
// tests/api/questions.test.ts
describe('Questions API', () => {
  it('should generate questions with valid profile', async () => {
    const response = await request(app)
      .post('/api/ai/questions/generate')
      .send({
        profile: {
          seniorityLevel: 'senior',
          technologies: ['react'],
          yearsExperience: 5
        }
      });

    expect(response.status).toBe(200);
    expect(response.body.questions).toHaveLength(5);
    expect(response.body.metadata.cacheHit).toBeDefined();
  });

  it('should handle rate limiting', async () => {
    // Make 51 requests (limit is 50)
    const requests = Array(51).fill(null).map(() =>
      request(app).post('/api/ai/questions/generate').send(validPayload)
    );

    const results = await Promise.allSettled(requests);
    const rateLimited = results.filter(r =>
      r.status === 'fulfilled' && r.value.status === 429
    );

    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

### 8.2 Mock Claude Responses

```typescript
// tests/mocks/claude.ts
export const mockClaudeResponse = {
  questions: [
    {
      title: "React useEffect cleanup",
      content: "Explain when and why cleanup functions are necessary...",
      type: "conceptual",
      difficulty: 3,
      hints: ["Think about subscriptions", "Consider timers"],
      solution: "Cleanup functions prevent memory leaks..."
    }
  ]
};
```

---

## 9. API Documentation

### 9.1 OpenAPI Specification

```yaml
openapi: 3.0.0
info:
  title: DevPrep AI API
  version: 1.0.0
  description: AI-powered interview preparation platform

servers:
  - url: https://api.devprep.ai/v1
    description: Production server
  - url: http://localhost:3000/api
    description: Development server

paths:
  /ai/questions/generate:
    post:
      summary: Generate interview questions
      operationId: generateQuestions
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GenerateQuestionsRequest'
      responses:
        '200':
          description: Questions generated successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/GenerateQuestionsResponse'
        '429':
          description: Rate limit exceeded
```

---

## 10. Migration Plan

### 10.1 Future API Enhancements

| Phase | Feature | Timeline |
|-------|---------|----------|
| Phase 1 | Basic CRUD operations | Week 1-2 |
| Phase 2 | Claude integration | Week 3-4 |
| Phase 3 | Caching layer | Week 5 |
| Phase 4 | Analytics | Week 6 |
| Phase 5 | WebSocket support | Month 2 |

### 10.2 Versioning Strategy

- URL versioning: `/api/v1/`, `/api/v2/`
- Deprecation notice: 3 months
- Backward compatibility: 6 months
- Migration guides for breaking changes

---

*Last Updated: September 17, 2025*
*Version: 1.0.0*
*Status: Implementation Ready*