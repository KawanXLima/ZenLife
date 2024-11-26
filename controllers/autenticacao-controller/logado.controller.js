const jsonwebtoken = require("jsonwebtoken");
const KEY = process.env.JWT_SECRET;

exports.logado = async (req, res, next) => {
  try {
    // Obter o token dos cookies
    const auth = req.cookies?.Token;

    // Validar se o token está presente
    if (!auth) {
      return res.status(401).json({ erro: { login: "Não autorizado. Token ausente." } });
    }

    // Verificar o token
    const token = await jsonwebtoken.verify(auth, KEY);

    // Adicionar o payload do token no request para uso futuro
    req.user = token;

    // Passar para o próximo middleware
    next();
  } catch (error) {
    return res.status(401).json({ erro: { login: "Não autorizado. Token inválido." } });
  }
};
