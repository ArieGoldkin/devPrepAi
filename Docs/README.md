# DevPrep AI Documentation

**Quick Start**: See [../CLAUDE.md](../CLAUDE.md) for project overview and architecture summary.

---

## 📚 Core Documentation

| Document | Purpose | Status |
|----------|---------|--------|
| [**technical-architecture.md**](./technical-architecture.md) | System design, 6-folder architecture, tech stack details | ✅ Current |
| [**api-design.md**](./api-design.md) | tRPC API layer, procedures, Zod schemas, usage examples | ✅ Current |
| [**code-standards.md**](./code-standards.md) | ESLint rules, file size limits, coding guidelines | ✅ Active |
| [**PRD.md**](./PRD.md) | Product requirements, features, user stories | ✅ Reference |
| [**user-flows.md**](./user-flows.md) | User journeys, wizard flow, interface patterns | ✅ Reference |
| [**future-enhancements.md**](./future-enhancements.md) | Completed features history, roadmap ideas | ✅ Reference |

---

## 🔄 Active Transitions

### API Migration
**Status**: ✅ Complete (Oct 17, 2025)

| Document | Description |
|----------|-------------|
| [api-transition/trpc-migration.md](./api-transition/trpc-migration.md) | Complete migration guide (4 phases, 28 tasks) |
| [api-transition/trpc-setup-guide.md](./api-transition/trpc-setup-guide.md) | Developer setup instructions |
| [api-transition/before-after-comparison.md](./api-transition/before-after-comparison.md) | HTTP vs tRPC comparison |
| [api-transition/performance-comparison.md](./api-transition/performance-comparison.md) | Performance metrics |

**Results**: 790+ lines removed, 100% type safety, 6x faster development

### Design Transitions
**Status**: 🔄 Planning (Glassmorphism refactor)

| Document | Description |
|----------|-------------|
| [design-transition/wizard-refactor.md](./design-transition/wizard-refactor.md) | Practice Wizard 5→4 step refactor |
| [design-transition/home-page-glassmorphism-plan.md](./design-transition/home-page-glassmorphism-plan.md) | Home page redesign plan |
| [design-transition/glassmorphism-gap-analysis.md](./design-transition/glassmorphism-gap-analysis.md) | Component gap analysis |

---

## 📊 Current Project Status

### Completed Milestones
- ✅ **Phase 1-4**: Core MVP with 4-step wizard, AI integration, professional UI
- ✅ **tRPC Migration**: Full API layer migration (Oct 16-17, 2025)
- ✅ **6-Folder Architecture**: Simplified from 17 folders to 6
- ✅ **Type Safety**: 100% end-to-end via tRPC + Zod

### Active Work
- 🔄 **Design Transitions**: Glassmorphism refactor for wizard and home page
- 📋 **Task Tracking**: [Notion Workspace](https://www.notion.so/DevPrepAI-2874489affb980fab76afc9789d813bd)

---

## 🎯 Documentation Hierarchy

```
CLAUDE.md              # Primary entry point (what, where, quick start)
    ↓
Docs/README.md         # This file (documentation map)
    ↓
Docs/*.md              # Detailed specifications (how, why)
```

**Principle**: Each fact documented once, clear hierarchy, zero duplication.

---

## 🛠️ Development Quick Links

### Getting Started
1. Read [../CLAUDE.md](../CLAUDE.md) for project overview
2. Review [technical-architecture.md](./technical-architecture.md) for system design
3. Check [api-design.md](./api-design.md) for API usage patterns
4. Follow [code-standards.md](./code-standards.md) when writing code

### Key Concepts
- **6-Folder Architecture**: Simplified domain-driven structure
- **tRPC API**: Type-safe procedures with auto-generated hooks
- **Hybrid State**: Zustand (client) + tRPC/React Query (server)
- **Type Safety**: Zod schemas → TypeScript types (single source of truth)

### Code Standards
- Files: < 180 lines (enforced by pre-commit hook)
- Functions: < 50 lines
- Complexity: < 15 (ESLint)
- TypeScript: Strict mode
- Validation: Zod runtime checks

---

## 📝 Recent Updates

**October 17, 2025**:
- ✅ Completed tRPC migration (all 4 phases)
- ✅ Removed 790+ lines of legacy code
- ✅ Updated all core documentation
- ✅ Cleaned up obsolete docs (design-system/, question-answering-enhancement/)

**October 16, 2025**:
- ✅ Started tRPC migration (Phase 1-2)
- ✅ Created api-transition/ documentation

---

## 🔗 External Resources

- **Notion Workspace**: [DevPrepAI Hub](https://www.notion.so/DevPrepAI-2874489affb980fab76afc9789d813bd)
- **Design Prototypes**: `.superdesign/design_iterations/`
- **Git Repository**: Current working branch status in [../CLAUDE.md](../CLAUDE.md)

---

*Last Updated: October 17, 2025*
*Documentation Version: 2.0.0*
