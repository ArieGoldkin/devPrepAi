"use client";

import { useState } from "react";

import { CodeMirrorEditor } from "@shared/ui/CodeMirrorEditor";

import { SAMPLE_JAVASCRIPT, SAMPLES } from "./sample-code";

const THEME_FEATURES = [
  "Glassmorphism effects (backdrop-filter blur, transparent backgrounds)",
  "Purple border with signature glow (rgba(168, 85, 247, 0.2))",
  "Syntax highlighting with brand colors (purple keywords, pink functions, cyan strings)",
  "Text-shadow glow effects on all syntax elements",
  "Custom scrollbar with purple-pink gradient",
  "WCAG AA compliant colors (4.5:1+ contrast ratios)",
  "Multi-language support (JavaScript, TypeScript, Python)",
];

export default function TestThemePage() {
  const [code, setCode] = useState(SAMPLE_JAVASCRIPT);
  const [language, setLanguage] = useState<
    "javascript" | "typescript" | "python"
  >("javascript");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const handleLanguageChange = (
    newLang: "javascript" | "typescript" | "python",
  ) => {
    setLanguage(newLang);
    setCode(SAMPLES[newLang]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-pink-900 p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="glass-card p-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Dark Theme Test
          </h1>
          <p className="text-gray-300">
            Testing the CodeMirror dark theme with syntax highlighting and glow
            effects
          </p>
        </div>

        <div className="glass-card p-6 space-y-4">
          <div className="flex gap-4 flex-wrap">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Language
              </label>
              <div className="flex gap-2">
                {(["javascript", "typescript", "python"] as const).map(
                  (lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        language === lang
                          ? "bg-purple-500 text-white shadow-lg shadow-purple-500/50"
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-200">
                Theme
              </label>
              <div className="flex gap-2">
                {(["dark", "light"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      theme === t
                        ? "bg-pink-500 text-white shadow-lg shadow-pink-500/50"
                        : "bg-white/10 text-gray-300 hover:bg-white/20"
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">Editor Preview</h2>
          <CodeMirrorEditor
            value={code}
            onChange={setCode}
            language={language}
            theme={theme}
            minHeight="500px"
            maxHeight="800px"
            placeholder="Start typing your code..."
          />
        </div>

        <div className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">
            Theme Features Checklist
          </h2>
          <ul className="space-y-2 text-gray-300">
            {THEME_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-purple-400 mt-1">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
