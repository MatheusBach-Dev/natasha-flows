export const sendWhatsAppNotification = async (data: {
  nome: string;
  email: string;
  telefone: string;
  horario?: string;
  mensagem?: string;
}) => {
  try {
    // Usa Netlify Function (sem CORS)
    const response = await fetch('https://delicate-sprinkles-1e170b.netlify.app/.netlify/functions/whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        mensagem: data.mensagem
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ WhatsApp enviado AUTOMATICAMENTE!', result);
      return result;
    } else {
      console.error('❌ Erro Netlify Function:', result);
      return null;
    }
  } catch (error) {
    console.error('❌ Erro ao enviar WhatsApp:', error);
    return null;
  }
};