const express = require("express");
const router = express.Router();
const { validation, auth, upload } = require("../../middlewares");
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

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch(
  "/",
  auth,
  validation(userSchemas.joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  // validation(userSchemas.joiUpdateSubscriptionSchema),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
