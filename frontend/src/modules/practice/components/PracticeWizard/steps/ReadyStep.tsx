import { ChevronLeft, Loader2, Sparkles, Trophy } from "lucide-react";
import React from "react";

import { Badge } from "@shared/ui/badge";
import { Button } from "@shared/ui/button";
import { Card, CardContent } from "@shared/ui/card";

import type { PracticeSettings } from "../constants";

interface IReadyStepProps {
  settings: PracticeSettings;
  loading: boolean;
  onStart: () => Promise<void>;
  onBack: () => void;
}

export function ReadyStep({
  settings,
  loading,
  onStart,
  onBack,
}: IReadyStepProps): React.JSX.Element {
  return (
    <Card className="glass-card fade-in max-w-2xl mx-auto text-center">
      <CardContent className="pt-8 space-y-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/20 backdrop-blur mx-auto neon-glow-green">
          <Trophy className="h-10 w-10 text-white" />
        </div>

        <div className="space-y-2">
          <h2 className="text-headline text-glow-strong">
            You&apos;re All Set!
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Your personalized practice session is ready. Let&apos;s begin your
            interview preparation.
          </p>
        </div>

        <div className="glass-card-static rounded-lg p-4 max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl font-bold text-glow">
                {settings.questionCount}
              </div>
              <div className="text-xs text-muted-foreground">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-glow">
                {settings.duration}
              </div>
              <div className="text-xs text-muted-foreground">Minutes</div>
            </div>
          </div>
        </div>

        {settings.focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {settings.focusAreas.map((area: string) => (
              <Badge key={area} variant="secondary" className="neon-glow-blue">
                {area}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" variant="outline" onClick={onBack}>
            <ChevronLeft className="mr-2 h-5 w-5" />
            Adjust Settings
          </Button>
          <Button
            size="lg"
            onClick={() => void onStart()}
            disabled={loading}
            className="btn-primary-glass pulse-glow"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Start Practice
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
