# tRPC Developer Setup Guide

**Quick Reference**: Adding new tRPC endpoints to DevPrep AI

---

## Prerequisites

✅ tRPC infrastructure installed (Phase 1 complete)
✅ Familiar with TypeScript and React Query
✅ Understanding of Zod validation

---

## 3-Step Process to Add New Endpoint

### Step 1: Create Zod Schema

**File**: `frontend/src/lib/trpc/schemas/myfeature.schema.ts`

```typescript
import { z } from 'zod';

// Input schema
export const myFeatureInputSchema = z.object({
  param1: z.string().min(1, 'Parameter 1 is required'),
  param2: z.number().min(1).max(100),
  param3: z.enum(['option1', 'option2', 'option3']),
  optionalParam: z.string().optional(),
});

// Output schema
export const myFeatureOutputSchema = z.object({
  result: z.string(),
  success: z.boolean(),
  metadata: z.object({
    timestamp: z.string(),
    processingTime: z.number(),
  }),
});

// Export inferred types
export type MyFeatureInput = z.infer<typeof myFeatureInputSchema>;
export type MyFeatureOutput = z.infer<typeof myFeatureOutputSchema>;
```

---

### Step 2: Add Procedure to Router

**File**: `frontend/src/lib/trpc/routers/ai.ts`

```typescript
import { myFeatureInputSchema, myFeatureOutputSchema } from '../schemas/myfeature.schema';

export const aiRouter = router({
  // ... existing procedures

  myFeature: publicProcedure
    .input(myFeatureInputSchema)
    .output(myFeatureOutputSchema)
    .mutation(async ({ input }) => {
      // Your business logic here
      const result = await processMyFeature(input);

      return {
        result: result.data,
        success: true,
        metadata: {
          timestamp: new Date().toISOString(),
          processingTime: result.duration,
        },
      };
    }),
});
```

---

### Step 3: Use in Component

```typescript
'use client';

import { trpc } from '@lib/trpc/Provider';

export default function MyFeatureComponent() {
  const { mutate, data, isPending, error } = trpc.ai.myFeature.useMutation();

  const handleSubmit = () => {
    mutate({
      param1: 'value',
      param2: 42,
      param3: 'option1',
      // TypeScript autocomplete works here! ✨
    });
  };

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleSubmit}>Execute Feature</button>
      {data && <div>Result: {data.result}</div>}
    </div>
  );
}
```

**That's it!** Your endpoint is fully typed, validated, and ready to use.

---

## Common Patterns

### Query vs Mutation

**Use Query** for read operations:
```typescript
getProfile: publicProcedure
  .input(z.object({ userId: z.string() }))
  .query(async ({ input }) => {
    return getUserProfile(input.userId);
  }),

// Usage
const { data } = trpc.ai.getProfile.useQuery({ userId: '123' });
```

**Use Mutation** for write operations:
```typescript
updateProfile: publicProcedure
  .input(z.object({ userId: z.string(), name: z.string() }))
  .mutation(async ({ input }) => {
    return updateUserProfile(input);
  }),

// Usage
const { mutate } = trpc.ai.updateProfile.useMutation();
```

---

### Error Handling

```typescript
import { TRPCError } from '@trpc/server';

myProcedure: publicProcedure
  .input(myInputSchema)
  .mutation(async ({ input }) => {
    // Validate business rules
    if (input.value < 0) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Value must be positive',
      });
    }

    // Handle service errors
    try {
      return await myService(input);
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Service unavailable',
        cause: error,
      });
    }
  }),
```

**Error Codes**:
- `BAD_REQUEST` (400) - Invalid input
- `UNAUTHORIZED` (401) - Not authenticated
- `FORBIDDEN` (403) - Not authorized
- `NOT_FOUND` (404) - Resource not found
- `INTERNAL_SERVER_ERROR` (500) - Server error

---

### Nested Objects

```typescript
// Complex nested schema
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zipCode: z.string().regex(/^\d{5}$/),
});

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: addressSchema,
  preferences: z.object({
    notifications: z.boolean(),
    theme: z.enum(['light', 'dark']),
  }),
});
```

---

### Arrays and Validation

```typescript
// Array with constraints
const questionsSchema = z.object({
  questions: z.array(questionSchema)
    .min(1, 'At least one question required')
    .max(20, 'Maximum 20 questions allowed'),
});

// Array of primitive types
const tagsSchema = z.object({
  tags: z.array(z.string()).optional(),
});

// Validate array items
const numbersSchema = z.object({
  numbers: z.array(z.number().positive()),
});
```

---

### Optional and Nullable Fields

```typescript
const schema = z.object({
  // Optional (can be undefined, omitted from object)
  optionalField: z.string().optional(),

  // Nullable (can be null, must be present)
  nullableField: z.string().nullable(),

  // Both optional and nullable
  optionalNullable: z.string().nullable().optional(),

  // With default value
  withDefault: z.string().default('default value'),
});
```

---

### Transforming Data

```typescript
const transformedSchema = z.object({
  // Transform input
  email: z.string().email().transform(val => val.toLowerCase()),

  // Parse dates
  createdAt: z.string().transform(val => new Date(val)),

  // Complex transformation
  count: z.number().transform(val => Math.max(0, Math.min(val, 100))),
});
```

---

## React Query Integration

### Caching Configuration

```typescript
const { data } = trpc.ai.getProfile.useQuery(
  { userId: '123' },
  {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  }
);
```

### Prefetching

```typescript
import { trpc } from '@lib/trpc/Provider';

function MyComponent() {
  const utils = trpc.useUtils();

  const prefetchData = async () => {
    await utils.ai.getProfile.prefetch({ userId: '123' });
  };

  // Prefetch on hover
  return <button onMouseEnter={prefetchData}>View Profile</button>;
}
```

### Invalidating Queries

```typescript
const utils = trpc.useUtils();
const { mutate } = trpc.ai.updateProfile.useMutation({
  onSuccess: () => {
    // Invalidate and refetch
    utils.ai.getProfile.invalidate();
  },
});
```

---

## Testing

### Unit Test Procedure

```typescript
// __tests__/trpc/ai.test.ts
import { appRouter } from '@lib/trpc/routers/_app';
import { createContext } from '@lib/trpc/context';

describe('AI Router', () => {
  it('generates questions', async () => {
    const ctx = await createContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.ai.generateQuestions({
      profile: { role: 'frontend', experienceLevel: 'mid', targetRole: 'senior' },
      count: 5,
      difficulty: 7,
      type: 'coding',
    });

    expect(result.questions).toHaveLength(5);
    expect(result.totalGenerated).toBe(5);
  });
});
```

### Integration Test

```typescript
// __tests__/integration/trpc.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { TRPCProvider } from '@lib/trpc/Provider';
import MyComponent from './MyComponent';

test('fetches data via tRPC', async () => {
  render(
    <TRPCProvider>
      <MyComponent />
    </TRPCProvider>
  );

  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

---

## Troubleshooting

### Issue: TypeScript not inferring types

**Symptom**: Autocomplete doesn't work, types show as `any`

**Solution**:
1. Ensure `AppRouter` is exported: `export type AppRouter = typeof appRouter;`
2. Check Provider setup: `createTRPCReact<AppRouter>()`
3. Restart TypeScript server in IDE

---

### Issue: Zod validation error

**Symptom**: `ZodError: Invalid input`

**Solution**:
1. Check input matches schema exactly
2. Use `.safeParse()` to debug:
   ```typescript
   const result = mySchema.safeParse(input);
   if (!result.success) {
     console.log(result.error.issues);
   }
   ```

---

### Issue: CORS errors

**Symptom**: Network error, CORS policy blocks request

**Solution**: Ensure tRPC endpoint is same-origin (`/api/trpc`)
- ✅ Correct: `/api/trpc`
- ❌ Wrong: `http://localhost:3000/api/trpc`

---

### Issue: Procedures not showing in autocomplete

**Symptom**: `trpc.ai.myProcedure` doesn't autocomplete

**Solution**:
1. Check procedure is in router: `aiRouter = router({ myProcedure: ... })`
2. Router is exported in `_app.ts`: `appRouter = router({ ai: aiRouter })`
3. Restart TS server

---

## Best Practices

### ✅ Do

- Use descriptive schema names: `generateQuestionsInputSchema`
- Add validation messages: `z.string().min(1, 'Name is required')`
- Export inferred types: `export type MyInput = z.infer<typeof mySchema>`
- Handle errors with `TRPCError`
- Use `.mutation()` for writes, `.query()` for reads
- Validate business logic in procedures, not components

### ❌ Don't

- Don't create schemas inline (hard to reuse)
- Don't skip output validation (catches bugs)
- Don't use `any` types (defeats purpose of tRPC)
- Don't throw raw `Error` (use `TRPCError`)
- Don't duplicate schemas (DRY principle)

---

## Quick Reference

### Zod Schema Cheat Sheet

```typescript
// Primitives
z.string()
z.number()
z.boolean()
z.date()

// Literals
z.literal('exact value')
z.enum(['option1', 'option2'])

// Objects
z.object({ key: z.string() })
z.record(z.string()) // { [key: string]: string }

// Arrays
z.array(z.string())
z.tuple([z.string(), z.number()])

// Modifiers
z.string().optional()
z.string().nullable()
z.string().default('default')

// Validation
z.string().min(3).max(10)
z.number().positive().int()
z.string().email()
z.string().url()
z.string().regex(/pattern/)

// Transformations
z.string().transform(val => val.toUpperCase())
```

---

## Examples

### Complete Feature Example

**1. Schema** (`lib/trpc/schemas/feedback.schema.ts`):
```typescript
import { z } from 'zod';

export const submitFeedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  message: z.string().min(10).max(500),
  email: z.string().email().optional(),
});

export const feedbackResponseSchema = z.object({
  id: z.string(),
  submittedAt: z.string(),
  success: z.boolean(),
});

export type SubmitFeedback = z.infer<typeof submitFeedbackSchema>;
export type FeedbackResponse = z.infer<typeof feedbackResponseSchema>;
```

**2. Procedure** (`lib/trpc/routers/feedback.ts`):
```typescript
import { router, publicProcedure } from '../init';
import { submitFeedbackSchema, feedbackResponseSchema } from '../schemas/feedback.schema';

export const feedbackRouter = router({
  submit: publicProcedure
    .input(submitFeedbackSchema)
    .output(feedbackResponseSchema)
    .mutation(async ({ input }) => {
      // Save to database
      const feedback = await saveFeedback({
        rating: input.rating,
        message: input.message,
        email: input.email,
        createdAt: new Date(),
      });

      return {
        id: feedback.id,
        submittedAt: feedback.createdAt.toISOString(),
        success: true,
      };
    }),
});
```

**3. Add to Root Router** (`lib/trpc/routers/_app.ts`):
```typescript
import { feedbackRouter } from './feedback';

export const appRouter = router({
  ai: aiRouter,
  feedback: feedbackRouter, // ← Add new router
});
```

**4. Component**:
```typescript
'use client';

import { trpc } from '@lib/trpc/Provider';
import { useState } from 'react';

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const { mutate, isPending, data } = trpc.feedback.submit.useMutation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ rating, message });
  };

  if (data) {
    return <div>Thank you! Feedback ID: {data.id}</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="range"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      />
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        minLength={10}
        maxLength={500}
      />
      <button type="submit" disabled={isPending}>
        Submit Feedback
      </button>
    </form>
  );
}
```

**Done!** Fully typed, validated endpoint in 5 minutes.

---

## Resources

- [tRPC Documentation](https://trpc.io/)
- [Zod Documentation](https://zod.dev/)
- [React Query (TanStack Query)](https://tanstack.com/query/latest)
- [Internal: tRPC Migration Guide](./trpc-migration.md)

---

**Last Updated**: October 16, 2025
**Maintainer**: DevPrep AI Team
