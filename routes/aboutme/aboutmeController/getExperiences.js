const Experiences = require("../../../models/Experiences.js");

async function getExperiences(req, res) {
  try {
    const response = await Experiences.find();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { getExperiences };
