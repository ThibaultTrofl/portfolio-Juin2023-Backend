const express = require("express");
const projects = express.Router();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

require("dotenv").config();

const { getProjects } = require("./projectsController/getProjects.js");
const { getProjectsId } = require("./projectsController/getProjectsId.js");

const {
  getProjectsFilter,
} = require("./projectsController/getProjectsFilter.js");
const { postProjects } = require("./projectsController/postProjects.js");

projects.get("/projects/all", getProjects);
projects.get("/projects/:id", getProjectsId);
projects.get("/projects/filter", getProjectsFilter);
projects.post("/projects/add", fileUpload(), postProjects);

module.exports = projects;
