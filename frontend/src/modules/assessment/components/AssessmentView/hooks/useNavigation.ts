import { useCallback } from "react";

interface IUseNavigationParams {
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
}

interface IUseNavigationReturn {
  handleNavigate: (direction: "next" | "previous") => void;
}

export function useNavigation({
  isLastQuestion,
  isFirstQuestion,
  handleNext,
  handlePrevious,
}: IUseNavigationParams): IUseNavigationReturn {
  const handleNavigate = useCallback((direction: "next" | "previous"): void => {
    if (direction === "next" && !isLastQuestion) {
      handleNext();
    } else if (direction === "previous" && !isFirstQuestion) {
      handlePrevious();
    }
  }, [isLastQuestion, isFirstQuestion, handleNext, handlePrevious]);

  return { handleNavigate };
}
