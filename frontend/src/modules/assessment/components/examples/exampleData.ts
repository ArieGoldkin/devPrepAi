import type { IQuestion } from "@/types/ai";

// Example question with hints for demonstration
export const exampleQuestion: IQuestion = {
  id: "q1",
  title: "React State Management",
  content: "Explain how you would implement a state management solution for a large React application with multiple components sharing state. Include considerations for performance and maintainability.",
  type: "conceptual",
  difficulty: 3,
  category: "Frontend Development",
  hints: [
    "Consider the different types of state in React applications and how they relate to component hierarchy.",
    "Think about popular state management libraries and their use cases - Context API, Redux, Zustand, etc.",
    "Performance considerations include preventing unnecessary re-renders and optimizing state updates.",
    "A complete solution might combine local state, Context API for shared state, and a state management library for complex global state."
  ],
  solution: "A comprehensive state management approach would include: 1) Local state for component-specific data, 2) Context API for moderate shared state, 3) External libraries like Redux/Zustand for complex global state, 4) Performance optimizations with memoization and selective subscriptions.",
  timeEstimate: 15,
  tags: ["react", "state-management", "frontend"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
