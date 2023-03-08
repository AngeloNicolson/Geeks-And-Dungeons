const express = require("express");
const app = express();
const cors = require("cors");
const postForumRouter = require("./forum/postForum.router");

// Middleware
app.use(cors());
app.use(express.json()); //req.body

// ROUTES
app.use("/api/new-forum", postForumRouter);
app.use("/api/get-post", postForumRouter);

module.exports = app;
