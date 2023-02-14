// const contactsOperations = require("../../models/contacts");
const { Contact } = require("../../models");

// const getAllContacts = async (req, res) => {
//   const contacts = await contactsOperations.listContacts();
//   res.json({ status: "succsess", code: 200, data: { contacts } });
// };

const getAllContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json({ status: "succsess", code: 200, data: contacts });
};

module.exports = getAllContacts;
