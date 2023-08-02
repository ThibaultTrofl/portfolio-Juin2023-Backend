const mongoose = require("mongoose");

const Experiences = mongoose.model("Experiences", {
  jobTitle: String,
  company: String,
  logo: Object,
  country: String,
  location: Object,
  startDate: String,
  endDate: String,
  missions: String,
});

module.exports = Experiences;
