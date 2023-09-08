module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:svelte/recommended", "prettier"],
  plugins: ["@typescript-eslint"],
  ignorePatterns: ["*.cjs"],
  // settings: {
  //   "svelte3/typescript": () => require("typescript")
  // },
  parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
    extraFileExtensions: [".svelte"],
	},
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser"
      }
    }
  ],
	rules: {
    // "indent": ["error", "2"],
    "quotes": ["error", "double"], // This is the default, but making it explicit.
    "comma-dangle": ["warn", "always-multiline"],
    "semi": ["error", "always"], // This is the default, but making it explicit.
    "no-extra-semi": "error",
		"brace-style": ["error", "stroustrup"],
	},
};
