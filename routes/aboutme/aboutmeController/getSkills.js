const Skills = require("../../../models/Skills");

async function getSkills(req, res) {
  try {
    const response = await Skills.find();
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

module.exports = { getSkills };
