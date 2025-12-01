import { ScheduleData } from './scheduleService';

export const sendToZapier = async (data: ScheduleData) => {
  const zapierWebhookUrl = "https://hooks.zapier.com/hooks/catch/25405622/u8jl66k/"; 
  
  if (!zapierWebhookUrl) {
    console.warn('ZAPIER_WEBHOOK_URL não configurado');
    return;
  }

  try {
    const response = await fetch(zapierWebhookUrl, {
      method: 'POST',
      body: JSON.stringify({
        Nome: data.name,
        Email: data.email, 
        Telefone: data.phone,
        Mensagem: data.message,
        Fonte: "Site - Agendamento",
        timestamp: new Date().toISOString()
      })
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    console.log('Dados enviados para Zapier com sucesso');
  } catch (error) {
    console.error('Erro ao enviar para Zapier:', error);
  }
};