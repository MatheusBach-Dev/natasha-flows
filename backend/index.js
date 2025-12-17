import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/enviar-email", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Site" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `Novo contato: ${nome}`,
      text: `Email: ${email}\nMensagem: ${mensagem}`
    });

    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao enviar email" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Backend rodando na porta 3000");
});
