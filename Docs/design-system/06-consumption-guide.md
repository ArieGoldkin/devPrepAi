# Consumption Guide

**Version**: 1.0.0
**Status**: Active
**Last Updated**: October 2025
**Notion Database**: [Design System Consumers](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)

## Overview

This guide covers how external repositories and teams can install, configure, and use the `@devprep/design-system` package. Learn about installation methods, configuration requirements, versioning, and troubleshooting.

---

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage Examples](#usage-examples)
4. [Publishing](#publishing)
5. [Versioning](#versioning)
6. [Troubleshooting](#troubleshooting)
7. [Migration](#migration)

---

## Installation

### Method 1: npm/yarn (Recommended for Production)

```bash
# Using npm
npm install @devprep/design-system

# Using yarn
yarn add @devprep/design-system

# Using pnpm
pnpm add @devprep/design-system
```

**Prerequisites**:
- Published to npm registry
- Package name configured in `package.json`
- Authentication if using private registry

### Method 2: Git Dependency (Development)

```bash
# Install from GitHub (main branch)
npm install github:your-org/design-system

# Install specific branch
npm install github:your-org/design-system#feature-branch

# Install specific tag
npm install github:your-org/design-system#v1.0.0

# Install from private repo with SSH
npm install git+ssh://git@github.com:your-org/design-system.git
```

**package.json**:
```json
{
  "dependencies": {
    "@devprep/design-system": "github:your-org/design-system#v1.0.0"
  }
}
```

### Method 3: Local Development (Monorepo)

```bash
# Using npm workspaces
npm install --workspace=apps/web @devprep/design-system

# Using yarn workspaces
yarn workspace web add @devprep/design-system

# Using pnpm workspaces
pnpm --filter web add @devprep/design-system
```

**Monorepo structure**:
```
my-monorepo/
├── packages/
│   └── design-system/        # Design system source
└── apps/
    └── web/                  # Consumer app
```

### Method 4: Local Link (Development)

```bash
# In design system directory
cd /path/to/design-system
npm link

# In consumer project
cd /path/to/consumer-project
npm link @devprep/design-system
```

---

## Configuration

### 1. TypeScript Configuration

```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@devprep/design-system": ["node_modules/@devprep/design-system/src"],
      "@devprep/design-system/*": ["node_modules/@devprep/design-system/src/*"]
    },
    "types": ["@devprep/design-system"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler"
  }
}
```

### 2. Tailwind CSS Integration

```javascript
// tailwind.config.js
import designSystemConfig from '@devprep/design-system/tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
  // Extend design system config
  presets: [designSystemConfig],

  // Your custom content paths
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devprep/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      // Override or extend design system tokens
      colors: {
        brand: '#A855F7', // Override primary color
      },
    },
  },
};
```

**Alternative - Manual token import**:
```javascript
// tailwind.config.js
import { tokens } from '@devprep/design-system/tokens';

export default {
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      fontSize: tokens.fontSize,
      borderRadius: tokens.borderRadius,
    },
  },
};
```

### 3. CSS Imports

```typescript
// app/layout.tsx or main.tsx
import '@devprep/design-system/styles/globals.css';
import '@devprep/design-system/styles/glassmorphism.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### 4. Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@devprep/design-system': path.resolve(
        __dirname,
        'node_modules/@devprep/design-system/src'
      ),
    },
  },
  optimizeDeps: {
    include: ['@devprep/design-system'],
  },
});
```

### 5. Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@devprep/design-system'],
  experimental: {
    optimizePackageImports: ['@devprep/design-system'],
  },
};

export default nextConfig;
```

### 6. Webpack Configuration

```javascript
// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      '@devprep/design-system': path.resolve(
        __dirname,
        'node_modules/@devprep/design-system/src'
      ),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'node_modules/@devprep/design-system'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

---

## Usage Examples

### Basic Component Import

```tsx
// Simple component usage
import { Button, Card, Input } from '@devprep/design-system';

export default function MyPage() {
  return (
    <Card variant="glass">
      <Input variant="glass" placeholder="Enter text" />
      <Button variant="glass">Submit</Button>
    </Card>
  );
}
```

### Import with Types

```tsx
import { Button, type ButtonProps } from '@devprep/design-system';

// Type-safe component wrapper
export function CustomButton(props: ButtonProps) {
  return <Button {...props} className="custom-class" />;
}
```

### Import Tokens

```tsx
import { tokens } from '@devprep/design-system/tokens';

export function CustomComponent() {
  return (
    <div
      style={{
        backgroundColor: tokens.semantic.color.glass.background,
        borderRadius: tokens.primitives.borderRadius['2xl'],
        padding: tokens.primitives.spacing[6],
      }}
    >
      Custom styled with tokens
    </div>
  );
}
```

### Import Utilities

```tsx
import { cn, formatDate, debounce } from '@devprep/design-system/utils';

export function Example() {
  const className = cn(
    'base-class',
    isActive && 'active-class',
    'glass-card'
  );

  return <div className={className}>Content</div>;
}
```

### Import Hooks

```tsx
import { useMediaQuery, useDebounce } from '@devprep/design-system/hooks';

export function ResponsiveComponent() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  return (
    <div>
      {isMobile ? 'Mobile View' : 'Desktop View'}
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
    </div>
  );
}
```

### Tree-shaking Imports

```tsx
// Import only what you need (recommended)
import { Button } from '@devprep/design-system/button';
import { Card } from '@devprep/design-system/card';
import { Input } from '@devprep/design-system/input';

// Instead of barrel import (imports entire library)
import { Button, Card, Input } from '@devprep/design-system';
```

---

## Publishing

### Setup for npm Publishing

#### 1. Prepare package.json

```json
{
  "name": "@devprep/design-system",
  "version": "1.0.0",
  "description": "DevPrep AI glassmorphism design system",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./button": {
      "import": "./dist/button.mjs",
      "require": "./dist/button.js",
      "types": "./dist/button.d.ts"
    },
    "./card": {
      "import": "./dist/card.mjs",
      "require": "./dist/card.js",
      "types": "./dist/card.d.ts"
    },
    "./tokens": {
      "import": "./dist/tokens.mjs",
      "require": "./dist/tokens.js",
      "types": "./dist/tokens.d.ts"
    },
    "./styles/*": "./dist/styles/*"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/design-system.git"
  },
  "keywords": [
    "design-system",
    "react",
    "typescript",
    "glassmorphism",
    "ui-components"
  ],
  "author": "DevPrep AI",
  "license": "MIT",
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tsup": "^8.0.0"
  }
}
```

#### 2. Build Configuration

```typescript
// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/button/index.ts',
    'src/components/card/index.ts',
    'src/styles/tokens.ts',
  ],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
});
```

#### 3. Build Script

```json
{
  "scripts": {
    "build": "tsup",
    "prepublishOnly": "npm run build",
    "publish:npm": "npm publish",
    "publish:dry": "npm publish --dry-run"
  }
}
```

#### 4. Publish to npm

```bash
# Login to npm
npm login

# Test build
npm run build

# Dry run to check what will be published
npm publish --dry-run

# Publish to npm
npm publish

# Publish beta version
npm publish --tag beta
```

### Setup for GitHub Packages

```json
{
  "name": "@your-org/design-system",
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  }
}
```

```bash
# Create .npmrc in consumer project
@your-org:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}

# Publish
npm publish
```

### Private Registry (Verdaccio)

```bash
# Start Verdaccio
npm install -g verdaccio
verdaccio

# Publish
npm publish --registry http://localhost:4873
```

---

## Versioning

### Semantic Versioning (SemVer)

Follow [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH

1.0.0 → Initial release
1.0.1 → Patch (bug fixes)
1.1.0 → Minor (new features, backwards compatible)
2.0.0 → Major (breaking changes)
```

### Changesets (Recommended)

Install Changesets for automated versioning:

```bash
npm install @changesets/cli --save-dev
npx changeset init
```

**Workflow**:

```bash
# 1. Make changes to components
# ...

# 2. Create changeset
npx changeset
# Answer prompts:
# - Which packages changed? (select @devprep/design-system)
# - What type? (patch/minor/major)
# - Describe changes

# 3. Commit changeset
git add .changeset
git commit -m "chore: add changeset for button improvements"

# 4. Version packages (updates package.json and CHANGELOG.md)
npx changeset version

# 5. Build and publish
npm run build
npx changeset publish
```

### Changeset Configuration

```json
// .changeset/config.json
{
  "$schema": "https://unpkg.com/@changesets/config@2.3.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": []
}
```

### Changeset Example

```markdown
---
'@devprep/design-system': minor
---

Add new glass variant to Button component with improved hover effects
```

### Version Tags

```bash
# Tag versions in git
git tag v1.0.0
git push --tags

# Publish with tag
npm publish --tag latest
npm publish --tag beta
npm publish --tag next

# Install specific tag
npm install @devprep/design-system@latest
npm install @devprep/design-system@beta
```

### Pre-release Versions

```bash
# Bump to pre-release
npm version prerelease --preid=beta
# 1.0.0 → 1.0.1-beta.0

npm version prerelease --preid=alpha
# 1.0.0 → 1.0.1-alpha.0

# Publish pre-release
npm publish --tag beta
```

### Deprecating Versions

```bash
# Deprecate specific version
npm deprecate @devprep/design-system@1.0.0 "Please upgrade to 2.0.0"

# Deprecate all versions
npm deprecate @devprep/design-system "Package moved to @neworg/design-system"
```

---

## Troubleshooting

### Issue 1: Module Not Found

**Error**:
```
Module not found: Error: Can't resolve '@devprep/design-system'
```

**Solutions**:

```bash
# 1. Verify installation
npm list @devprep/design-system

# 2. Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Check import path
# ❌ Wrong
import { Button } from '@devprep/design-system/src/button';
# ✅ Correct
import { Button } from '@devprep/design-system';

# 4. Check package.json exports
# Ensure package exports are configured correctly
```

### Issue 2: TypeScript Errors

**Error**:
```
Could not find a declaration file for module '@devprep/design-system'
```

**Solutions**:

```json
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "bundler",  // or "node16"
    "types": ["@devprep/design-system"],
    "skipLibCheck": true  // Skip type checking of declaration files
  }
}
```

```bash
# Ensure types are built
cd design-system
npm run build
```

### Issue 3: Styles Not Applying

**Error**: Components render but have no glassmorphism styling

**Solutions**:

```typescript
// 1. Import CSS in root layout
import '@devprep/design-system/styles/globals.css';
import '@devprep/design-system/styles/glassmorphism.css';

// 2. Ensure Tailwind processes design system
// tailwind.config.js
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@devprep/design-system/src/**/*.{js,ts,jsx,tsx}',
  ],
};

// 3. Check PostCSS config
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Issue 4: React Version Mismatch

**Error**:
```
Error: Invalid hook call. Hooks can only be called inside of the body of a function component
```

**Solutions**:

```bash
# 1. Check React versions match
npm list react

# 2. Use peer dependencies
# package.json in design system
{
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  }
}

# 3. Link React in consumer (dev only)
cd consumer-project
npm link ../design-system/node_modules/react
```

### Issue 5: Build Errors (Next.js)

**Error**:
```
Module parse failed: Unexpected token
You may need an appropriate loader to handle this file type
```

**Solutions**:

```javascript
// next.config.js
export default {
  transpilePackages: ['@devprep/design-system'],

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};
```

### Issue 6: Tree-shaking Not Working

**Problem**: Bundle size too large

**Solutions**:

```json
// package.json - Use sideEffects
{
  "sideEffects": [
    "*.css"
  ]
}

// Import specific modules
import { Button } from '@devprep/design-system/button';
// Instead of
import { Button } from '@devprep/design-system';
```

### Issue 7: Conflicting Tailwind Classes

**Problem**: Custom Tailwind classes override design system

**Solutions**:

```javascript
// tailwind.config.js
import { Config } from 'tailwindcss';

export default {
  important: true,  // Make Tailwind classes !important

  // Or use CSS layers
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
```

```css
/* Use CSS layers */
@layer base {
  @import '@devprep/design-system/styles/globals.css';
}

@layer components {
  @import '@devprep/design-system/styles/glassmorphism.css';
}
```

### Issue 8: SSR Hydration Errors

**Error**:
```
Warning: Text content did not match. Server: "..." Client: "..."
```

**Solutions**:

```tsx
'use client'; // Mark components as client-side

// Or dynamic import with SSR disabled
import dynamic from 'next/dynamic';

const Button = dynamic(
  () => import('@devprep/design-system').then((mod) => mod.Button),
  { ssr: false }
);
```

---

## Migration

### Migrating from v1 to v2

#### Breaking Changes

```typescript
// ❌ v1 API
import { Button } from '@devprep/ui';
<Button color="primary" fullWidth />

// ✅ v2 API
import { Button } from '@devprep/design-system';
<Button variant="primary" className="w-full" />
```

#### Migration Script

```typescript
// scripts/migrate-v1-to-v2.ts
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

const files = glob.sync('src/**/*.{ts,tsx}');

files.forEach((file) => {
  let content = readFileSync(file, 'utf-8');

  // Update imports
  content = content.replace(
    /@devprep\/ui/g,
    '@devprep/design-system'
  );

  // Update prop names
  content = content.replace(
    /color="/g,
    'variant="'
  );
  content = content.replace(
    /fullWidth/g,
    'className="w-full"'
  );

  writeFileSync(file, content);
});

console.log(`Migrated ${files.length} files`);
```

#### Step-by-Step Migration

1. **Install new version**
```bash
npm install @devprep/design-system@2.0.0
```

2. **Update imports**
```bash
find src -name "*.tsx" -exec sed -i '' 's/@devprep\/ui/@devprep\/design-system/g' {} +
```

3. **Update component props** (manual)
- Replace `color` with `variant`
- Replace `fullWidth` with `className="w-full"`
- Update event handlers

4. **Test thoroughly**
```bash
npm run test
npm run type-check
npm run build
```

5. **Remove old package**
```bash
npm uninstall @devprep/ui
```

---

## Best Practices

### DO ✅

- **Use tree-shaking imports** for better bundle size
- **Import types separately** for type-only usage
- **Follow semantic versioning** for releases
- **Document breaking changes** in CHANGELOG
- **Test in consuming apps** before publishing
- **Use peer dependencies** for React/React DOM
- **Enable TypeScript strict mode** for type safety
- **Provide CSS variables** for easy customization

```tsx
// ✅ Good - Tree-shaking
import { Button } from '@devprep/design-system/button';
import type { ButtonProps } from '@devprep/design-system/button';

// ✅ Good - Type-only import
import type { ButtonProps } from '@devprep/design-system';

// ✅ Good - Customize with CSS variables
:root {
  --glass-background: rgba(255, 255, 255, 0.08);
}
```

### DON'T ❌

- **Don't include React in dependencies** (use peerDependencies)
- **Don't publish with uncommitted changes**
- **Don't skip versioning** (use Changesets)
- **Don't break backwards compatibility** without major version bump
- **Don't bundle node_modules** in package
- **Don't import internal paths** from consumers

```tsx
// ❌ Bad - Barrel import
import { Button, Card, Input, /* 100+ components */ } from '@devprep/design-system';

// ❌ Bad - Internal path
import { Button } from '@devprep/design-system/src/components/button';

// ❌ Bad - Hardcoded styles
<Button style={{ background: '#A855F7' }} />
```

---

## Resources

- **Notion Database**: [Design System Consumers](https://www.notion.so/28a4489affb9812d9ae1e0c23903c44c)
- **npm Registry**: [https://www.npmjs.com/package/@devprep/design-system](https://www.npmjs.com/package/@devprep/design-system)
- **GitHub Repository**: [https://github.com/your-org/design-system](https://github.com/your-org/design-system)
- **Storybook**: [https://storybook.devprep.ai](https://storybook.devprep.ai)
- **Changesets**: [https://github.com/changesets/changesets](https://github.com/changesets/changesets)
- **Token System**: [Token System Documentation](./03-token-system.md)
- **Migration Guide**: [Component Migration Guide](./04-component-migration.md)

---

**Support**:
- **Issues**: [GitHub Issues](https://github.com/your-org/design-system/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/design-system/discussions)
- **Slack**: #design-system channel
- **Email**: design-system@devprep.ai

---

**Next Steps**:
- Set up CI/CD for automated publishing
- Create documentation site
- Add usage analytics
- Implement versioning with Changesets
- Monitor bundle size with bundlephobia
