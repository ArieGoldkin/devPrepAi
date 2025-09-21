import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/logo';

export function NavigationHeader(): ReactElement {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container-xl flex h-16 items-center justify-between">
        <Logo size="md" />
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/practice" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Practice
          </Link>
          <Link href="/assessment" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Assessment
          </Link>
          <Link href="/results" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Results
          </Link>
          <Link href="/demo" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Demo
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/practice">
            <Button variant="accent" size="sm" className="hidden sm:flex">
              Get Started <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}