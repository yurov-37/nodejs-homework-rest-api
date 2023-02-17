const { User } = require("../../models");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} is already in use`);
  }
  const newUser = await User.create({ email, password });

  res.status(201).json({ user: { email, subscription: newUser.subscription } });
};

module.exports = register;
