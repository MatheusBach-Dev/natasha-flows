import * as functions from "firebase-functions";
import fetch from "node-fetch";

exports.agendar = functions.https.onRequest(async (req, res) => {
  const TOKEN = "EAAMRkhwy0WQBQLMrcyVSiQZCT3KNhhKwNALAxzEoTeQhVR5vTwfPKh6G1ZA6vafchaDRXNhtclwtmLsmXXAZAzXNOpVIyoW8YqzwXSmencnZBHe9nGqpUBA0Vmo2PXhWW9QnvBFWtlerUQM07Q2slZBEc1ATdQHY5qUOmBlaHYV8LqQXeZAmn8vGFEu5X0bQZDZD"; // eslint-disable-line max-len
  const PHONE_NUMBER_ID = "943772875477293";

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const {nome, email, telefone, horario} = req.body;

    const url = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: "5531989166024",
        type: "text",
        text: {
          body: `Novo Agendamento: ${nome}, ${email}, ${telefone}, ${horario}`,
        },
      }),
    });

    const data = await response.json();
    res.status(200).send({status: "ok", data});
  } catch (error) {
    console.error("Erro ao enviar WhatsApp:", error);
    res.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
});
