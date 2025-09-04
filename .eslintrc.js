module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // TypeScript rules
    "@typescript-eslint/no-explicit-any": "warn", // warn instead of error
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-require-imports": "warn",

    // Next.js rules
    "@next/next/no-img-element": "warn", // warn instead of error
  },
};
