const express = require("express");
const app = express();
const path = require("path");
const port = 8080;

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./public/views");

// app configuration
app.use(express.static(path.join(__dirname, "public")));

// Home page router
app.get("/", (req, res) => {
  res.status(200);
  res.render("index");
});

// About page router
app.get("/about", (req, res) => {
  res.status(200);
  res.render("about");
});

// Contact page router
app.get("/contact-me", (req, res) => {
  res.status(200);
  res.render("contact-me");
});

// Middleware
app.use((req, res, next) => {
  res.status(404);
  res.render("404");
});

app.listen(port);
