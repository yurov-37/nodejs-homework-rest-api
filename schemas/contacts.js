const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min(4).max(100).required().email(),
  phone: Joi.string()
    .min(4)
    .max(20)
    .required()
    .pattern(/^(\+3|)[0-9]{10,11}$/),
});

module.exports = contactsSchema;
