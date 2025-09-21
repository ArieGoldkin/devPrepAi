// Constants for practice wizard
export const DURATION_15_MIN = 15;
export const DURATION_30_MIN = 30;
export const DURATION_45_MIN = 45;
export const QUESTION_COUNT_3 = 3;
export const QUESTION_COUNT_5 = 5;
export const QUESTION_COUNT_7 = 7;
export const QUESTION_COUNT_10 = 10;

export const DURATION_OPTIONS = [
  DURATION_15_MIN,
  DURATION_30_MIN,
  DURATION_45_MIN,
] as const;
export const QUESTION_COUNT_OPTIONS = [
  QUESTION_COUNT_3,
  QUESTION_COUNT_5,
  QUESTION_COUNT_7,
  QUESTION_COUNT_10,
] as const;
export const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"] as const;
export const FOCUS_AREAS = [
  "Algorithms",
  "Data Structures",
  "System Design",
  "Behavioral",
  "Frontend",
  "Backend",
  "Databases",
  "Security",
] as const;

// Interview types for practice selection
export const INTERVIEW_TYPES = [
  {
    id: "coding",
    label: "Coding Questions",
    description: "Algorithm & data structure challenges",
  },
  {
    id: "system-design",
    label: "System Design",
    description: "Architecture & scalability problems",
  },
  {
    id: "behavioral",
    label: "Behavioral",
    description: "Situational & leadership questions",
  },
] as const;

// Expanded technology options organized by category
export const TECHNOLOGY_OPTIONS = {
  frontend: ["React", "Vue.js", "Angular", "Svelte", "Next.js", "Nuxt.js"],
  backend: [
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "Spring Boot",
    ".NET Core",
    "Ruby on Rails",
  ],
  mobile: ["React Native", "Flutter", "Swift", "Kotlin", "Ionic"],
  languages: [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C#",
    "Go",
    "Rust",
    "PHP",
  ],
  databases: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Elasticsearch",
    "DynamoDB",
  ],
  cloud: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform"],
  tools: ["Git", "Jest", "Cypress", "Webpack", "Vite", "GraphQL", "REST APIs"],
} as const;

export const TOTAL_STEPS = 5;
export const PROGRESS_MULTIPLIER = 100;

export type WizardStep = "welcome" | "profile" | "focus" | "settings" | "ready";
export type DifficultyLevel = "easy" | "medium" | "hard";

export interface IPracticeSettings {
  duration: number;
  questionCount: number;
  difficulty: DifficultyLevel;
  focusAreas: string[];
}

// Legacy export for backward compatibility
export type PracticeSettings = IPracticeSettings;
