const nodemailer = require('nodemailer');

module.exports = async function handler(req, res) {
  // Log para debug
  console.log('API chamada:', req.method, req.body);
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  try {
    const { nome, telefone, email, mensagem } = req.body;
    
    // Validar dados recebidos
    if (!nome || !email) {
      return res.status(400).json({ 
        erro: 'Dados obrigatórios não fornecidos',
        detalhes: 'Nome e email são obrigatórios'
      });
    }

    // Verificar variáveis de ambiente
    console.log('Verificando env vars:', {
      EMAIL_USER: process.env.EMAIL_USER ? 'OK' : 'MISSING',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'OK' : 'MISSING'
    });
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ 
        erro: 'Configuração do servidor incompleta',
        detalhes: 'Variáveis de ambiente não configuradas'
      });
    }

    // Criar transporter - CORREÇÃO AQUI!
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verificar conexão
    await transporter.verify();
    console.log('Conexão SMTP verificada com sucesso');

    // Enviar email
    const info = await transporter.sendMail({
      from: `"Site Método LeveMente" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Método LeveMente - Nova Sessão Agendada: ${nome}`,
      html: `
        <h3>Nova Sessão Agendada</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensagem:</strong> ${mensagem || 'Nenhuma mensagem'}</p>
      `,
      text: `Nome: ${nome}\nTelefone: ${telefone || 'Não informado'}\nEmail: ${email}\nMensagem: ${mensagem || 'Nenhuma mensagem'}`
    });

    console.log('Email enviado:', info.messageId);
    res.json({ sucesso: true, messageId: info.messageId });
    
  } catch (error) {
    console.error('Erro detalhado:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    
    res.status(500).json({ 
      erro: 'Erro interno do servidor',
      detalhes: error.message,
      codigo: error.code || 'UNKNOWN'
    });
  }
};;;