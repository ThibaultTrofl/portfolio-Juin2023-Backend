const mongoose = require("mongoose");

const Degrees = mongoose.model("degrees", {
  degree: String,
  school: String,
  logo: Object,
  link: String,
  country: String,
  location: Object,
  startDate: String,
  endDate: String,
  missions: Array,
});

module.exports = Degrees;
