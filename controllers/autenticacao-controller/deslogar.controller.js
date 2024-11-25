exports.deslogar = (req, res) => {
  // Limpa o cookie "Token"
  res.clearCookie("Token");

  // Envia uma resposta de confirmação
  return res.status(200).json({ message: "Logout realizado com sucesso." });
};
