const root = ReactDOM.createRoot(document.getElementById("root"));

const exampleSchema = `{
    "title": "Table GFX Template",
    "type": "object",
    "properties": {
        "people": {
            "label": "People",
            "description": "This is a list of objects",
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "label": "Name",
                        "description": "Name of the person",
                        "type": "string"
                    },
                    "age": {
                        "label": "Age",
                        "description": "Age, in years",
                        "type": "integer"
                    },
                    "favoriteColor": {
                        "label": "Favorite Color",
                        "type": "string",
                        "gddType": [
                            "rrggbb"
                        ]
                    },
                    "awake": {
                      "label": "Awake",
                      "type": "boolean"
                    },
                    "complicated": {
                      "label": "Complicated",
                      "description": "This is an object within an object",
                      "type": "object",
                      "properties": {
                        "prop1": {
                          "type": "string"
                        },
                        "prop2": {
                          "type": "string"
                        }

                      }
                    }
                }
            }
        },
        "Cities": {
          "label": "Cities",
          "description": "This is an array of strings",
          "type": "array",
          "items": {
              "type": "string"
          }
      }
    },
    "required": [
        "people"
    ]
}
`;
const exampleData = {
  people: [
    {
      name: "Johan",
      age: 33,
      favoriteColor: "#3333dd",
    },
    {
      name: "Ivan",
      age: 27,
      favoriteColor: "#ff3355",
    },
  ],
};
const initialSchema = localStorage.getItem("schema") || exampleSchema;
const App = () => {
  const [schema, setSchema] = React.useState(initialSchema);
  const [data, setData] = React.useState(exampleData);

  const onDataSave = (d) => {
    setData(JSON.parse(JSON.stringify(d)));
  };

  return (
    <div>
      <div className="schema-input">
        <textarea
          rows={15}
          cols={100}
          onChange={(event) => {
            const newSchema = event.target.value;
            setSchema(newSchema);

            localStorage.setItem("schema", newSchema);
          }}
          value={schema}
        />
      </div>
      <div className="gdd-gui">
        <GDDGUI schema={schema} data={data} setData={onDataSave} />
      </div>
      <div className="output-data">
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </div>
    </div>
  );
};

const GDDGUI = (props) => {
  let schema;
  try {
    schema = JSON.parse(props.schema);
  } catch (err) {
    return `There was an error parsing the schema: ${err}`;
  }

  return componentAny({
    property: "",
    schema: schema,
    data: props.data,
    setData: props.setData,
  });
};
const getBasicType = (schemaType) => {
  return Array.isArray(schemaType) ? schemaType[0] : schemaType;
};
const componentAny = (props) => {
  if (!props.schema) return "null";
  const basicType = getBasicType(props.schema.type);

  props.key = props.property;

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
                  data.push(null);
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

root.render(<App />);
