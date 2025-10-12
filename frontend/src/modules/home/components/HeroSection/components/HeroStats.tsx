import type { ReactElement } from "react";

const STATS_DATA = [
  {
    value: "5K+",
    label: "Questions",
  },
  {
    value: "98%",
    label: "Success Rate",
  },
  {
    value: "24/7",
    label: "AI Support",
  },
];

export function HeroStats(): ReactElement {
  return (
    <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in">
      {STATS_DATA.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-4xl font-black text-foreground text-glow mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-muted-foreground">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
