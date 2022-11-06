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
	| GDDTypes

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

export type GDDSchemaPropertyBase = Schema

// ---------- GDD Types ----------------------
export type GDDTypes =
	| GDDTypeSingleLine
	| GDDTypeMultiLine
	| GDDTypeFilePath
	| GDDTypeFilePathImagePath
	| GDDTypeStringSelect
	| GDDTypeNumberSelect
	| GDDTypeIntegerSelect
	| GDDTypeColorRRGGBB
	| GDDTypePercentage
	| GDDTypeDurationMs

export interface GDDTypeSingleLine extends GDDSchemaPropertyString {
	gddType: 'single-line'
}
export interface GDDTypeMultiLine extends GDDSchemaPropertyString {
	gddType: 'multi-line'
}
export interface GDDTypeFilePath extends GDDSchemaPropertyString {
	gddType: 'file-path'
	gddOptions?: {
		extensions?: string[]
	}
}
export interface GDDTypeFilePathImagePath extends GDDSchemaPropertyString {
	gddType: 'file-path/image-path'
	gddOptions?: {
		extensions?: string[]
	}
}
export interface GDDTypeStringSelect extends GDDSchemaPropertyString {
	gddType: 'select'
	enum: string[]
	gddOptions: {
		labels: { [key: string]: string }
	}
}
export interface GDDTypeNumberSelect extends GDDSchemaPropertyNumber {
	gddType: 'select'
	enum: number[]
	gddOptions: {
		labels: { [key: string]: string }
	}
}
export interface GDDTypeIntegerSelect extends GDDSchemaPropertyInteger {
	gddType: 'select'
	enum: number[]
	gddOptions: {
		labels: { [key: string]: string }
	}
}
export interface GDDTypeColorRRGGBB extends GDDSchemaPropertyString {
	gddType: 'color-rrggbb'
	pattern: '^#[0-9a-f]{6}$'
}
export interface GDDTypePercentage extends GDDSchemaPropertyNumber {
	gddType: 'percentage'
}
export interface GDDTypeDurationMs extends GDDSchemaPropertyNumber {
	gddType: 'duration-ms'
}
