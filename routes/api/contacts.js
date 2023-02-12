const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { validation, ctrlWrapper } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

// const validateMiddleware = validation(contactSchema);

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactById));

router.put(
  "/:contactId",
  validation(contactSchema),
  ctrlWrapper(ctrl.uptadeContactById)
);

module.exports = router;
