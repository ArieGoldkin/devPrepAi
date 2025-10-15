import React from "react";

import { ScrollArea } from "@shared/ui/scroll-area";

interface IQuestionPanelProps {
  children: React.ReactNode;
}

export const QuestionPanel: React.FC<IQuestionPanelProps> = ({ children }) => (
  <ScrollArea className="h-full w-full">
    <div className="flex flex-col gap-4 p-1">{children}</div>
  </ScrollArea>
);
