import { setupValidator } from '../lib/validator'

test('gddType: single-line', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'single-line',
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
					gddType: 'single-line',
				},
			},
		})
	).toMatch(/does not.*match.*string/)
})
