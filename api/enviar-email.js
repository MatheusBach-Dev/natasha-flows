import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ erro: 'Método não permitido' });
  }

  const { nome, telefone, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransporter({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Site Método LeveMente" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Método LeveMente - Nova Sessão Agendada: ${nome}`,
      text: `Nome: ${nome}\nTelefone: ${telefone}\nEmail: ${email}\nMensagem: ${mensagem}`
    });

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao enviar email", detalhes: err.message });
  }
}