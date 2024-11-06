function sumDate(data_inicio, duracao) {
  // Converte data_inicio para um objeto Date
  const [dia, mes, ano] = data_inicio.split("/").map(Number);
  const dataInicial = new Date(ano, mes - 1, dia); // Mês é zero-indexado em JavaScript

  // Calcula a data_final adicionando a duração em dias
  const dataFinal = new Date(dataInicial);
  dataFinal.setDate(dataInicial.getDate() + duracao);

  // Formata o resultado para DD/MM/YYYY
  const diaFinal = String(dataFinal.getDate()).padStart(2, "0");
  const mesFinal = String(dataFinal.getMonth() + 1).padStart(2, "0"); // Mês é zero-indexado
  const anoFinal = dataFinal.getFullYear();
  const data_final = `${diaFinal}/${mesFinal}/${anoFinal}`;
  return data_final;
}

module.exports = {
  sumDate,
};
