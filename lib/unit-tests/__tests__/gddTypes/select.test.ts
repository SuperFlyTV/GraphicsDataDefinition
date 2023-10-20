import { setupValidator } from '../lib/validator'

test('gddType: select', async () => {
	const validateSchema = (await setupValidator()).validate

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					gddType: 'select',
					gddOptions: {
						labels: {
							one: 'Label for one',
							two: 'Label for two',
							three: 'Label for three',
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
					type: 'integer',
					enum: [1, 2, 3],
					gddType: 'select',
					gddOptions: {
						labels: { '1': 'Small', '2': 'Medium', '3': 'Large' },
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
					type: 'number',
					enum: [1.2, 3.5, 9.0],
					gddType: 'select',
					gddOptions: {
						labels: { '1.2': 'Small', '3.5': 'Medium', '9.0': 'Large' },
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
					type: 'boolean', // not supported
					gddType: 'select',
				} as any,
			},
		})
	).toMatch(/is not.*string,number,integer/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					enum: [1.2, 3.5, 9.0],
					gddType: 'select',
					// gddOptions missing
				},
			},
		})
	).toMatch(/require.*gddOptions/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					enum: ['one', 'two', 'three'],
					gddType: 'select',
					gddOptions: {
						// labels missing
					} as any,
				},
			},
		})
	).toMatch(/require.*labels/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'integer',
					enum: [1, 2, 3],
					gddType: 'select',
					gddOptions: {
						// labels missing
					} as any,
				},
			},
		})
	).toMatch(/require.*labels/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					enum: [1.2, 3.5, 9.0],
					gddType: 'select',
					gddOptions: {
						// labels missing
					} as any,
				},
			},
		})
	).toMatch(/require.*labels/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					// enum missing
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' },
					},
				},
			},
		})
	).toMatch(/require.*enum/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					enum: [1, 2, 3] as any, // wrong enum types
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' },
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
					type: 'integer',
					enum: [1.1, 2.5, 3.7], // wrong enum types
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' },
					},
				},
			},
		})
	).toMatch(/is not of a type.*integer/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'integer',
					enum: [1, 2, 3],
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' }, // wrong label keys
					},
				},
			},
		})
	).toMatch(/does not match pattern/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					enum: ['a', 'b', 'c'] as any, // wrong enum types
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' },
					},
				},
			},
		})
	).toMatch(/is not of a type.*number/)
	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'number',
					enum: [1.1, 1.2, 2],
					gddType: 'select',
					gddOptions: {
						labels: { s: 'Small', m: 'Medium', l: 'Large' }, // wrong label keys
					},
				},
			},
		})
	).toMatch(/does not match pattern/)
})
