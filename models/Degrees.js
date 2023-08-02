const mongoose = require("mongoose");

const Degrees = mongoose.model("degrees", {
  degree: String,
  school: String,
  logo: Object,
  country: String,
  location: Object,
  startDate: String,
  endDate: String,
  missions: String,
});

module.exports = Degrees;
