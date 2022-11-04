module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],

	// testMatch: ['asdf'],
	testMatch: ['**/__tests__/**/*.test.ts'],
}
