import * as path from 'path'
import * as fs from 'fs'
import fetch from 'node-fetch'
/* eslint-disable node/no-unpublished-import */
import { SchemaValidator, ValidatorCache, setupSchemaValidator } from '../../../javascript-library'

export async function setupValidator(): Promise<{ validate: SchemaValidator; cache: ValidatorCache | null }> {
	const cachePath = getCachePath()
	const { validate, cache } = await setupSchemaValidator({
		getCache: async () => {
			if (await fileExists(cachePath)) {
				const fileContents = await fs.promises.readFile(cachePath, 'utf-8')
				try {
					return JSON.parse(fileContents)
				} catch {
					return {}
				}
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

	return { validate, cache }
}

export async function clearValidatorCache(): Promise<void> {
	await fs.promises.unlink(getCachePath())
}

function getCachePath(): string {
	return path.resolve('./__cache.json')
}

async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.promises.access(filePath)
		return true
	} catch {
		return false
	}
}
