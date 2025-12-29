import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/enviar-email", async (req, res) => {
  const { nome, telefone, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransport({
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
});

app.listen(3001, '0.0.0.0', () => {
  console.log('Backend rodando na porta 3001');
});
