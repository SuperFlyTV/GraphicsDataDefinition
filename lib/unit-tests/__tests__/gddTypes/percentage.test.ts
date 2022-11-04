import { setupValidator } from '../lib/validator'

test('gddType: percentage', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					gddType: 'percentage',
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'integer', // wrong type
					gddType: 'percentage',
				},
			},
		})
	).toMatch(/does not.*match.*number/)
})
