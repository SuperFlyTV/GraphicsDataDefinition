import { setupValidator } from '../lib/validator'

/* eslint-disable node/no-unpublished-import */
import * as Lib from '../../../javascript-library/src/index'
import { GDDSchema } from '../../../javascript-library/src/index'

test('gddType: color-rrggbbaa', async () => {
	const validateSchema = (await setupValidator()).validate

	expect(
		validateSchema({
			type: 'object',
			properties: {
				f0: {
					type: 'string',
					gddType: 'color-rrggbbaa',
					pattern: '^#[0-9a-f]{8}$',
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
					gddType: 'color-rrggbbaa',
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
					gddType: 'color-rrggbbaa',
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
					gddType: 'color-rrggbbaa',
					pattern: '^#[0-9a-f]{6}$', // wrong pattern
				},
			},
		})
	).toMatch(/does not exactly match expected constant/)

	// Validate data:
	const schema: GDDSchema = {
		type: 'object',
		properties: {
			f0: {
				type: 'string',
				gddType: 'color-rrggbbaa',
				pattern: '^#[0-9a-f]{8}$',
			},
		},
	}
	expect(
		Lib.validateData(schema, {
			f0: '#ff0000ff',
		})
	).toBe(null)
	expect(
		Lib.validateData(schema, {
			f0: 'ff0000ff', // wrong format
		})
	).toMatch(/does not match pattern/)
	expect(
		Lib.validateData(schema, {
			f0: '#ff0000', // wrong format
		})
	).toMatch(/does not match pattern/)
})
