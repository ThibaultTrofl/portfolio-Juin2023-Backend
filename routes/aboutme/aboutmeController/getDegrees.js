const Degrees = require("../../../models/Degrees.js");

async function getDegrees(req, res) {
  try {
    const response = await Degrees.find();
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

module.exports = { getDegrees };
