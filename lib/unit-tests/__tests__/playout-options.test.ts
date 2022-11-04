import { setupValidator } from './lib/validator'

test('gddPlayoutOptions.client', async () => {
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
test('gddPlayoutOptions.render', async () => {
	const validateSchema = await setupValidator()

	// Minimal object:
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [] // empty is not allowed
				},
			},
		})
	).toMatch(/min.*length/)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: 123 } ]
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: "123" } ] // bad type
				},
			},
		})
	).toMatch(/is not.*number,object/)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: { min: 100, max: 9999 } } ]
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: { max: "two" } } ] // bad type
				},
			},
		})
	).toMatch(/is not.*number/)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: { max: 9000 }, height: 500, framerate: 50 } ]
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {},
			gddPlayoutOptions: {
				render: {
					resolutions: [ { width: { max: 9000 }, height: 500, framerate: "50" } ] // bad type
				},
			},
		})
	).toMatch(/is not.*number/)
})
test('gddPlayoutOptions.playout', async () => {
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
