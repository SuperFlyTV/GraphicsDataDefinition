# Playout Options

In the Schema, there is an option to add the `gddPlayoutOptions` object with various properties therein.
These properties can be read by a playout client in order to modify how it'll display / use / play the template.

_Note: All of the properties inside of `gddPlayoutOptions` are optional._

```typescript
{
  "$schema": "https://superflytv.github.io/GraphicsDataDefinition/gdd-meta-schema/v1/schema.json",
  "title": "My GFX Template",
  "type": "object",
  "properties": {
    "myProperty": {
      // ...
    }
  },
  "gddPlayoutOptions": {
    /** This object contains specific options for the various playout server types (CasparCG, Viz, vMix etc..) */
    "playout" {
      // The contents of this object are described in the sections below
    }
  }
}
```

## CasparCG


```typescript
{
  "gddPlayoutOptions": {
    "playout" {
      "casparcg": {
        /** The default server to play on (an IP-address or a hostname). */
        "serverHost"?: string
        /** The default server to play on. */
        "serverPort"?: number

        /** The default / suggested channel to play on */
        "channel"?: number
        /** The default / suggested layer to play on */
        "layer"?: number

      },
    }
  }
}
```


## vMix

_This sections is yet to be written_

