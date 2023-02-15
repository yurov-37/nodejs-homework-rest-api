const createError = require("http-errors");
const { Contact } = require("../../models");

const uptadeContactById = async (req, res) => {
  // if (!req.body) {
  //   throw createError(400, "missing fields"); //  dont work????
  // }
  const { contactId } = req.params;
  const updatedСontact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedСontact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "succsess",
    code: 200,
    data: updatedСontact,
  });
};

module.exports = uptadeContactById;
