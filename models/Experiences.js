const mongoose = require("mongoose");

const Experiences = mongoose.model("Experiences", {
  jobTitle: String,
  company: String,
  link: String,
  logo: Object,
  country: String,
  location: Object,
  startDate: String,
  endDate: String,
  missions: Array,
});

module.exports = Experiences;
