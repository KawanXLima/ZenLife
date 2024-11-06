const db = require("../../models/index");
const Usuario = db.usuario;

exports.create = async (req, res) => {
  const { nome, login, senha, data_nasc, genero } = req.body;

  if (!nome || !login || !senha || !data_nasc || !genero) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }
  const usuario = {
    nome: nome,
    login: login,
    senha: senha,
    data_nasc: data_nasc,
    genero: genero,
  };

  try {
    const result = await Usuario.create(usuario);
    if (!result) {
      return res.status(400).send({
        message: "Content can not be empty! Please fill all the fields.",
      });
    }
    return res.send({ data: true });
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while generating the usuario.",
      error: error.message,
    });
  }
};
