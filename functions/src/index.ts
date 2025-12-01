import * as functions from "firebase-functions";
import fetch from "node-fetch";

exports.enviarParaZapier = functions.https.onRequest(async (req, res) => {
  const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/25405622/u8jl66k/";

  // CORS headers
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    res.status(200).send({success: true});
  } catch (error) {
    console.error("Erro ao enviar para Zapier:", error);
    res.status(500).send({
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
});
