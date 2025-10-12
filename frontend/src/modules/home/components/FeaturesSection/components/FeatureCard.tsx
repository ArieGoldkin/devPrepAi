import type { ReactElement, ReactNode } from "react";

interface IFeatureCardProps {
  icon: ReactNode;
  iconColorClass: string;
  neonGlowClass: string;
  title: string;
  description: string;
}

export function FeatureCard({
  icon,
  iconColorClass,
  neonGlowClass,
  title,
  description,
}: IFeatureCardProps): ReactElement {
  return (
    <div className="glass-card rounded-3xl p-8">
      <div
        className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${iconColorClass} flex items-center justify-center ${neonGlowClass} mb-6`}
      >
        <div className="icon-glow">{icon}</div>
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 text-glow">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}
