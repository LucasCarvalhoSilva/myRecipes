const Joi = require("joi")

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
    .min(6)
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$')) //um número, um símbolo e uma letra maiúscula
    .required()
})
  
module.exports = userSchema