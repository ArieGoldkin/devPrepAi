import React from "react";

import { cn } from "@lib/utils";

interface ILogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "gradient" | "dark" | "light";
  showText?: boolean;
}

const renderLogoIcon = (
  currentSize: { icon: number },
  color1: string,
  color2: string,
): React.ReactElement => (
  <svg
    width={currentSize.icon}
    height={currentSize.icon}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0"
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={color1} />
        <stop offset="100%" stopColor={color2} />
      </linearGradient>
    </defs>

    {/* Outer hexagon shape */}
    <path
      d="M24 2L42 12V36L24 46L6 36V12L24 2Z"
      fill="url(#logo-gradient)"
      opacity="0.1"
    />

    {/* Inner code brackets */}
    <path
      d="M16 18L10 24L16 30M32 18L38 24L32 30"
      stroke="url(#logo-gradient)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Center AI symbol */}
    <circle cx="24" cy="24" r="4" fill="url(#logo-gradient)" />
    <circle
      cx="24"
      cy="24"
      r="8"
      stroke="url(#logo-gradient)"
      strokeWidth="1.5"
      strokeOpacity="0.5"
      fill="none"
    />

    {/* Connection dots */}
    <circle cx="24" cy="12" r="1.5" fill="url(#logo-gradient)" opacity="0.8" />
    <circle cx="24" cy="36" r="1.5" fill="url(#logo-gradient)" opacity="0.8" />
    <circle cx="12" cy="24" r="1.5" fill="url(#logo-gradient)" opacity="0.8" />
    <circle cx="36" cy="24" r="1.5" fill="url(#logo-gradient)" opacity="0.8" />
  </svg>
);

const renderLogoText = (
  currentSize: { text: string },
  textColor: string,
): React.ReactElement => (
  <div className="flex flex-col">
    <span
      className={cn("font-bold tracking-tight", currentSize.text, textColor)}
    >
      DevPrep
    </span>
    <span className={cn("text-xs font-medium text-muted-foreground -mt-1")}>
      AI-Powered Prep
    </span>
  </div>
);

const Logo: React.FC<ILogoProps> = ({
  className,
  size = "md",
  variant = "default",
  showText = true,
}): React.ReactElement => {
  const sizes = {
    sm: { icon: 24, text: "text-base" },
    md: { icon: 32, text: "text-lg" },
    lg: { icon: 40, text: "text-xl" },
    xl: { icon: 48, text: "text-2xl" },
  };

  const currentSize = sizes[size];

  const getTextColor = (): string => {
    switch (variant) {
      case "gradient":
        return "text-gradient";
      case "dark":
        return "text-foreground";
      case "light":
        return "text-white";
      default:
        return "text-foreground";
    }
  };

  const getIconColor = (): string[] => {
    switch (variant) {
      case "dark":
        return ["#5b6cf8", "#8b5cf6"];
      case "light":
        return ["#ffffff", "#f0f0f0"];
      default:
        return ["#5b6cf8", "#8b5cf6"];
    }
  };

  const [color1, color2] = getIconColor();
  const textColor = getTextColor();

  // Ensure colors are never undefined
  const safeColor1 = color1 || "#5b6cf8";
  const safeColor2 = color2 || "#8b5cf6";

  return (
    <div className={cn("flex items-center gap-2", className || "")}>
      {renderLogoIcon(currentSize, safeColor1, safeColor2)}
      {showText && renderLogoText(currentSize, textColor)}
    </div>
  );
};

export default Logo;
