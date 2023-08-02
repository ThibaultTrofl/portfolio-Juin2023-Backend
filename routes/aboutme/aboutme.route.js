const express = require("express");
const aboutmeRoute = express.Router();
const mongoose = require("mongoose");

require("dotenv").config();

const { getSkills } = require("./aboutmeController/getSkills.js");
const { getDegrees } = require("./aboutmeController/getDegrees.js");
const { getExperiences } = require("./aboutmeController/getExperiences.js");

aboutmeRoute.get("/aboutme/skills", getSkills);
aboutmeRoute.get("/aboutme/degrees", getDegrees);
aboutmeRoute.get("/aboutme/Experiences", getExperiences);

module.exports = aboutmeRoute;
