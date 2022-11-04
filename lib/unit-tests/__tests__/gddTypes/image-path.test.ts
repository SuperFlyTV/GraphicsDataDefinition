import { setupValidator } from '../lib/validator'

test('gddType: image-file-path', async () => {
	const validateSchema = await setupValidator()

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'file-path/image-path',
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
					gddType: 'file-path/image-path',
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
					gddType: 'file-path/image-path',
					gddOptions: {
						extensions: ['jpg', 'png'],
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
					gddType: 'file-path/image-path',
					gddOptions: {
						extensions: [123], // bad type
					},
				},
			},
		})
	).toMatch(/is not of a type.*string/)
})
