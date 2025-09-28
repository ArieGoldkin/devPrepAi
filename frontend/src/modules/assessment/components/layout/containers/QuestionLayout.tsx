"use client";

import React, { useState, useEffect } from "react";

import type { IQuestion } from "@/types/ai";
import { MOBILE_BREAKPOINT } from "@shared/constants/ui-constants";

import { isCodingQuestion } from "../../answer/utils";

import { DesktopQuestionLayout } from "./DesktopQuestionLayout";
import { MobileQuestionLayout } from "./MobileQuestionLayout";
import { SingleColumnLayout } from "./SingleColumnLayout";

interface IQuestionLayoutProps {
  question: IQuestion;
  currentAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: () => void;
  onNavigate?: (direction: "next" | "previous") => void;
  isLastQuestion?: boolean;
  isFirstQuestion?: boolean;
  className?: string;
}

export default function QuestionLayout({
  question,
  currentAnswer,
  onAnswerChange,
  onSubmit,
  onNavigate,
  isLastQuestion = false,
  isFirstQuestion = false,
  className,
}: IQuestionLayoutProps): React.JSX.Element {
  const [isMobile, setIsMobile] = useState(false);

  const isCoding = isCodingQuestion(question);

  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const baseProps = {
    question,
    currentAnswer,
    onAnswerChange,
    onSubmit,
    isLastQuestion,
    isFirstQuestion,
    ...(className && { className }),
  };

  const propsWithNavigation = {
    ...baseProps,
    ...(onNavigate && { onNavigate }),
  };

  if (!isCoding) {
    return <SingleColumnLayout {...propsWithNavigation} />;
  }

  if (isMobile) {
    return <MobileQuestionLayout {...propsWithNavigation} />;
  }

  return <DesktopQuestionLayout {...propsWithNavigation} />;
}
