const app = require("./app");
const path = require("path");

const port = process.env.PORT || 5000;

// Serve static files from the React app build folder
app.use(express.static(path.join(__dirname, "../client/build")));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
