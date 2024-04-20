const fileHelper = require('./helpers/fileHandler');
const fileName = 'recipes.txt';

// Service de exemplo
async function getRecipe() {
  try {
    const jsonData = await fileHelper.read(fileName);
    return jsonData;
  } catch (error) {
    return {};
  }
}

// Service de exemplo
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
