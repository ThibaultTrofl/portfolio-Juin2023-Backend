const Projects = require("../../../models/Projects.js");

async function getProjects(req, res) {
  try {
    // Set of Techno To show in filter
    const allResponse = await Projects.find().populate("technologie");
    let selectTechno = [];
    const lengthOfResponse = allResponse.length;
    for (i = 0; i < lengthOfResponse; i++) {
      const arrayOfTechnOfFromResponse = allResponse[i].technologie.length;
      for (a = 0; a < arrayOfTechnOfFromResponse; a++) {
        if (!selectTechno.includes(allResponse[i].technologie[a])) {
          selectTechno.push(allResponse[i].technologie[a]);
        }
      }
    }

    // Set of Environnement To show in filter
    let selectEnvir = [];
    for (i = 0; i < lengthOfResponse; i++) {
      if (!selectEnvir.includes(allResponse[i].environement)) {
        selectEnvir.push(allResponse[i].environement);
      }
    }

    const response = await Projects.find()
      .populate("technologie")
      .sort({ date: "desc" });

    return res.status(200).json({
      response,
      selectTechno,
      selectEnvir,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { getProjects };
