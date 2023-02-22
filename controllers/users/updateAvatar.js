const { User } = require("../../models");
const path = require("path");
const fs = require("fs").promises;

const updateAvatar = async (req, res) => {
  const { path: tmpUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const uniqName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(
      __dirname,
      "../../",
      "public",
      "avatars",
      uniqName
    );
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", uniqName);
    await User.findByIdAndUpdate(id, { avatarURL });
    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    throw error;
  }
};

module.exports = updateAvatar;
