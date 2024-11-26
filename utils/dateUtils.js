const moment = require("moment");

function sumDate(data_inicio, duracao) {
  // Valida e converte a data_inicio para um objeto Moment
  const dataInicial = moment(data_inicio, "DD/MM/YYYY", true);
  if (!dataInicial.isValid()) {
    console.error("Data inválida fornecida:", data_inicio);
    return null; // Retorna nulo se a data for inválida
  }

  // Adiciona a duração e formata o resultado como DD/MM/YYYY
  const dataFinal = dataInicial.add(duracao, "days").format("DD/MM/YYYY");
  return dataFinal;
}

module.exports = {
  sumDate,
};
