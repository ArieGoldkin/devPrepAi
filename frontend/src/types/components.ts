/**
 * Component Type Definitions
 * Shared types for React components and UI elements
 */

import type { ReactNode, CSSProperties } from "react";

import type { IQuestion, InterviewType } from "./ai";

// ============================================
// Common Component Props
// ============================================

export interface IBaseComponentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "data-testid"?: string;
  "aria-label"?: string;
}

export interface IBaseInputProps extends IBaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  minLength?: number;
}

export interface IBaseButtonProps extends IBaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

// ============================================
// Layout Component Props
// ============================================

export interface ILayoutProps extends IBaseComponentProps {
  header?: ReactNode;
  footer?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: "left" | "right";
}

export interface IContainerProps extends IBaseComponentProps {
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  padding?: boolean;
  centered?: boolean;
}

export interface IGridProps extends IBaseComponentProps {
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  responsive?: boolean;
}

// ============================================
// Form Component Props
// ============================================

export interface IFormFieldProps extends IBaseInputProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  name: string;
}

export interface ISelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: ReactNode;
}

export interface ISelectProps<T = string> extends IBaseComponentProps {
  options: ISelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
}

// ============================================
// Assessment Component Props
// ============================================

export interface IAssessmentSettings {
  duration: number; // minutes
  questionCount: number;
  difficulty: number;
  category?: string;
  interviewType?: InterviewType;
  autoSubmit: boolean;
}

export interface IQuestionCardProps extends IBaseComponentProps {
  question: IQuestion;
  showAnswer?: boolean;
  showHints?: boolean;
  onAnswerSubmit?: (answer: string) => void;
  onHintRequest?: () => void;
}

export interface IAnswerEditorProps extends IBaseInputProps {
  language?: string;
  theme?: "light" | "dark" | "high-contrast";
  showLineNumbers?: boolean;
  showSyntaxHighlighting?: boolean;
}

export interface ITimerProps extends IBaseComponentProps {
  duration: number; // seconds
  onExpire?: () => void;
  showWarning?: boolean;
  warningThreshold?: number; // seconds
  format?: "mm:ss" | "hh:mm:ss" | "auto";
}

// ============================================
// Feedback Component Props
// ============================================

export interface IFeedbackCardProps extends IBaseComponentProps {
  score: number;
  feedback: string[];
  strengths?: string[];
  improvements?: string[];
  variant?: "success" | "warning" | "error" | "info";
}

export interface IProgressBarProps extends IBaseComponentProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  labelFormat?: (value: number, max: number) => string;
  variant?: "default" | "success" | "warning" | "error";
  animated?: boolean;
}

// Re-export UI component types from separate file
export * from "./ui-components";

// ============================================
// Type Guards
// ============================================

export function isBaseComponentProps(props: unknown): props is IBaseComponentProps {
  return props !== null && typeof props === "object";
}

export function hasChildren(props: unknown): props is { children: ReactNode } {
  return props !== null && typeof props === "object" && "children" in props;
}

// ============================================
// Generic Types
// ============================================

export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ComponentVariant = "primary" | "secondary" | "success" | "warning" | "error" | "info";
export type ComponentTheme = "light" | "dark" | "auto";
export type ComponentOrientation = "horizontal" | "vertical";
export type ComponentAlignment = "left" | "center" | "right" | "justify";