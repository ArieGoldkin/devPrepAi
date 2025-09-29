// Constants for difficulty thresholds
export const DIFFICULTY_EASY_MAX = 3;
export const DIFFICULTY_MEDIUM_MAX = 7;
export const ID_DISPLAY_LENGTH = 8;

export const getDifficultyLabel = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_EASY_MAX) return "Easy";
  if (difficulty <= DIFFICULTY_MEDIUM_MAX) return "Medium";
  return "Hard";
};

export const getDifficultyColor = (difficulty: number): string => {
  if (difficulty <= DIFFICULTY_EASY_MAX)
    return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
  if (difficulty <= DIFFICULTY_MEDIUM_MAX)
    return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
};
