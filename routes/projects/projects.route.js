const express = require("express");
const projects = express.Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const { getProjects } = require("./projectsController/getProjects.js");
const { postProjects } = require("./projectsController/postProjects.js");

projects.get("/projects", getProjects);
projects.post("/projects/add", fileUpload(), postProjects);

module.exports = projects;
