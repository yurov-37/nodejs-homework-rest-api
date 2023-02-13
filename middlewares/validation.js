const Joi = require("joi");

const addContactValidation = (req, res, next) => {
  const contactsSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().min(4).max(100).required().email(),
    phone: Joi.string()
      .min(4)
      .max(20)
      .required()
      .pattern(/^(\+3|)[0-9]{10,11}$/),
  });

  const { error } = contactsSchema.validate(req.body);
  if (error) {
    error.status = 400;
    next(error);
  }

  next();
};

module.exports = addContactValidation;

// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       next(error);
//     }
//     next();
//   };
// };
