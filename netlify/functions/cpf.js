const axios = require("axios");

exports.handler = async function (event, context) {
  const { cpf } = event.queryStringParameters;

  if (!cpf) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "CPF não informado" }),
    };
  }

  try {
    const response = await axios.post("https://retirar-pedidos.com/api.php", `cpf=${cpf}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro ao consultar CPF", details: error.message }),
    };
  }
};