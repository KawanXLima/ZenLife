const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../../models/index");
const Usuario = db.usuario;

// Substitua "KEY" pela sua chave secreta
const KEY = process.env.JWT_SECRET;

exports.logar = async (req, res) => {
  const { login, senha } = req.body;

  // Verificação de campos obrigatórios
  if (!login || !senha) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    // Busca o usuário pelo login
    const usuario = await Usuario.findOne({ where: { login } });
    if (!usuario) {
      return res.status(401).json({ message: "Login ou senha inválidos." });
    }

    // Verifica a senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Login ou senha inválidos." });
    }

    // Gera o token JWT
    const token = jsonwebtoken.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        login: usuario.login,
      },
      KEY,
      { expiresIn: "1h" } // Expiração do token em 1 hora
    );

    // Envia o token como um cookie e na resposta
    res.cookie("Token", token);
    return res
      .status(200)
      .json({ message: "Login realizado com sucesso.", token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Ocorreu um erro ao processar a solicitação.",
      error: error.message,
    });
  }
};
