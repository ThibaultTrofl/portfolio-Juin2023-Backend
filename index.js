const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI);

const aboutMeRoutes = require("./routes/aboutme/aboutme.route.js");
app.use(aboutMeRoutes);

app.get("/", (req, res) => {
  res.json("Ok");
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found 😢" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀");
});
