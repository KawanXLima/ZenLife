const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../models/index");
const rotina = db.rotina;

exports.create = async (req, res) => {
  const {
    peso,
    height,
    nivel_atividade,
    tipo_exercicio,
    tempo,
    lesao,
    area_desenvolvimento,
    duracao_rotina,
  } = req.body;

  if (
    !peso ||
    !height ||
    !nivel_atividade ||
    !tipo_exercicio ||
    !tempo ||
    !lesao ||
    !area_desenvolvimento ||
    !duracao_rotina
  ) {
    return res.status(400).send({
      message: "Content can not be empty! Please fill all the fields.",
    });
  }

  try {
    const result = await gerar_resposta(req.body);
    if (result) {
      res.send({ data: result });
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while generating the workout routine.",
      error: error.message,
    });
  }
};

async function gerar_resposta(req_body) {
  const {
    peso,
    height,
    nivel_atividade,
    tipo_exercicio,
    tempo,
    lesao,
    area_desenvolvimento,
    duracao_rotina,
  } = req_body;

  const prompt = `Crie uma rotina de exercícios completa para uma pessoa a partir das seguintes informações: com peso atual: ${peso}kg, 
  altura:${height}, e atualmente nível de atividade: ${nivel_atividade}, 
  o modo de realização do exercício: ${tipo_exercicio}, 
  a disponibilidade de tempo para treinar: ${tempo}, 
  se possuí algum tipo de lesão: ${lesao}, 
  e qual a área deseja ter mais desenvolvimento: ${area_desenvolvimento}, 
  a quantidade de dias desejados para a rotina: ${duracao_rotina} e ignore qualquer outro parametro que não seja os passados, 
  retorne em json um objeto chamado rotina com a propriedade duração, que está relacionado com quantidade de dias informado. 
  O objeto chamado rotina contém um objeto chamado treino, que é um array de objetos com as propriedades, 
  duração, dia atual.E cada um desses objetos dentro do array, 
  contém um objeto chamado exercícios com as seguintes propriedades, foco do exercício, repetição, série, 
  tipo do exercício, tempo.E a quantidade de exercícios varia de acordo com o tempo exato de cada exercício, 
  dentro da duração exata definida no treino. Não retorne nenhuma observação além das passadas no prompt, 
  retorne em json e nenhuma propriedade pode ter acento. `;

  try {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const response = await model.generateContent(prompt);
    if (response.response && response.response.candidates) {
      const jsonText = response.response.candidates[0]?.content.parts[0].text;

      let jsonString = jsonText
        .replace(/```\w*\n/g, "")
        .replace(/\n```/g, "")
        .trim();

      const jsonObject = JSON.parse(jsonString);

      return jsonObject;
    }
    return false;
  } catch (error) {
    throw new Error("Failed to generate response: " + error.message);
  }
}
