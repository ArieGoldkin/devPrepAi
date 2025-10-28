import * as React from "react";

import type { IAssessmentResults } from "@/types/ai";
import { Button } from "@shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shared/ui/tabs";

import { HintAnalyticsTab } from "./hint-analytics";
import { LearningInsightsTab } from "./learning-insights";
import { OverviewTab } from "./overview";
import { QuestionDetailsTab } from "./question-details";

interface IResultsDisplayProps {
  assessmentResults?: IAssessmentResults | undefined;
  className?: string;
}

export function ResultsDisplay({
  assessmentResults,
  className = "",
}: IResultsDisplayProps): React.JSX.Element {
  // Use placeholder data if no real assessment results
  const completedDate = assessmentResults
    ? new Date(assessmentResults.completedAt)
    : new Date(); // Use current date for placeholder

  const formattedDate = completedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const formattedTime = completedDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const questionCount = assessmentResults?.questions.length ?? 5; // Default to 5 for placeholder

  return (
    <div className={`${className} animate-fade-in space-y-6 p-8`}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold mb-1 gradient-text">
            🎉 Session Complete!
          </h1>
          <p className="text-sm text-gray-400">
            Practice Session • {questionCount} Questions • Completed{" "}
            {formattedDate} at {formattedTime}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="default">
            Export Results
          </Button>
          <Button variant="glass" size="default">
            Practice Again
          </Button>
        </div>
      </div>

      {/* Tabbed Results Analytics Interface */}
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="results-tabs-list w-full justify-start rounded-none">
          <TabsTrigger value="overview" className="results-tab rounded-none">
            📊 Overview
          </TabsTrigger>
          <TabsTrigger value="questions" className="results-tab rounded-none">
            📝 Question Details
          </TabsTrigger>
          <TabsTrigger value="hints" className="results-tab rounded-none">
            💡 Hint Analytics
          </TabsTrigger>
          <TabsTrigger value="insights" className="results-tab rounded-none">
            🧠 Learning Insights
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>

        {/* Tab 2: Question Details */}
        <TabsContent value="questions" className="mt-6">
          <QuestionDetailsTab />
        </TabsContent>

        {/* Tab 3: Hint Analytics */}
        <TabsContent value="hints" className="mt-6">
          <HintAnalyticsTab />
        </TabsContent>

        {/* Tab 4: Learning Insights */}
        <TabsContent value="insights" className="mt-6">
          <LearningInsightsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
