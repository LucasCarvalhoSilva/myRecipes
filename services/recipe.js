const fileHelper = require('./helpers/fileHandler');
const fileName = 'recipes.txt';

async function getRecipe() {
  try {
    let jsonData = await fileHelper.read(fileName);

    if (Object.keys(jsonData).length === 0) {
      console.warn('Warning: Empty or incomplete JSON data. Returning empty object.');
      return {};
    }

    return jsonData;
  } catch (error) {
    console.error('Error: services/recipe/getRecipe()', error.message);
    return {};
  }
}

async function setRecipe(data) {
  try {
    await fileHelper.write(fileName, data);
    return true;
  } catch (error) {
    console.error('Error: services/recipe/setRecipe()', error.message);
    return false;
  }
}

module.exports = { getRecipe, setRecipe };