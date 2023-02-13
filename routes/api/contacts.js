const express = require("express");
const router = express.Router();

const { contacts: ctrl } = require("../../controllers");
const { ctrlWrapper, addContactValidation } = require("../../middlewares");
// const {  } = require("../../middlewares");

router.get("/", ctrlWrapper(ctrl.getAllContacts));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById));

router.post("/", addContactValidation, ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteContactById));

router.put(
  "/:contactId",
  addContactValidation,
  ctrlWrapper(ctrl.uptadeContactById)
);

module.exports = router;
