import { setupValidator } from '../lib/validator'

test('gddType: image-file-path', async () => {
	const validateSchema = (await setupValidator()).validate

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
						extensions: [123] as any, // bad type
					},
				},
			},
		})
	).toMatch(/is not of a type.*string/)

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'file-path/image-path',
					gddOptions: {
						size: {},
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
						size: {
							width: {
								min: 100,
								max: 200,
								ideal: 150,
							},
							height: {
								min: 100,
								max: 200,
								ideal: 150,
							},
						},
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
						size: {
							width: {
								min: 100,
								max: 200,
								ideal: 150,
							},
							height: {
								min: 100,
								max: 200,
								ideal: 150.5,
							},
						},
					},
				},
			},
		})
	).toMatch(/is not of a type.*integer/)
})
