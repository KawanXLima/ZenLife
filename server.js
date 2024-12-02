const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const db = require("./models/index");
const validarLogin = require("./controllers/autenticacao-controller/logado.controller");
const { json } = require("sequelize");

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500',header: "origin, ContentType: application/json , accept",  credentials: true }));

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
