const Skills = require("../../../models/Skills");
const convertToBase64 = require("../../../utils/convertToBase64");
const cloudinary = require("cloudinary").v2;

async function postSkills(req, res) {
  try {
    const newSkill = await new Skills({
      skill: req.body.skill,
    });

    const picture = await cloudinary.uploader.upload(
      convertToBase64(req.files.icon),
      {
        folder: `/Perso/Skills/`,
      }
    );

    const urlPicture = picture.secure_url;

    newSkill.icon = urlPicture;

    await newSkill.save();

    return res.status(200).json({
      newSkill,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { postSkills };
