exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const { nome, email, telefone, mensagem } = JSON.parse(event.body);
    
    // CallMeBot API
    const PHONE_NUMBER = '553191548439';
    const API_KEY = '8323351'; // Sua API Key real
    
    const mensagemFormatada = `🆕 NOVO AGENDAMENTO

👤 Nome: ${nome}
📧 Email: ${email}
📱 Telefone: ${telefone}
💬 Mensagem: ${mensagem || 'Nenhuma'}
⏰ Data: ${new Date().toLocaleString('pt-BR')}

Método LeveMente - Terapia`;

    const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE_NUMBER}&text=${encodeURIComponent(mensagemFormatada)}&apikey=${API_KEY}`;
    
    const response = await fetch(url);
    
    if (response.ok) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ success: true, message: 'WhatsApp enviado!' })
      };
    } else {
      throw new Error('Erro CallMeBot');
    }
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};