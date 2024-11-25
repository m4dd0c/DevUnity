module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended", // Integrate Prettier configuration
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh", "prettier"],
  rules: {
    "tailwindcss/no-custom-classname": "off",
    "tailwindcss/migration-from-tailwind-2": "off",
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
        bracketSpacing: true,
      },
    ],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "@typescript-eslint/no-explicit-any": "off",
  },
};
