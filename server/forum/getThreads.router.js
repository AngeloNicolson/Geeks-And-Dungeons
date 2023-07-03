const express = require("express");
const router = express.Router();
const repository = require("./getThreads.repository");

router.get("/:id", async (request, response, next) => {
  try {
    const { id } = request.params;
    const forumPost = await repository.getSingleThread(id);
    return response.json(forumPost);
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
