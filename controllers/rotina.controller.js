const { GoogleGenerativeAI } = require("@google/generative-ai");
const db = require("../models/index");
const Rotina = db.rotina;

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
    const rotina = await gerar_rotina(req.body);
    if (rotina) {
      try {
        const result_insert = await inserir_rotina(rotina);
        if (result_insert) {
          return res.send({ data: true });
        }
      } catch (error) {
        res.status(500).send({
          message: "An error occurred while insertion in the database.",
          error: error.message,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: "An error occurred while generating the workout routine.",
      error: error.message,
    });
  }
};

async function gerar_rotina(req_body) {
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
  retorne em json um objeto chamado rotina com a propriedade duracao, que está relacionado com a quantidade de dias informada. 
  O objeto chamado rotina contém um objeto chamado treino, que é um array de objetos com as propriedades, 
  duracao, dia_atual. E cada um desses objetos dentro do array contém um objeto chamado exercicios com as seguintes propriedades: foco_exercicio, repeticao, serie, 
  tipo_exercicio, tempo. A quantidade de exercicios varia de acordo com o tempo exato de cada exercicio dentro da duracao exata definida no treino. 
  Não retorne nenhuma observação além das passadas no prompt, retorne em json e nenhuma propriedade pode ter acento.`;

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

      return jsonObject.rotina; // Retorna apenas a rotina gerada
    }
    return false;
  } catch (error) {
    throw new Error("Failed to generate response: " + error.message);
  }
}

async function inserir_rotina(rotina) {
  try {
    const result_insert = await Rotina.create(rotina); // Insere o objeto rotina completo
    return result_insert;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to insert routine in the database.");
  }
}
