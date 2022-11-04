import { setupValidator } from './lib/validator'

test('playout-options', async () => {
	const validateSchema = await setupValidator()

	// Minimal object:
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				client: {},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},

			gddPlayoutOptions: {
				client: {
					duration: 123,
					steps: 2,
					dataformat: 'json',
				},
			},
		})
	).toBe(null)

	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				client: {
					duration: null,
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				client: {
					duration: 'asdf', // wrong type
				},
			},
		})
	).toMatch(/is not of.*integer,null/)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				client: {
					duration: 1.5, // not allowed, should be milliseconds
				},
			},
		})
	).toMatch(/is not of.*integer/)

	expect(
		validateSchema({
			type: 'object',
			properties: {},

			gddPlayoutOptions: {
				client: {
					steps: 'one', // wrong type
				},
			},
		})
	).toMatch(/is not of.*integer/)
	expect(
		validateSchema({
			type: 'object',
			properties: {},

			gddPlayoutOptions: {
				client: {
					dataformat: 'casparcg-xml',
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},

			gddPlayoutOptions: {
				client: {
					dataformat: 'jsun', // misspelled
				},
			},
		})
	).toMatch(/is not.*json/)
})
test('playout', async () => {
	const validateSchema = await setupValidator()

	// Minimal object:
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				playout: {},
			},
		})
	).toBe(null)
})