const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized("Email or password is wrong");
  }
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  res
    .status(200)
    .json({ token, user: { email, subscription: user.subscription } });
  //   if (!user) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
  //   const passwordCompare = bcrypt.compareSync(password, user.password);
  //   if (!passwordCompare) {
  //     throw new Unauthorized("Email or password is wrong");
  //   }
};

module.exports = login;
