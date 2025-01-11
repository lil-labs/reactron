import typescript from "@typescript-eslint/eslint-plugin";
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import parserTypescript from "@typescript-eslint/parser";
import globals from "globals";
import configPrettier from "eslint-config-prettier";

const OFF = "off";
// const WARN = "warn";
const ERROR = "error";

/**
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    ignores: [
      "**/node_modules",
      "pnpm-lock.yaml",
      "**/bin",
      "**/workspace",
      ".react-router",
    ],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      sourceType: "module",
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": [
        "error",
        {
          args: "none",
          caughtErrors: "none",
          ignoreRestSiblings: true,
          vars: "all",
        },
      ],
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      "react/prop-types": OFF,
      "react/react-in-jsx-scope": OFF,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": typescript,
    },
    languageOptions: {
      parser: parserTypescript,
    },
    rules: {
      ...typescript.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ERROR,
      "@typescript-eslint/no-explicit-any": ERROR,
    },
  },
  {
    ...configPrettier,
  },
];

export default config;
