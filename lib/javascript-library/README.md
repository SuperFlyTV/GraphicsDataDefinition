# GraphicsDataDefinition javascript library

This library contains a few useful tools for javascript developers.
It can be used in the browser or Node.js.


## Installation

```bash
npm install graphics-data-definition
```

## How to use

```javascript
import {

    validateData,
    getDefaultDataFromSchema
} from 'graphics-data-definition'

const mySchema = {
    "$schema": "https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json",
    "title": "One-Line GFX Template",
    "type": "object",
    "properties": {
        "text0": {
            "type": "string",
            "gddType": "single-line",
            "gddOptions": {}
        }
    },
}

// Verify that the schema is valid:


// ------------------------------------------------------------------
const myData = {
    text0: "This is the text!"
}

// Validate that the data is correct:
const isValid = validateData(mySchema, myData)

//
const defaultData = getDefaultDataFromSchema(mySchema)



```

