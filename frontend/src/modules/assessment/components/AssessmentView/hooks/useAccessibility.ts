import { useEffect } from "react";

export function useAccessibility(): void {
  useEffect(() => {
    const checkHighContrast = (): void => {
      const hasHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
      if (hasHighContrast) {
        document.documentElement.classList.add('high-contrast');
      } else {
        document.documentElement.classList.remove('high-contrast');
      }
    };
    checkHighContrast();
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    mediaQuery.addEventListener('change', checkHighContrast);
    return () => mediaQuery.removeEventListener('change', checkHighContrast);
  }, []);
}
