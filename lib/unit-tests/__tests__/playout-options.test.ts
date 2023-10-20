import { setupValidator } from './lib/validator'

test('gddPlayoutOptions.client', async () => {
	const validateSchema = (await setupValidator()).validate

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
					// @ts-expect-error wrong type
					duration: 'asdf',
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
					// @ts-expect-error wrong type
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
					// @ts-expect-error misspelled
					dataformat: 'jsun',
				},
			},
		})
	).toMatch(/is not.*json/)
})
test('gddPlayoutOptions.playout', async () => {
	const validateSchema = (await setupValidator()).validate

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
