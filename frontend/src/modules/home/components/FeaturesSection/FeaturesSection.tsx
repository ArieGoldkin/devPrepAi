import {
  Brain,
  Layers,
  Smartphone,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { ReactElement } from "react";

import { FeatureCard } from "./components/FeatureCard";

const FEATURES_DATA = [
  {
    icon: <Brain className="h-8 w-8 text-white" />,
    iconColorClass: "from-blue-500 to-cyan-400",
    neonGlowClass: "neon-glow-blue",
    title: "AI-Generated Questions",
    description:
      "Personalized questions tailored to your role, experience level, and learning goals. Claude AI adapts to your progress in real-time.",
  },
  {
    icon: <Zap className="h-8 w-8 text-white" />,
    iconColorClass: "from-purple-500 to-pink-400",
    neonGlowClass: "neon-glow",
    title: "Instant Feedback",
    description:
      "Get immediate, detailed feedback on your answers with code execution results, best practices, and optimization suggestions.",
  },
  {
    icon: <Target className="h-8 w-8 text-white" />,
    iconColorClass: "from-green-500 to-emerald-400",
    neonGlowClass: "neon-glow",
    title: "5-Step Practice Wizard",
    description:
      "Guided practice flow with Focus, Configure, Practice, Review, and Summary steps for structured learning.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-white" />,
    iconColorClass: "from-orange-500 to-red-400",
    neonGlowClass: "neon-glow",
    title: "Progress Analytics",
    description:
      "Track your performance with comprehensive analytics, streak tracking, and personalized insights to improve faster.",
  },
  {
    icon: <Layers className="h-8 w-8 text-white" />,
    iconColorClass: "from-yellow-500 to-amber-400",
    neonGlowClass: "neon-glow",
    title: "Multiple Practice Modes",
    description:
      "Choose from Quick Practice, Assessment Mode, or Mock Interview formats to match your preparation style.",
  },
  {
    icon: <Smartphone className="h-8 w-8 text-white" />,
    iconColorClass: "from-indigo-500 to-purple-400",
    neonGlowClass: "neon-glow",
    title: "Mobile-First Design",
    description:
      "Practice anywhere with our responsive, mobile-optimized interface. Seamless experience across all devices.",
  },
];

export function FeaturesSection(): ReactElement {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-white text-glow mb-4">
          Why Choose DevPrep AI?
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Everything you need to ace your technical interviews, powered by
          cutting-edge AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES_DATA.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            iconColorClass={feature.iconColorClass}
            neonGlowClass={feature.neonGlowClass}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
