export const examples = [
  {
    title: "One-line GFX Template",
    type: "object",
    properties: {
      f0: {
        type: "string",
        maxLength: 50,
        minLength: 1,
        default: "Hello world!",
      },
      f1: {
        type: "string",
        maxLength: 80,
        default: "I'm alive!",
      },
    },
  },
  {
    title: "Table GFX Template",
    type: "object",
    properties: {
      people: {
        label: "People",
        description: "This is a list of objects",
        type: "array",
        items: {
          type: "object",
          properties: {
            name: {
              label: "Name",
              description: "Name of the person",
              type: "string",
            },
            age: {
              label: "Age",
              description: "Age, in years",
              type: "integer",
            },
            favoriteColor: {
              label: "Favorite Color",
              type: "string",
              gddType: "color-rrggbb",
            },
            awake: {
              label: "Awake",
              type: "boolean",
              default: true,
            },
            complicated: {
              label: "Complicated",
              description: "This is an object within an object",
              type: "object",
              properties: {
                prop1: {
                  type: "string",
                },
                prop2: {
                  type: "string",
                },
              },
            },
          },
          default: {
            name: "Unnamed",
            // age: 33,
            favoriteColor: "#ff0000",
          },
        },
      },
      Cities: {
        label: "Cities",
        description: "This is an array of strings",
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["people"],
    default: {
      people: [
        {
          name: "Johan",
          age: 33,
          awake: false,
          favoriteColor: "#3333dd",
        },
        {
          name: "Ivan",
          age: 27,
          favoriteColor: "#ff3355",
        },
      ],
    },
  },
];

// data: {

// },
// },
