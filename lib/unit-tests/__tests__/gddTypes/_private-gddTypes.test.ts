import { setupValidator } from '../lib/validator'

test('gddType: non-standard', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: '__external-type',
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					gddType: '__external-type',
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					gddType: '__external-type',
					gddOptions: {
						myProp: 123,
					},
				},
			},
		})
	).toBe(null)
})
