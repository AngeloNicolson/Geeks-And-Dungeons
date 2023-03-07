app.post("/", async (request, response) => {
  try {
    const { title } = request.body;
    const newTopic = await pool.query("INSERT INTO topic (title) VALUES($1)", [
      title,
    ]);

    response.json(newTopic);
  } catch (err) {
    console.error(err.message);
  }
});
