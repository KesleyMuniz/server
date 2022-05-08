import express from "express";
import nodemailer from 'nodemailer';
import { prisma } from "./prisma";

const app = express();
app.use(express.json());

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "69aa8b4cb1401e",
      pass: "b8f9cd8c7f8eb0"
    }
  });

app.post('/feedbacks', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const feedback = await prisma.feedback.create({
        data: {
            type,
            comment,
            screenshot,
        }
    });

    await transport.sendMail({
        from: 'Equipe Feedget <oi@oi.com>',
        to: 'Kesley <skyzone121@hotmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join('\n')
    })
    

    return res.status(201).json({data: feedback});
})



app.listen(3333, () => {
    console.log('HTTP Server Running...');
})