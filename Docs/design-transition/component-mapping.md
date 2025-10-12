# Component Mapping: Design Prototype → Production

**Purpose**: Visual reference mapping design prototype elements to production components
**Design Source**: `.superdesign/design_iterations/glassmorphism_home_1.html`

---

## 🗺️ Page Structure Overview

```
┌─────────────────────────────────────────────────────────┐
│  HEADER (NavigationHeader)                              │
│  - Logo + Nav + CTA Buttons                             │
│  Lines 244-266 → NavigationHeader.tsx:53                │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  HERO SECTION (HeroSection)                             │
│  ┌────────────────────┐  ┌──────────────────────────┐   │
│  │  HeroContent       │  │  HeroStats               │   │
│  │  - Status Badge    │  │  - 3 Stat Cards          │   │
│  │  - Headline        │  │    (5K+, 98%, 24/7)      │   │
│  │  - Description     │  │                          │   │
│  │  - CTA Buttons     │  │                          │   │
│  └────────────────────┘  └──────────────────────────┘   │
│  Lines 268-314 → HeroSection/                           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FEATURES SECTION (FeaturesSection)                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Feature  │  │ Feature  │  │ Feature  │              │
│  │ Card 1   │  │ Card 2   │  │ Card 3   │              │
│  │ (Brain)  │  │ (Zap)    │  │ (Target) │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  Lines 316-400 → FeaturesSection/                       │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  HOW IT WORKS SECTION (HowItWorksSection) [NEW]        │
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐  ┌────┐               │
│  │ 1  │  │ 2  │  │ 3  │  │ 4  │  │ 5  │               │
│  │Focus│ │Conf│  │Prac│  │Rev │  │Sum │               │
│  └────┘  └────┘  └────┘  └────┘  └────┘               │
│  Lines 402-464 → HowItWorksSection.tsx (NEW)           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  TECH STACK SECTION (TechStackSection)                  │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│  │Next.js│ │TypeS│  │Claude│ │Tailw │                   │
│  └──────┘ └──────┘ └──────┘ └──────┘                   │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│  │Zustand│ │React │ │Lucide│ │Vercel│                   │
│  └──────┘ └──────┘ └──────┘ └──────┘                   │
│  Lines 466-528 → TechStackSection.tsx                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  CTA SECTION (CTASection)                               │
│  - Headline + Description                               │
│  - Primary CTA Button                                   │
│  - Features List                                        │
│  Lines 530-550 → CTASection.tsx                         │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  FOOTER (AppLayout Footer)                              │
│  - Logo + Links + Copyright                             │
│  Lines 552-572 → shared/components/layout/              │
└─────────────────────────────────────────────────────────┘
```

---

## 📍 Component Mapping Details

### 1. Header Navigation

**Design Prototype** (Lines 244-266):
```html
<header class="glass-header px-6 py-4 sticky top-0 z-50">
  <div class="flex items-center space-x-3">
    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl neon-glow">
      <i data-lucide="brain-circuit"></i>
    </div>
    <h1>DevPrep AI</h1>
  </div>
  <nav>...</nav>
  <button class="btn-glass">Sign In</button>
  <button class="btn-primary">Get Started</button>
</header>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/NavigationHeader.tsx:53
<header className="glass-header border-b sticky top-0 z-50">
  <div className="container-xl flex h-16 items-center justify-between">
    <Link href="/">
      <Logo size="md" /> {/* Add gradient + neon-glow */}
    </Link>
    <DesktopNavigation mode={mode} />
    <div className="flex items-center gap-4">
      <Button variant="ghost" className="btn-glass">Sign In</Button>
      <Button variant="default" className="btn-primary">Get Started</Button>
    </div>
  </div>
</header>
```

**Key Changes**:
- Add `.glass-header` class
- Update logo with gradient background
- Apply `.btn-glass` and `.btn-primary` variants
- Add fade-in animations

---

### 2. Hero Section

#### 2.1 Hero Content (Left Side)

**Design Prototype** (Lines 271-297):
```html
<div class="text-center">
  <!-- Status Badge -->
  <div class="glass-card px-6 py-3 rounded-full">
    <div class="w-2 h-2 bg-green-400 rounded-full pulse"></div>
    <span>AI-Powered Interview Preparation</span>
  </div>

  <!-- Headline -->
  <h1 class="text-5xl md:text-7xl font-black">
    <span class="text-white text-glow-strong">Master Technical</span><br>
    <span class="gradient-text">Interviews with AI</span>
  </h1>

  <!-- Description -->
  <p class="text-xl text-gray-300">
    Practice real interview questions with instant AI feedback...
  </p>

  <!-- CTA Buttons -->
  <button class="btn-primary">Start Practicing Free</button>
  <button class="btn-glass">Watch Demo</button>
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/HeroSection/components/HeroContent.tsx
export function HeroContent(): ReactElement {
  return (
    <div className="space-y-6">
      {/* Add Status Badge */}
      <div className="glass-card px-6 py-3 rounded-full inline-flex items-center space-x-2 fade-in">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        <span className="text-sm font-medium">AI-Powered Interview Preparation</span>
      </div>

      {/* Update Headline */}
      <h1 className="text-display fade-in fade-in-delay-1">
        <span className="text-white text-glow-strong">Master Technical</span>
        <br />
        <span className="gradient-text">Interviews with AI</span>
      </h1>

      {/* Description (existing) */}
      <p className="text-subtitle text-muted-foreground fade-in fade-in-delay-2">
        {/* existing text */}
      </p>

      {/* Update CTAs */}
      <div className="flex gap-4 fade-in fade-in-delay-3">
        <Button className="btn-primary">Start Practicing Free</Button>
        <Button className="btn-glass">Watch Demo</Button>
      </div>
    </div>
  );
}
```

#### 2.2 Hero Stats (Right Side)

**Design Prototype** (Lines 299-312):
```html
<div class="grid grid-cols-3 gap-8">
  <div class="text-center">
    <div class="text-4xl font-black text-white text-glow">5K+</div>
    <div class="text-sm text-gray-400">Questions</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-black text-white text-glow">98%</div>
    <div class="text-sm text-gray-400">Success Rate</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-black text-white text-glow">24/7</div>
    <div class="text-sm text-gray-400">AI Support</div>
  </div>
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/HeroSection/components/HeroStats.tsx
const STATS = [
  { value: '5K+', label: 'Questions' },
  { value: '98%', label: 'Success Rate' },
  { value: '24/7', label: 'AI Support' },
];

export function HeroStats(): ReactElement {
  return (
    <div className="grid grid-cols-3 gap-8">
      {STATS.map((stat, index) => (
        <StatCard
          key={stat.label}
          value={stat.value}
          label={stat.label}
          className={`fade-in fade-in-delay-${index + 1}`}
        />
      ))}
    </div>
  );
}
```

**StatCard Component**:
```tsx
// frontend/src/modules/home/components/HeroSection/components/StatCard.tsx
export function StatCard({ value, label, className }: Props): ReactElement {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl font-black text-white text-glow mb-2">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
```

---

### 3. Features Section

**Design Prototype** (Lines 328-398):
```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
  <!-- Feature Card 1 -->
  <div class="glass-card rounded-3xl p-8">
    <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl neon-glow-blue">
      <i data-lucide="brain" class="icon-glow"></i>
    </div>
    <h3 class="text-2xl font-bold text-glow">AI-Generated Questions</h3>
    <p class="text-gray-300">Personalized questions tailored to your role...</p>
  </div>
  <!-- ... 2 more cards -->
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/FeaturesSection/FeaturesSection.tsx
const FEATURES_DATA = [
  {
    icon: <Brain className="h-6 w-6 text-primary" />,
    iconColorClass: "from-primary/20 to-primary/10",
    glowClass: "neon-glow", // Purple
    title: "AI-Generated Questions",
    description: "Practice with questions tailored to your experience level...",
  },
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    iconColorClass: "from-accent/20 to-accent/10",
    glowClass: "neon-glow-blue", // Blue
    title: "Instant Feedback",
    description: "Get detailed analysis and improvement suggestions...",
  },
  {
    icon: <Target className="h-6 w-6 text-secondary" />,
    iconColorClass: "from-secondary/20 to-secondary/10",
    glowClass: "neon-glow-pink", // Pink
    title: "Progress Tracking",
    description: "Monitor your improvement with detailed analytics...",
  },
];

export function FeaturesSection(): ReactElement {
  return (
    <section className="py-20">
      <div className="container-xl">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              className={`fade-in fade-in-delay-${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**FeatureCard Component**:
```tsx
// frontend/src/modules/home/components/FeaturesSection/components/FeatureCard.tsx
export function FeatureCard({
  icon,
  iconColorClass,
  glowClass,
  title,
  description,
  className,
}: Props): ReactElement {
  return (
    <div className={cn("glass-card rounded-3xl p-8", className)}>
      <div className={cn(
        "w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
        `bg-gradient-to-br ${iconColorClass}`,
        glowClass
      )}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white text-glow mb-4">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
```

---

### 4. How It Works Section (NEW)

**Design Prototype** (Lines 413-463):
```html
<div class="grid grid-cols-1 md:grid-cols-5 gap-6">
  <!-- Step 1 -->
  <div class="glass-card rounded-3xl p-6 text-center relative">
    <div class="absolute -top-4 badge">1</div>
    <i data-lucide="focus" class="icon-glow"></i>
    <h3 class="text-glow">Focus</h3>
    <p>Choose your practice area</p>
  </div>
  <!-- ... 4 more steps -->
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/HowItWorksSection.tsx (NEW FILE)
const STEPS = [
  { id: 'focus', icon: Focus, title: 'Focus', description: 'Choose your practice area', color: 'purple' },
  { id: 'configure', icon: Settings, title: 'Configure', description: 'Set difficulty & preferences', color: 'blue' },
  { id: 'practice', icon: Code, title: 'Practice', description: 'Answer AI-generated questions', color: 'green' },
  { id: 'review', icon: Search, title: 'Review', description: 'Get instant AI feedback', color: 'orange' },
  { id: 'summary', icon: BarChart, title: 'Summary', description: 'Track your progress', color: 'pink' },
];

export function HowItWorksSection(): ReactElement {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-headline text-glow mb-4">How It Works</h2>
          <p className="text-subtitle text-muted-foreground">
            Get started in minutes with our simple, guided workflow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {STEPS.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index + 1}
              className={`fade-in fade-in-delay-${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

**StepCard Sub-Component**:
```tsx
interface StepCardProps {
  step: Step;
  index: number;
  className?: string;
}

function StepCard({ step, index, className }: StepCardProps): ReactElement {
  const Icon = step.icon;
  const glowClass = getGlowClass(step.color); // Helper to map color to glow class

  return (
    <div className={cn("glass-card rounded-3xl p-6 text-center relative", className)}>
      {/* Numbered Badge */}
      <div className={cn(
        "absolute -top-4 left-1/2 -translate-x-1/2",
        "w-8 h-8 rounded-full flex items-center justify-center",
        "bg-gradient-to-br from-primary to-secondary",
        glowClass,
        "font-bold text-white"
      )}>
        {index}
      </div>

      {/* Icon */}
      <Icon className={cn("w-12 h-12 mx-auto mb-4 mt-6 icon-glow", `text-${step.color}-400`)} />

      {/* Content */}
      <h3 className="text-lg font-bold text-white text-glow mb-2">{step.title}</h3>
      <p className="text-sm text-muted-foreground">{step.description}</p>
    </div>
  );
}
```

---

### 5. Tech Stack Section

**Design Prototype** (Lines 477-527):
```html
<div class="glass-card rounded-3xl p-12">
  <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
    <div class="tech-logo rounded-2xl p-6 text-center">
      <div class="text-4xl mb-3">▲</div>
      <div class="text-sm font-semibold">Next.js 15</div>
    </div>
    <!-- ... 7 more logos -->
  </div>
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/TechStackSection.tsx
const TECH_STACK = [
  { name: 'Next.js 15', icon: '▲' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Claude AI', icon: '🤖' },
  { name: 'Tailwind CSS', icon: '🎨' },
  { name: 'Zustand', icon: '🐻' },
  { name: 'React Query', icon: '🔄' },
  { name: 'Lucide Icons', icon: '✨' },
  { name: 'Vercel', icon: '▲' },
];

export function TechStackSection(): ReactElement {
  return (
    <section id="tech-stack" className="py-20">
      <div className="container-xl">
        <div className="text-center mb-16">
          <h2 className="text-headline text-glow mb-4">Built with Modern Tech</h2>
          <p className="text-subtitle text-muted-foreground">
            Powered by cutting-edge technologies
          </p>
        </div>

        <div className="glass-card rounded-3xl p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {TECH_STACK.map((tech) => (
              <div key={tech.name} className="tech-logo rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{tech.icon}</div>
                <div className="text-sm font-semibold text-gray-300">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

**CSS for `.tech-logo`**:
```css
/* frontend/src/styles/glassmorphism.css */
.tech-logo {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 300ms ease-out;
}

.tech-logo:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 10px 30px rgba(120, 119, 198, 0.4);
}
```

---

### 6. CTA Section

**Design Prototype** (Lines 531-549):
```html
<div class="glass-card rounded-3xl p-12 relative">
  <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20"></div>
  <div class="relative z-10">
    <h2 class="text-4xl font-black text-glow-strong">Ready to Ace Your Interview?</h2>
    <p class="text-xl text-gray-300">Join thousands of developers...</p>
    <button class="btn-primary">Get Started for Free</button>
  </div>
</div>
```

**Production Component**:
```tsx
// frontend/src/modules/home/components/CTASection.tsx
export function CTASection(): ReactElement {
  return (
    <section className="py-20">
      <div className="container-xl">
        <div className="glass-card rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 opacity-50" />

          {/* Content */}
          <div className="relative z-10 space-y-6">
            <h2 className="text-headline text-white text-glow-strong">
              Ready to Ace Your Interview?
            </h2>
            <p className="text-subtitle text-gray-300 max-w-2xl mx-auto">
              Join thousands of developers who landed their dream jobs with DevPrep AI
            </p>
            <Button className="btn-primary text-white py-4 px-10 rounded-2xl">
              Get Started for Free
            </Button>
            <p className="text-sm text-gray-400">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## 🎨 CSS Class Mapping

### Glass Effects
| Design Class | Production Class | Location |
|--------------|-----------------|----------|
| `.glass-card` | `.glass-card` | `glassmorphism.css:15` |
| `.glass-header` | `.glass-header` | `glassmorphism.css:45` |

### Glow Effects
| Design Class | Production Class | Color |
|--------------|-----------------|-------|
| `.neon-glow` | `.neon-glow` | Purple (primary) |
| `.neon-glow-pink` | `.neon-glow-pink` | Pink (secondary) |
| `.neon-glow-blue` | `.neon-glow-blue` | Blue (accent) |
| `.icon-glow` | `.icon-glow` | Subtle (all colors) |
| `.text-glow` | `.text-glow` | White glow |
| `.text-glow-strong` | `.text-glow-strong` | Strong white glow |

### Button Variants
| Design Class | Production Class | Style |
|--------------|-----------------|-------|
| `.btn-glass` | `.btn-glass` | Glass with blur |
| `.btn-primary` | `.btn-primary` | Gradient + glow |

### Text Effects
| Design Class | Production Class | Effect |
|--------------|-----------------|--------|
| `.gradient-text` | `.gradient-text` | Animated gradient |

### Animations
| Design Class | Production Class | Delay |
|--------------|-----------------|-------|
| `.fade-in` | `.fade-in` | 0ms |
| `.fade-in-delay-1` | `.fade-in-delay-1` | 200ms |
| `.fade-in-delay-2` | `.fade-in-delay-2` | 400ms |
| `.fade-in-delay-3` | `.fade-in-delay-3` | 600ms |
| `.fade-in-delay-4` | `.fade-in-delay-4` | 800ms |
| `.float-animation` | `.float-animation` | Loop |

---

## 📁 File Structure

```
frontend/src/
├── app/
│   └── page.tsx                                    # Home page entry (update line 15)
├── modules/home/components/
│   ├── NavigationHeader.tsx                        # Update line 53 (header)
│   ├── HeroSection/
│   │   ├── HeroSection.tsx                         # Parent container
│   │   └── components/
│   │       ├── HeroContent.tsx                     # Update (add badge, gradient text)
│   │       ├── HeroStats.tsx                       # Update (add glass cards)
│   │       └── StatCard.tsx                        # Update (add text-glow)
│   ├── FeaturesSection/
│   │   ├── FeaturesSection.tsx                     # Parent container
│   │   └── components/
│   │       └── FeatureCard.tsx                     # Update (add glass + glow)
│   ├── HowItWorksSection.tsx                       # NEW FILE (create)
│   ├── TechStackSection.tsx                        # Update (add tech-logo class)
│   └── CTASection.tsx                              # Update (add gradient overlay)
└── styles/
    ├── globals.css                                 # Import glassmorphism.css
    └── glassmorphism.css                           # NEW FILE (create)
```

---

## 🔗 Quick Reference Links

### Design Prototype
- **Full Design**: `.superdesign/design_iterations/glassmorphism_home_1.html`
- **Line References**: See component sections above

### Production Files
- **Entry Point**: `frontend/src/app/page.tsx`
- **Components**: `frontend/src/modules/home/components/`
- **Styles**: `frontend/src/styles/`

### Documentation
- **Full Plan**: [`home-page-glassmorphism-plan.md`](./home-page-glassmorphism-plan.md)
- **Checklist**: [`implementation-checklist.md`](./implementation-checklist.md)

---

**Last Updated**: October 9, 2025
**Design Version**: 1.0
**Status**: Ready for Implementation
