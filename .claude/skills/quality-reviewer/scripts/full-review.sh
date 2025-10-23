#!/bin/bash
# Run all quality checks in sequence

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "======================================"
echo "🔍 FULL QUALITY REVIEW"
echo "======================================"
echo

# Run custom checks
"$SCRIPT_DIR/check-file-size.sh"
SIZE_EXIT=$?

echo
echo "--------------------------------------"
echo

"$SCRIPT_DIR/check-complexity.sh"
COMPLEXITY_EXIT=$?

echo
echo "--------------------------------------"
echo

"$SCRIPT_DIR/check-imports.sh"
IMPORTS_EXIT=$?

echo
echo "--------------------------------------"
echo

"$SCRIPT_DIR/check-architecture.sh"
ARCH_EXIT=$?

echo
echo "--------------------------------------"
echo

"$SCRIPT_DIR/check-naming.sh"
NAMING_EXIT=$?

echo
echo "--------------------------------------"
echo

# Run linting
echo "🔍 Running ESLint..."
cd frontend && npm run lint --silent
LINT_EXIT=$?

echo
echo "--------------------------------------"
echo

# Run type checking
echo "🔍 Running TypeScript check..."
cd frontend && npm run type-check
TYPE_EXIT=$?

echo
echo "======================================"
echo "📊 REVIEW SUMMARY"
echo "======================================"
echo

# Show results
[ $SIZE_EXIT -eq 0 ] && echo "✅ File sizes (≤180 lines)" || echo "❌ File sizes"
[ $COMPLEXITY_EXIT -eq 0 ] && echo "✅ Complexity (≤15)" || echo "❌ Complexity"
[ $IMPORTS_EXIT -eq 0 ] && echo "✅ Imports" || echo "❌ Imports"
[ $ARCH_EXIT -eq 0 ] && echo "✅ Architecture" || echo "❌ Architecture"
[ $NAMING_EXIT -eq 0 ] && echo "✅ Naming" || echo "❌ Naming"
[ $LINT_EXIT -eq 0 ] && echo "✅ ESLint" || echo "❌ ESLint"
[ $TYPE_EXIT -eq 0 ] && echo "✅ TypeScript" || echo "❌ TypeScript"

echo

# Exit with error if any check failed
if [ $SIZE_EXIT -ne 0 ] || [ $COMPLEXITY_EXIT -ne 0 ] || [ $IMPORTS_EXIT -ne 0 ] || \
   [ $ARCH_EXIT -ne 0 ] || [ $NAMING_EXIT -ne 0 ] || [ $LINT_EXIT -ne 0 ] || \
   [ $TYPE_EXIT -ne 0 ]; then
  echo "❌ Quality review failed - fix violations above"
  exit 1
else
  echo "✅ All checks passed! Code meets DevPrep AI standards"
  exit 0
fi
