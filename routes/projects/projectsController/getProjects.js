const Projects = require("../../../models/Projects.js");

async function getProjects(req, res) {
  try {
    let startDate = Date.parse("01 Jan 1970 00:00:00 GMT");
    if (req.query.dateMin) {
      startDate = Number(req.query.dateMin);
    }

    let endDate = Date.parse(new Date());
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
    const arrayOfTechno = [];
    let selectTechno = [];
    const lengthOfResponse = allResponse.length;
    for (i = 0; i < lengthOfResponse; i++) {
      const arrayOfTechnOFromResponse = allResponse[i].technologie.length;
      for (a = 0; a < arrayOfTechnOFromResponse; a++) {
        if (!arrayOfTechno.includes(allResponse[i].technologie[a])) {
          arrayOfTechno.push(allResponse[i].technologie[a]);
        }
        if (!selectTechno.includes(allResponse[i].technologie[a])) {
          selectTechno.push(allResponse[i].technologie[a]);
        }
      }
    }

    if (req.query.techno) {
      selectTechno = req.query.techno;
    }
    // console.log(selectTechno.map((item) => item._id));
    const response = await Projects.find({
      // date: { $lte: endDate, $gte: startDate },
      technologie: { $in: selectTechno.map((item) => item._id) },
    }).populate("technologie");

    console.log(response);

    return res.status(200).json({
      response,
      arrayOfTechno,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { getProjects };
