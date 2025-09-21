"use client"

import type * as React from "react"
import { useState } from "react"

import { useAppStore } from "../../store/useAppStore"
import type { IUserProfile } from "../../types/ai"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Select } from "../ui/select"

interface IProfileWizardProps {
  onComplete?: () => void
}

const AVAILABLE_TECHNOLOGIES = ["React", "TypeScript", "Node.js", "Python", "Java"]

const ExperienceSelector = ({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}): React.JSX.Element => (
  <div>
    <label className="block text-sm font-medium mb-2">Experience</label>
    <Select 
      value={value} 
      onChange={(e): void => onChange(e.target.value)} 
      placeholder="Select level"
    >
      <option value="junior">Junior</option>
      <option value="mid">Mid-level</option>
      <option value="senior">Senior</option>
    </Select>
  </div>
)

const TechnologySelector = ({
  selectedTechs,
  onToggle
}: {
  selectedTechs: string[]
  onToggle: (tech: string) => void
}): React.JSX.Element => (
  <div>
    <label className="block text-sm font-medium mb-2">Technologies</label>
    {AVAILABLE_TECHNOLOGIES.map(tech => (
      <label key={tech} className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          checked={selectedTechs.includes(tech)} 
          onChange={(): void => onToggle(tech)} 
        />
        <span className="text-sm">{tech}</span>
      </label>
    ))}
  </div>
)

const InterviewTypeSelector = ({
  value,
  onChange
}: {
  value: string
  onChange: (value: string) => void
}): React.JSX.Element => (
  <div>
    <label className="block text-sm font-medium mb-2">Interview Type</label>
    <Select 
      value={value} 
      onChange={(e): void => onChange(e.target.value)} 
      placeholder="Select type"
    >
      <option value="technical">Technical</option>
      <option value="behavioral">Behavioral</option>
      <option value="system-design">System Design</option>
    </Select>
  </div>
)

export function ProfileWizard({ onComplete }: IProfileWizardProps): React.JSX.Element {
  const { setUserProfile } = useAppStore()
  const [experience, setExperience] = useState("")
  const [techs, setTechs] = useState<string[]>([])
  const [type, setType] = useState("")

  const toggleTech = (tech: string): void => {
    setTechs(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech])
  }

  const handleSubmit = (): void => {
    if (experience && techs.length > 0 && type) {
      const profile: IUserProfile = {
        experienceLevel: experience as 'junior' | 'mid' | 'senior',
        technologies: techs,
        role: 'fullstack',
        interviewType: type as 'technical' | 'behavioral' | 'system-design'
      }
      setUserProfile(profile)
      onComplete?.()
    }
  }

  const isFormValid = Boolean(experience && techs.length > 0 && type)
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Setup Profile</CardTitle>
        <CardDescription>Configure your interview practice</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ExperienceSelector value={experience} onChange={setExperience} />
        <TechnologySelector selectedTechs={techs} onToggle={toggleTech} />
        <InterviewTypeSelector value={type} onChange={setType} />
        <Button 
          onClick={handleSubmit} 
          disabled={!isFormValid} 
          className="w-full"
        >
          Complete Setup
        </Button>
      </CardContent>
    </Card>
  )
}
