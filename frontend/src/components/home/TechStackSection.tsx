import type { ReactElement } from "react";

import { Badge } from "@components/ui/badge";

export function TechStackSection(): ReactElement {
  return (
    <section className="py-12 border-t">
      <div className="container-xl">
        <div className="text-center space-y-4">
          <p className="text-overline">Built with Modern Technologies</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="secondary">Tailwind CSS</Badge>
            <Badge variant="secondary">Claude AI</Badge>
            <Badge variant="secondary">React 19</Badge>
            <Badge variant="secondary">Zustand</Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
