module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Teste das variáveis de ambiente
  const envTest = {
    EMAIL_USER: process.env.EMAIL_USER ? 'CONFIGURADO' : 'NÃO CONFIGURADO',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'CONFIGURADO' : 'NÃO CONFIGURADO',
    NODE_ENV: process.env.NODE_ENV || 'undefined'
  };
  
  res.json({
    status: 'API funcionando!',
    timestamp: new Date().toISOString(),
    environment: envTest,
    method: req.method,
    body: req.body
  });
};