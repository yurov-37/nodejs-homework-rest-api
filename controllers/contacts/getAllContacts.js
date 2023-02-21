const { Contact } = require("../../models");

const getAllContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite = false } = req.query;

  const skip = (page - 1) * limit;
  const contacts = await Contact.find(
    { owner: _id, favorite },
    "-createdAt -updatedAt",
    {
      skip,
      limit: +limit,
    }
  ).populate("owner", "_id email");
  res.json({ status: "succsess", code: 200, data: contacts });
};

module.exports = getAllContacts;
