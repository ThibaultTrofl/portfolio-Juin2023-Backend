const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;

require("dotenv").config();

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

mongoose.connect(process.env.MONGODB_URI);

const aboutMeRoutes = require("./routes/aboutme/aboutme.route.js");
app.use(aboutMeRoutes);

const projectsRoutes = require("./routes/projects/projects.route.js");
app.use(projectsRoutes);

app.get("/", (req, res) => {
  res.json("Ok");
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found 😢" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started 🚀");
});
