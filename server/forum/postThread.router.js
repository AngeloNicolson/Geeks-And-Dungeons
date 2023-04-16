const express = require("express");
const router = express.Router();
const repository = require("./postThread.repository");

// Get second opinion on where to put try catch in repository or router.
router.post("/", async (request, response) => {
  try {
    const { thread_title, thread_text, updated_at, topic_id, author } =
      request.body;
    const newPost = await repository.createThread(
      thread_title,
      thread_text,
      updated_at,
      topic_id,
      author
    );
    return response.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
