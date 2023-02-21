/*
Extracts the token from the header and:
1. Verifies the validity of the token (that is, that we issued it and it has not expired).
2. Extracts id from the token, finds the user in the database by id and attaches it to the request (req.user).
*/

/*
1. Extract the contents of the Authorization header from the request header.
2. Divide it into 2 words: bearer and token.
3. Check if the first word is "Bearer.
4. Check the validity of the second word (token).
5. If the token is valid, extract the id from it and find the user in the database with that id.
6. If we found a user with this id in the database, we need to attach it to the request (req object)

*/

const { User } = require("../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      throw new Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "Invalid sugnature") {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = auth;
