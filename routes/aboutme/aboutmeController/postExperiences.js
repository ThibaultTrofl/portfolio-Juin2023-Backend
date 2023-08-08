const Experiences = require("../../../models/Experiences");
const convertToBase64 = require("../../../utils/convertToBase64");
const cloudinary = require("cloudinary").v2;

async function postExperiences(req, res) {
  try {
    const newExperiences = await new Experiences({
      jobTitle: req.body.jobTitle,
      company: req.body.company,
      link: req.body.link,
      country: req.body.country,
      location: {
        city: req.body.city,
        latitute: req.body.latitude,
        longitude: req.body.longitude,
      },
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      missions: {
        1: req.body.missions1,
        2: req.body.missions2,
        3: req.body.missions3,
      },
    });

    const picture = await cloudinary.uploader.upload(
      convertToBase64(req.files.logo),
      {
        folder: `/Perso/Experiences/`,
      }
    );

    const urlPicture = picture.secure_url;

    newExperiences.logo = urlPicture;

    await newExperiences.save();

    return res.status(200).json({
      newExperiences,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { postExperiences };
