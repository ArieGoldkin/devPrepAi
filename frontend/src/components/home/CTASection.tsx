import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import type { ReactElement } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function CTASection(): ReactElement {
  return (
    <section className="py-20 border-t">
      <div className="container-md">
        <Card className="card-gradient p-8 text-center">
          <CardContent className="space-y-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-white/20 backdrop-blur">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-headline text-white">Ready to Ace Your Interview?</h3>
              <p className="text-lg text-white/90 max-w-xl mx-auto">
                Join thousands of developers who&apos;ve successfully prepared with DevPrep AI
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/practice">
                <Button size="lg" variant="secondary">
                  Start Free Practice
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  View Demo First
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}