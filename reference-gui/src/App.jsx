import React from "react";
import ReactDOM from "react-dom/client";
import { GDDGUI } from "./gdd-gui";

const root = ReactDOM.createRoot(document.getElementById("root"));

const initialSchema =
  localStorage.getItem("schema") ||
  JSON.stringify(examples[0].schema, undefined, 2);
const initialDataStr =
  localStorage.getItem("data") ||
  JSON.stringify(examples[0].data, undefined, 2);
let initialData;
try {
  initialData = JSON.parse(initialDataStr);
} catch (err) {
  initialData = {};
}
const App = () => {
  const [schema, setSchema] = React.useState(initialSchema);
  const [data, setData] = React.useState(initialData);

  const onDataSave = (d) => {
    const dataStr = JSON.stringify(d);
    setData(JSON.parse(dataStr));
    localStorage.setItem("data", dataStr);
  };

  return (
    <div>
      <div className="select-examples">
        <button
          onClick={() => {
            setSchema(JSON.stringify(examples[0].schema, undefined, 2));
            setData(examples[0].data);
          }}
        >
          Reset to Example: Simple f0, f1
        </button>
        <button
          onClick={() => {
            setSchema(JSON.stringify(examples[1].schema, undefined, 2));
            setData(examples[1].data);
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
