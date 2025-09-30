import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
    },
    rules: {
      // Complexity Rules (STRICT)
      complexity: ["error", { max: 15 }],
      "max-lines": [
        "error",
        {
          max: 180,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-lines-per-function": [
        "error",
        {
          max: 100,
          skipBlankLines: true,
          skipComments: true,
          IIFEs: true,
        },
      ],
      "max-depth": ["error", 3],
      "max-nested-callbacks": ["error", 3],
      "max-params": ["error", 4],
      "max-statements": ["error", 15],

      // TypeScript Rules
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
          allowHigherOrderFunctions: true,
          allowDirectConstAssertionInArrowFunctions: true,
          allowConciseArrowFunctionExpressionsStartingWithVoid: false,
        },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowNullableBoolean: true,
          allowNullableString: true,
          allowNullableNumber: false,
          allowAny: false,
        },
      ],
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/await-thenable": "error",

      // React Rules
      "react/prop-types": "off",
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: true,
          allowFunctions: false,
        },
      ],
      "react/jsx-fragments": ["error", "syntax"],
      "react/jsx-pascal-case": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",

      // Import Rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": "error",
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // General Best Practices
      "no-console": [
        "error",
        {
          allow: ["warn", "error"],
        },
      ],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "error",
      "prefer-arrow-callback": "error",
      "arrow-body-style": ["error", "as-needed"],
      "object-shorthand": ["error", "always"],
      "no-param-reassign": [
        "error",
        {
          props: true,
        },
      ],
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-magic-numbers": [
        "error",
        {
          ignore: [0, 1, -1, 2, 3, 4, 5, 10, 100],
          ignoreArrayIndexes: true,
          enforceConst: true,
          ignoreDefaultValues: true,
        },
      ],

      // Naming Conventions (Relaxed for React components)
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "interface",
          format: ["PascalCase"],
          prefix: ["I"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
        {
          selector: "enum",
          format: ["PascalCase"],
        },
        {
          selector: "variable",
          format: ["camelCase", "PascalCase", "UPPER_CASE"],
          filter: {
            regex: "^(Component|React|_)",
            match: false,
          },
        },
        {
          selector: "function",
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "parameter",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      "max-lines": "off",
      "max-lines-per-function": "off",
      "no-magic-numbers": "off",
    },
  },
  {
    files: [
      "**/page.tsx",
      "**/layout.tsx",
      "**/loading.tsx",
      "**/error.tsx",
      "**/not-found.tsx",
    ],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/naming-convention": "off",
      "max-lines-per-function": ["error", { max: 120, skipBlankLines: true, skipComments: true }],
      "max-statements": ["error", 20],
    },
  },
  {
    files: ["**/store/**/*.ts", "**/hooks/**/*.ts"],
    rules: {
      "max-lines": ["error", { max: 250, skipBlankLines: true, skipComments: true }],
      "max-lines-per-function": ["error", { max: 150, skipBlankLines: true, skipComments: true }],
      "max-statements": ["error", 30],
    },
  },
  {
    files: ["**/services/**/*.ts"],
    rules: {
      "max-statements": ["error", 20],
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "scripts/**",
      "next-env.d.ts",
      "next.config.ts",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "*.config.{js,ts,mjs}",
    ],
  },
];

export default eslintConfig;
