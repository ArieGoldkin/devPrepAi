import { User, Briefcase, Code2, ChevronRight } from 'lucide-react'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Logo from '@/components/ui/logo'

interface IWelcomeStepProps {
  onNext: () => void
}

export function WelcomeStep({ onNext }: IWelcomeStepProps): React.JSX.Element {
  const renderPracticeTypeCard = (
    icon: React.ReactNode,
    title: string,
    description: string,
    className: string
  ): React.JSX.Element => (
    <Card className={className}>
      <CardContent className="pt-6 text-center">
        {icon}
        <div className="font-semibold">{title}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  )

  return (
    <Card className="card-feature max-w-2xl mx-auto">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Logo size="lg" variant="gradient" showText={false} />
        </div>
        <CardTitle className="text-headline">Welcome to Practice Mode</CardTitle>
        <CardDescription className="text-subtitle text-muted-foreground">
          Prepare for your technical interview with AI-powered practice sessions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          {renderPracticeTypeCard(
            <Code2 className="h-8 w-8 text-primary mx-auto mb-2" />,
            'Coding Questions',
            'Algorithm & data structure challenges',
            'border-primary/20 bg-primary/5'
          )}
          {renderPracticeTypeCard(
            <Briefcase className="h-8 w-8 text-accent mx-auto mb-2" />,
            'System Design',
            'Architecture & scalability problems',
            'border-accent/20 bg-accent/5'
          )}
          {renderPracticeTypeCard(
            <User className="h-8 w-8 text-secondary mx-auto mb-2" />,
            'Behavioral',
            'Situational & leadership questions',
            'border-secondary/20 bg-secondary/5'
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            size="lg"
            variant="accent"
            onClick={onNext}
            className="min-w-[200px]"
          >
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}