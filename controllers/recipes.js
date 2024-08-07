const recipes = require('../models/recipe');
const recipeService = require('../services/recipe');
const crypto = require('crypto')
var RecipeSchema = require("../validators/RecipeValidator")
const Joi = require("joi");


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
  const {error, value} = RecipeSchema.validate(req.body)
  
  if(error) {
    return res.end(JSON.stringify(error))
  }

  data = value

  recipes.create(crypto.randomUUID(), data)
  
  console.log("Recitas salvas", recipes.getRecipes())
  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function deleteRecipe(req, res) {
  const {id} = req.params

  if(!idIsvalidated(id)) {
    return res.sendStatus(500).end(JSON.stringify(error))
  }
  recipes.delete(id)

  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function searchRecipe(req, res) {
  const {id} = req.params

  if(!idIsvalidated(id)) {
    return res.sendStatus(500).end("") //JSON.stringify(error)
  }
  const recipeFound = await recipes.search(id)
  console.log(recipeFound)
  res.end(JSON.stringify(recipeFound))
}


async function readAllRecipe(req, res) {
  try {
    const data = await recipeService.getRecipe();
    if (Object.keys(data).length === 0) {
      return res.end("");
    }
    const jsonData = JSON.stringify(data);
    res.end(jsonData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
}


async function editRecipe(req, res) {
  const {error, value} = RecipeSchema.validate(req.body)
  if(error) {
    return res.status(500).end(JSON.stringify(error))
  } 
  const data = value
  
  const {id} = req.params
  if(!idIsvalidated(id)) {
    return res.status(500).end(JSON.stringify(error)) //error nao existe
  }
  if (!recipes.search(id)) {
    console.log("undef");
  }
  recipes.update(id,data)
  const recipeSaved = await recipeService.setRecipe(JSON.stringify(recipes.getRecipes()))

  recipeSaved ? res.sendStatus(200) : res.sendStatus(500);
}

async function readByCategory(req, res) {
  const {category} = req.params
  console.log("here");
  try {
    const data = await recipeService.getRecipe()
    if (Object.keys(data).length === 0) {
      return res.end("")
    }
    let allRecipes =  JSON.parse(data)
    let sortedRecipes = allRecipes.filter(recipe => recipe.category == category)
    console.log(sortedRecipes);
    res.end(JSON.stringify(sortedRecipes)) 
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

async function sortByDate(req, res) {
  try {
    const data = await recipeService.getRecipe()
    if (Object.keys(data).length === 0) {
      return res.end("")
    }
    let allRecipes =  JSON.parse(data)
    allRecipes.sort((a,b) => {
      return b.createdDate - a.createdDate
    })
    res.end(JSON.stringify(allRecipes)) 
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
}

function idIsvalidated(id) {
  const {error} = Joi.string().min(20).validate(id);
  if(error) {
    return false
  }
  return true
}

module.exports = {createRecipe, searchRecipe, deleteRecipe, editRecipe, readAllRecipe, readByCategory, sortByDate};
