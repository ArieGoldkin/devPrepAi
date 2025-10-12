"use client";

import { usePathname } from "next/navigation";
import type { ReactElement, ReactNode } from "react";

import { NavigationHeader } from "@modules/home/components/NavigationHeader";
import { Footer } from "@shared/components/layout/Footer";

export interface IAppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: IAppLayoutProps): ReactElement {
  const pathname = usePathname();

  // Determine navigation mode based on current path
  const getNavigationMode = ():
    | "default"
    | "practice"
    | "assessment"
    | "results" => {
    if (pathname.startsWith("/practice")) return "practice";
    if (pathname.startsWith("/assessment")) return "assessment";
    if (pathname.startsWith("/results")) return "results";
    return "default";
  };

  const navigationMode = getNavigationMode();

  return (
    <div className="min-h-screen">
      <NavigationHeader mode={navigationMode} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
