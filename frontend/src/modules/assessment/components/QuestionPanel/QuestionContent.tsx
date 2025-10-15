import React from "react";

interface IQuestionContentProps {
  title: string;
  content: string;
}

// Parse content for inline code (backticks and <code> tags)
const parseContent = (text: string): React.ReactNode[] => {
  // Split by backticks for inline code
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      // Inline code with backticks
      const code = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-2 py-0.5 rounded text-xs font-mono bg-cyan-500/10 text-blue-400"
        >
          {code}
        </code>
      );
    }
    // Check for <code> tags
    if (part.includes("<code>")) {
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    }
    return <span key={index}>{part}</span>;
  });
};

export const QuestionContent: React.FC<IQuestionContentProps> = ({
  title,
  content,
}) => (
  <div className="space-y-3">
    <h3 className="text-lg font-bold text-white">{title}</h3>
    <div className="text-sm text-gray-300 leading-[1.7]">
      {parseContent(content)}
    </div>
  </div>
);
