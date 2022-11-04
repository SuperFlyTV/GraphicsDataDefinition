const fs = require("fs")
const path = require("path")

const Lib = require('./dist/index.js')


const examplesFolder = path.resolve("../../examples/")

async function validateAllExampleFiles() {
  let testCount = 0;

  const htmlFiles = fs
    .readdirSync(examplesFolder)
    .filter((file) => !!file.match(/.html?$/));

  let allGood = true;
  for (const htmlFileName of htmlFiles) {
    const filePath = path.join(examplesFolder, htmlFileName);

    console.log("* " + htmlFileName);
    // Retrieve the schema:
    const GDDSchema = await Lib.retrieveGDDSchema(filePath);

    // Validate the schema:
    Lib.validateSchema(GDDSchema);

    // Let's go through the test cases to ensure that they work as intended:
    const testFileName = htmlFileName.replace(/.html?$/, ".test.json");

    const testFile = await fs.promises.readFile(
      path.join(examplesFolder, "/tests/", testFileName),
      "utf-8"
    );
    const tests = JSON.parse(testFile).tests;

    for (const test of tests) {
      testCount++;
      const errors = Lib.validateData(GDDSchema, test.data);
      if (test.shouldBeValid) {
        if (errors) {
          console.log("Test failed, got errors!");
          console.log(test.data);
          console.log(errors);
          allGood = false;
        }
      } else {
        if (!errors) {
          console.log(`Test failed, should have gotten errors, but didn't`);
          console.log(test.data);
          allGood = false;
        }
      }
    }
  }
  if (allGood) {
    console.log(`${testCount} validations completed successfully!`);
  }
}
validateAllExampleFiles().catch(console.error);
