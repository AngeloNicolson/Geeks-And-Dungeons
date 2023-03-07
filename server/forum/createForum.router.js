const express = require("express");
const router = express.Router();

router.post("/", async (request, response) => {
  try {
    const { post_text, created_at, updated_at, topic, author } = request.body;
    const newPost = await pool.query(
      `INSERT INTO post (post_text, created_at, updated_at, topic, author) VALUES($1 $2 $3 $4) 
      RETURNING post_id post_text, created_at, updated_at, topic, author`,
      [post_text, created_at, updated_at, topic, author]
    );

    response.json(newPost);
  } catch (err) {
    console.error(err.message);
  }
});

modules.export = router;
