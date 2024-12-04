const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./models/index");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synce db");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZenLife API" });
});

require("./routes/autenticacao.route")(app);
require("./routes/rotina.route")(app);
require("./routes/treino.route")(app);
require("./routes/usuario.route")(app);

const PORT = process.env.NODE_LOCAL_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
