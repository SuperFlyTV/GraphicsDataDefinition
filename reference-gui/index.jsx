const root = ReactDOM.createRoot(document.getElementById("root"));

const exampleSchema = `{
    "title": "Table GFX Template",
    "type": "object",
    "properties": {
        "people": {
            "label": "People",
            "description": "This is a list of people",
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
                    }
                }
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
  ],
};
const App = () => {
  const [schema, setSchema] = React.useState(exampleSchema);
  const [data, setData] = React.useState(exampleData);

  const setDataWrap = (d) => {
    setData(JSON.parse(JSON.stringify(d)));
  };

  return (
    <div>
      <div className="schema-input">
        <textarea
          onChange={(event) => {
            setSchema(event.target.value);
          }}
          value={schema}
        />
      </div>
      <div className="schema-gui">
        <GUI schema={schema} data={data} setData={setDataWrap} />
      </div>
      <div className="output-data">
        <pre>{JSON.stringify(data, undefined, 2)}</pre>
      </div>
    </div>
  );
};

const GUI = (props) => {
  let schema;
  try {
    schema = JSON.parse(props.schema);
  } catch (err) {
    return `There was an error parsing the schema: ${err}`;
  }

  return componentAny("root", schema, props.data, props.setData);
};

const componentAny = (key, content, data, setData) => {
  if (!content) return "null";
  const basicType = Array.isArray(content.type)
    ? content.type[0]
    : content.type;
  const allowOptional = Array.isArray(content.type)
    ? content.type[1] === "null"
    : false;

  if (basicType === "boolean")
    return componentBoolean(key, content, allowOptional, data, setData);
  if (basicType === "string")
    return componentString(key, content, allowOptional, data, setData);
  if (basicType === "number")
    return componentNumber(key, content, allowOptional, data, setData);
  if (basicType === "integer")
    return componentInteger(key, content, allowOptional, data, setData);
  if (basicType === "array")
    return componentArray(key, content, allowOptional, data, setData);
  if (basicType === "object")
    return componentObject(key, content, allowOptional, data, setData);

  return `Unknown type "${basicType}"`;
};

const componentBoolean = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-boolean">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="edit">
        <input type="checkbox" checked={data} />
      </div>
    </div>
  );
};
const componentString = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-boolean">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="edit">
        <input
          type="text"
          value={data}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
const componentNumber = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-number">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="edit">
        <input
          type="number"
          value={data}
          onChange={(e) => {
            setData(parseFloat(e.target.value));
          }}
        />
      </div>
    </div>
  );
};
const componentInteger = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-integer">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="edit">
        <input
          type="number"
          value={data}
          onChange={(e) => {
            setData(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
};
const componentArray = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-array">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="items">
        {(data || []).map((itemData, index) => {
          const itemSetData = (d) => {
            data[index] = d;
            setData(data);
          };
          return (
            <div key={index}>
              {componentAny(index, content.items, itemData, itemSetData)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const componentObject = (key, content, allowOptional, data, setData) => {
  const label = content.label || key;
  const description = content.description;

  return (
    <div className="gui-object">
      <div className="label">{label}</div>
      {description && <div className="description">{description}</div>}

      <div className="properties">
        {Object.entries(content.properties).map(([propKey, prop]) => {
          const propData = data[propKey];
          const propSetData = (d) => {
            data[propKey] = d;
            setData(data);
          };

          return (
            <div key={propKey}>
              {componentAny(propKey, prop, propData, propSetData)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

root.render(<App />);
