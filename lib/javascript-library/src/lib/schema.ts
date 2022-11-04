import * as fs from 'fs'
import * as path from 'path'
import fetch from 'node-fetch';

export async function retrieveGDDSchema(htmlFilePath: string) {
    const folderOfHTMLFile = path.dirname(htmlFilePath)

    // Start by reading the HTML-file:
    const htmlContent = await fs.promises.readFile(htmlFilePath, 'utf-8')

    let GDDSchema

    if (typeof htmlContent !== 'string')
        throw new Error(`Bad input data, must be a string (was "${typeof htmlContent}")`)

    // Look for <script name="graphics-data-definition">:
    const match = htmlContent.match(/<script([\S\s]*)name=["']graphics-data-definition['"]/)
    if (!match) throw new Error(`Did not find any <script name="graphics-data-definition"> tag, did you forget to add it?\n${exampleSchemaTag}`)

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
 * <script name="graphics-data-definition" type="application/json+gdd" src="path-to-json-file">
 * @param string htmlString
 * @returns The path to the JSON file.
 */
function extractGDDJSONPath(htmlString: string) {
    const match = htmlString.match(/<script([\S\s]*?name=["']graphics-data-definition['"][\S\s]*?)>/)
    if (!match) return null

    const tagContent = match[0].trim()
    if (!tagContent) throw new Error(`<script> tag is empty, it should be on this form:\n${exampleSchemaTag}`)

    const srcMatch = tagContent.match(/src="([^"]*)"/) || tagContent.match(/src='([^']*)'/)
    if (!srcMatch) return null
    // if (!srcMatch) throw new Error(`src property is missing in <script> tag, it should be on this form:\n${exampleSchemaTag}`)

    const srcContent = srcMatch[1] || null
    // if (!srcContent) throw new Error(`src property is empty, it should be on this form:\n${exampleMetaTag}`)

    return srcContent
}
const exampleSchemaTag = ' <script name="graphics-data-definition" type="application/json+gdd" src="path-to-json-file"></script>'

/**
 * Extracts a GDD JSON schema from a HTML file
 *
 * <script name="graphics-data-definition" type="application/json+gdd">
 * { ***The schema*** }
 * </script>
 * @param string htmlString
 * @returns The path to the JSON file.
 */
function extractGDDJSONFromHTMLFile(htmlString: string) {
    const match = (
        // Matches: <script name="graphics-data-definition" type="application/json+gdd" >CONTENT</script>
        htmlString.match(/<script [\S\s]*?name=["']graphics-data-definition['"][\S\s]*?>([\s\S]*?)<\/script>/)
    )
    if (!match) throw new Error(`Did not find any <script> tag, did you forget to add it?\n${exampleSchemaTagWithContent}`)

    const srcContent = match[1] || null

    return srcContent
}
const exampleSchemaTagWithContent = `<script name="graphics-data-definition" type="application/json+gdd">
*** GDD Schema ***
</script>`

