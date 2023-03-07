const express = require("express");
const router = express.Router();
const repository = require("./postForum.repository");

router.post("/", async (request, response) => {
  try {
    const { post_text, updated_at, topic, author } = request.body;
    const newPost = await repository.createPost(
      post_text,
      updated_at,
      topic,
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
