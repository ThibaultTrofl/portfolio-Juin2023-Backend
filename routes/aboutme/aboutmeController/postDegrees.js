const Degrees = require("../../../models/Degrees");
const convertToBase64 = require("../../../utils/convertToBase64");
const cloudinary = require("cloudinary").v2;

async function postDegrees(req, res) {
  try {
    const newDegrees = await new Degrees({
      degree: req.body.degree,
      school: req.body.school,
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
        4: req.body.missions4,
        5: req.body.missions5,
        6: req.body.missions6,
      },
    });

    const picture = await cloudinary.uploader.upload(
      convertToBase64(req.files.logo),
      {
        folder: `/Perso/Degrees/`,
      }
    );

    const urlPicture = picture.secure_url;

    newDegrees.logo = urlPicture;

    await newDegrees.save();

    return res.status(200).json({
      newDegrees,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { postDegrees };
