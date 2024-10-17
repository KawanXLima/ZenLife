const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZenLife API" });
});

const PORT = process.env.NODE_LOCAL_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
