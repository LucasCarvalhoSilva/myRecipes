const recipes = require('../models/recipe');
const recipeService = require('../services/recipe');
const crypto = require('crypto')

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

async function createRecipe(req, res) {
  
  data = req.body

  recipes.create(crypto.randomUUID(), data)
  
  console.log("Recitas salvas", recipes.getRecipes())
  const recipeSaved = await recipeService.setTest(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function deleteRecipe(req, res) { 
  res.sendStatus(200)
}

async function searchRecipe(req, res) {
  res.sendStatus(200)
}


async function readAllRecipe(req, res) {
  res.sendStatus(200)
}


async function editRecipe(req, res) {
  res.sendStatus(200)
}

module.exports = { getTest, setTest, createRecipe, searchRecipe, deleteRecipe, editRecipe, readAllRecipe };
