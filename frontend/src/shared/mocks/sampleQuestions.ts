import type { IQuestion } from "@/types/ai";

export const sampleQuestions: IQuestion[] = [
  {
    id: "demo-1",
    title: "Two Sum Problem",
    content:
      "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    type: "coding",
    difficulty: 3,
    category: "Data Structures & Algorithms",
    subcategory: "Arrays & Hash Maps",
    hints: [
      "Consider using a hash map to store numbers you've seen",
      "For each number, check if its complement (target - num) exists in the map",
      "Store the index along with the number for quick lookup",
      "Think about the time complexity trade-off between nested loops vs hash map",
    ],
    solution:
      "Use a hash map to store each number with its index. For each element, check if (target - current number) exists in the map. If found, return both indices. Time: O(n), Space: O(n).",
    timeEstimate: 15,
    tags: ["arrays", "hash-map", "two-pointers", "easy"],
    expectedLanguage: "javascript",
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹",
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists",
      "Solution must run in O(n) time complexity",
    ],
    examples: [
      {
        input: "nums = [2, 7, 11, 15], target = 9",
        output: "[0, 1]",
        explanation:
          "Because nums[0] + nums[1] == 9, we return [0, 1]. The sum of 2 and 7 equals the target.",
      },
      {
        input: "nums = [3, 2, 4], target = 6",
        output: "[1, 2]",
        explanation:
          "The indices 1 and 2 contain values that sum to 6 (2 + 4 = 6).",
      },
      {
        input: "nums = [3, 3], target = 6",
        output: "[0, 1]",
        explanation:
          "Both elements are the same value but at different positions. This demonstrates handling duplicates.",
      },
    ],
    edgeCases: [
      "Array with exactly 2 elements (minimum size)",
      "Negative numbers in the array",
      "Target is zero or negative",
      "Array contains duplicate numbers",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-2",
    title: "JavaScript Closures: Counter Factory",
    content:
      "Create a function createCounter() that returns a counter function. Each time the counter function is called, it should return a number that is one higher than the previous call. The first call should return 1. Explain how closures enable this behavior and why the counter state persists between function calls.",
    type: "coding",
    difficulty: 5,
    category: "JavaScript Advanced",
    subcategory: "Closures & Scope",
    hints: [
      "The outer function (createCounter) needs to define a variable to track the count",
      "The inner function (counter) should have access to this variable even after createCounter returns",
      "Consider how JavaScript's lexical scoping allows inner functions to access outer variables",
      "The count variable needs to persist - think about where it lives in memory",
    ],
    solution:
      "function createCounter() { let count = 0; return function() { return ++count; }; } The inner function forms a closure over 'count', keeping it alive in memory.",
    timeEstimate: 10,
    tags: ["javascript", "closures", "scope", "functions"],
    expectedLanguage: "javascript",
    constraints: [
      "Must use closures (no global variables)",
      "Counter should start at 1 on first call",
      "Each counter instance should be independent",
      "Solution should be memory-efficient",
    ],
    examples: [
      {
        input: "const counter = createCounter(); counter();",
        output: "1",
        explanation:
          "First call to counter() returns 1. The count variable is initialized to 0 and incremented.",
      },
      {
        input: "counter(); counter();",
        output: "2, then 3",
        explanation:
          "Subsequent calls return 2 and 3. The closure maintains the count state between calls.",
      },
      {
        input: "const counter2 = createCounter(); counter2();",
        output: "1",
        explanation:
          "A new counter instance starts fresh at 1, demonstrating that each closure has its own private state.",
      },
    ],
    edgeCases: [
      "Multiple independent counter instances",
      "Counter reaching large numbers (no overflow handling needed for demo)",
      "Calling counter without parentheses (returns function, not count)",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "demo-3",
    title: "Valid Parentheses",
    content:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: (1) Open brackets must be closed by the same type of brackets, (2) Open brackets must be closed in the correct order, (3) Every close bracket has a corresponding open bracket of the same type.",
    type: "coding",
    difficulty: 4,
    category: "Data Structures & Algorithms",
    subcategory: "Stack",
    hints: [
      "Think about using a stack data structure to track opening brackets",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket",
      "What should you return if the string is empty? Is that valid?",
      "Consider what happens if you have unmatched opening brackets at the end",
    ],
    solution:
      "Use a stack to push opening brackets. For closing brackets, pop and verify they match. String is valid if stack is empty at the end. Time: O(n), Space: O(n).",
    timeEstimate: 12,
    tags: ["stack", "string", "validation", "medium"],
    expectedLanguage: "javascript",
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only: ()[]{}",
      "Must handle all three bracket types",
      "Solution should run in O(n) time complexity",
    ],
    examples: [
      {
        input: 's = "()"',
        output: "true",
        explanation:
          "A single pair of parentheses is valid. The opening bracket has a matching closing bracket.",
      },
      {
        input: 's = "()[]{}"',
        output: "true",
        explanation:
          "Multiple pairs of different bracket types in correct order. Each opening bracket is immediately closed.",
      },
      {
        input: 's = "(]"',
        output: "false",
        explanation:
          "Mismatched bracket types. Opening parenthesis is closed by a square bracket.",
      },
      {
        input: 's = "([)]"',
        output: "false",
        explanation:
          "Brackets are interleaved incorrectly. The square bracket closes before the parenthesis.",
      },
    ],
    edgeCases: [
      'Empty string "" (should return true)',
      "Single opening bracket with no closing bracket",
      "All closing brackets with no opening brackets",
      "Nested brackets like ((()))",
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
