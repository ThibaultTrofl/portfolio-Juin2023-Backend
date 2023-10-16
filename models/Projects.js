const mongoose = require("mongoose");

const Projects = mongoose.model("Projets", {
  projectTitle: String,
  technologie: [{ type: mongoose.Schema.Types.ObjectId, ref: "skills" }],
  date: String,
  resume: String,
  linkFrontEnd: String,
  linkBackEnd: String,
  linkDeploy: String,
  environement: String,
  pictures: Array,
});

module.exports = Projects;
