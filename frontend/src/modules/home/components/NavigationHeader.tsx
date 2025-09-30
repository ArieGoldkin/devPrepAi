"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ReactElement } from "react";

import { MobileNavigation } from "@shared/components/layout/MobileNavigation";
import { Button } from "@shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/ui/dialog";
import Logo from "@shared/ui/logo";
import { useAppStore } from "@store";

import { DesktopNavigation } from "./DesktopNavigation";
import {
  NavigationActionButton,
  NavigationModeContent,
} from "./NavigationModeContent";

export interface INavigationHeaderProps {
  mode?: "default" | "practice" | "assessment" | "results";
}

export function NavigationHeader({
  mode = "default",
}: INavigationHeaderProps): ReactElement {
  const router = useRouter();
  const { isActive } = useAppStore();
  const [showExitDialog, setShowExitDialog] = useState(false);

  const handleExitAssessment = (): void => {
    if (isActive) {
      setShowExitDialog(true);
    } else {
      router.push("/practice");
    }
  };

  const confirmExit = (): void => {
    setShowExitDialog(false);
    router.push("/practice");
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container-xl flex h-16 items-center justify-between">
          <Link href="/">
            <Logo size={mode === "assessment" ? "sm" : "md"} />
          </Link>

          <DesktopNavigation mode={mode} />

          <div className="flex items-center gap-4">
            <NavigationModeContent
              mode={mode}
              onExitAssessment={handleExitAssessment}
            />
            <NavigationActionButton mode={mode} />
            <MobileNavigation mode={mode} />
          </div>
        </div>
      </header>

      {/* Exit Assessment Confirmation Dialog */}
      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Exit Assessment?</DialogTitle>
            <DialogDescription>
              Are you sure you want to exit the assessment? Your progress will
              be lost and you&apos;ll need to start over.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExitDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmExit}>
              Exit Assessment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
