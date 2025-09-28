import { useCallback } from "react";

interface IUseNavigationParams {
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
}

interface IUseNavigationReturn {
  handleNavigate: (direction: "next" | "previous" | number) => void;
}

export function useNavigation({
  isLastQuestion,
  isFirstQuestion,
  handleNext,
  handlePrevious,
}: IUseNavigationParams): IUseNavigationReturn {
  const handleNavigate = useCallback((direction: "next" | "previous" | number): void => {
    if (typeof direction === "number") {
      // For numeric navigation, we don't handle it in this hook
      // This is a placeholder for potential future functionality
      return;
    }

    if (direction === "next" && !isLastQuestion) {
      handleNext();
    } else if (direction === "previous" && !isFirstQuestion) {
      handlePrevious();
    }
  }, [isLastQuestion, isFirstQuestion, handleNext, handlePrevious]);

  return { handleNavigate };
}
