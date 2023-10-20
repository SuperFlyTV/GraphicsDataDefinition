import { setupValidator } from '../lib/validator'

test('gddType: multi-line', async () => {
	const validateSchema = (await setupValidator()).validate

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'multi-line',
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
					gddType: 'multi-line',
				},
			},
		})
	).toMatch(/does not.*match.*string/)
})
