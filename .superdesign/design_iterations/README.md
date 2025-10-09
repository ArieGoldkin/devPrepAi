# Design Iterations

This folder contains all UI/UX design prototypes for DevPrep AI, organized for compatibility with the SuperDesign VS Code extension.

## 📁 Structure

```
design_iterations/
├── *.html              # All design prototypes (flat structure for SuperDesign)
├── themes/             # Reusable CSS theme files
│   ├── glassmorphism.css
│   ├── cyberpunk_neon.css
│   ├── elegant_minimalist.css
│   ├── modern_dashboard.css
│   └── default_ui.css
└── README.md
```

## 🎨 Design Themes

### Glassmorphism (Active Theme - 12 prototypes)
Semi-transparent panels with backdrop blur, gradient borders, and neon glows.

**Files:**
- `glassmorphism_colorscheme_1.html` - Color scheme reference
- `glassmorphism_home_1.html` - Landing page
- `glassmorphism_practice_setup_1.html` - Practice configuration screen
- `glassmorphism_wizard_step1_1.html` - Interview type selection (Welcome)
- `glassmorphism_wizard_step2_1.html` - User profile setup (Profile)
- `glassmorphism_wizard_step5_1.html` - Ready to start confirmation
- `glassmorphism_session_coding_1.html` - Coding question interface (old layout)
- `glassmorphism_session_opentext_1.html` - Behavioral question interface (old layout)
- `glassmorphism_session_split_1.html` - **⭐ Latest: Coding session with 20/80 split**
- `glassmorphism_session_opentext_split_1.html` - Behavioral session with 20/80 split
- `glassmorphism_feedback_modal_1.html` - Answer evaluation modal
- `glassmorphism_hints_panel_1.html` - Progressive hints panel

### Cyberpunk Neon (1 prototype)
High-contrast neon colors with dark backgrounds and futuristic styling.

**Files:**
- `cyberpunk_neon_1.html`

### Elegant Minimalist (1 prototype)
Clean, spacious design with subtle animations and generous whitespace.

**Files:**
- `elegant_minimalist_1.html`

### Modern Dashboard (1 prototype)
Professional dashboard-style layout inspired by Vercel/Linear.

**Files:**
- `modern_dashboard_1.html`

## 📝 Naming Convention

Files follow the SuperDesign convention: `{theme}_{component}_{version}.html`

- **Theme**: Design theme name (glassmorphism, cyberpunk_neon, etc.)
- **Component**: What the prototype shows (home, session_split, wizard_step1, etc.)
- **Version**: Iteration number (1, 2, 3, or 1_1, 1_2 for sub-iterations)

**Examples:**
- `glassmorphism_home_1.html` - First version of glassmorphism home page
- `glassmorphism_home_1_1.html` - First iteration of version 1
- `glassmorphism_home_2.html` - Second major version

## 🎯 Latest / Recommended Prototypes

For **production implementation**, reference these files:

1. **Session Interface (Coding)**: `glassmorphism_session_split_1.html`
   - 20/80 split layout (question left, code editor right)
   - No scrolling on right panel
   - Integrated hints in left panel

2. **Session Interface (Behavioral)**: `glassmorphism_session_opentext_split_1.html`
   - 20/80 split with STAR framework guide
   - Word/character counter

3. **Practice Setup**: `glassmorphism_practice_setup_1.html`
   - Configuration screen before session starts

4. **Wizard Flow**: `glassmorphism_wizard_step1_1.html`, `step2`, `step5`
   - Multi-step onboarding/setup flow

## 🔧 CSS Themes

All CSS files are in the `themes/` folder:

- **glassmorphism.css** - Active theme with semi-transparent glass effects
- **cyberpunk_neon.css** - Neon colors and high contrast
- **elegant_minimalist.css** - Minimalist, clean design
- **modern_dashboard.css** - Professional dashboard styling
- **default_ui.css** - Base dark mode styles

HTML files reference these as: `<link rel="stylesheet" href="themes/glassmorphism.css">`

## 🚀 Usage with SuperDesign Extension

The SuperDesign VS Code extension scans this folder for HTML files at the root level. It uses the naming pattern to:

1. Group files by theme prefix
2. Show version history
3. Enable quick preview and iteration

**Important:** All HTML files must be at the root of `design_iterations/` (not in subdirectories) for SuperDesign to detect them.

## 📊 Design Evolution

**Phase 1:** Explored 4 different design themes (glassmorphism, cyberpunk, elegant, modern)

**Phase 2:** Focused on glassmorphism as primary direction, created comprehensive prototypes

**Phase 3:** Optimized session interfaces with 20/80 split layout based on industry research (LeetCode, HackerRank patterns)

**Phase 4:** (Current) Ready for production implementation from prototypes

## 🎨 Key Design Features

### Glassmorphism Theme Highlights:
- **Colors**: Purple/pink gradients (#7877c6, #ff77c6, #78dbff)
- **Effects**: backdrop-filter blur, rgba backgrounds, gradient borders
- **Typography**: Inter for UI, Monaco for code, 13-18px for narrow panels
- **Layout**: 20/80 split for session interfaces (question left, editor right)
- **Interactions**: Progressive hints, immediate feedback modals, smooth animations
- **Responsive**: Breakpoint at 768px (desktop → mobile)

## 📚 Documentation

For implementation guidance, see:
- `/Docs/design-system.md` - Component library and styling standards
- `/Docs/question-answering-enhancement/` - Feature specs for hints and feedback
- `/Docs/user-flows.md` - User journey and interaction flows
