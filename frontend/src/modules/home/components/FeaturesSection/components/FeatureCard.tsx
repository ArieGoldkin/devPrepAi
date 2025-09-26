import { CheckCircle2 } from "lucide-react";
import type { ReactElement, ReactNode } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shared/ui/card";

interface IFeatureCardProps {
  icon: ReactNode;
  iconColorClass: string;
  title: string;
  description: string;
  features: string[];
}

export function FeatureCard({
  icon,
  iconColorClass,
  title,
  description,
  features,
}: IFeatureCardProps): ReactElement {
  return (
    <Card className="card-interactive">
      <CardHeader>
        <div
          className={`h-12 w-12 rounded-lg bg-gradient-to-br ${iconColorClass} flex items-center justify-center mb-4`}
        >
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-brand-success flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
