import { CheckCircle2, Cog, Focus, ListChecks, Sparkles } from "lucide-react";
import type { ReactElement } from "react";

interface IStep {
  number: number;
  title: string;
  description: string;
  icon: ReactElement;
  color: string;
  glowClass: string;
}

const steps: IStep[] = [
  {
    number: 1,
    title: "Focus",
    description: "Choose your practice area",
    icon: <Focus className="w-8 h-8" />,
    color: "bg-pink-500",
    glowClass: "shadow-lg shadow-pink-500/50",
  },
  {
    number: 2,
    title: "Configure",
    description: "Set difficulty & preferences",
    icon: <Cog className="w-8 h-8" />,
    color: "bg-blue-500",
    glowClass: "shadow-lg shadow-blue-500/50",
  },
  {
    number: 3,
    title: "Practice",
    description: "Answer AI-generated questions",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-green-600",
    glowClass: "shadow-lg shadow-green-600/50",
  },
  {
    number: 4,
    title: "Review",
    description: "Get instant AI feedback",
    icon: <ListChecks className="w-8 h-8" />,
    color: "bg-orange-600",
    glowClass: "shadow-lg shadow-orange-600/50",
  },
  {
    number: 5,
    title: "Summary",
    description: "Track your progress",
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: "bg-pink-500",
    glowClass: "shadow-lg shadow-pink-500/50",
  },
];

export function HowItWorksSection(): ReactElement {
  return (
    <section className="py-20 border-t">
      <div className="container-xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-display text-white gradient-text">
            How It Works
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Our 5-step guided practice wizard takes you from focus to feedback
            in minutes
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="glass-card rounded-3xl relative overflow-visible group fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Content - Centered Layout */}
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                {/* Step Number Badge - Centered at Top */}
                <div
                  className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg ${step.glowClass}`}
                >
                  {step.number}
                </div>

                {/* Step Icon - Centered */}
                <div className="text-white/80">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-white">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            Ready to start your practice journey?
          </p>
        </div>
      </div>
    </section>
  );
}
