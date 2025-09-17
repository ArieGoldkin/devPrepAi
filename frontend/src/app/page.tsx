import type { ReactElement } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Home(): ReactElement {
  return (
    <div className="min-h-screen bg-background p-8">
      <main className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">DevPrep AI</h1>
          <p className="text-lg text-muted-foreground">
            AI-powered interview preparation platform
          </p>
          <div className="flex gap-2 justify-center">
            <Badge variant="default">TypeScript</Badge>
            <Badge variant="secondary">Next.js 15</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
          </div>
        </header>
        
        <Separator />
        
        <PracticeSection />
      </main>
    </div>
  );
}

function PracticeSection(): ReactElement {
  return (
    <section className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Practice Questions</CardTitle>
          <CardDescription>
            Generate AI-powered interview questions tailored to your role
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button size="sm">Start Practice</Button>
            <Button variant="outline" size="sm">
              View Sample
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Answer Evaluation</CardTitle>
          <CardDescription>
            Get detailed feedback on your interview responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>• Code Review</div>
            <div>• Best Practices</div>
            <div>• Performance Tips</div>
            <div>• Improvement Areas</div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
