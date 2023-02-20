// const { User } = require("../../models");
// const { Unauthorized } = require("http-errors");
// const jwt = require("jsonwebtoken");

// const { SECRET_KEY } = process.env;

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(200).json({ email, subscription });
};

module.exports = getCurrent;
