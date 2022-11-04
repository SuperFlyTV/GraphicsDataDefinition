import { Validator } from 'jsonschema'
import fetch from 'node-fetch'
import * as crypto from 'crypto'
import * as path from 'path'
import * as fs from 'fs'
import * as mkdirp from 'mkdirp'

type SetupValidator = (schema: any) => string | null
let cachedValidator: undefined | SetupValidator = undefined
export async function setupValidator(): Promise<SetupValidator> {
	if (cachedValidator) return cachedValidator

	const schemaFolder = path.resolve('../../gdd-meta-schema')
	const cacheFolder = path.resolve('./cache')

	await mkdirp(cacheFolder)

	const v = new Validator()
	const baseSchema = JSON.parse(fs.readFileSync(path.join(schemaFolder, 'v1/schema.json'), 'utf-8'))

	v.addSchema(baseSchema)

	let handledRefs = 0
	let bailOut = false
	const handled = new Set()

	const resultsLog: string[] = []

	async function addRefs() {
		if (bailOut) return

		const toHandle: string[] = []
		for (let i = 0; i < v.unresolvedRefs.length; i++) {
			const ref = v.unresolvedRefs.shift()
			if (!ref) break
			if (toHandle.length > 30) break
			if (handled.has(ref)) continue

			toHandle.push(ref)
			handled.add(ref)
		}
		await Promise.all(
			toHandle.map(async (nextSchema) => {
				handledRefs++
				if (handledRefs > 100) {
					bailOut = true
					return
				}

				const ref = nextSchema
					// Use local schemas:
					.replace('https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema', schemaFolder)
					.replace(/#.*/, '')
				if (ref.match(/^http/)) {
					// Check if it is in the local cache first:
					const cacheUrl = path.join(cacheFolder, hashString(ref) + '.json')
					const cache = await getJSON(cacheUrl)
					if (cache) {
						v.addSchema(cache, ref)
						resultsLog.push(nextSchema + ' cached ' + ref)
					} else {
						const response = await fetch(ref, {})
						const content = await response.json()
						await writeJSON(cacheUrl, content)
						v.addSchema(content, ref)
						resultsLog.push(nextSchema + ' fetched ' + ref)
					}
				} else {
					const content = await getJSON(ref)
					if (!content) throw new Error(`Error reading ${ref}`)
					v.addSchema(content, nextSchema)
					resultsLog.push(nextSchema + ' local ' + ref)
				}
				await addRefs()
			})
		)
	}
	await addRefs()

	if (bailOut) {
		throw new Error(`Bailing out, more than ${handledRefs} references found!`)
	}
	cachedValidator = (schema) => {
		const result = v.validate(schema, baseSchema)

		if (result.errors.length === 0) return null
		return 'Error: ' + result.errors.map((err) => err.path + ':' + err.message).join(',\n')
	}
	return cachedValidator
}
function hashString(str: string): string {
	return crypto.createHash('md5').update(str).digest('hex')
}
const cache = new Map<string, any>()
async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.promises.access(filePath)
		return true
	} catch {
		return false
	}
}
async function getJSON(filePath: string): Promise<any> {
	if (cache.has(filePath)) return cache.get(filePath)

	if (await fileExists(filePath)) {
		const read = await fs.promises.readFile(filePath, 'utf-8')
		const content = JSON.parse(read)

		cache.set(filePath, content)

		return content
	} else {
		return null
	}
}
async function writeJSON(filePath: string, content: any): Promise<void> {
	cache.set(filePath, content)
	await fs.promises.writeFile(filePath, JSON.stringify(content), 'utf-8')
}
