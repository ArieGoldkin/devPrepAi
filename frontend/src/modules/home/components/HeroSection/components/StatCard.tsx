import type { ReactElement, ReactNode } from "react";

import { Card, CardContent } from "@shared/ui/card";

interface IStatCardProps {
  icon: ReactNode;
  value: string;
  label: string;
}

export function StatCard({ icon, value, label }: IStatCardProps): ReactElement {
  return (
    <Card className="card-feature">
      <CardContent className="pt-6">
        {icon}
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
