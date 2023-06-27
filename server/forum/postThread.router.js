const express = require("express");
const router = express.Router();
const repository = require("./postThread.repository");
const Joi = require("joi");

const queryValidationMiddleware = require("../middleware/queryValidationMiddleware");

/*
----------------------------------
     JOI VALIDATION SCHEMA
----------------------------------
*/
const createThreadSchema = Joi.object({
  thread_title: Joi.string().required(),
  thread_text: Joi.string().required(),
  updated_at: Joi.date(),
  topic_id: Joi.number().required(),
  author: Joi.string().required(),
  accessToken: Joi.string().required(),
});

/*
----------------------------------
           ROUTERS
----------------------------------
*/
router.post(
  "/",
  queryValidationMiddleware(createThreadSchema),
  async (request, response) => {
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
      if (error.status && error.status === 400) {
        return response.status(400).json({ error: error.message });
      } else {
        console.error(error);
        return response.status(500).json({ error: "Internal Server Error" });
      }
    }
  }
);

module.exports = router;
