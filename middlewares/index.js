// const addContactValidation = require("./validation");
// const updateContactValidation = require("./validation");
// const updateContactFavoriteValidation = require("./validation");
// const {
//   //   addContactValidation,
//   //   updateContactFavoriteValidation,
//   //   updateContactValidation,
//   validation,
// } = require("./validation");

const validation = require("./validation");
const isValidId = require("./isValidId");
module.exports = {
  isValidId,
  validation,
};
