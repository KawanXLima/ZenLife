const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./models/index");
const validarLogin = require("./controllers/autenticacao-controller/logado.controller");

const app = express();

app.use(cors());

app.use(cookieParser());

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

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to ZenLife API" });
});

require("./routes/autenticacao.route")(app);
require("./routes/rotina.route")(app.use("/api/rotina", validarLogin.logado));
require("./routes/treino.route")(app.use("/api/treino", validarLogin.logado));
require("./routes/usuario.route")(app);

const PORT = process.env.NODE_LOCAL_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
