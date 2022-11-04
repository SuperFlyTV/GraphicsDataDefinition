import { setupValidator } from '../lib/validator'

test('gddType: duration-ms', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'integer',
					gddType: 'duration-ms',
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
					gddType: 'duration-ms',
				},
			},
		})
	).toMatch(/does not.*match.*integer/)
})
