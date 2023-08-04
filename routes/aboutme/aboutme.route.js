const express = require("express");
const aboutmeRoute = express.Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const { getSkills } = require("./aboutmeController/getSkills.js");
const { getDegrees } = require("./aboutmeController/getDegrees.js");
const { getExperiences } = require("./aboutmeController/getExperiences.js");
const { postSkills } = require("./aboutmeController/postSkills.js");

aboutmeRoute.get("/aboutme/skills", getSkills);
aboutmeRoute.get("/aboutme/degrees", getDegrees);
aboutmeRoute.get("/aboutme/Experiences", getExperiences);
aboutmeRoute.post("/aboutme/skills/add", fileUpload(), postSkills);

module.exports = aboutmeRoute;
