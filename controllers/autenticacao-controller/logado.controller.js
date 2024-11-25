const jsonwebtoken = require("jsonwebtoken");
const KEY = "07805336a5e337707b14719921175f786a5cdb4b6ff2de3367b3a9b71a45516e";

exports.logado = async (req, res, next) => {
  Auth = req.cookie.Token || null;

  if (typeof Auth == "undefined" || Auth == "" || Auth == null) {
    return res.send({ erro: { login: "Não autorizado." } });
  } else {
    try {
      Token = await jsonwebtoken.verify(Auth, KEY);
      next();
    } catch (error) {
      return res.send({ erro: { login: "Não autorizado." } });
    }
  }
};
