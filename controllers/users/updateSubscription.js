const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { subscription } = req.body;
  console.log(subscription);

  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!updatedUser) {
    throw createError(404, `Contact with id ${_id} not found`);
  }
  res.json({
    status: "succsess",
    code: 200,
    data: updatedUser,
  });
};

module.exports = updateSubscription;
