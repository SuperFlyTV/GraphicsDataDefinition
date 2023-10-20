import { setupValidator } from './lib/validator'

describe('Schema - Basic types', () => {
	test(
		'setupValidator',
		async () => {
			await setupValidator()
			expect(1).toEqual(1)
		},
		30 * 1000
	)
	test('Basic', async () => {
		const validateSchema = (await setupValidator()).validate

		// Basic
		expect(
			validateSchema(
				// @ts-expect-error bad type
				123
			)
		).toBeTruthy()

		// Minimal object:
		expect(
			validateSchema({
				type: 'object',
				properties: {},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				// properties missing
			} as any)
		).toMatch(/require.*properties/)
		expect(
			validateSchema({
				type: 'object',
				// @ts-expect-error bad type
				properties: false,
			})
		).toMatch(/object/)
		expect(
			validateSchema({
				type: 'object',
				properties: {},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				properties: {},
				// @ts-expect-error bad type
				title: 123,
			})
		).toMatch(/not.*string/)
		expect(
			validateSchema({
				type: 'object',
				properties: {},
				// @ts-expect-error bad type
				description: 123,
			})
		).toMatch(/not.*string/)
		expect(
			validateSchema({
				type: 'object',
				properties: {},
				// @ts-expect-error bad type
				$schema: 123,
			})
		).toMatch(/not.*string/)

		expect(
			validateSchema({
				type: 'object',
				properties: {},
				// @ts-expect-error bad type
				gddPlayoutOptions: 123,
			})
		).toMatch(/not.*object/)

		expect(
			validateSchema({
				type: 'object',
				properties: {},
				$schema: 'wrong-schema', // wrong URI
			})
		).toMatch(/does not.*match.*const/)

		expect(
			validateSchema({
				type: 'object',
				properties: {},
				title: 'A title',
				description: 'a description',
				$schema: 'https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json',
				gddPlayoutOptions: {},
			})
		).toBe(null)
	})
	test('Bad property', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						// @ts-expect-error bad type
						type: 'asdf',
					},
				},
			})
		).toMatch(/is not one of/)
	})

	// "array"
	// "object"

	test('Property: boolean', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'boolean',
					},
				},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'boolean',
						default: 123 as any, // bad default value
					},
				},
			})
		).toMatch(/not.*boolean/)
	})
	test('Property: string', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'string',
					},
				},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'string',
						default: 123 as any, // bad default value
					},
				},
			})
		).toMatch(/not.*string/)

		// "maxLength": number,
		// "minLength": number,
		// "pattern": Regular Expression,
	})
	test('Property: number', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'number',
					},
				},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'number',
						default: '123' as any, // bad default value
					},
				},
			})
		).toMatch(/not.*number/)

		// "multipleOf": number,
		// "maximum": number,
		// "exclusiveMaximum": number,
		// "minimum": number,
		// "exclusiveMinimum": number,
	})
	test('Property: integer', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'integer',
					},
				},
			})
		).toBe(null)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'integer',
						default: 123.5, // bad default value
					},
				},
			})
		).toMatch(/not.*integer/)

		// "multipleOf": number,
		// "maximum": number,
		// "exclusiveMaximum": number,
		// "minimum": number,
		// "exclusiveMinimum": number,
	})
	test('Property: array', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'array',
						items: {
							type: 'string',
						},
						default: ['test'],
					},
				},
			})
		).toBe(null)
		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'array',
						items: {
							// type missing
						} as any,
					},
				},
			})
		).toMatch(/require.*type/)
		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'array',
						// items missing
					} as any,
				},
			})
		).toMatch(/require.*items/)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'array',
						items: {
							type: 'string',
						},
						default: 123 as any, // bad type
					},
				},
			})
		).toMatch(/not.*array/)

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'array',
						items: {
							type: 'string',
						},
						// @ts-expect-error bad type
						maxItems: 'asdf',
					},
				},
			})
		).toMatch(/not.*integer/)

		// "maxItems": number
		// "minItems": number
		// "uniqueItems": boolean
		// "maxContains": number
		// "minContains": number
	})
	test('Property: object', async () => {
		const validateSchema = (await setupValidator()).validate

		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'object',
						properties: {},
					},
				},
			})
		).toBe(null)
		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'object',
						properties: {},
						default: 123 as any, // bad type
					},
				},
			})
		).toMatch(/not.*object/)
		expect(
			validateSchema({
				type: 'object',
				properties: {
					text: {
						type: 'object',
						// properties missing
					} as any,
				},
			})
		).toMatch(/require.*properties/)

		// "maxProperties": number,
		// "minProperties": number,
		// "required": boolean,
		// "dependentRequired": object,
	})
})
