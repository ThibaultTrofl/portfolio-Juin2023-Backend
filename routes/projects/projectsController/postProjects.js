const Projects = require("../../../models/Projects");
const convertToBase64 = require("../../../utils/convertToBase64");
const cloudinary = require("cloudinary").v2;
const Skills = require("../../../models/Skills");

async function postProjects(req, res) {
  try {
    const newProjects = await new Projects({
      projectTitle: req.body.projectTitle,
      date: req.body.date,
      resume: req.body.resume,
      linkFrontEnd: req.body.linkFrontEnd,
      linkFrontEnd: req.body.linkFrontEnd,
      linkDeploy: req.body.linkDeploy,
      environement: req.body.environement,
    });

    const technologies = req.body.technologie;
    if (req.body !== null && technologies.length > 0) {
      let arrayTechnoToSave = [];
      for (i = 0; i < technologies.length; i++) {
        const skill = await Skills.findOne({ skill: technologies[i] });
        arrayTechnoToSave.push(skill);
      }
      newProjects.technologie = arrayTechnoToSave;
    }
    console.log(req.files.pictures.length);
    if (req.files !== null && req.files.pictures.length > 0) {
      let urlToPush = [];
      const picturesToUpload = req.files.pictures;
      const arrayOfPromises = picturesToUpload.map((picture) => {
        return cloudinary.uploader.upload(convertToBase64(picture), {
          folder: `/Perso/Projects/${req.body.projectTitle}`,
        });
      });
      console.log(await Promise.all(arrayOfPromises));
      let result = await Promise.all(arrayOfPromises);
      for (i = 0; i < result.length; i++) {
        urlToPush.push(result[i].secure_url);
      }
      console.log(urlToPush);
      newProjects.pictures = urlToPush;
      await newProjects.save();
    } else {
      newProjects.save();
    }

    return res.status(200).json({
      newProjects,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
}

module.exports = { postProjects };
