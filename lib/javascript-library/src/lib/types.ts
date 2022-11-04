import { Schema } from "jsonschema";

export type GDDSchema = GDDSchemaPropertyObject;

export type GDDSchemaProperty =
  | GDDSchemaPropertyBoolean
  | GDDSchemaPropertyString
  | GDDSchemaPropertyNumber
  | GDDSchemaPropertyInteger
  | GDDSchemaPropertyObject
  | GDDSchemaPropertyArray;

export interface GDDSchemaPropertyBoolean extends GDDSchemaPropertyBase {
  type: "boolean";
  default?: boolean;
}
export interface GDDSchemaPropertyString extends GDDSchemaPropertyBase {
  type: "string";
  default?: string;
}
export interface GDDSchemaPropertyNumber extends GDDSchemaPropertyBase {
  type: "number";
  default?: number;
}
export interface GDDSchemaPropertyInteger extends GDDSchemaPropertyBase {
  type: "integer";
  default?: number;
}
export interface GDDSchemaPropertyObject extends GDDSchemaPropertyBase {
  type: "object";
  properties: {
    [key: string]: GDDSchemaProperty;
  };
  default?: { [key: string]: any };
}
export interface GDDSchemaPropertyArray extends GDDSchemaPropertyBase {
  type: "array";
  items: GDDSchemaProperty;
  default?: any[];
}

export interface GDDSchemaPropertyBase extends Schema {
  gddType?: string;
  gddOptions?: { [key: string]: any };
}
