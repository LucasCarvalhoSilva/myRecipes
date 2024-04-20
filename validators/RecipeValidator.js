const Joi = require("joi")

const RecipeSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string()
        .required(),
    createdDate: Joi.date()
        .required(),
    category: Joi.string()
        .required(),
    ingredients: Joi.array()
        .required(),
    methodOfPreparation: Joi.array()
        .required()
})

module.exports = RecipeSchema