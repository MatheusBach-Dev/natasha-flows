export const sendWhatsAppNotification = async (data: {
  nome: string;
  email: string;
  telefone: string;
  horario?: string;
  mensagem?: string;
}) => {
  try {
    // Tenta Netlify Function primeiro
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
      throw new Error('Netlify Function falhou');
    }
  } catch (error) {
    console.warn('❌ Netlify falhou, usando fallback:', error);
    
    // FALLBACK: Abre WhatsApp Web
    const mensagemFormatada = `🆕 NOVO AGENDAMENTO

👤 Nome: ${data.nome}
📧 Email: ${data.email}
📱 Telefone: ${data.telefone}
💬 Mensagem: ${data.mensagem || 'Nenhuma'}
⏰ Horário: ${data.horario}

Método LeveMente`;
    
    const whatsappUrl = `https://wa.me/553191548439?text=${encodeURIComponent(mensagemFormatada)}`;
    window.open(whatsappUrl, '_blank');
    
    console.log('✅ WhatsApp aberto como fallback!');
    return { success: true, method: 'fallback' };
  }
};