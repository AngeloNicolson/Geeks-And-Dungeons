const express = require("express");
const app = express();
const cors = require("cors");
const postForumRouter = require("./forum/postForum.router");

// Middleware
app.use(cors());
app.use(express.json()); //req.body
// Function to serve all static files
// inside public directory.
app.use(express.static("public"));
app.use("/images", express.static("images"));

// ROUTES
app.use("/api/new-forum", postForumRouter);
app.use("/api/get-post", postForumRouter);

module.exports = app;
