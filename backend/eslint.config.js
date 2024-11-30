import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslint from "@eslint/js";
import tslint from "typescript-eslint";

export default tslint.config(
  eslintConfigPrettier,
  eslint.configs.recommended,
  tslint.configs.recommended,
  {
    ignores: ["node_modules", "dist"],
  },
  {
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prettier/prettier": [
        "warn",
        { semi: true, singleQuote: false, bracketSpacing: true },
      ],
    },
  },
);
