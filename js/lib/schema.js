import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch';

export async function retrieveGDDSchema(htmlFilePath) {
    const folderOfHTMLFile = path.dirname(htmlFilePath)

    // Start by reading the HTML-file:
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8')

    let GDDSchema

    if (typeof htmlContent !== 'string')
        throw new Error(`Bad input data, must be a string (was "${typeof htmlContent}")`)
    const match = htmlContent.match(/<meta([\S\s]*)>/)
    if (!match) throw new Error(`Did not find any <meta> tag, did you forget to add it?\n${exampleMetaTag}`)

    const srcPath = extractGDDJSONPath(htmlContent)
    if (srcPath) {
        if (srcPath.startsWith('http')) {
            // Fetch url
            const response = await fetch(srcPath);
            GDDSchema = await response.json();
        } else {
            // local file path (relative to the HTML file):
            const jsonFilePath = path.join(folderOfHTMLFile, srcPath)
            const str = await fs.promises.readFile(jsonFilePath, 'utf-8')

            GDDSchema = JSON.parse(str)
        }
    } else {
        // Is the schema included in the HTML-file itself?

        const schemaString = extractGDDJSONFromHTMLFile(htmlContent)
        if (schemaString) {
            GDDSchema = JSON.parse(schemaString)
        } else {
            throw new Error('Not able to find any GDD Schema in HTML file')
        }
    }

    return GDDSchema

}


/**
 * Extracts the path to the GDD JSON file from a HTML file, looking for the tag:
 * <meta type="gdd-1.0" src="path-to-json-file" />
 * @param string htmlString
 * @returns The path to the JSON file.
 */
function extractGDDJSONPath(htmlString) {
    const match = htmlString.match(/<meta([\S\s]*)\/>/)
    if (!match) return null

    const metaContent = match[0].trim()
    if (!metaContent) throw new Error(`Meta tag is empty, it should be on this form:\n${exampleMetaTag}`)

    const srcMatch = metaContent.match(/src="([^"]*)"/)
    if (!srcMatch) throw new Error(`src property is missing in <meta> tag, it should be on this form:\n${exampleMetaTag}`)

    const srcContent = srcMatch[1] || null
    // if (!srcContent) throw new Error(`src property is empty, it should be on this form:\n${exampleMetaTag}`)

    return srcContent
}
const exampleMetaTag = '<meta type="gdd-1.0" src="path-to-json-file" />'

/**
 * Extracts a GDD JSON schema from a HTML file
 * <meta type="gdd-1.0">
 * <![CDATA[
 * { ***The schema*** }
 * ]]>
 * </meta>
 * @param string htmlString
 * @returns The path to the JSON file.
 */
function extractGDDJSONFromHTMLFile(htmlString) {
    const match = htmlString.match(/<meta[\S\s]*>[\S\s]*<!\[CDATA\[\s*((?:.(?<!\]\]>)\s*)*)\]\]>[\S\s]*<\/meta>/)
    if (!match) throw new Error(`Did not find any <meta> tag, did you forget to add it?\n${exampleMetaTagWithContent}`)

    // console.log(match)

    const srcContent = match[1] || null


    return srcContent
}
const exampleMetaTagWithContent = `<meta type="gdd-1.0">
<![CDATA[
{
    *** GDD Schema ***
}
]]>
</meta>`

export function validateSchema(schema) {

    if (!typeof schema === 'object') throw new Error(`Schema is not an object`)
    if (Array.isArray(schema)) throw new Error(`Schema is an Array`)

    if (!schema.properties) throw new Error(`Schema.properties missing`)

    validateProperties(schema.properties, '')
}
function validateProperties(properties, key) {
    if (key) key += '.'

    for (const [propKey, prop] of Object.entries(properties)) {
        validateProperty(prop, key + propKey)
    }
}
function validateProperty(property, key) {
    if (!property.type) throw new Error(`${key}: Property "type" missing`)

    const typeValues = ["boolean", "string", "number", "integer", "array", "object"] // not "null"

    let baseType
    if (typeof property.type === 'string') {
        baseType = property.type
    } else if (Array.isArray(property.type)) {
        if (property.type.length === 1) {
            // nothing
        } else if (property.type.length === 2) {
            if (property.type[1] !== 'null') throw new Error(`${key}: Second element of property "type" must be "null"`)
        } else
            throw new Error(`${key}: Property "type" must be an array of length 1 or 2`)
        baseType = property.type[0]
    } else
        throw new Error(`${key}: Property "type" must be a string or an array`)

    if (
        !typeValues.includes(baseType)
    ) throw new Error(`${key}: First element of property "type" has value "${property.type[0]}", which is not one of the valid ones (${typeValues.join(', ')})`)











    if (property.gddType) {
        if (!Array.isArray(property.gddType))
            throw new Error(`${key}: Property "gddType" must be an array`)
    }
}
