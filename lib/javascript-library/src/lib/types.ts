import { Schema } from 'jsonschema'

export interface GDDSchema extends GDDSchemaPropertyObject {
	gddPlayoutOptions?: {
		client?: {
			/**
			 * (Integer)
			 * The suggested duration of the template (in milliseconds)
			 * null means that it is manually taken out
			 * undefined should be treated as null
			 * (This is ignored if steps=0)
			 * Defaults to null
			 */
			duration?: number | null
			/**
			 * Number of steps in the template
			 * 1 means that there are no steps (ie there's only "the default step").
			 * 2 or more means that it can be "stepped" (ie 2 means it can be stepped once).
			 * -1 means "infinite" number of steps.
			 * 0 means that the template is "volatile" / "fire and forget" (template really has no duration, like a bumper).
			 * Defaults to 1
			 */
			steps?: number
			/**
			 * How the data should be formatted.
			 * This is mostly used for the older CasparCG flash-based xml data format.
			 * Defaults to "json"
			 */
			dataformat?: 'json' | 'casparcg-xml'
		}

		/** This object contains options related to the rendering of the GFX template */
		render?: {
			/**
			 * This property contains an array of the supported resolutions of the GFX Template.
			 * The array must contain at least one resolution.
			 * This can be used by the client to determine whether a template is compatible with the current renderer or not.
			 * Examples:
			 * * A template which only supports a fixed resolution and framerate:
			 *   "resolutions": [{ "width": 1280, "height": 720, "framerate": 50 }]
			 * * A template which supports 720p50 and 1080p50:
			 *   "resolutions": [{ "width": 1280, "height": 720, "framerate": 50 }, { "width": 1920, "height": 1080, "framerate": 50 }]
			 * * A template which supports any resolution above 500x500 (and any framerate):
			 *   "resolutions": [{ "width": { min: 500 }, "height": { min: 500 } }]
			 *
			 */
			resolutions?: {
				width?:
					| {
							min?: number
							max?: number
					  }
					| number
				height?:
					| {
							min?: number
							max?: number
					  }
					| number
				framerate?:
					| {
							min?: number
							max?: number
					  }
					| number
			}[]
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
	/** Name of the author. */
	authorName?: string
	/** Email to the author. */
	authorEmail?: string
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
	| GDDTypeColorRRGGBBAA
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
export interface GDDTypeColorRRGGBBAA extends GDDSchemaPropertyString {
	gddType: 'color-rrggbbaa'
	pattern: '^#[0-9a-f]{8}$'
}
export interface GDDTypePercentage extends GDDSchemaPropertyNumber {
	gddType: 'percentage'
}
export interface GDDTypeDurationMs extends GDDSchemaPropertyInteger {
	gddType: 'duration-ms'
}
