const express = require("express");
const router = express.Router();
const { validation } = require("../../middlewares");
const { ctrlWrapper } = require("../../helpers");
const { userSchemas } = require("../../models/user");
const { users: ctrl } = require("../../controllers");

router.post(
  "/signup",
  validation(userSchemas.joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validation(userSchemas.joiLoginSchema),
  ctrlWrapper(ctrl.login)
);

module.exports = router;