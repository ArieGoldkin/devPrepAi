/**
 * Shared types for AnswerPanel components
 */

/**
 * Supported programming languages for code answers
 */
export type TCodeLanguage = "javascript" | "typescript" | "python";

/**
 * Supported editor themes
 */
export type TEditorTheme = "dark" | "light";

/**
 * Answer types for different question formats
 */
export type TAnswerType = "code" | "text" | "multiple-choice";

/**
 * Base answer panel configuration
 */
export interface IAnswerPanelConfig {
  /** Current question ID */
  questionId: string;

  /** Answer type determines which editor to show */
  answerType: TAnswerType;

  /** Default language for code questions */
  defaultLanguage?: TCodeLanguage;

  /** Default theme (dark or light) */
  defaultTheme?: TEditorTheme;

  /** Read-only mode for review/results */
  readOnly?: boolean;

  /** Auto-save interval in milliseconds (default: 2000ms) */
  autoSaveInterval?: number;
}

/**
 * Editor stats displayed in footer
 */
export interface IEditorStats {
  /** Current line number */
  line: number;

  /** Current column number */
  column: number;

  /** Total number of lines */
  totalLines: number;

  /** Total character count */
  totalChars: number;

  /** Language of the code */
  language: TCodeLanguage;
}

/**
 * Code editor specific props
 */
export interface ICodeEditorProps {
  /** Current code value */
  value: string;

  /** Change handler */
  onChange: (value: string) => void;

  /** Programming language */
  language: TCodeLanguage;

  /** Editor theme */
  theme: TEditorTheme;

  /** Placeholder text */
  placeholder?: string;

  /** Read-only mode */
  readOnly?: boolean;

  /** Auto-focus on mount */
  autoFocus?: boolean;

  /** Minimum editor height */
  minHeight?: string;

  /** Maximum editor height */
  maxHeight?: string;

  /** Submit handler (Ctrl+Enter) */
  onSubmit?: () => void;

  /** Save handler (Ctrl+S) */
  onSave?: () => void;

  /** Toggle hints handler (Ctrl+/) */
  onToggleHints?: () => void;
}
