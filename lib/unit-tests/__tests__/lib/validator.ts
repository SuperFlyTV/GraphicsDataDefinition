import * as path from 'path'
import * as fs from 'fs'
import fetch from 'node-fetch'
/* eslint-disable node/no-unpublished-import */
import { SchemaValidator, setupSchemaValidator } from '../../../javascript-library'

export async function setupValidator(): Promise<SchemaValidator> {
	const cachePath = path.resolve('./__cache.json')

	const { validate, cache } = await setupSchemaValidator({
		getCache: async () => {
			if (await fileExists(cachePath)) {
				return JSON.parse(await fs.promises.readFile(cachePath, 'utf-8'))
			} else return {}
		},
		fetch: async (url: string) => {
			const schemaBaseURL = 'https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema'
			const localSchemaFolder = path.resolve('../../gdd-meta-schema')

			if (url.startsWith(schemaBaseURL)) {
				const localPath = path.join(localSchemaFolder, url.replace(schemaBaseURL, ''))

				const read = await fs.promises.readFile(localPath, 'utf-8')
				return JSON.parse(read)
			} else {
				const response = await fetch(url, {})
				return await response.json()
			}
		},
	})

	if (cache) {
		// Store cache to disk:
		await fs.promises.writeFile(cachePath, JSON.stringify(cache), 'utf-8')
	}

	return validate
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.promises.access(filePath)
		return true
	} catch {
		return false
	}
}
