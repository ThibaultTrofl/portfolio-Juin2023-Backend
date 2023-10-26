const Projects = require("../../../models/Projects.js");
const Skills = require("../../../models/Skills.js");

async function getProjectsFilter(req, res) {
  try {
    let startDate = Number(Date.parse("01 Jan 1970 00:00:00 GMT"));
    if (req.query.dateMin) {
      startDate = Number(req.query.dateMin);
    }

    let endDate = Number(Date.parse(new Date()));
    if (req.query.dateMax) {
      endDate = Number(req.query.dateMax);
    }

    if (startDate > endDate) {
      return res
        .status(400)
        .json({ message: "Low Date can not be upper than Max Date" });
    }

    // Set of Techno To show in filter
    const allResponse = await Projects.find().populate("technologie");
    const lengthOfResponse = allResponse.length;
    let selectTechno = [];
    if (req.query.techno) {
      const technoString = req.query.techno.split(",");
      for (i = 0; i < technoString.length; i++) {
        const idTechno = await Skills.findOne({ skill: technoString[i] });
        selectTechno.push(idTechno);
      }
    } else {
      for (i = 0; i < lengthOfResponse; i++) {
        const arrayOfTechnOfFromResponse = allResponse[i].technologie.length;
        for (a = 0; a < arrayOfTechnOfFromResponse; a++) {
          if (!selectTechno.includes(allResponse[i].technologie[a])) {
            selectTechno.push(allResponse[i].technologie[a]);
          }
        }
      }
    }

    let selectEnvir = [];
    if (req.query.environnement) {
      selectEnvir = req.query.environnement.split(",");
    } else {
      for (i = 0; i < lengthOfResponse; i++) {
        if (!selectEnvir.includes(allResponse[i].environement)) {
          selectEnvir.push(allResponse[i].environement);
        }
      }
    }

    const response = await Projects.find({
      date: { $lte: Number(endDate), $gte: Number(startDate) },
      technologie: { $in: selectTechno.map((item) => item._id) },
      environement: { $in: selectEnvir.map((item) => item) },
    }).populate("technologie");

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

module.exports = { getProjectsFilter };
