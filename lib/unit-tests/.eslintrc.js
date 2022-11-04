module.exports = {
	extends: './node_modules/@sofie-automation/code-standard-preset/eslint/main',
	parserOptions: {
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
	},
	env: {
		jest: true,
	},
}
