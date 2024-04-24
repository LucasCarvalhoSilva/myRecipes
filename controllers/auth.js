const user = require('../models/user')
var loginSchema = require("../validators/LoginValidator")

const validateUser = (user) => {
  const { error, value } = loginSchema.validate(user, { abortEarly: false }) //lista completa dos erros
  if (error) {
    return { type: "error", data: error.details.map((detail) => detail.message) } //array com as mensagens de erro
  }
  return { type: "value", data: value }
}

async function login(req, res) {
  const result = validateUser(req.body)

  if (result.type == "error") {
    return res.status(500).send(result.data)
  }

  let users = await user.getAll()

  let existing = users.find(user => user.email == result.data.email)
  if (!existing) {
    return res.status(500).send("Usuário não encontrado.")
  }

  if (existing.password != result.data.password) {
    return res.status(500).send("Senha incorreta.")
  }

  req.session.user = existing
  req.session.logged = true
  // res.redirect("/login")
  res.status(200).send("session: "+ JSON.stringify(req.session))
}

async function logout(req, res) {
  console.log("invoked");
  req.session.logged = false
  res.clearCookie("connect.sid")
  // res.redirect("/login")
  res.status(200).send("session ended")
}

module.exports = { login, logout }