const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Joi = require("joi");

const contactsOperations = require("../../models/contacts");

const contactsSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string().min(4).max(100).required().email(),
  phone: Joi.string()
    .min(4)
    .max(20)
    .required()
    .pattern(/^(\+3|)[0-9]{10,11}$/),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({ status: "succsess", code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      throw createError(404, `Contact with id ${contactId} not found`);
    }
    res.json({ status: "succsess", code: 200, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({ status: "succsess", code: 201, data: newContact });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {});

module.exports = router;
