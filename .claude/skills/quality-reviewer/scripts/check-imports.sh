#!/bin/bash
# Check import order and path aliases

echo "🔍 Checking import patterns..."
echo

VIOLATIONS=0
FRONTEND_SRC="frontend/src"

if [ ! -d "$FRONTEND_SRC" ]; then
  echo "❌ Directory $FRONTEND_SRC not found"
  exit 1
fi

# Check for relative imports that should use aliases
while IFS= read -r file; do
  # Look for relative imports going up 2+ directories
  if grep -q "from ['\"]\.\.\/\.\." "$file"; then
    echo "❌ $file: Uses deep relative imports (should use @shared/, @modules/, @lib/, @store)"
    grep -n "from ['\"]\.\.\/\.\." "$file" | head -3
    VIOLATIONS=$((VIOLATIONS + 1))
  fi

  # Look for direct React imports (should be type imports)
  if grep -q "^import { .* } from ['\"]react['\"]" "$file"; then
    matching_lines=$(grep -n "^import { .* } from ['\"]react['\"]" "$file" | head -3)
    echo "⚠️  $file: Direct React import (should use 'import type')"
    echo "$matching_lines"
    VIOLATIONS=$((VIOLATIONS + 1))
  fi
done < <(find "$FRONTEND_SRC" \( -name "*.tsx" -o -name "*.ts" \) 2>/dev/null)

echo
if [ $VIOLATIONS -gt 0 ]; then
  echo "❌ Found $VIOLATIONS import violation(s)"
  echo ""
  echo "💡 Fix:"
  echo "   - Replace '../../../' with path aliases:"
  echo "     @shared/ui/button"
  echo "     @modules/practice/hooks"
  echo "     @lib/trpc/client"
  echo "     @store/hooks"
  echo "   - Use type imports: import type { ReactElement } from 'react'"
  exit 1
else
  echo "✅ Import patterns look good"
fi
