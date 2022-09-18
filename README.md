# GDD - Graphics Data Definition

_NOTE: This is a draft!_

_Everything in this document is subject to change and should be considered a proposal only!_

**Table of contents**

- [Gettings started](#Getting+started)
- [General Definition](#General+Definition)
- [Basic Types](#Basic+Types)
- [GDD Types](#GDD+Types)
- [For GUI Developers](#For+GUI+Developers)

## Getting started

The GDD Schema can either be defined in a separate JSON-file, or inline in the HTML-template-file.

**[A live demo of a Reference GUI can be found here!](https://superflytv.github.io/GraphicsDataDefinition/reference-gui/dist/)**

**HTML Graphics file, "example.html":**

The `<meta>` tag refers to a JSON-file that contains the GDD Schema definitions.
The `src=""` attribute can contain either a relative or an absolute URL.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="graphics-data-definition" type="application/json+gdd" src="example.json" />
  </head>
  <body>
    *** Content goes here ***
  </body>
</html>
```

**JSON file, "example.json"**

```json
{
  "title": "One-Line GFX Template",
  "type": "object",
  "properties": {
    "text0": {
      "description": "Text content",
      "type": "string",
      "gddType": ["single-line"],
      "gddOptions": {
        "maxLength": 50
      }
    }
  },
  "required": ["text0"]
}
```

**HTML Graphics file, "example-inline.html":**

The `<meta>` tag can also contain the GDD Schema definitions inline:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="graphics-data-definition" type="application/json+gdd">
    <![CDATA[
      {
        "title": "One-Line GFX Template",
        "type": "object",
        "properties": {
          "text0": {
            "type": "string",
          }
        },
      }
    ]]>
    </meta>
  </head>
  <body>
    *** Content goes here ***
  </body>
</html>
```

**Example data**

```json
{ "text0": "Hello world!" }
```

## General Definition

The GDD is a subset of the [JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#name-a-vocabulary-for-structural), with a few exceptions, see below.

It supports all the basic JSON types (such as strings and numbers) but also extends them with **GDD Types**,
which can be used by _Graphics client GUIs_ to auto-generate input forms for the data.

All **GDD Types** are designed to gracefully degrade in case the GUI can't handle that particular type.
One example is the `["string", "RRGGBB"]` type which (when supported) can provide a color-picker in the GUI,
but if not supported will gracefully degrade to a simple text input.

The GUIs are expected to validate the form-data before submitting it to the GFX Clients.
Examples of how to validate can be found here: _---TODO---_

### Schema

```json
{
  "title": "", // [optional] string, a short name of the GFX-template. Used for informational purposes only.
  "description": "", // [optional] string, a description GFX-template. Used for informational purposes only.
  "type": "object", // MUST be "object"
  "properties": {
    // MUST be an object
    // Properties goes here:
    "myProperty": {}
  },
  "required": [] // [optional]
}
```

### Property

All properties share these definitions: ([JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.1))

```json
{
  "type": array, // See below
  "label": string, // [Optional] Short label to name the property
  "description": string, // [Optional] Longer description of the property
  "gddType": array, // [Optional unless required by GDD Type] An array containing the GDD Type, see below
  "gddOptions": object // [Optional unless required by GDD Type] An object containing options for a certain GDD Type, see below
}
```

#### The `type` property

In the standard JSON-schema definition, the `type` property is allowed to be either a string or an array comtaining any combination of the basic types `"boolean"`, `"string"`, `"number"`, `"integer"`, `"array"`, `"object"` or `"null"`.
To reduce the complexity for the GDD GUI implementation however, the valid values for the `type` are reduced to these:

- `"boolean"`
- `"string"`
- `"number"`
- `"integer"` (this is a number with a zero fractional part)
- `"array"`
- `"object"`
- `["boolean", "null"]` ie a `boolean` or `null`
- `["string", "null"]` ie a `string` or `null`
- `["number", "null"]` ie a `number` or `null`
- `["integer", "null"]` ie a `integer` or `null`
- `["array", "null"]` ie a `array` or `null`
- `["object", "null"]` ie a `object` or `null`

## Basic Types

Here follows a list of the basic JSON types supported in GDD.

_All of these types are supported by all GUIs_

### Boolean

```json
{
  "type": "boolean"
}
```

### String

_[JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.3)_

```json
{
  "type": "string",
  "maxLength": number, // [Optional] See JSON-schema definition ^
  "minLength": number, // [Optional] See JSON-schema definition ^
  "pattern": Regular Expression, // [Optional] See JSON-schema definition ^
}
```

### Number / Integer

_[JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.2)_

```json
{
  "type": "number", // or "integer"
  "multipleOf": number, // [Optional] See JSON-schema definition ^
  "maximum": number, // [Optional] See JSON-schema definition ^
  "exclusiveMaximum": number, // [Optional] See JSON-schema definition ^
  "minimum": number, // [Optional] See JSON-schema definition ^
  "exclusiveMinimum": number, // [Optional] See JSON-schema definition ^
}
```

### Array

_[JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.4)_

```json
{
  "type": "array",
  "items": { // Contains a definition of the items in the array
    "type": "string" // example
  },
  "maxItems": number, // [Optional] See JSON-schema definition ^
  "minItems": number, // [Optional] See JSON-schema definition ^
  "uniqueItems": boolean, // [Optional] See JSON-schema definition ^
  "maxContains": number, // [Optional] See JSON-schema definition ^
  "minContains": number, // [Optional] See JSON-schema definition ^
}
```

### Object

_[JSON-schema definition](https://json-schema.org/draft/2020-12/json-schema-validation.html#section-6.5)_

```json
{
  "type": "object",
  "items": { // Contains a definition of the items in the array
    "type": "string" // example
  },
  "maxProperties": number, // [Optional] See JSON-schema definition ^
  "minProperties": number, // [Optional] See JSON-schema definition ^
  "required": boolean, // [Optional] See JSON-schema definition ^
  "dependentRequired": object, // [Optional] See JSON-schema definition ^
}
```

## GDD Types

Here follows a list of the GDD Types, which provides more advanced functionality in GUIs.

_Not all of these types are supported by all GUIs. If a type is not supported,
the GUI will degrade gracefully to the next_

Note: All `type`-properties below can be defined as optional by defining it as `["myType", "null"]`.

### Single-line text

A variant of the text input, which specifically is a single line.

```json
{
  "type": "string",
  "gddType": ["single-line"]
}
```

Example: `"Hello World!"`

### Multi-line text

A variant of the text input, which specifically is a multi-line.

```json
{
  "type": "string",
  "gddType": ["multi-line"]
}
```

Example: `"Hello World!\nI'm alive!"`

### File path

Lets the user pick a file from disk

```json
{
  "type": "string",
  "gddType": ["file-path"]
  "gddOptions": {
    "extensions": Array<string> // [Optional] Limit which files can be chosen by the user
  }
}
```

Example: `C:\images\myFile.xml` or `folder/myFile.zip`

### Image File path

Lets the user pick an image file from disk

```json
{
  "type": "string",
  "gddType": ["file-path", "image-path"],
  "gddOptions": {
    "extensions": Array<string> // [Optional] Limit which files can be chosen by the user
  }
}
```

Example: `C:\images\myImage.jpg` or `folder/myImage.png`

### Color - RRGGBB

Let's the user pick a color.

```json
{
  "type": "string",
  "gddType": ["rrggbb"]
}
```

The value is stored as a string on the form "#RRGGBB", eg `"#61138e"`.

### Percentage

A number presented as a pecentage

```json
{
  "type": "number",
  "gddType": ["percentage"]
}
```

The value is stored as a number, eg "25%" -> 0.25

### Duration in milliseconds

A duration value, to be presented in a human readable format (like "HH:MM:SS.xxx")

```json
{
  "type": "integer",
  "gddType": ["durationMs"]
}
```

The value is stored as a number in milliseconds, eg "1m23s" -> `83000`

## For GUI Developers

When implementing a GUI to support the GDD definitions, you don't have to implement support for all GDD types - since the GDD types are designed to degrade gracefully.

To degrade gracefully, it is recommended that you follow these practices when implementing the GUI:

```javascript
function determineComponent(prop) {
  // List of supported components, starting with "longest gddType" first:

  const basicType = Array.isArray(prop.type) ? prop.type[0] : prop.type;
  const allowOptional = Array.isArray(prop.type)
    ? prop.type[1] === "null"
    : false;

  if (equals(prop.gddType, ["file-path", "image-path"]))
    return componentImagePicker(prop, allowOptional);
  if (equals(prop.gddType, ["file-path"]))
    return componentFilePicker(prop, allowOptional);
  if (equals(prop.gddType, ["rrggbb"]))
    return componentRRGGBB(prop, allowOptional);

  // Handle

  if (basicType === "boolean") return componentBoolean(prop, allowOptional);
  if (basicType === "string") return componentString(prop, allowOptional);
  if (basicType === "number") return componentNumber(prop, allowOptional);
  if (basicType === "integer") return componentInteger(prop, allowOptional);
  if (basicType === "array") return componentArray(prop, allowOptional);
  if (basicType === "object") return componentObject(prop, allowOptional);

  // This shouldn't really ever happen
  return null;
}
```
