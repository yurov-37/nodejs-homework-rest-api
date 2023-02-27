const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

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
    const img = await jimp.read(tmpUpload);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tmpUpload);

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
