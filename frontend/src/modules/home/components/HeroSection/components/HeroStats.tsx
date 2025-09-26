import { Brain, Code2, Target, Users } from "lucide-react";
import type { ReactElement } from "react";

import { StatCard } from "./StatCard";

const STATS_DATA = [
  {
    icon: <Code2 className="h-8 w-8 text-primary mb-2" />,
    value: "500+",
    label: "Practice Questions",
  },
  {
    icon: <Brain className="h-8 w-8 text-accent mb-2" />,
    value: "AI",
    label: "Powered Analysis",
  },
  {
    icon: <Target className="h-8 w-8 text-secondary mb-2" />,
    value: "95%",
    label: "Success Rate",
  },
  {
    icon: <Users className="h-8 w-8 text-brand-success mb-2" />,
    value: "10k+",
    label: "Active Users",
  },
];

export function HeroStats(): ReactElement {
  return (
    <div className="relative animate-scale-in">
      <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 p-8">
        <div className="grid grid-cols-2 gap-4">
          {STATS_DATA.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />
      <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 blur-2xl" />
    </div>
  );
}
