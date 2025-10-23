import React from "react";

interface IConstraintsSectionProps {
  constraints?: string[];
}

export const ConstraintsSection: React.FC<IConstraintsSectionProps> = ({
  constraints,
}) => {
  if (!constraints || constraints.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h4 className="text-xs uppercase tracking-wider font-semibold text-gray-400">
        Constraints
      </h4>
      <ul className="space-y-1.5">
        {constraints.map((constraint, index) => (
          <li
            key={index}
            className="text-sm text-gray-300 leading-relaxed pl-4 relative
              before:content-['']
              before:absolute
              before:left-0
              before:top-[0.6em]
              before:w-1.5
              before:h-1.5
              before:rounded-full
              before:bg-[#7877c6]"
          >
            {constraint}
          </li>
        ))}
      </ul>
    </div>
  );
};
