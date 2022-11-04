const fs = require('fs')
const path = require('path')

/* eslint-disable node/no-unpublished-require, jest/no-conditional-expect */

const Lib = require('../../javascript-library/dist/index.js')

const examplesFolder = path.resolve('../../examples/')
const examplesTestFolder = path.resolve('./__tests__/example-tests/')

describe('Validate examples', () => {
	const htmlFiles = fs.readdirSync(examplesFolder).filter((file) => !!file.match(/.html?$/))

	for (const htmlFileName of htmlFiles) {
		// Go through the test cases to ensure that they work as intended:
		const testFileName = htmlFileName.replace(/.html?$/, '.test.json')

		const testFile = fs.readFileSync(path.join(examplesTestFolder, testFileName), 'utf-8')
		const tests = JSON.parse(testFile).tests

		test(`Example: ${htmlFileName}`, async () => {
			const filePath = path.join(examplesFolder, htmlFileName)

			// Retrieve the schema:
			const GDDSchema = await Lib.retrieveGDDSchema(filePath)

			// Validate the schema:
			Lib.validateSchema(GDDSchema)

			for (const testData of tests) {
				const errors = Lib.validateData(GDDSchema, testData.data)
				if (testData.shouldBeValid) {
					expect(errors).toBeFalsy()
				} else {
					expect(errors).toBeTruthy()
				}
			}
		})
	}
})
