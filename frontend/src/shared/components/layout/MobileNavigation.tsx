"use client";

import { ArrowRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactElement } from "react";

import { Button } from "@shared/ui/button";
import { cn } from "@shared/utils/cn";

export interface IMobileNavigationProps {
  mode: "default" | "practice" | "assessment" | "results";
}

export function MobileNavigation({
  mode,
}: IMobileNavigationProps): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { href: "/practice", label: "Practice" },
    { href: "/assessment", label: "Assessment" },
    { href: "/results", label: "Results" },
    { href: "/demo", label: "Demo" },
  ];

  const isActive = (href: string): boolean =>
    pathname === href || pathname.startsWith(href);

  const closeMenu = (): void => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-16 right-0 h-[calc(100vh-4rem)] w-80 bg-background border-l shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Navigation Items */}
          <nav className="flex-1 p-6 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t space-y-3">
            {mode === "assessment" && (
              <Link href="/practice" onClick={closeMenu}>
                <Button variant="outline" className="w-full">
                  Exit Assessment
                </Button>
              </Link>
            )}
            {mode === "results" && (
              <Link href="/practice" onClick={closeMenu}>
                <Button variant="outline" className="w-full">
                  Try Again
                </Button>
              </Link>
            )}
            {(mode === "default" || mode === "practice") && (
              <Link href="/practice" onClick={closeMenu}>
                <Button variant="accent" className="w-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
