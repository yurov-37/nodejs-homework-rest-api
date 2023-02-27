const validation = require("./validation");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  isValidId,
  validation,
  auth,
  upload,
};
