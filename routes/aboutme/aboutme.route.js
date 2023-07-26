const express = require("express");
const aboutmeRoute = express.Router();
const mongoose = require("mongoose");
const Aboutme = require("../../models/Aboutme.js");

require("dotenv").config();

aboutmeRoute.get("/aboutme", async (req, res) => {
  try {
    console.log("oui");
    const response = await Aboutme.find();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal Server Error" });
  }
});

module.exports = aboutmeRoute;
