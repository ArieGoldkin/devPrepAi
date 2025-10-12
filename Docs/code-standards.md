# Code Standards & Configuration Guide
## DevPrep AI - ESLint, TypeScript & Development Standards

### Version 2.0.0 | October 2025
**Status**: ✅ Enforced via ESLint & TypeScript

---

## 1. Overview

This document defines strict code quality standards to maintain a clean, modular, and maintainable codebase. All code must adhere to these standards, enforced through automated tooling.

### 1.1 Core Principles

1. **Modularity**: No file exceeds 180 lines
2. **Simplicity**: Complexity score ≤ 15
3. **Type Safety**: TypeScript strict mode
4. **Consistency**: Automated formatting
5. **Quality**: Comprehensive linting

---

## 2. ESLint Configuration

### 2.1 Complete ESLint Config

```javascript
// .eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2022,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    },
    "project": "./tsconfig.json"
  },
  "env": {
    "browser": true,
    "es2022": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "next/core-web-vitals",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y",
    "import",
    "complexity"
  ],
  "rules": {
    // Complexity Rules (STRICT)
    "complexity": ["error", { "max": 15 }],
    "max-lines": ["error", {
      "max": 180,
      "skipBlankLines": true,
      "skipComments": true
    }],
    "max-lines-per-function": ["error", {
      "max": 50,
      "skipBlankLines": true,
      "skipComments": true,
      "IIFEs": true
    }],
    "max-depth": ["error", 3],
    "max-nested-callbacks": ["error", 3],
    "max-params": ["error", 4],
    "max-statements": ["error", 15],

    // TypeScript Rules
    "@typescript-eslint/explicit-function-return-type": ["error", {
      "allowExpressions": true,
      "allowTypedFunctionExpressions": true
    }],
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
    "@typescript-eslint/consistent-type-imports": ["error", {
      "prefer": "type-imports"
    }],
    "@typescript-eslint/strict-boolean-expressions": ["error", {
      "allowNullableBoolean": true,
      "allowNullableString": false
    }],
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/await-thenable": "error",

    // React Rules
    "react/prop-types": "off",
    "react/jsx-no-bind": ["error", {
      "allowArrowFunctions": true,
      "allowFunctions": false
    }],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-pascal-case": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",

    // Import Rules
    "import/order": ["error", {
      "groups": [
        "builtin",
        "external",
        "internal",
        "parent",
        "sibling",
        "index"
      ],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }],
    "import/no-duplicates": "error",
    "import/no-cycle": "error",
    "import/no-self-import": "error",

    // General Best Practices
    "no-console": ["error", {
      "allow": ["warn", "error"]
    }],
    "no-debugger": "error",
    "no-alert": "error",
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "prefer-arrow-callback": "error",
    "arrow-body-style": ["error", "as-needed"],
    "object-shorthand": ["error", "always"],
    "no-param-reassign": ["error", {
      "props": true
    }],
    "no-nested-ternary": "error",
    "no-unneeded-ternary": "error",
    "no-magic-numbers": ["error", {
      "ignore": [0, 1, -1],
      "ignoreArrayIndexes": true,
      "enforceConst": true
    }],

    // Naming Conventions
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "interface",
        "format": ["PascalCase"],
        "prefix": ["I"]
      },
      {
        "selector": "typeAlias",
        "format": ["PascalCase"]
      },
      {
        "selector": "enum",
        "format": ["PascalCase"]
      },
      {
        "selector": "variable",
        "modifiers": ["const"],
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": "function",
        "format": ["camelCase"]
      },
      {
        "selector": "parameter",
        "format": ["camelCase"],
        "leadingUnderscore": "allow"
      }
    ]
  },
  "overrides": [
    {
      "files": ["*.test.ts", "*.test.tsx"],
      "rules": {
        "max-lines": "off",
        "max-lines-per-function": "off",
        "no-magic-numbers": "off"
      }
    }
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### 2.2 ESLint Scripts

```json
// package.json scripts
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "lint:strict": "eslint . --ext .ts,.tsx --max-warnings 0",
    "lint:complexity": "eslint . --ext .ts,.tsx --rule 'complexity: [error, 10]'",
    "lint:size": "eslint . --ext .ts,.tsx --rule 'max-lines: [error, 150]'"
  }
}
```

---

## 3. TypeScript Configuration

### 3.1 Strict TypeScript Config

```json
// tsconfig.json
{
  "compilerOptions": {
    // Type Checking (STRICT)
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,

    // Additional Checks
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "allowUnreachableCode": false,
    "allowUnusedLabels": false,

    // Module Resolution
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": false,
    "checkJs": false,

    // Emit
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "incremental": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true,

    // Paths - 6-Folder Architecture
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@shared/*": ["./src/shared/*"],
      "@modules/*": ["./src/modules/*"],
      "@lib/*": ["./src/lib/*"],
      "@store": ["./src/store"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"]
    },

    // Next.js
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".next",
    "out",
    "dist",
    "build"
  ]
}
```

---

## 4. Prettier Configuration

### 4.1 Prettier Config

```json
// .prettierrc.json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf",
  "singleAttributePerLine": true,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.ts"
}
```

### 4.2 Prettier Ignore

```
# .prettierignore
node_modules
.next
out
dist
build
coverage
*.min.js
*.min.css
public/vendor
```

---

## 5. Git Hooks Configuration

### 5.1 Husky Setup

```bash
# Install Husky
npm install --save-dev husky lint-staged
npx husky init
```

### 5.2 Pre-commit Hook

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# Run lint-staged
npx lint-staged

# Check file sizes
./scripts/check-file-sizes.sh

# Check complexity
npm run lint:complexity
```

### 5.3 Lint-staged Config

```json
// .lintstagedrc.json
{
  "*.{ts,tsx}": [
    "eslint --fix --max-warnings 0",
    "prettier --write",
    "bash -c 'if [ $(wc -l < \"$0\") -gt 180 ]; then echo \"File $0 exceeds 180 lines\"; exit 1; fi'"
  ],
  "*.{js,jsx}": [
    "eslint --fix --max-warnings 0",
    "prettier --write"
  ],
  "*.{json,md,yml,yaml}": [
    "prettier --write"
  ],
  "*.css": [
    "prettier --write"
  ]
}
```

---

## 6. Code Organization Standards

### 6.1 File Structure Rules

#### Component Files (< 100 lines)
```typescript
// components/ui/Button.tsx
import type { ButtonHTMLAttributes, FC } from 'react';

import { cn } from '@/lib/utils';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<IButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'button-base',
        `button-${variant}`,
        `button-${size}`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
```

#### Hook Files (< 80 lines)
```typescript
// hooks/useLocalStorage.ts
import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
```

#### Service Files (< 180 lines)
```typescript
// services/anthropic/client.ts
import Anthropic from '@anthropic-ai/sdk';

import type { IClaudeResponse, ICompletionOptions } from '@/types/anthropic';

const DEFAULT_MODEL = 'claude-3-5-sonnet-20241022';
const DEFAULT_MAX_TOKENS = 1000;
const DEFAULT_TEMPERATURE = 0.7;

export class AnthropicClient {
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async generateCompletion(
    prompt: string,
    options: ICompletionOptions = {}
  ): Promise<IClaudeResponse> {
    const {
      model = DEFAULT_MODEL,
      maxTokens = DEFAULT_MAX_TOKENS,
      temperature = DEFAULT_TEMPERATURE,
      systemPrompt,
    } = options;

    try {
      const response = await this.client.messages.create({
        model,
        max_tokens: maxTokens,
        temperature,
        system: systemPrompt,
        messages: [{ role: 'user', content: prompt }],
      });

      return this.parseResponse(response);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private parseResponse(response: unknown): IClaudeResponse {
    // Response parsing logic
    return response as IClaudeResponse;
  }

  private handleError(error: unknown): Error {
    // Error handling logic
    return new Error('Claude API error');
  }
}
```

### 6.2 Naming Conventions

#### Files and Folders
```
✅ Good:
- components/QuestionCard.tsx
- hooks/useQuestionGenerator.ts
- services/anthropic/client.ts
- types/assessment.ts

❌ Bad:
- components/question-card.tsx
- hooks/UseQuestionGenerator.ts
- services/anthropic/Client.ts
- types/Assessment.ts
```

#### Variables and Functions
```typescript
✅ Good:
const maxRetries = 3;
const getUserProfile = () => {};
const isValidEmail = (email: string) => {};

❌ Bad:
const max_retries = 3;
const GetUserProfile = () => {};
const valid_email = (email: string) => {};
```

#### Types and Interfaces
```typescript
✅ Good:
interface IUserProfile { }
type QuestionType = 'coding' | 'conceptual';
enum SeniorityLevel { }

❌ Bad:
interface userProfile { }
type questionType = 'coding' | 'conceptual';
enum seniorityLevel { }
```

---

## 7. Testing Standards

### 7.1 Test File Structure

```typescript
// components/Button.test.tsx (< 180 lines)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('should render children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('should apply variant classes', () => {
      const { rerender } = render(<Button variant="primary">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('button-primary');

      rerender(<Button variant="secondary">Test</Button>);
      expect(screen.getByRole('button')).toHaveClass('button-secondary');
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);

      await userEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
```

### 7.2 Test Coverage Requirements

```javascript
// jest.config.js
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 85,
      statements: 85,
    },
    './src/lib/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './src/shared/hooks/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },

  // Note: Testing infrastructure not yet implemented (planned for Phase 2)
};
```

---

## 8. Performance Standards

### 8.1 Bundle Size Limits

```javascript
// next.config.mjs
const config = {
  experimental: {
    bundleSizeLimit: {
      javascript: 200, // 200kb
      css: 50,        // 50kb
    },
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __MAX_COMPONENT_SIZE__: 50,  // 50kb per component
        __MAX_CHUNK_SIZE__: 100,      // 100kb per chunk
      })
    );
    return config;
  },
};
```

### 8.2 Performance Monitoring

```typescript
// lib/performance.ts
const PERFORMANCE_THRESHOLDS = {
  FCP: 1200,  // First Contentful Paint
  LCP: 2500,  // Largest Contentful Paint
  FID: 100,   // First Input Delay
  CLS: 0.1,   // Cumulative Layout Shift
  TTI: 3800,  // Time to Interactive
};

export function checkPerformance(): void {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        if (entry.startTime > PERFORMANCE_THRESHOLDS.LCP) {
          console.warn(`LCP exceeded threshold: ${entry.startTime}ms`);
        }
      }
    }
  });

  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}
```

---

## 9. Documentation Standards

### 9.1 JSDoc Requirements

```typescript
/**
 * Generates interview questions based on user profile
 *
 * @param profile - User profile containing experience level and technologies
 * @param options - Optional configuration for question generation
 * @returns Promise resolving to array of generated questions
 * @throws {AnthropicError} If the API request fails
 * @throws {ValidationError} If the profile is invalid
 *
 * @example
 * ```typescript
 * const questions = await generateQuestions(
 *   { seniorityLevel: 'senior', technologies: ['react'] },
 *   { count: 5, difficulty: 4 }
 * );
 * ```
 */
export async function generateQuestions(
  profile: IUserProfile,
  options?: IGenerationOptions
): Promise<IQuestion[]> {
  // Implementation
}
```

### 9.2 README Requirements

Every module must have a README:

```markdown
# Module Name

## Purpose
Brief description of what this module does.

## Usage
```typescript
import { feature } from '@/modules/module-name';

// Example usage
const result = feature(params);
```

## API
Document all exported functions/classes.

## Testing
How to test this module.

## Dependencies
List internal and external dependencies.
```

---

## 10. CI/CD Integration

### 10.1 GitHub Actions Workflow

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Check TypeScript
        run: npm run type-check

      - name: Lint with max warnings
        run: npm run lint:strict

      - name: Check complexity
        run: npm run lint:complexity

      - name: Check file sizes
        run: |
          for file in $(find src -name "*.tsx" -o -name "*.ts"); do
            lines=$(wc -l < "$file")
            if [ $lines -gt 180 ]; then
              echo "Error: $file has $lines lines (max: 180)"
              exit 1
            fi
          done

      - name: Run tests with coverage
        run: npm run test:coverage

      - name: Check bundle size
        run: npm run analyze:bundle
```

---

## 11. Code Review Checklist

### 11.1 Automated Checks
- [ ] All files < 180 lines
- [ ] Complexity score < 15
- [ ] TypeScript strict mode passes
- [ ] ESLint passes with 0 warnings
- [ ] Tests pass with >80% coverage
- [ ] Bundle size within limits

### 11.2 Manual Review Points
- [ ] Code follows naming conventions
- [ ] Functions have single responsibility
- [ ] No magic numbers or strings
- [ ] Proper error handling
- [ ] Performance considerations addressed
- [ ] Accessibility requirements met

---

## 12. Enforcement Scripts

### 12.1 File Size Checker

```bash
#!/bin/bash
# scripts/check-file-sizes.sh

MAX_LINES=180
VIOLATIONS=0

for file in $(find src -name "*.tsx" -o -name "*.ts"); do
  lines=$(wc -l < "$file")
  if [ $lines -gt $MAX_LINES ]; then
    echo "❌ $file: $lines lines (max: $MAX_LINES)"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done

if [ $VIOLATIONS -gt 0 ]; then
  echo "Found $VIOLATIONS file(s) exceeding $MAX_LINES lines"
  exit 1
fi

echo "✅ All files within size limits"
```

### 12.2 Complexity Analyzer

```javascript
// scripts/analyze-complexity.js
const { ESLint } = require('eslint');

async function analyzeComplexity() {
  const eslint = new ESLint({
    overrideConfig: {
      rules: {
        'complexity': ['error', { max: 15 }],
      },
    },
  });

  const results = await eslint.lintFiles(['src/**/*.{ts,tsx}']);

  const violations = results.filter(r => r.errorCount > 0);

  if (violations.length > 0) {
    console.error('Complexity violations found:');
    violations.forEach(v => {
      console.error(`  ${v.filePath}: ${v.errorCount} violations`);
    });
    process.exit(1);
  }

  console.log('✅ All files pass complexity checks');
}

analyzeComplexity();
```

---

## 13. Migration Guide

### 13.1 Refactoring Large Files

When a file exceeds 180 lines:

1. **Identify logical boundaries**
2. **Extract hooks to separate files**
3. **Split components into smaller units**
4. **Move types to dedicated files**
5. **Extract utility functions**

Example refactor:
```
Before: LargeComponent.tsx (250 lines)
After:
  - LargeComponent.tsx (80 lines)
  - LargeComponent.types.ts (30 lines)
  - useLargeComponentLogic.ts (70 lines)
  - LargeComponentHelpers.ts (60 lines)
```

### 13.2 Reducing Complexity

When complexity exceeds 15:

1. **Extract conditional logic to functions**
2. **Use early returns**
3. **Replace nested ifs with guard clauses**
4. **Use lookup objects instead of switch**
5. **Split into multiple functions**

---

## 7. Architecture Notes

**6-Folder Structure** (Implemented Phase 4):
- `app/` - Next.js App Router pages and API routes
- `modules/` - Domain-specific features (practice, assessment, results, profile, questions, home)
- `shared/` - Cross-cutting concerns (ui, components, hooks, utils, constants, mocks)
- `lib/` - External integrations (claude, query)
- `store/` - Global state management with Zustand
- `styles/` - Design system foundation

**Path Aliases**:
```typescript
import { Button } from "@shared/ui/button"
import { useAppStore } from "@store"
import { PracticeWizard } from "@modules/practice/components"
import { anthropic } from "@lib/claude/client"
```

**Code Quality Enforcement**:
- ✅ ESLint with complexity rules (<15) and line limits (<180)
- ✅ TypeScript strict mode throughout
- ✅ Prettier for consistent formatting
- ✅ Husky pre-commit hooks
- 📋 Testing infrastructure (Vitest + Playwright) planned for Phase 2

---

*Last Updated: October 8, 2025*
*Version: 2.0.0*
*Status: Actively Enforced*