"use client";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";
import type * as React from "react";
import { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";

interface ICodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "javascript" | "typescript" | "jsx" | "tsx";
  placeholder?: string;
  disabled?: boolean;
  minHeight?: string;
  maxHeight?: string;
}

const LANGUAGE_MAP = {
  javascript: "js",
  typescript: "ts",
  jsx: "jsx",
  tsx: "tsx",
} as const;

const highlightCode = (code: string, language: string): string => {
  const grammar = Prism.languages[language] ?? Prism.languages["javascript"];
  if (!grammar) return code;
  return Prism.highlight(code, grammar, language);
};

const CodeEditorContent = ({
  code,
  language,
  disabled,
  placeholder,
  minHeight,
  maxHeight,
  handleChange,
}: {
  code: string;
  language: string;
  disabled: boolean;
  placeholder: string;
  minHeight: string;
  maxHeight: string;
  handleChange: (newCode: string) => void;
}): React.ReactElement => (
  <Editor
    value={code}
    onValueChange={handleChange}
    highlight={(codeStr) => highlightCode(codeStr, language)}
    padding={12}
    disabled={disabled}
    placeholder={placeholder}
    style={{
      fontFamily: '"Fira Code", "Cascadia Code", monospace',
      fontSize: 14,
      minHeight,
      maxHeight,
      overflow: "auto",
      backgroundColor: "#2d2d2d",
      color: "#f8f8f2",
    }}
    className="code-editor"
  />
);

export function CodeEditor({
  value,
  onChange,
  language = "typescript",
  placeholder = "// Write your code here...",
  disabled = false,
  minHeight = "200px",
  maxHeight = "600px",
}: ICodeEditorProps): React.ReactElement {
  const [code, setCode] = useState(value);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleChange = (newCode: string): void => {
    setCode(newCode);
    onChange(newCode);
  };

  const prismLanguage = LANGUAGE_MAP[language];

  return (
    <div className="relative w-full rounded-md border border-gray-300 bg-[#2d2d2d] p-2">
      <div className="absolute top-2 right-2 text-xs text-gray-400">
        {language.toUpperCase()}
      </div>
      <CodeEditorContent
        code={code}
        language={prismLanguage}
        disabled={disabled}
        placeholder={placeholder}
        minHeight={minHeight}
        maxHeight={maxHeight}
        handleChange={handleChange}
      />
    </div>
  );
}
