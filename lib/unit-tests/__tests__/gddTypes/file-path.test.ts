import { setupValidator } from '../lib/validator'

test('gddType: file-path', async () => {
	const validateSchema = (await setupValidator()).validate

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'file-path',
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
					gddType: 'file-path',
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
					gddType: 'file-path',
					gddOptions: {
						extensions: ['zip', 'txt'],
					},
				},
			},
		})
	).toBe(null)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'file-path',
					gddOptions: {
						extensions: [123] as any, // bad type
					},
				},
			},
		})
	).toMatch(/is not of a type.*string/)
})
