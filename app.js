const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Set views directory

// Import routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

// Start server
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
