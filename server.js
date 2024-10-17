const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/index");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize.sync().then(()=>{
  console.log("Synce db");
}).catch((err)=>{
  console.log("Failed to sync db: " + err.message);
})

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZenLife API" });
});

const PORT = process.env.NODE_LOCAL_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
