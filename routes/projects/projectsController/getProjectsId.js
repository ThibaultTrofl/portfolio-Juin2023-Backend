const Projects = require("../../../models/Projects.js");

async function getProjectsId(req, res) {
  try {
    console.log(req.params);
    const response = await Projects.findById(req.params.id).populate(
      "technologie"
    );
    // console.log(response.environement);
    const similarEnvir = await Projects.find({
      environement: response.environement,
    })
      .populate("technologie")
      .sort({ date: "desc" });
    console.log(response);
    return res.status(200).json({
      response,
      similarEnvir,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { getProjectsId };
