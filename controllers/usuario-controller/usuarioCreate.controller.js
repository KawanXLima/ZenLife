const bcrypt = require("bcrypt");
const db = require("../../models/index");
const Usuario = db.usuario;

exports.create = async (req, res) => {
  const { nome, login, senha, senha2, data_nasc, genero } = req.body;

  if (!nome || !login || !senha || !senha2 || !data_nasc || !genero) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  if (senha !== senha2) {
    return res.status(400).json({ message: "As senhas não coincidem." });
  }

  try {
    const usuarioExistente = await Usuario.findOne({ where: { login } });
    if (usuarioExistente) {
      return res.status(400).json({ message: "Usuário já existe." });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await Usuario.create({
      nome,
      login,
      senha: senhaHash,
      data_nasc,
      genero,
    });

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso.", usuario: novoUsuario });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro ao processar a solicitação.",
      error: error.message,
    });
  }
};
