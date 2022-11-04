import { Validator } from "jsonschema";
import { GDDSchema, GDDSchemaProperty } from "./types";

/**
 * Validates the data compared to the schema
 * @param {*} gddSchema
 * @param {*} data
 * @returns null if all OK, error string otherwise
 */
export function validateData(
  gddSchema: GDDSchema,
  data: unknown
): string | null {
  const v = new Validator();

  const result = v.validate(data, gddSchema);
  if (result.errors.length > 0) {
    return result.errors.join("\n");
  }

  // TODO: Here we should add GDD-specific checks as well

  return null;
}
export function getDefaultDataFromSchema(
  gddSchema: GDDSchemaProperty,
  prefilledData: unknown,
  key: string
): any {
  // Note: this function assumes that the schema provided has been validated by validateSchema()

  if (gddSchema.type === "object") {
    const dataObject = clone(prefilledData ?? gddSchema.default ?? {}) as {
      [key: string]: any;
    };
    for (const [subKey, subSchema] of Object.entries(gddSchema.properties)) {
      const subData = getDefaultDataFromSchema(
        subSchema,
        dataObject[subKey],
        key + "." + subKey
      );
      if (subData !== undefined) dataObject[subKey] = subData;
    }
    return dataObject;
  } else if (gddSchema.type === "array") {
    const dataArray = clone(prefilledData ?? gddSchema.default ?? []) as any[];
    for (let index = 0; index < dataArray.length; index++) {
      dataArray[index] = getDefaultDataFromSchema(
        gddSchema.items,
        dataArray[index],
        key + `[${index}]`
      );
    }
    return dataArray;
  } else {
    const data = prefilledData ?? gddSchema.default ?? undefined;
    if (data !== undefined) return data;

    // Fallback to default values:
    if (gddSchema.type === "boolean") return false;
    if (gddSchema.type === "string") return "";
    if (gddSchema.type === "number") return 0;
    if (gddSchema.type === "integer") return 0;
  }
}
function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
