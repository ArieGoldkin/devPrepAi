import type { ReactElement } from "react";

interface ITechItem {
  name: string;
  icon: string;
}

const techStack: ITechItem[] = [
  { name: "TypeScript", icon: "📘" },
  { name: "Next.js 15", icon: "▲" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Claude AI", icon: "🤖" },
  { name: "React 19", icon: "⚛️" },
  { name: "Zustand", icon: "🐻" },
];

export function TechStackSection(): ReactElement {
  return (
    <section className="py-12 border-t">
      <div className="container-xl">
        <div className="text-center space-y-8">
          <p className="text-overline text-white/70">
            Built with Modern Technologies
          </p>

          {/* Glass card wrapper with grid layout */}
          <div className="glass-card rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="tech-logo flex flex-col items-center gap-3 p-4 rounded-xl cursor-pointer group"
                >
                  {/* Large emoji icon */}
                  <span className="text-4xl transition-transform group-hover:scale-110">
                    {tech.icon}
                  </span>
                  {/* Tech name label */}
                  <span className="text-sm text-white/90 font-medium">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
