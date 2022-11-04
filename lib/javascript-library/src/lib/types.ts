export type GDDSchema = GDDSchemaPropertyObject;

export type GDDSchemaProperty =
  | GDDSchemaPropertyBoolean
  | GDDSchemaPropertyString
  | GDDSchemaPropertyNumber
  | GDDSchemaPropertyInteger
  | GDDSchemaPropertyObject
  | GDDSchemaPropertyArray;

export interface GDDSchemaPropertyBoolean {
  type: "boolean";
  default?: boolean;
}
export interface GDDSchemaPropertyString {
  type: "string";
  default?: string;
}
export interface GDDSchemaPropertyNumber {
  type: "number";
  default?: number;
}
export interface GDDSchemaPropertyInteger {
  type: "integer";
  default?: number;
}
export interface GDDSchemaPropertyObject {
  type: "object";
  properties: {
    [key: string]: GDDSchemaProperty;
  };
  default?: { [key: string]: any };
}
export interface GDDSchemaPropertyArray {
  type: "array";
  items: GDDSchemaProperty;
  default?: any[];
}
