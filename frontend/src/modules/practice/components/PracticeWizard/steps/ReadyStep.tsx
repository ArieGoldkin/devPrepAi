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
    <Card className="card-gradient max-w-2xl mx-auto text-center">
      <CardContent className="pt-8 space-y-6">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-white/20 backdrop-blur mx-auto">
          <Trophy className="h-10 w-10 text-white" />
        </div>

        <div className="space-y-2">
          <h2 className="text-headline text-white">You&apos;re All Set!</h2>
          <p className="text-lg text-white/90 max-w-md mx-auto">
            Your personalized practice session is ready. Let&apos;s begin your
            interview preparation.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-lg p-4 max-w-sm mx-auto">
          <div className="grid grid-cols-2 gap-4 text-white">
            <div>
              <div className="text-2xl font-bold">{settings.questionCount}</div>
              <div className="text-xs opacity-90">Questions</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{settings.duration}</div>
              <div className="text-xs opacity-90">Minutes</div>
            </div>
          </div>
        </div>

        {settings.focusAreas.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {settings.focusAreas.map((area: string) => (
              <Badge
                key={area}
                variant="secondary"
                className="bg-white/20 text-white border-white/30"
              >
                {area}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" variant="secondary" onClick={onBack}>
            <ChevronLeft className="mr-2 h-5 w-5" />
            Adjust Settings
          </Button>
          <Button
            size="lg"
            variant="default"
            onClick={() => void onStart()}
            disabled={loading}
            className="bg-white text-primary hover:bg-white/90"
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
