const express = require("express");
const router = express.Router();
const repository = require("./getThreads.repository");

router.get("/:id", async (request, response, next) => {
  try {
    const forumPosts = await repository.getSingleThread();
    return response.json(forumPosts);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

router.get("/", async (request, response, next) => {
  try {
    const forumPosts = await repository.getThreads();
    return response.json(forumPosts);
  } catch (error) {
    console.error(error.message);
    next(error);
  }
});

module.exports = router;
