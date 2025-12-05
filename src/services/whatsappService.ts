export const sendWhatsAppNotification = async (data: {
  nome: string;
  email: string;
  telefone: string;
  horario?: string;
}) => {
  const TOKEN = "EAAMRkhwy0WQBQLMrcyVSiQZCT3KNhhKwNALAxzEoTeQhVR5vTwfPKh6G1ZA6vafchaDRXNhtclwtmLsmXXAZAzXNOpVIyoW8YqzwXSmencnZBHe9nGqpUBA0Vmo2PXhWW9QnvBFWtlerUQM07Q2slZBEc1ATdQHY5qUOmBlaHYV8LqQXeZAmn8vGFEu5X0bQZDZD";
  const PHONE_NUMBER_ID = "943772875477293";
  
  try {
    const response = await fetch(
      `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`,
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
            name: "hello_world",
            language: {
              code: "en_US"
            }
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('WhatsApp enviado com sucesso:', result);
    return result;
  } catch (error) {
    console.error('Erro ao enviar WhatsApp:', error);
    // Não falha o agendamento se WhatsApp der erro
    return null;
  }
};