const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email ${email} is already in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "website registration confirmation",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Click to confirm email</a>`,
  };

  await sendEmail(mail);
  res.status(201).json({
    user: { email, subscription: newUser.subscription, avatarURL, mail },
  });
};

module.exports = register;
