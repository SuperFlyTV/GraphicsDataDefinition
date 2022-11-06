# GraphicsDataDefinition javascript library

This library contains a few useful tools for javascript developers when working with the [Graphics Data Definition](https://github.com/SuperFlyTV/GraphicsDataDefinition).
It can be used in the browser or Node.js.


## Installation

```bash
npm install graphics-data-definition
```

## How to use

```typescript
// Typescript
import {
    validateData,
    getDefaultDataFromSchema,
    setupSchemaValidator,
    GDDSchema
} from 'graphics-data-definition'
import fetch from 'node-fetch'

;(async () => {
// This object represents a GDD Schema that have been read from a graphics template:
const mySchema: GDDSchema = {
    "$schema": "https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json",
    "title": "One-Line GFX Template",
    "type": "object",
    "properties": {
        "text0": {
            "type": "string",
            "gddType": "single-line",
        },
        "color": {
            "type": "string",
            "gddType": "color-rrggbb",
            "pattern": '^#[0-9a-f]{6}$',
            "default": "#000000"
        }
    },
}
// This object represents the data that comes from the user input form:
const myData = {
    text0: "This is the text!"
}

// Verify that the schema is valid: -------------------------------------------
const schemaValidator = await setupSchemaValidator({
    fetch: async (url) => {
        return await (await fetch(url)).json()
    }
})
const schemaValidateResult = schemaValidator.validate(mySchema)
if (schemaValidateResult === null) console.log('Schema is valid!')
else console.log('Schema is not valid: ' + schemaValidateResult)

// Validate that the data is correct: -----------------------------------------
const dataValidateResult = validateData(mySchema, myData)
if (dataValidateResult === null) console.log('Data is valid!')
else console.log('Data is not valid: ' + schemaValidateResult)

// Generate a default data-object, to use for prefilling: ---------------------
const defaultData = getDefaultDataFromSchema(mySchema)
console.log('Default Data from schema: ' + JSON.stringify(defaultData))

})().catch(console.error)

```

