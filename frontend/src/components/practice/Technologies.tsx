import React from 'react'
interface ITechnologiesProps {
  technologies: string[]
}

export function Technologies({ technologies }: ITechnologiesProps): React.JSX.Element {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">Preferred Technologies</h3>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}