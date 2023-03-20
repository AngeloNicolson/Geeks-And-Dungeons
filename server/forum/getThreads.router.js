const express = require("express");
const router = express.Router();
const repository = require("./getThreads.repository");

router.get("/", async (request, response) => {
  try {
    const forumPosts = await repository.getThreads();
    return response.json(forumPosts);
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;
