const recipes = require('../models/recipe');
const recipeService = require('../services/recipe');
const crypto = require('crypto')

/* 
// Controller de exemplo
async function getTest(req, res) {
  const data = await recipeService.getTest();
  res.render('recipe/home', data);
}

// Controller de exemplo
async function setTest(req, res) {
  const data = req.body;
  const isDataSaved = await recipeService.setTest(data);
  if (isDataSaved) {
    const data = await recipeService.getTest();
    res.render('recipe/home', data);
  } else {
    res.sendStatus(500);
  }
}
*/
async function createRecipe(req, res) {
  data = req.body

  recipes.create(crypto.randomUUID(), data)
  
  console.log("Recitas salvas", recipes.getRecipes())
  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function deleteRecipe(req, res) {
  const {id} = req.params
  recipes.delete(id)

  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function searchRecipe(req, res) {
  const {id} = req.params

  const recipeFound = await recipes.search(id)
  console.log(recipeFound)
  res.end(JSON.stringify(recipeFound))
}


async function readAllRecipe(req, res) {
  
  const data = await recipeService.getRecipe();
  res.end(data)
}


async function editRecipe(req, res) {
  const {id} = req.params
  const data = req.body

  recipes.update(id,data)
  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

module.exports = {createRecipe, searchRecipe, deleteRecipe, editRecipe, readAllRecipe };
