import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const user = process.env.NODEMAILER_USER as string;
const clientId = process.env.GOOGLE_CLIENT_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN as string;

interface SendMailData {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}

const OAuth2 = google.auth.OAuth2;


const createTransporter = async () => {

    const oauth2Client = new OAuth2(
        clientId,
        clientSecret,
        "https://developers.google.com/oauthplayground"
    );
    
    oauth2Client.setCredentials({
        refresh_token: refreshToken
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            reject("Failed to create access token :(");
          }
          resolve(token);
        });
      });

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user,
            accessToken: accessToken as string,
            clientId,
            clientSecret,
            refreshToken
        }
    });
    
    return transporter;
}


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
        let emailTransporter = await createTransporter();
        const send = await emailTransporter.sendMail(mailOptions);
        console.log(send.response);
    } catch (error) {
        console.log(error);
    }
}