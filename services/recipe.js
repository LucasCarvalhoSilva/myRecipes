const fileHelper = require('./helpers/fileHandler');
const fileName = 'recipes.txt';

// Service de exemplo
async function getTest() {
  try {
    const jsonData = await fileHelper.read(fileName);
    return jsonData;
  } catch (error) {
    return {};
  }
}

// Service de exemplo
async function setTest(data) {
  try {
    await fileHelper.write(fileName, data);
    return true;
  } catch (error) {
    console.error('Error: services/recipe/setTest()', error.message);
    return false;
  }
}

module.exports = { getTest, setTest };
