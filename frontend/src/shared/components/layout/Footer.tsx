import { Code2, Github, Heart, Twitter } from "lucide-react";
import Link from "next/link";
import type { ReactElement } from "react";

// eslint-disable-next-line max-lines-per-function
export function Footer(): ReactElement {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t glass-header">
      <div className="container-xl py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary neon-glow">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-white text-glow">DevPrep AI</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs">
              Master technical interviews with AI-powered practice and instant
              feedback.
            </p>
          </div>

          {/* Product Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Product</h3>
            <ul className="space-y-2">
              {[
                { label: "Practice", href: "/practice" },
                { label: "Assessment", href: "/assessment" },
                { label: "Results", href: "/results" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "Blog", href: "/blog" },
                { label: "Support", href: "/support" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm">Connect</h3>
            <div className="flex gap-2">
              <Link
                href="https://github.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg glass-card hover:neon-glow transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 text-white/70" />
              </Link>
              <Link
                href="https://twitter.com"
                className="flex h-9 w-9 items-center justify-center rounded-lg glass-card hover:neon-glow transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 text-white/70" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
            <p className="text-sm text-white/60">
              © {currentYear} DevPrep AI. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm text-white/60">
              <span>Built with</span>
              <Heart className="h-4 w-4 text-brand-secondary fill-current" />
              <span>and Claude AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
