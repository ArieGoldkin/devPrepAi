/**
 * Sample code snippets for testing CodeMirror themes
 */

export const SAMPLE_JAVASCRIPT = `// Sample JavaScript Code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this;
  }

  multiply(value) {
    this.result *= value;
    return this;
  }
}

const calc = new Calculator();
console.log(calc.add(5).multiply(2).result); // 10
`;

export const SAMPLE_TYPESCRIPT = `// Sample TypeScript Code
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "guest";
}

type AsyncResult<T> = Promise<T | Error>;

class UserService {
  private users: Map<number, User> = new Map();

  async getUser(id: number): AsyncResult<User> {
    try {
      const user = this.users.get(id);
      if (!user) {
        throw new Error(\`User \${id} not found\`);
      }
      return user;
    } catch (error) {
      return error as Error;
    }
  }

  createUser(userData: Omit<User, "id">): User {
    const id = this.users.size + 1;
    const user: User = { ...userData, id };
    this.users.set(id, user);
    return user;
  }
}

const service = new UserService();
const newUser = service.createUser({
  name: "Alice",
  email: "alice@example.com",
  role: "admin",
});
`;

export const SAMPLE_PYTHON = `# Sample Python Code
from typing import List, Dict, Optional
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str

    def is_adult(self) -> bool:
        """Check if person is an adult."""
        return self.age >= 18

    def greet(self) -> str:
        """Return a greeting message."""
        return f"Hello, my name is {self.name}"

class DataProcessor:
    def __init__(self, data: List[int]):
        self.data = data

    def process(self) -> Dict[str, float]:
        """Process data and return statistics."""
        return {
            "mean": sum(self.data) / len(self.data),
            "min": min(self.data),
            "max": max(self.data),
            "sum": sum(self.data)
        }

# Usage
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
processor = DataProcessor(numbers)
stats = processor.process()
print(f"Statistics: {stats}")

person = Person(name="Bob", age=25, email="bob@example.com")
print(f"{person.name} is adult: {person.is_adult()}")
`;

export const SAMPLES = {
  javascript: SAMPLE_JAVASCRIPT,
  typescript: SAMPLE_TYPESCRIPT,
  python: SAMPLE_PYTHON,
} as const;
