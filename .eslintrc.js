module.exports = {
	env: {
		es6: true,
		node: true
	},
	ignorePatterns: [ "**/dist/**/*"],
	extends: ["plugin:@typescript-eslint/recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly"
	},
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		projects: [ "./tsconfig.develop.json" ]
	},

	rules: {
		"brace-style": "off",
		"@typescript-eslint/brace-style": ["warn", "allman"],
		"indent": "off",
		"@typescript-eslint/indent": ["warn", "tab" ],
		"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_"}],
		"no-trailing-spaces": "warn",
		"space-before-function-paren": "warn",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/explicit-member-accessibility": "off",
		"@typescript-eslint/member-delimiter-style": ["warn", {
			"multiline": {
				"delimiter": "none",
				"requireLast": false
			},
			"singleline": {
				"delimiter": "comma",
				"requireLast": true
			},
			"overrides": {
				"interface": {
					"multiline": {
						"delimiter": "none",
						"requireLast": true
					}
				}
			}
		}],
		"@typescript-eslint/interface-name-prefix": ["warn", "always"],
		"@typescript-eslint/no-empty-interface": "off",
		"linebreak-style": ["warn", "windows"],
		"quotes": ["warn", "double"],
		"semi": ["warn", "never"],

		// Note: git should be configured to store the line endings as LF
		"linebreak-style": "off" 
	},
	overrides: [
		{
			// Rules for tests.
			files: ["Test/**/*.spec.ts", "Test/**/*.typespec.ts"],
			rules: {
				"no-undef": "off",
				"@typescript-eslint/no-unused-vars" : "off"
			}
		},
		{
			files: ["**/Components/*", "**/Components.ts"],
			rules: {
				"@typescript-eslint/interface-name-prefix": ["warn", "never"],
			}
		}
	]
};
