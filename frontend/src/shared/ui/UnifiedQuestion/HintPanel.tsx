"use client";
import { ChevronRight, Lightbulb, AlertCircle } from "lucide-react";
import React, { useState, useCallback } from "react";

import { Alert, AlertDescription } from "@shared/ui/alert";
import { Button } from "@shared/ui/button";
import { Card } from "@shared/ui/card";
import { cn } from "@shared/utils/cn";

// Helper component for hint header
function HintHeader({
  isExpanded,
  toggleExpanded,
  revealedHints,
  maxHints,
  hasMoreHints,
  revealNextHint
}: {
  isExpanded: boolean;
  toggleExpanded: () => void;
  revealedHints: number[];
  maxHints: number;
  hasMoreHints: boolean;
  revealNextHint: () => void;
}): React.JSX.Element {
  return (
    <div className="p-3 bg-muted/50 border-b">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleExpanded}
          className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
        >
          <ChevronRight
            className={cn(
              "w-4 h-4 transition-transform",
              isExpanded && "rotate-90"
            )}
          />
          <Lightbulb className="w-4 h-4" />
          <span>
            Hints{" "}
            {revealedHints.length > 0 &&
              `(${revealedHints.length}/${maxHints} used)`}
          </span>
        </button>
        {hasMoreHints && (
          <Button
            variant="ghost"
            size="sm"
            onClick={revealNextHint}
            className="text-xs"
          >
            Get Hint
          </Button>
        )}
      </div>
    </div>
  );
}

// Helper component for hint item
function HintItem({
  hint,
  index
}: {
  hint: string | { content: string; code?: string };
  index: number;
}): React.JSX.Element {
  const hintContent = typeof hint === "string" ? hint : hint.content;
  const hintCode = typeof hint === "object" ? hint.code : undefined;

  return (
    <div className="space-y-2 animate-in slide-in-from-top-2">
      <div className="flex items-start gap-2">
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
          {index + 1}
        </span>
        <div className="flex-1 space-y-1">
          <p className="text-sm text-muted-foreground">{hintContent}</p>
          {hintCode && (
            <pre className="text-xs bg-muted rounded p-2 overflow-x-auto">
              <code>{hintCode}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

// Hint structure for the panel
interface IHint {
  content: string;
  code?: string;
}

interface IHintPanelProps {
  hints: (string | IHint)[];
  onHintUsed?: ((hintIndex: number) => void) | undefined;
  maxHints?: number;
  showWarning?: boolean;
  className?: string;
}

export function HintPanel({
  hints,
  onHintUsed,
  maxHints = 3,
  showWarning = true,
  className = "",
}: IHintPanelProps): React.JSX.Element {
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const availableHints = hints.slice(0, maxHints);
  const hasMoreHints = revealedHints.length < availableHints.length;

  const revealNextHint = useCallback(() => {
    if (!hasMoreHints) return;

    const nextIndex = revealedHints.length;
    setRevealedHints((prev) => [...prev, nextIndex]);
    setIsExpanded(true);
    onHintUsed?.(nextIndex);
  }, [hasMoreHints, revealedHints.length, onHintUsed]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  if (hints.length === 0) {
    return <></>;
  }

  return (
    <Card className={cn("overflow-hidden", className)}>
      <HintHeader
        isExpanded={isExpanded}
        toggleExpanded={toggleExpanded}
        revealedHints={revealedHints}
        maxHints={maxHints}
        hasMoreHints={hasMoreHints}
        revealNextHint={revealNextHint}
      />

      {/* Hint Content */}
      {isExpanded && (
        <div className="p-3 space-y-3">
          {/* Warning about using hints */}
          {showWarning && revealedHints.length === 0 && hasMoreHints && (
            <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <AlertCircle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-xs">
                Using hints may affect your score. Try solving without hints
                first!
              </AlertDescription>
            </Alert>
          )}

          {/* Revealed hints */}
          {revealedHints.map((hintIndex) => {
            const hint = availableHints[hintIndex];
            if (hint === undefined) return null;
            return <HintItem key={hintIndex} hint={hint} index={hintIndex} />;
          })}

          {/* No more hints message */}
          {!hasMoreHints && revealedHints.length > 0 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              All available hints revealed
            </p>
          )}

          {/* Prompt to reveal first hint */}
          {revealedHints.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">
                Need help? Click &ldquo;Get Hint&rdquo; to reveal a hint.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={revealNextHint}
                className="gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                Reveal First Hint
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
