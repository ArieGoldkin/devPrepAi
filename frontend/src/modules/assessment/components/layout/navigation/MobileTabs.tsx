"use client";

import React from "react";

import { cn } from "@shared/utils/cn";

interface IMobileTabsProps {
  activeTab: "question" | "answer";
  onTabChange: (tab: "question" | "answer") => void;
}

export function MobileTabs({
  activeTab,
  onTabChange,
}: IMobileTabsProps): React.JSX.Element {
  return (
    <div className="flex border-b bg-background sticky top-0 z-10">
      <button
        className={cn(
          "flex-1 px-4 py-3 text-sm font-medium transition-colors",
          activeTab === "question"
            ? "bg-primary/10 border-b-2 border-primary"
            : "hover:bg-muted"
        )}
        onClick={() => onTabChange("question")}
        aria-pressed={activeTab === "question"}
      >
        Question
      </button>
      <button
        className={cn(
          "flex-1 px-4 py-3 text-sm font-medium transition-colors",
          activeTab === "answer"
            ? "bg-primary/10 border-b-2 border-primary"
            : "hover:bg-muted"
        )}
        onClick={() => onTabChange("answer")}
        aria-pressed={activeTab === "answer"}
      >
        Code Editor
      </button>
    </div>
  );
}