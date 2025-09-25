# DevPrep AI - React Query Setup

Optimized React Query configuration for Claude AI integration with aggressive caching and cost optimization.

## Quick Start

### Basic Query Pattern

```typescript
import { useQuery } from '@tanstack/react-query'
import { createClaudeQueryKey } from '@/query/client'

function useQuestions(config: QuestionConfig) {
  return useQuery({
    queryKey: createClaudeQueryKey('questions', config),
    queryFn: () => generateQuestions(config),
    staleTime: 5 * 60 * 1000, // 5 minutes - don't refetch fresh data
    gcTime: 10 * 60 * 1000,   // 10 minutes - keep in memory
    enabled: Boolean(config.role), // Only fetch when ready
  })
}
```

### Prefetch Pattern

```typescript
import { usePrefetchQuestions } from '@/api/claude/hooks'

// In your setup component
const { prefetchQuestions } = usePrefetchQuestions()

// When user is configuring their session
const handleConfigChange = async (config) => {
  // This loads questions in the background
  await prefetchQuestions(config)
  // Now when they navigate to practice, questions are ready!
}
```

### Cache Management

```typescript
import { invalidatePracticeCache, clearAllCaches } from '@/query/client'

// When practice session completes
await invalidatePracticeCache(queryClient, sessionId)

// When user logs out
clearAllCaches(queryClient)
```

## Cost Optimization Features

### 1. Aggressive Caching
- **5-minute staleTime**: Data stays "fresh" for 5 minutes, preventing unnecessary API calls
- **10-minute gcTime**: Data stays in memory for 10 minutes, enabling instant navigation
- **Disabled refetchOnWindowFocus**: No expensive calls when switching tabs

### 2. Smart Prefetching
```typescript
import { useApiCostTracking } from '@/api/claude/hooks'

function CostMonitor() {
  const { data: costs } = useApiCostTracking()
  
  return (
    <div>
      Cache Hit Rate: {costs?.cacheHitRate * 100}%
      Daily Cost: ${costs?.estimatedCost}
    </div>
  )
}
```

### 3. Hierarchical Cache Keys
```typescript
// Cache keys are structured for efficient invalidation
[
  'claude-api',     // Top level - all Claude calls
  'questions',      // Endpoint type
  '{"role":"fe"}' // Serialized parameters
]

// This allows targeted cache invalidation:
// - Invalidate ALL Claude calls: ['claude-api']
// - Invalidate ALL questions: ['claude-api', 'questions']
// - Invalidate SPECIFIC config: ['claude-api', 'questions', '{...}']
```

## Error Handling

### Retry Logic
- **Rate limits (429)**: 30s → 60s → 120s backoff
- **Server errors (5xx)**: 5s → 10s → 20s backoff
- **Network errors**: 1s → 2s backoff
- **Client errors (4xx)**: No retry (except 429)

### Global Error Handling
Errors are automatically logged and can be sent to error tracking services.

## Performance Monitoring

Track your API usage and cost optimization:

```typescript
// Monitor cache performance
const { data } = useApiCostTracking()

console.log({
  cacheHitRate: data?.cacheHitRate, // Target: >60%
  estimatedCost: data?.estimatedCost,
  inputTokens: data?.inputTokens,
  outputTokens: data?.outputTokens,
})
```

## Migration Guide

If migrating from the old lib structure:

```typescript
// Old imports ❌
import { queryClient } from '@/lib/query-client'
import { useGenerateQuestions } from '@/lib/hooks/use-claude-api'

// New imports ✅
import { queryClient } from '@/query/client'
import { useGenerateQuestions } from '@/api/claude/hooks'
```
