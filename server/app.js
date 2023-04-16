const express = require("express");
const app = express();
const cors = require("cors");
const postThreadRouter = require("./forum/postThread.router");
const getThreadRouter = require("./forum/getThreads.router");

// Middleware
app.use(cors());
app.use(express.json()); //req.body
// Function to serve all static files
// inside public directory.
app.use(express.static("public"));
app.use("/images", express.static("images"));

// ROUTES
app.use("/api/new-thread", postThreadRouter);
app.use("/api/get-threads", getThreadRouter);

module.exports = app;
