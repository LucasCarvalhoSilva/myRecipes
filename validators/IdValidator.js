const Joi = require("joi")

const idSchema = Joi.string().length(36);
  
module.exports = idSchema