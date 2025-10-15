# Monorepo Setup Guide

**Purpose**: Complete guide for setting up pnpm workspaces + Turborepo
**Phase**: Phase 1 (3-4 hours, 13 tasks)
**Prerequisites**: Node.js 18+, Git

---

## 🎯 Goal

Transform the DevPrep AI repository from a single-app structure into a monorepo with workspace-based package management using pnpm and Turborepo.

---

## 📦 Technology Stack

- **Package Manager**: pnpm 9.0+ (faster than npm/yarn, better for monorepos)
- **Build Tool**: Turborepo 2.0+ (intelligent caching and task orchestration)
- **Workspace**: pnpm workspaces (native monorepo support)

---

## 🚀 Step-by-Step Setup

### Step 1: Install pnpm (DS-001)

```bash
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version  # Should show 9.0.0 or higher
```

**Time**: 0.1 hrs | **Priority**: P0

---

### Step 2: Create Workspace Configuration (DS-002)

Create `pnpm-workspace.yaml` at the project root:

```yaml
# pnpm-workspace.yaml
packages:
  - 'packages/*'
```

**Why pnpm workspaces?**
- Native monorepo support
- Symlink-based installation (saves disk space)
- Strict dependency resolution (prevents phantom dependencies)
- 2-3x faster than npm

**Time**: 0.2 hrs | **Priority**: P0

---

### Step 3: Create Root package.json (DS-003)

Create/update the root `package.json`:

```json
{
  "name": "devprep-monorepo",
  "version": "1.0.0",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "description": "DevPrep AI Monorepo - Design System + Frontend",
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean",
    "storybook": "pnpm --filter @devprep/design-system storybook",
    "build-storybook": "pnpm --filter @devprep/design-system build-storybook"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.0.0",
    "prettier": "^3.0.0",
    "eslint": "^9.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

**Key Points**:
- `"private": true` - prevents accidental publishing
- `packageManager` - enforces pnpm version
- Scripts use `turbo run` for orchestration
- `--filter` targets specific packages

**Time**: 0.3 hrs | **Priority**: P0

---

### Step 4: Install Turborepo (DS-004)

```bash
# Install Turborepo as dev dependency
pnpm add -Dw turbo

# Verify installation
pnpm turbo --version
```

**Time**: 0.2 hrs | **Priority**: P0

---

### Step 5: Create Turborepo Configuration (DS-005)

Create `turbo.json` at the root:

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "storybook-static/**", "!.next/cache/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "type-check": {
      "dependsOn": ["^build"]
    },
    "clean": {
      "cache": false
    },
    "storybook": {
      "cache": false,
      "persistent": true
    },
    "build-storybook": {
      "dependsOn": ["^build"],
      "outputs": ["storybook-static/**"]
    }
  }
}
```

**Pipeline Explanation**:
- `dependsOn: ["^build"]` - runs dependencies' build tasks first
- `cache: false` - dev tasks don't use cache (always fresh)
- `persistent: true` - keeps dev servers running
- `outputs` - tells Turborepo what to cache

**Time**: 0.4 hrs | **Priority**: P0

---

### Step 6: Update .gitignore (DS-006)

Add monorepo-specific patterns:

```gitignore
# Monorepo
node_modules/
.turbo/
dist/
.next/
storybook-static/

# Package-specific
packages/*/node_modules
packages/*/dist
packages/*/.turbo

# pnpm
.pnpm-store/
pnpm-lock.yaml

# Build outputs
*.tsbuildinfo
```

**Time**: 0.2 hrs | **Priority**: P1

---

### Step 7: Create packages/ Directory (DS-007)

```bash
mkdir -p packages
```

**Time**: 0.1 hrs | **Priority**: P0

---

### Step 8: Move Frontend to packages/ (DS-008)

```bash
# Move frontend directory
mv frontend packages/frontend
```

**Time**: 0.3 hrs | **Priority**: P0

---

### Step 9: Update Frontend package.json (DS-009)

Edit `packages/frontend/package.json`:

```json
{
  "name": "@devprep/frontend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint . --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.5.3",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  }
}
```

**Changes**:
- Added `@devprep/` namespace
- Kept all existing scripts

**Time**: 0.2 hrs | **Priority**: P0

---

### Step 10: Update Path References (DS-010)

Update import paths in frontend after move:

```typescript
// If you have absolute imports referencing the old structure
// Update tsconfig.json paths if needed

// No changes needed if using relative imports or @ alias
```

**Common paths to check**:
- `tsconfig.json` - baseUrl and paths
- `next.config.ts` - any path-specific configs
- `.env` files - if they reference paths

**Time**: 0.5 hrs | **Priority**: P0

---

### Step 11: Install Dependencies (DS-012)

```bash
# Install all dependencies across workspace
pnpm install

# This will:
# 1. Install root dependencies
# 2. Install package dependencies
# 3. Create symlinks between packages
```

**Time**: 0.3 hrs | **Priority**: P0

---

### Step 12: Test Frontend Dev Server (DS-011)

```bash
# Test that frontend still works
cd packages/frontend
pnpm dev

# Or from root:
pnpm --filter @devprep/frontend dev

# Or using Turborepo:
turbo run dev --filter=@devprep/frontend
```

Visit `http://localhost:3000` and verify the app loads correctly.

**Time**: 0.3 hrs | **Priority**: P0

---

### Step 13: Test Frontend Build (DS-012)

```bash
# Test production build
pnpm --filter @devprep/frontend build

# Or from root:
turbo run build --filter=@devprep/frontend
```

Verify the build completes without errors.

**Time**: 0.4 hrs | **Priority**: P0

---

## 📂 Final Structure

```
test-orchestration-demo/
├── packages/
│   └── frontend/
│       ├── src/
│       ├── public/
│       ├── package.json        # @devprep/frontend
│       ├── next.config.ts
│       ├── tsconfig.json
│       └── tailwind.config.ts
├── .turbo/                     # Turborepo cache (gitignored)
├── node_modules/               # Root dependencies
├── package.json                # Root workspace config
├── pnpm-workspace.yaml         # Workspace definition
├── turbo.json                  # Turborepo pipeline
├── pnpm-lock.yaml             # Lockfile
└── .gitignore
```

---

## 🎯 Verification Checklist

After completing all steps, verify:

- [ ] `pnpm --version` shows 9.0+
- [ ] `turbo --version` works
- [ ] `packages/frontend/` exists with all files
- [ ] `pnpm-workspace.yaml` exists at root
- [ ] `turbo.json` exists at root
- [ ] Root `package.json` has monorepo scripts
- [ ] Frontend package.json has `@devprep/frontend` name
- [ ] `pnpm install` completes successfully
- [ ] `turbo run dev --filter=@devprep/frontend` starts dev server
- [ ] `turbo run build --filter=@devprep/frontend` builds successfully
- [ ] Frontend loads at `http://localhost:3000`

---

## 🚀 Common Commands

### Development
```bash
# Run dev server for specific package
pnpm --filter @devprep/frontend dev

# Run dev for all packages
turbo run dev

# Run Storybook (after Phase 4)
pnpm storybook
```

### Building
```bash
# Build specific package
pnpm --filter @devprep/frontend build

# Build all packages
turbo run build

# Build with cache info
turbo run build --summarize
```

### Linting & Type Checking
```bash
# Lint all packages
turbo run lint

# Type check all packages
turbo run type-check
```

### Clean
```bash
# Clean all build outputs
turbo run clean

# Clear Turborepo cache
turbo prune
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@devprep/frontend'"

**Solution**: Run `pnpm install` to create symlinks

### Issue: Turborepo cache issues

**Solution**: Clear cache with `rm -rf .turbo` or `turbo prune`

### Issue: Frontend build fails after move

**Solution**: Check tsconfig paths and next.config.ts for hardcoded paths

### Issue: pnpm install fails

**Solution**: Delete `node_modules` and `pnpm-lock.yaml`, then run `pnpm install` again

---

## 📊 Performance Benefits

### Before Monorepo
- Duplicate dependencies across projects
- No build caching
- Manual coordination between packages
- Slower CI/CD pipelines

### After Monorepo
- **Shared dependencies**: 30-50% reduction in node_modules size
- **Turborepo caching**: 90% faster rebuilds
- **Parallel execution**: Build multiple packages simultaneously
- **Dependency graph**: Automatic task ordering

---

## 🔗 Next Steps

After completing Phase 1, proceed to:
- [03-token-system.md](03-token-system.md) - Design token system (Phase 3)
- [04-component-migration.md](04-component-migration.md) - Component migration (Phase 5)

---

**Phase 1 Complete!** ✅

You now have a working monorepo with:
- pnpm workspace configuration
- Turborepo build orchestration
- Frontend package at `packages/frontend/`
- Foundation ready for design system package

**Next**: Create `packages/design-system/` in Phase 2
