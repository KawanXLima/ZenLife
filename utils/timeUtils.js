function formatTime(value) {
  let hours, minutes;

  if (value < 60) {
    // Considera que o valor representa minutos
    hours = 0;
    minutes = value;
  } else {
    // Considera que o valor representa horas
    hours = Math.floor(value / 60);
    minutes = value % 60;
  }

  // Formata o tempo para o padrão HH:MM:SS
  const formattedTime =
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0") +
    ":00";

  return formattedTime;
}

function sumTime(horario_inicial, duracao) {
  // Converte o horario_inicial para um objeto Date
  const [horasInicial, minutosInicial, segundosInicial] = horario_inicial
    .split(":")
    .map(Number);
  const dataInicial = new Date();
  dataInicial.setHours(horasInicial, minutosInicial, segundosInicial);

  // Converte a duracao para milissegundos
  const [horasDuracao, minutosDuracao, segundosDuracao] = duracao
    .split(":")
    .map(Number);
  const duracaoMs =
    (horasDuracao * 3600 + minutosDuracao * 60 + segundosDuracao) * 1000;

  // Calcula o horario_final adicionando a duracao
  const dataFinal = new Date(dataInicial.getTime() + duracaoMs);

  // Formata o resultado para HH:MM:SS
  const horario_final = dataFinal.toTimeString().split(" ")[0];

  return horario_final;
}

module.exports = {
  formatTime,
  sumTime,
};
