import { Schema, Validator } from 'jsonschema'
import { GDDSchema } from './types'

/**
 * Validates a GDD Schema.
 * @returns null if the Schema is valid. A string describing the error if not.
 */
export type SchemaValidator = (
	/** The Schema that is to be validated */
	schema: GDDSchema
	) => string | null
export type ValidatorCache = { [key: string]: Schema }
let cachedValidator: undefined | SchemaValidator = undefined

/**
 * Downloads the GDD meta-schemas needed for the validator to work
 * @returns
 */
export async function setupSchemaValidator(options: {
	fetch: (url: string) => Promise<any>
	getCache?: () => Promise<ValidatorCache>
}): Promise<{
	validate: SchemaValidator
	cache: ValidatorCache | null
}> {
	if (cachedValidator) {
		return {
			validate: cachedValidator,
			cache: null,
		}
	}

	const cache: ValidatorCache = options.getCache ? await options.getCache() : {}

	const baseURL = 'https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema'

	const v = new Validator()
	async function addRef(ref: string): Promise<Schema> {
		// Check if it is in the local cache first:
		if (cache[ref]) {
			v.addSchema(cache[ref], ref)
			return cache[ref]
		} else {
			const content: Schema = await options.fetch(ref)
			if (!content) throw new Error(`Not able to resolve schema for "${ref}"`)
			v.addSchema(content, ref)
			cache[ref] = content
			return content
		}
	}

	let handledRefs = 0
	let bailOut = false
	const handled = new Set()
	async function handleUnresolvedRefs() {
		if (bailOut) return

		const refsToHandle: string[] = []
		for (let i = 0; i < v.unresolvedRefs.length; i++) {
			const ref = v.unresolvedRefs.shift()
			if (!ref) break
			if (refsToHandle.length > 30) break
			if (handled.has(ref)) continue

			refsToHandle.push(ref)
			handled.add(ref)
		}
		await Promise.all(
			refsToHandle.map(async (ref: string) => {
				handledRefs++
				if (handledRefs > 100) {
					bailOut = true
					return
				}

				const fixedRef = ref.replace(/#.*/, '')

				await addRef(fixedRef)
				await handleUnresolvedRefs()
			})
		)
	}
	const baseSchema = await addRef(baseURL + '/v1/schema.json')
	await handleUnresolvedRefs()

	if (bailOut) throw new Error(`Bailing out, more than ${handledRefs} references found!`)

	cachedValidator = (schema: Schema) => {
		const result = v.validate(schema, baseSchema)

		if (result.errors.length === 0) return null
		return 'Error: ' + result.errors.map((err) => err.path + ':' + err.message).join(',\n')
	}
	return {
		validate: cachedValidator,
		cache: cache,
	}
}
