import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const TOKEN = "EAAMRkhwy0WQBQLMrcyVSiQZCT3KNhhKwNALAxzEoTeQhVR5vTwfPKh6G1ZA6vafchaDRXNhtclwtmLsmXXAZAzXNOpVIyoW8YqzwXSmencnZBHe9nGqpUBA0Vmo2PXhWW9QnvBFWtlerUQM07Q2slZBEc1ATdQHY5qUOmBlaHYV8LqQXeZAmn8vGFEu5X0bQZDZD";
const PHONE_NUMBER_ID = "943772875477293";

app.post("/agendar", async (req, res) => {
  try {
    const { nome, email, telefone, horario } = req.body;

    const response = await fetch(
      `https://graph.facebook.com/v17.0/${943772875477293}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${TOKEN}`
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: "5531989166024", 
          type: "template",
          template: {
            name: "notificacao_agendamento",
            language: { code: "pt_BR" },
            components: [
              {
                type: "body",
                parameters: [
                  { type: "text", text: nome },
                  { type: "text", text: email },
                  { type: "text", text: telefone },
                  { type: "text", text: horario }
                ]
              }
            ]
          }
        })
      }
    );

    const data = await response.json();
    return res.json({ status: "ok", data });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao enviar WhatsApp" });
  }
});

app.listen(3000, () => console.log("Rodando na porta 3000"));
