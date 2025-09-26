import { Brain, Code2, Target } from "lucide-react";
import type { ReactElement } from "react";

import { FeatureCard } from "./components/FeatureCard";

const FEATURES_DATA = [
  {
    icon: <Code2 className="h-6 w-6 text-primary" />,
    iconColorClass: "from-primary/20 to-primary/10",
    title: "AI-Generated Questions",
    description:
      "Practice with questions tailored to your experience level and target role",
    features: [
      "Role-specific scenarios",
      "Adaptive difficulty",
      "Real interview formats",
    ],
  },
  {
    icon: <Brain className="h-6 w-6 text-accent" />,
    iconColorClass: "from-accent/20 to-accent/10",
    title: "Instant Feedback",
    description:
      "Get detailed analysis and improvement suggestions for every answer",
    features: [
      "Code quality review",
      "Best practices tips",
      "Performance insights",
    ],
  },
  {
    icon: <Target className="h-6 w-6 text-secondary" />,
    iconColorClass: "from-secondary/20 to-secondary/10",
    title: "Progress Tracking",
    description:
      "Monitor your improvement with detailed analytics and insights",
    features: [
      "Performance metrics",
      "Skill assessment",
      "Preparation timeline",
    ],
  },
];

export function FeaturesSection(): ReactElement {
  return (
    <section className="py-20 border-t">
      <div className="container-xl">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-headline">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-subtitle text-muted-foreground max-w-2xl mx-auto">
            Comprehensive preparation tools designed by engineers who&apos;ve
            been through the process
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES_DATA.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              iconColorClass={feature.iconColorClass}
              title={feature.title}
              description={feature.description}
              features={feature.features}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
