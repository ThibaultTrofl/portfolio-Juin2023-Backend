const mongoose = require("mongoose");

const Aboutme = mongoose.model("data", {
  aboutme: {
    skills: Object,
    experiences: Object,
    studies: Object,
  },
});

module.exports = Aboutme;
