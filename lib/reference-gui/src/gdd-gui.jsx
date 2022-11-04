import React from "react";

import { validateData, getDefaultDataFromSchema } from "./gdd/data";
import { validateSchema } from "./gdd/schema-validate";

export const GDDGUI = (props) => {
  let schema;
  try {
    schema = JSON.parse(props.schema);
  } catch (err) {
    return `There was an error parsing the schema: ${err}`;
  }

  try {
    validateSchema(schema);
  } catch (err) {
    return `${err}`;
  }

  const setData = (data) => {
    props.setData(data);
  };

  return componentAny({
    property: "",
    schema: schema,
    data: props.data,
    setData: setData,
  });
};
const getBasicType = (schemaType) => {
  return Array.isArray(schemaType) ? schemaType[0] : schemaType;
};
const componentAny = (props) => {
  if (!props.schema) return "null";
  const basicType = getBasicType(props.schema.type);

  props.key = props.property;

  props.dataValidation = validateData(props.schema, props.data);

  if (basicType === "boolean") return propertyBoolean(props);
  if (basicType === "string") return propertyString(props);
  if (basicType === "number") return propertyNumber(props);
  if (basicType === "integer") return propertyInteger(props);
  if (basicType === "array") return propertyArray(props);
  if (basicType === "object") return propertyObject(props);

  return propertyUnknown(props, basicType);
};

const EditProperty = (props) => {
  const label = props.schema.label || props.property;
  const description = props.schema.description;

  if (props.inTableRow || props.inTableCell) {
    return (
      <td>
        <div className={"gdd-property gdd-property-" + props.className}>
          <div className="edit">{props.children}</div>
        </div>
      </td>
    );
  } else {
    return (
      <div className={"gdd-property gdd-property-" + props.className}>
        <div className="label">{label}</div>
        {description && <div className="description">{description}</div>}
        <div className="edit">{props.children}</div>
        {props.dataValidation && (
          <div className="data-validation">{props.dataValidation}</div>
        )}
      </div>
    );
  }
};

const propertyUnknown = (props, basicType) => {
  return (
    <EditProperty className="boolean" {...props}>
      Unknown type "{props.basicType}"
    </EditProperty>
  );
};
const propertyBoolean = (props) => {
  const data = !!props.data;
  return (
    <EditProperty className="boolean" {...props}>
      <input
        type="checkbox"
        checked={data}
        onChange={(e) => {
          props.setData(e.target.checked);
        }}
      />
    </EditProperty>
  );
};
const propertyString = (props) => {
  const data = props.data || "";
  return (
    <EditProperty className="string" {...props}>
      <input
        type="text"
        value={data}
        onChange={(e) => {
          props.setData(e.target.value);
        }}
      />
    </EditProperty>
  );
};
const propertyNumber = (props) => {
  const data = props.data || "";
  return (
    <EditProperty className="number" {...props}>
      <input
        type="number"
        value={data}
        onChange={(e) => {
          props.setData(parseFloat(e.target.value));
        }}
      />
    </EditProperty>
  );
};
const propertyInteger = (props) => {
  const data = props.data || "";
  return (
    <EditProperty className="integer" {...props}>
      <input
        type="number"
        value={data}
        onChange={(e) => {
          props.setData(parseInt(e.target.value));
        }}
      />
    </EditProperty>
  );
};
const propertyArray = (props) => {
  let data = props.data;
  if (!Array.isArray(data)) data = [];

  let columns = [];
  if (props.schema.items.type === "object") {
    columns = Object.entries(props.schema.items.properties);
  } else {
    columns = [["", props.schema.items]];
  }

  return (
    <EditProperty className="array" {...props}>
      <table>
        <thead>
          <tr>
            {columns.map(([columnKey, column]) => {
              return (
                <th className="header" key={columnKey}>
                  <div className="label">{column.label || columnKey}</div>
                  {column.description && (
                    <div className="description">{column.description}</div>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((itemData, index) => {
            const itemSetData = (d) => {
              data[index] = d;
              props.setData(data);
            };

            return (
              <tr className="item" key={index}>
                {componentAny({
                  property: index,
                  schema: props.schema.items,
                  data: itemData,
                  setData: itemSetData,
                  inTableRow: true,
                })}
                <td>
                  <button
                    className="delete"
                    onClick={() => {
                      data.splice(index, 1);
                      props.setData(data);
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="99">
              <button
                className="add"
                onClick={() => {
                  data.push(
                    getDefaultDataFromSchema(props.schema.items) ?? null
                  );
                  props.setData(data);
                }}
              >
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </EditProperty>
  );
};

const propertyObject = (props) => {
  let data = props.data || {};
  if (typeof data !== "object" || Array.isArray(data)) data = {};

  const properties = props.schema.properties || {};

  if (props.inTableRow) {
    return Object.entries(properties).map(([subProperty, subSchema]) => {
      const propData = data[subProperty];
      const propSetData = (d) => {
        data[subProperty] = d;
        props.setData(data);
      };

      return componentAny({
        property: subProperty,
        schema: subSchema,
        data: propData,
        setData: propSetData,
        inTableCell: true,
      });
    });
  } else {
    return (
      <EditProperty className="object" {...props}>
        <div className="properties">
          {Object.entries(properties).map(([subProperty, subSchema]) => {
            const propData = data[subProperty];
            const propSetData = (d) => {
              data[subProperty] = d;
              props.setData(data);
            };

            return (
              <div className="property" key={subProperty}>
                {componentAny({
                  property: subProperty,
                  schema: subSchema,
                  data: propData,
                  setData: propSetData,
                })}
              </div>
            );
          })}
        </div>
      </EditProperty>
    );
  }
};
