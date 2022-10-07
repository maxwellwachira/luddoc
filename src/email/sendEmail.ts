import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.NODEMAILER_USER;
const pass = process.env.NODEMAILER_PASS;

interface SendMailData {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user,
        pass
    }
});

export const sendMail =  async ({ to, subject, text, html }: SendMailData) => {
    if(!text) text = '';

    const mailOptions = {
        from: user,
        to,
        subject,
        text,
        html
    };

    try {
        const send = await transporter.sendMail(mailOptions);
        console.log(send.response);
    } catch (error) {
        console.log(error);
    }
}