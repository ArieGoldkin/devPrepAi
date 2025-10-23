#!/bin/bash
# Check cyclomatic complexity (max: 15)

echo "🔍 Checking code complexity (max: 15)..."
echo

cd frontend || { echo "❌ frontend directory not found"; exit 1; }

# Run ESLint with complexity rule only
npx eslint src \
  --ext .ts,.tsx \
  --rule 'complexity: [error, 15]' \
  --format unix \
  --no-eslintrc \
  2>&1

EXIT_CODE=$?

echo
if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ All functions within complexity limit (≤15)"
else
  echo "❌ Complexity violations found"
  echo ""
  echo "💡 Fix: Reduce function complexity"
  echo "   - Extract conditional logic to separate functions"
  echo "   - Use early returns instead of nested ifs"
  echo "   - Replace switch statements with lookup objects"
  echo "   - Split functions with multiple responsibilities"
fi

exit $EXIT_CODE
