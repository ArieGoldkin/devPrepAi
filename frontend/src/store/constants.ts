/**
 * Store Constants
 * Centralized constants for state management
 */

// Results
export const RESULTS_LIMIT = 10;

// Practice Session
export const DEFAULT_QUESTION_TIME = 30; // minutes
export const MIN_QUESTION_TIME = 5; // minutes
export const MAX_QUESTION_TIME = 60; // minutes

// Assessment Defaults
export const ASSESSMENT_DEFAULTS = {
  duration: 30, // Default question time in minutes
  difficulty: 5, // Default difficulty (1-10)
};

// Progress
export const PROGRESS_UPDATE_INTERVAL = 1000; // ms

// Storage
export const STORE_NAME = "devprep-app-store";
export const STORE_VERSION = 1;
