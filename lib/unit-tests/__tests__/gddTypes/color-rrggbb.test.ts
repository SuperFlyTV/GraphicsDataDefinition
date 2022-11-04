import { setupValidator } from '../lib/validator'

test('gddType: color-rrggbb', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'color-rrggbb',
					pattern: '^#[0-9a-f]{6}$',
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number', // wrong type
					gddType: 'color-rrggbb',
				},
			},
		})
	).toMatch(/does not.*match.*string/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'color-rrggbb',
					// pattern missing
				},
			},
		})
	).toMatch(/require.*pattern/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'color-rrggbb',
					pattern: '^#[0-9a-f]{1}$', // wrong pattern
				},
			},
		})
	).toMatch(/does not exactly match expected constant/)
})
