/** @typedef {"off" | "warn" | "error"} Severity */
/** @typedef {{ value?: any, severity: Severity }} RuleOptions */

/** @type {Severity} */
const defaultSeverity = "warn";

/*
	{ value: any, severity: "off" | "warn" | "error" }
*/

/**
 *
 * @param {RuleOptions} param0
 */
function set({ value, severity = "warn" }) {
  if (value) {
    return [severity, value];
  }

  return value;
}

module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    sourceType: "module",
    project: "tsconfig.develop.json"
  },

  rules: {
    "brace-style": ["warn", "allman"],
    indent: "off",
    "@typescript-eslint/indent": ["warn", "tab"],
    "no-trailing-spaces": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "linebreak-style": ["warn", "windows"],
    quotes: ["warn", "double"],
    semi: ["warn", "never"]
  },
  overrides: [
    {
      // Rules for tests.
      files: ["Source/**/*.spec.ts"],
      rules: {
        "no-undef": "off"
      }
    }
  ]
};
