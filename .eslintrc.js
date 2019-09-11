module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: ["plugin:@typescript-eslint/recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		sourceType: "module",
		project: "tsconfig.json"
	},

	rules: {
		"brace-style": ["warn", "allman"],
		indent: "off",
		"@typescript-eslint/indent": ["warn", "tab"],
		"no-trailing-spaces": "warn",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
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
