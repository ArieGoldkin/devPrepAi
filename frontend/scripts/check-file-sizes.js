#!/usr/bin/env node
/**
 * Check file sizes script
 * Ensures no TypeScript file exceeds the max line limit
 */
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MAX_LINES = 250; // Accommodates current mock services and utilities
const SRC_DIR = join(__dirname, '../src');

// Files/folders to skip
const SKIP_PATTERNS = [
  'node_modules',
  '.next',
  'build',
  'dist',
  '.test.',
  '.spec.',
  'shared/ui', // Skip shadcn/ui library components (third-party code)
];

function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((pattern) => filePath.includes(pattern));
}

function countLines(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  return content.split('\n').length;
}

function getAllTsFiles(dir) {
  let results = [];
  const files = readdirSync(dir);

  for (const file of files) {
    const filePath = join(dir, file);

    if (shouldSkip(filePath)) continue;

    const stat = statSync(filePath);

    if (stat.isDirectory()) {
      results = results.concat(getAllTsFiles(filePath));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(filePath);
    }
  }

  return results;
}

function main() {
  const files = getAllTsFiles(SRC_DIR);
  const violations = [];

  for (const file of files) {
    const lineCount = countLines(file);
    if (lineCount > MAX_LINES) {
      const relativePath = relative(SRC_DIR, file);
      violations.push({ path: relativePath, lines: lineCount });
    }
  }

  if (violations.length > 0) {
    violations.forEach((v) => {
      console.log(`❌ src/${v.path}:      ${v.lines} lines (max: ${MAX_LINES})`);
    });
    console.log(`Found ${violations.length} file(s) exceeding ${MAX_LINES} lines`);
    process.exit(1);
  } else {
    console.log('✅ All files within size limits');
    process.exit(0);
  }
}

main();