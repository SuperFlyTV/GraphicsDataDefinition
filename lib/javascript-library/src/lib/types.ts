import { Schema } from 'jsonschema'

export interface GDDSchema extends GDDSchemaPropertyObject {
	gddPlayoutOptions?: {
		client?: {
			duration?: number | null
			steps?: number
			dataformat?: 'json' | 'casparcg-xml'
		}

		/** This object contains specific options for the various playout server types (CasparCG, Viz, vMix etc..) */
		playout?: {
			casparcg?: {
				/** The default server to play on (an IP-address or a hostname). */
				serverHost?: string
				/** The default server to play on. */
				serverPort?: number

				/** The default / suggested channel to play on */
				channel?: number
				/** The default / suggested layer to play on */
				layer?: number
			}
		}
	}
}

export type GDDSchemaProperty =
	| GDDSchemaPropertyBoolean
	| GDDSchemaPropertyString
	| GDDSchemaPropertyNumber
	| GDDSchemaPropertyInteger
	| GDDSchemaPropertyObject
	| GDDSchemaPropertyArray

export interface GDDSchemaPropertyBoolean extends GDDSchemaPropertyBase {
	type: 'boolean'
	default?: boolean
}
export interface GDDSchemaPropertyString extends GDDSchemaPropertyBase {
	type: 'string'
	default?: string
}
export interface GDDSchemaPropertyNumber extends GDDSchemaPropertyBase {
	type: 'number'
	default?: number
}
export interface GDDSchemaPropertyInteger extends GDDSchemaPropertyBase {
	type: 'integer'
	default?: number
}
export interface GDDSchemaPropertyObject extends GDDSchemaPropertyBase {
	type: 'object'
	properties: {
		[key: string]: GDDSchemaProperty
	}
	default?: { [key: string]: any }
}
export interface GDDSchemaPropertyArray extends GDDSchemaPropertyBase {
	type: 'array'
	items: GDDSchemaProperty
	default?: any[]
}

export interface GDDSchemaPropertyBase extends Schema {
	gddType?: string
	gddOptions?: { [key: string]: any }
}
