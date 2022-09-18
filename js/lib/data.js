import { Validator } from "jsonschema";

/**
 * Validates the data compared to the schema
 * @param {*} GDDSchema
 * @param {*} data
 * @returns null if all OK, error string otherwise
 */
export function validateData(GDDSchema, data) {
  const v = new Validator();

  const result = v.validate(data, GDDSchema);
  if (result.errors.length > 0) {
    return result.errors.join("\n");
  }

  // TODO: Here we should add GDD-specific checks as well

  return null;
}
