import { promises as fs } from 'fs'
import { setupValidator } from '../lib/validator'

test('Ensure that all GDDTypes in README exist and passes validation', async () => {
	let validatedTypeCount = 0
	let validatedExampleCount = 0

	// Gather all GDDTypes from README:
	const readme = await fs.readFile('../../README.md', 'utf8')

	const iStart = readme.indexOf('## GDD Types')
	if (iStart === -1) throw new Error('Could not find "## GDD Types" in README.md')
	const iEnd = readme.indexOf('\n## ', iStart + 1)
	if (iEnd === -1) throw new Error('Could not find next heading after "## GDD Types" in README.md')

	/** String containing the GDD Types */
	const readmeGDDTypes = readme.slice(iStart + 13, iEnd)

	/** Array of headers  */
	const mentionedGDDTypes = readmeGDDTypes.match(/\n### (.*)\n/g)
	if (!mentionedGDDTypes) throw new Error('Could not find any GDDTypes in README.md')

	const definitions: { name: string; index: number; ignore: boolean }[] = []
	for (const mentionedGDDType of mentionedGDDTypes) {
		const m = mentionedGDDType.match(/\n### (.*)\n/)
		if (!m) throw new Error(`Error regexing "${mentionedGDDType}"`)

		const name = m[1]
		let ignore = false

		if (name.includes('Private GDD Types')) ignore = true

		const iType = readmeGDDTypes.indexOf(mentionedGDDType)
		if (iType === -1) throw new Error(`Error finding "${mentionedGDDType}"`)

		definitions.push({ name, index: iType, ignore })
	}

	const { validate: validateSchema, cache } = await setupValidator()
	if (!cache) throw new Error('cache object is null')
	const cacheStr = JSON.stringify(cache)

	for (let i = 0; i < definitions.length; i++) {
		const definition = definitions[i]

		if (definition.ignore) continue

		const iType = definition.index
		const iNext = definitions[i + 1]?.index || readmeGDDTypes.length

		const typeStr = readmeGDDTypes.slice(iType, iNext)

		// Gather schema examples:
		const typeExamples = typeStr.match(/```(typescript|json)([\w\W]*?)```/gm)
		if (!typeExamples) throw new Error(`Could not find any examples for "${definition.name}"`)

		let hasExamples = false
		for (const typeExample of typeExamples) {
			let str = typeExample.replace(/^.+?\n/, '') // remove first line "```typescript"
			str = str.replace(/```$/, '') // remove last line "```"
			str = str.replace(/\/\/.*/g, '') // Remove inline comments

			const gddTypeNameMatch = str.match(/"gddType": "(.*)"/)
			if (!gddTypeNameMatch) throw new Error(`Could not find "gddType" in "${str}"`)
			const gddTypeName = gddTypeNameMatch[1]

			// Ensure that gddTypeName exists in schema:
			if (!cacheStr.includes(`{"gddType":{"const":"${gddTypeName}"}}`)) {
				throw new Error(`Could not find "${gddTypeName}" in schema`)
			}

			try {
				const json = JSON.parse(str)

				expect(
					validateSchema({
						type: 'object',
						properties: {
							f0: json,
						},
					})
				).toBe(null)
				validatedExampleCount++
				hasExamples = true
			} catch (e) {
				if (e instanceof Error) {
					e.message = `Error parsing example for "${str}": ${e.message}`
				}
				console.log(typeStr)
				throw e
			}
		}
		if (hasExamples) validatedTypeCount++
	}

	expect(validatedExampleCount).toBeGreaterThanOrEqual(10)
	expect(validatedTypeCount).toBeGreaterThanOrEqual(8)
})
