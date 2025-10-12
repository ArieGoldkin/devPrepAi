"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import { cn } from "@shared/utils/cn";

export interface IDesktopNavigationProps {
  mode: "default" | "practice" | "assessment" | "results";
}

export function DesktopNavigation({
  mode,
}: IDesktopNavigationProps): ReactElement {
  const pathname = usePathname();

  const isActivePage = (href: string): boolean =>
    pathname === href || pathname.startsWith(href);

  if (mode === "assessment") {
    return (
      <nav className="hidden md:flex items-center gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Home
        </Link>
      </nav>
    );
  }

  return (
    <nav className="hidden md:flex items-center gap-6">
      <Link
        href="/practice"
        className={cn(
          "text-sm font-medium transition-colors",
          isActivePage("/practice")
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Practice
      </Link>
      <Link
        href="/assessment"
        className={cn(
          "text-sm font-medium transition-colors",
          isActivePage("/assessment")
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Assessment
      </Link>
      <Link
        href="/results"
        className={cn(
          "text-sm font-medium transition-colors",
          isActivePage("/results")
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Results
      </Link>
      <Link
        href="/demo"
        className={cn(
          "text-sm font-medium transition-colors",
          isActivePage("/demo")
            ? "text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Demo
      </Link>
    </nav>
  );
}
