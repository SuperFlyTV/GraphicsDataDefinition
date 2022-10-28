# CasparCG XML data format

_Note: The information on this page is for reference only, it might not work with your particular CasparCG Flash-template._

## Background

In the old days, CasparCG supported Flash-based templates that used a XML-based schema for data interchange.

For backwards-compatiblity, the option `client.gddPlayoutOptions.dataformat: "json" | "caspar-xml"` is provided as a way for playout clients to support the old Flash-based templates.


## Data conversion

Here is an example of the normal JSON-data and its XML equivalent:

**JSON data:**
```typescript
{
  "f0": "This is the first line",
  "f1": "second line"
}
```

**CasparCG XML data:**
```xml
<templateData>
    <componentData id="f0"><data id="text" value="This is the first line" /></componentData>
    <componentData id="f1"><data id="text" value="second line" /></componentData>
</templateData>
```

## Example implementation

Here is a bare-bones example implementation for the XML conversion, in javascript.

```javascript
function parametersToCasparXML(json, basePath) {
	basePath = basePath || ''
    let xml = ''
	for (const [key, value] of Object.entries(json)) {
        const path = (basePath ? basePath + '.' : '') + key

        if (typeof value === 'object') {
            xml += parametersToCasparXML(value, path)
        } else {
            xml += `<componentData id="${path}"><data id="text" value="${escapeStringForXML(value)}" /></componentData>\n`
        }
	}

    if (!basePath) {
        return `<templateData>\n${xml}</templateData>`
    } else {
        return xml
    }
}
function escapeStringForXML(unsafe) {
	if (!unsafe) return ''
	return `${unsafe}`
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}
```
