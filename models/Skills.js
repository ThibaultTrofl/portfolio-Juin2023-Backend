const mongoose = require("mongoose");

const Skills = mongoose.model("skills", {
  skill: String,
  icon: Object,
});

module.exports = Skills;
