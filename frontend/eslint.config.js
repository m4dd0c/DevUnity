import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";
import tailwind from "eslint-plugin-tailwindcss";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import eslint from "@eslint/js";
import tslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default tslint.config(
  eslintConfigPrettier,
  eslint.configs.recommended,
  tslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  ...eslintPluginQuery.configs["flat/recommended"],
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      "react-refresh": reactRefresh,
      prettier: eslintPluginPrettier,
    },
    ...reactHooks.configs["recommended-latest"],
  },
  {
    rules: {
      "tailwindcss/no-custom-classname": "off",
      "tailwindcss/migration-from-tailwind-2": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          singleQuote: false,
          bracketSpacing: true,
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
        },
      ],
      ...eslintPluginQuery.configs.recommended.rules,
    },
  },
);
