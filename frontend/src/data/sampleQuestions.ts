import type { IQuestion } from '../types/ai'

export const sampleQuestions: IQuestion[] = [
  {
    id: 'demo-1',
    title: 'Let vs Const',
    content: 'What is the difference between let and const in JavaScript?',
    type: 'conceptual',
    difficulty: 5,
    category: 'JavaScript Fundamentals',
    hints: ['Think about reassignment', 'Consider block scope'],
    solution: 'let allows reassignment, const does not. Both are block-scoped.',
    timeEstimate: 5,
    tags: ['javascript', 'variables'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-2',
    title: 'JavaScript Closures',
    content: 'Explain the concept of closures in JavaScript with an example.',
    type: 'conceptual',
    difficulty: 7,
    category: 'JavaScript Advanced',
    hints: ['Functions can access outer scope', 'Variables persist after function returns'],
    solution: 'A closure is when a function retains access to variables from its outer scope.',
    timeEstimate: 10,
    tags: ['javascript', 'closures', 'scope'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo-3',
    title: 'React Virtual DOM',
    content: 'How does React\'s virtual DOM improve performance?',
    type: 'conceptual',
    difficulty: 6,
    category: 'React',
    hints: ['Compare virtual vs real DOM updates', 'Think about batching'],
    solution: 'Virtual DOM allows React to batch updates and minimize real DOM manipulations.',
    timeEstimate: 8,
    tags: ['react', 'virtual-dom', 'performance'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]