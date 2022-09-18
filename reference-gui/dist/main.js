/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gdd.jsx":
/*!*********************!*\
  !*** ./src/gdd.jsx ***!
  \*********************/
/***/ (() => {

eval("function _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\n\nfunction _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\nvar root = ReactDOM.createRoot(document.getElementById(\"root\"));\nvar examples = [{\n  schema: {\n    title: \"One-line GFX Template\",\n    type: \"object\",\n    properties: {\n      f0: {\n        type: \"string\"\n      },\n      f1: {\n        type: \"string\"\n      }\n    }\n  },\n  data: {\n    f0: \"Hello world!\",\n    f1: \"I'm alive!\"\n  }\n}, {\n  schema: {\n    title: \"Table GFX Template\",\n    type: \"object\",\n    properties: {\n      people: {\n        label: \"People\",\n        description: \"This is a list of objects\",\n        type: \"array\",\n        items: {\n          type: \"object\",\n          properties: {\n            name: {\n              label: \"Name\",\n              description: \"Name of the person\",\n              type: \"string\"\n            },\n            age: {\n              label: \"Age\",\n              description: \"Age, in years\",\n              type: \"integer\"\n            },\n            favoriteColor: {\n              label: \"Favorite Color\",\n              type: \"string\",\n              gddType: [\"rrggbb\"]\n            },\n            awake: {\n              label: \"Awake\",\n              type: \"boolean\"\n            },\n            complicated: {\n              label: \"Complicated\",\n              description: \"This is an object within an object\",\n              type: \"object\",\n              properties: {\n                prop1: {\n                  type: \"string\"\n                },\n                prop2: {\n                  type: \"string\"\n                }\n              }\n            }\n          }\n        }\n      },\n      Cities: {\n        label: \"Cities\",\n        description: \"This is an array of strings\",\n        type: \"array\",\n        items: {\n          type: \"string\"\n        }\n      }\n    },\n    required: [\"people\"]\n  },\n  data: {\n    people: [{\n      name: \"Johan\",\n      age: 33,\n      favoriteColor: \"#3333dd\"\n    }, {\n      name: \"Ivan\",\n      age: 27,\n      favoriteColor: \"#ff3355\"\n    }]\n  }\n}];\nvar initialSchema = localStorage.getItem(\"schema\") || JSON.stringify(examples[0].schema, undefined, 2);\nvar initialDataStr = localStorage.getItem(\"data\") || JSON.stringify(examples[0].data, undefined, 2);\nvar initialData;\n\ntry {\n  initialData = JSON.parse(initialDataStr);\n} catch (err) {\n  initialData = {};\n}\n\nvar App = function App() {\n  var _React$useState = React.useState(initialSchema),\n      _React$useState2 = _slicedToArray(_React$useState, 2),\n      schema = _React$useState2[0],\n      setSchema = _React$useState2[1];\n\n  var _React$useState3 = React.useState(initialData),\n      _React$useState4 = _slicedToArray(_React$useState3, 2),\n      data = _React$useState4[0],\n      setData = _React$useState4[1];\n\n  var onDataSave = function onDataSave(d) {\n    var dataStr = JSON.stringify(d);\n    setData(JSON.parse(dataStr));\n    localStorage.setItem(\"data\", dataStr);\n  };\n\n  return /*#__PURE__*/React.createElement(\"div\", null, /*#__PURE__*/React.createElement(\"div\", {\n    className: \"select-examples\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    onClick: function onClick() {\n      setSchema(JSON.stringify(examples[0].schema, undefined, 2));\n      setData(examples[0].data);\n    }\n  }, \"Reset to Example: Simple f0, f1\"), /*#__PURE__*/React.createElement(\"button\", {\n    onClick: function onClick() {\n      setSchema(JSON.stringify(examples[1].schema, undefined, 2));\n      setData(examples[1].data);\n    }\n  }, \"Reset to Example: Advanced table\")), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"schema-input\"\n  }, /*#__PURE__*/React.createElement(\"textarea\", {\n    rows: 15,\n    cols: 100,\n    onChange: function onChange(event) {\n      var newSchema = event.target.value;\n      setSchema(newSchema);\n      localStorage.setItem(\"schema\", newSchema);\n    },\n    value: schema\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"gdd-gui\"\n  }, /*#__PURE__*/React.createElement(GDDGUI, {\n    schema: schema,\n    data: data,\n    setData: onDataSave\n  })), /*#__PURE__*/React.createElement(\"div\", {\n    className: \"output-data\"\n  }, /*#__PURE__*/React.createElement(\"pre\", null, JSON.stringify(data, undefined, 2))));\n};\n\nvar GDDGUI = function GDDGUI(props) {\n  var schema;\n\n  try {\n    schema = JSON.parse(props.schema);\n  } catch (err) {\n    return \"There was an error parsing the schema: \".concat(err);\n  }\n\n  return componentAny({\n    property: \"\",\n    schema: schema,\n    data: props.data,\n    setData: props.setData\n  });\n};\n\nvar getBasicType = function getBasicType(schemaType) {\n  return Array.isArray(schemaType) ? schemaType[0] : schemaType;\n};\n\nvar componentAny = function componentAny(props) {\n  if (!props.schema) return \"null\";\n  var basicType = getBasicType(props.schema.type);\n  props.key = props.property;\n  if (basicType === \"boolean\") return propertyBoolean(props);\n  if (basicType === \"string\") return propertyString(props);\n  if (basicType === \"number\") return propertyNumber(props);\n  if (basicType === \"integer\") return propertyInteger(props);\n  if (basicType === \"array\") return propertyArray(props);\n  if (basicType === \"object\") return propertyObject(props);\n  return propertyUnknown(props, basicType);\n};\n\nvar EditProperty = function EditProperty(props) {\n  var label = props.schema.label || props.property;\n  var description = props.schema.description;\n\n  if (props.inTableRow || props.inTableCell) {\n    return /*#__PURE__*/React.createElement(\"td\", null, /*#__PURE__*/React.createElement(\"div\", {\n      className: \"gdd-property gdd-property-\" + props.className\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      className: \"edit\"\n    }, props.children)));\n  } else {\n    return /*#__PURE__*/React.createElement(\"div\", {\n      className: \"gdd-property gdd-property-\" + props.className\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      className: \"label\"\n    }, label), description && /*#__PURE__*/React.createElement(\"div\", {\n      className: \"description\"\n    }, description), /*#__PURE__*/React.createElement(\"div\", {\n      className: \"edit\"\n    }, props.children));\n  }\n};\n\nvar propertyUnknown = function propertyUnknown(props, basicType) {\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"boolean\"\n  }, props), \"Unknown type \\\"\", props.basicType, \"\\\"\");\n};\n\nvar propertyBoolean = function propertyBoolean(props) {\n  var data = !!props.data;\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"boolean\"\n  }, props), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"checkbox\",\n    checked: data,\n    onChange: function onChange(e) {\n      props.setData(e.target.checked);\n    }\n  }));\n};\n\nvar propertyString = function propertyString(props) {\n  var data = props.data || \"\";\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"string\"\n  }, props), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"text\",\n    value: data,\n    onChange: function onChange(e) {\n      props.setData(e.target.value);\n    }\n  }));\n};\n\nvar propertyNumber = function propertyNumber(props) {\n  var data = props.data || \"\";\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"number\"\n  }, props), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"number\",\n    value: data,\n    onChange: function onChange(e) {\n      props.setData(parseFloat(e.target.value));\n    }\n  }));\n};\n\nvar propertyInteger = function propertyInteger(props) {\n  var data = props.data || \"\";\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"integer\"\n  }, props), /*#__PURE__*/React.createElement(\"input\", {\n    type: \"number\",\n    value: data,\n    onChange: function onChange(e) {\n      props.setData(parseInt(e.target.value));\n    }\n  }));\n};\n\nvar propertyArray = function propertyArray(props) {\n  var data = props.data;\n  if (!Array.isArray(data)) data = [];\n  var columns = [];\n\n  if (props.schema.items.type === \"object\") {\n    columns = Object.entries(props.schema.items.properties);\n  } else {\n    columns = [[\"\", props.schema.items]];\n  }\n\n  return /*#__PURE__*/React.createElement(EditProperty, _extends({\n    className: \"array\"\n  }, props), /*#__PURE__*/React.createElement(\"table\", null, /*#__PURE__*/React.createElement(\"thead\", null, /*#__PURE__*/React.createElement(\"tr\", null, columns.map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2),\n        columnKey = _ref2[0],\n        column = _ref2[1];\n\n    return /*#__PURE__*/React.createElement(\"th\", {\n      className: \"header\",\n      key: columnKey\n    }, /*#__PURE__*/React.createElement(\"div\", {\n      className: \"label\"\n    }, column.label || columnKey), column.description && /*#__PURE__*/React.createElement(\"div\", {\n      className: \"description\"\n    }, column.description));\n  }))), /*#__PURE__*/React.createElement(\"tbody\", null, data.map(function (itemData, index) {\n    var itemSetData = function itemSetData(d) {\n      data[index] = d;\n      props.setData(data);\n    };\n\n    return /*#__PURE__*/React.createElement(\"tr\", {\n      className: \"item\",\n      key: index\n    }, componentAny({\n      property: index,\n      schema: props.schema.items,\n      data: itemData,\n      setData: itemSetData,\n      inTableRow: true\n    }), /*#__PURE__*/React.createElement(\"td\", null, /*#__PURE__*/React.createElement(\"button\", {\n      className: \"delete\",\n      onClick: function onClick() {\n        data.splice(index, 1);\n        props.setData(data);\n      }\n    }, \"\\uD83D\\uDDD1\")));\n  }), /*#__PURE__*/React.createElement(\"tr\", null, /*#__PURE__*/React.createElement(\"td\", {\n    colSpan: \"99\"\n  }, /*#__PURE__*/React.createElement(\"button\", {\n    className: \"add\",\n    onClick: function onClick() {\n      data.push(null);\n      props.setData(data);\n    }\n  }, \"+\"))))));\n};\n\nvar propertyObject = function propertyObject(props) {\n  var data = props.data || {};\n  if (_typeof(data) !== \"object\" || Array.isArray(data)) data = {};\n  var properties = props.schema.properties || {};\n\n  if (props.inTableRow) {\n    return Object.entries(properties).map(function (_ref3) {\n      var _ref4 = _slicedToArray(_ref3, 2),\n          subProperty = _ref4[0],\n          subSchema = _ref4[1];\n\n      var propData = data[subProperty];\n\n      var propSetData = function propSetData(d) {\n        data[subProperty] = d;\n        props.setData(data);\n      };\n\n      return componentAny({\n        property: subProperty,\n        schema: subSchema,\n        data: propData,\n        setData: propSetData,\n        inTableCell: true\n      });\n    });\n  } else {\n    return /*#__PURE__*/React.createElement(EditProperty, _extends({\n      className: \"object\"\n    }, props), /*#__PURE__*/React.createElement(\"div\", {\n      className: \"properties\"\n    }, Object.entries(properties).map(function (_ref5) {\n      var _ref6 = _slicedToArray(_ref5, 2),\n          subProperty = _ref6[0],\n          subSchema = _ref6[1];\n\n      var propData = data[subProperty];\n\n      var propSetData = function propSetData(d) {\n        data[subProperty] = d;\n        props.setData(data);\n      };\n\n      return /*#__PURE__*/React.createElement(\"div\", {\n        className: \"property\",\n        key: subProperty\n      }, componentAny({\n        property: subProperty,\n        schema: subSchema,\n        data: propData,\n        setData: propSetData\n      }));\n    })));\n  }\n};\n\nroot.render( /*#__PURE__*/React.createElement(App, null));\n\n//# sourceURL=webpack://reference-gui/./src/gdd.jsx?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gdd_jsx__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gdd.jsx */ \"./src/gdd.jsx\");\n/* harmony import */ var _gdd_jsx__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_gdd_jsx__WEBPACK_IMPORTED_MODULE_0__);\nconsole.log(\"hello world\");\n\n\n//# sourceURL=webpack://reference-gui/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;