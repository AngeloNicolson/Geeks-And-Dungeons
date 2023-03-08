const express = require("express");
const router = express.Router();
const repository = require("./postForum.repository");

// Get second opinion on where to put try catch in repository or router.
router.post("/", async (request, response) => {
  try {
    const { post_text, updated_at, topic_id, author } = request.body;
    const newPost = await repository.createPost(
      post_text,
      updated_at,
      topic_id,
      author
    );
    return response.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
});

router.get("/", async (request, response) => {
  try {
    const forumPosts = await repository.getAllForumPosts();
    return response.json(forumPosts);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
