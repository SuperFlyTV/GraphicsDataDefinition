import React from "react";
import ReactDOM from "react-dom/client";
import { GDDGUI } from "./gdd-gui";
import { examples } from "./examples";
import { getDefaultDataFromSchema } from "./gdd/data";
import { validateSchema } from "./gdd/schema-validate";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initialSchemaStr =
  localStorage.getItem("schema") || JSON.stringify(examples[0], undefined, 2);
let initialData;
try {
  const initialSchema = JSON.parse(initialSchemaStr);
  validateSchema(initialSchema);
  initialData = getDefaultDataFromSchema(initialSchema);
} catch (err) {
  console.log(initialSchemaStr);
  console.error("Error in initial schema", err);
  initialData = {};
}
const App = () => {
  const [schema, setSchema] = React.useState(initialSchemaStr);
  const [data, setData] = React.useState(initialData);

  const onDataSave = (d) => {
    const dataStr = JSON.stringify(d);
    setData(JSON.parse(dataStr));
    localStorage.setItem("data", dataStr);
  };
  const switchToExampleSchema = (schema) => {
    setSchema(JSON.stringify(schema, undefined, 2));

    try {
      validateSchema(schema);
      setData(getDefaultDataFromSchema(schema));
    } catch (err) {
      setData({});
    }
  };

  return (
    <div>
      <div className="select-examples">
        <button
          onClick={() => {
            switchToExampleSchema(examples[0]);
          }}
        >
          Reset to Example: Simple f0, f1
        </button>
        <button
          onClick={() => {
            switchToExampleSchema(examples[1]);
          }}
        >
          Reset to Example: Advanced table
        </button>
      </div>
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

root.render(<App />);
