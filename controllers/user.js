const user = require('../models/user')
var userSchema = require("../validators/UserValidator")
var idSchema = require("../validators/IdValidator")
const Joi = require("joi")


/* 
// Controller de exemplo
async function getTest(req, res) {
  const data = await recipeService.getTest()
  res.render('recipe/home', data)
}

// Controller de exemplo
async function setTest(req, res) {
  const data = req.body
  const isDataSaved = await recipeService.setTest(data)
  if (isDataSaved) {
    const data = await recipeService.getTest()
    res.render('recipe/home', data)
  } else {
    res.sendStatus(500)
  }
}
*/

const validateUser = (user) => {
  const { error, value } = userSchema.validate(user, { abortEarly: false }) //lista completa dos erros
  if (error) {
    return { type: "error", data: error.details.map((detail) => detail.message) } //array com as mensagens de erro
  }
  return { type: "value", data: value }
}

async function createUser(req, res) {
  const result = validateUser(req.body)

  if (result.type == "error") {
    return res.status(500).send(result.data)
  }

  let users = await user.getAll()

  let existing = users.find(user => user.email == result.data.email)
  if (existing) {
    return res.status(500).send("Já existe usuário com esse endereço de email.")
  }

  user.create(result.data)
  // res.render('recipe/home', data)
  res.status(200).send("OK")
}

async function updateUser(req, res) {
  const result = validateUser(req.body)

  if (result.type == "error") {
    return res.status(500).send(result.data)
  }
  const {id} = req.params

  let users = await user.getAll()
  const index = users.findIndex(oldUser => oldUser.id === id)
  if (index == -1) {
    return res.status(500).send("Usuário não encontrado.")
  }

  user.update(id, result.data)
  // res.render('recipe/home', data)
  res.status(200).send("OK")
}

async function deleteUser(req, res) {
  const {id} = req.params

  const result = idSchema.validate(id)
  if (result.error !== undefined) {
    return res.status(500).send(result.error.details[0].message)
  }


  let users = await user.getAll()
  console.log("get all\n", users)
  const index = users.findIndex(user => user.id === id)
  if (index == -1) {
    return res.status(500).send("Usuário não encontrado.")
  }

  user.delete(id)
  // res.render('recipe/home', data)
  res.status(200).send("OK")
}

async function searchUser(req, res) {
  const {id} = req.params

  const result = idSchema.validate(id)
  if (result.error !== undefined) {
    return res.status(500).send(result.error.details[0].message)
  }

  let users = await user.getAll()

  let userSearched = users.find(user => user.id == id)
  if (!userSearched) {
    return res.status(500).send("Usuário não encontrado.")
  }

  const userFound = await user.search(id)
  // res.render('recipe/home', data)
  res.status(200).send(userFound)
}

async function getAllUsers(req, res) {
  let users = await user.getAll()

  if (users.length == 0) {
    return res.status(500).send("Nenhum usuário criado.")
  }
  // res.render('recipe/home', data)
  res.status(200).send(users)
}

module.exports = { createUser, updateUser, deleteUser, searchUser, getAllUsers }