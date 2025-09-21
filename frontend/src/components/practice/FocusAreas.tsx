import React from 'react'
interface IFocusAreasProps {
  interests: string[]
}

export function FocusAreas({ interests }: IFocusAreasProps): React.JSX.Element {
  return (
    <div className="p-4 border rounded-lg animate-fade-in">
      <h3 className="text-title font-semibold mb-2">Your Focus Areas</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-brand-primary/20 text-brand-primary rounded-full text-caption"
          >
            {interest}
          </span>
        ))}
      </div>
    </div>
  )
}