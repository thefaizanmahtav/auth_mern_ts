// mailer.ts
import nodemailer from 'nodemailer';
import { SMTP_USER, SMTP_PASS } from '../constant/env';

type SendEmailParams = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: SendEmailParams): Promise<{ data?: { id: string }; error?: unknown }> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // SMTP host
      port: 587, // SMTP port
      secure: false, // Upgrade later with STARTTLS 
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"thefaizanmahtav" <${SMTP_USER}>`,
      to: "khanfaizan56752@gmail.com", // Use the recipient's email
      subject,
      text,
      html,
    });

    console.log('Email sent:', info.messageId);
    return { data: { id: info.messageId } }; // ✅ include data
  } catch (error) {
    return { error };
  }
}

