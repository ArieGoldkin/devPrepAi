/**
 * UI Component Type Definitions
 * Complex UI component types (tables, modals, navigation)
 */

import type { ReactNode } from "react";

import type { IBaseComponentProps } from "./components";

// ============================================
// Modal & Dialog Props
// ============================================

export interface IModalProps extends IBaseComponentProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
}

export interface IConfirmDialogProps extends IModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: "primary" | "danger";
  loading?: boolean;
}

// ============================================
// Navigation Component Props
// ============================================

export interface INavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: INavigationItem[];
}

export interface INavigationProps extends IBaseComponentProps {
  items: INavigationItem[];
  activeItemId?: string;
  orientation?: "horizontal" | "vertical";
  variant?: "default" | "pills" | "underline";
}

export interface IBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface IBreadcrumbProps extends IBaseComponentProps {
  items: IBreadcrumbItem[];
  separator?: ReactNode;
  maxItems?: number;
}

// ============================================
// Data Display Component Props
// ============================================

export interface ITableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: "left" | "center" | "right";
}

export interface ITableProps<T> extends IBaseComponentProps {
  data: T[];
  columns: ITableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  selectedRows?: T[];
  onSelectRow?: (row: T, selected: boolean) => void;
}

export interface ICardProps extends IBaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  actions?: ReactNode;
  hoverable?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

// ============================================
// Utility Component Props
// ============================================

export interface ITooltipProps extends IBaseComponentProps {
  content: ReactNode;
  trigger?: "hover" | "click" | "focus";
  placement?: "top" | "bottom" | "left" | "right";
  delay?: number;
}

export interface ILoadingProps extends IBaseComponentProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "pulse";
  text?: string;
  fullScreen?: boolean;
}

export interface IErrorBoundaryProps extends IBaseComponentProps {
  fallback?: ReactNode | ((error: Error) => ReactNode);
  onError?: (error: Error, errorInfo: unknown) => void;
  resetKeys?: string[];
  resetOnPropsChange?: boolean;
}