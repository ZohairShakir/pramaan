import nodemailer from 'nodemailer';
import { render } from '@react-email/render';
import { ProofEmailTemplate, WelcomeEmailTemplate, OTPEmailTemplate } from './email-templates';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // Use STARTTLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const fromEmail = process.env.SMTP_FROM || 'Pramaan <verify@pramaan.io>';

export async function sendProofEmail({
  to,
  recipientName,
  issuerName,
  documentName,
  verifyUrl,
  registryId,
}: {
  to: string;
  recipientName: string;
  issuerName: string;
  documentName: string;
  verifyUrl: string;
  registryId: string;
}) {
  console.log(`[EMAIL_HUB] Attempting to send Proof email to: ${to}`);
  try {
    console.log(`[EMAIL_HUB] Rendering Proof template for: ${documentName}`);
    const html = await render(ProofEmailTemplate({
      recipientName,
      issuerName,
      documentName,
      verifyUrl,
      registryId,
    }));

    console.log(`[EMAIL_HUB] SMTP Handshake initiated...`);
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject: `[PROVED] New Registry Entry: ${documentName}`,
      html,
    });

    console.log(`[EMAIL_HUB] ✅ Email sent successfully! MessageID: ${info.messageId}`);
    return { data: info };
  } catch (err) {
    console.error('[EMAIL_HUB] ❌ Critical Dispatch Error:', err);
    return { error: err };
  }
}

export async function sendWelcomeEmail({
  to,
  userName,
}: {
  to: string;
  userName: string;
}) {
  console.log(`[EMAIL_HUB] Attempting to send Welcome email to: ${to}`);
  try {
    console.log(`[EMAIL_HUB] Rendering Welcome template for: ${userName}`);
    const html = await render(WelcomeEmailTemplate({ userName }));

    console.log(`[EMAIL_HUB] SMTP Handshake initiated...`);
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject: 'Welcome to the Pramaan Institutional Network',
      html,
    });

    console.log(`[EMAIL_HUB] ✅ Welcome email sent! MessageID: ${info.messageId}`);
    return { data: info };
  } catch (err) {
    console.error('[EMAIL_HUB] ❌ Critical Welcome Error:', err);
    return { error: err };
  }
}

export async function sendOTPEmail({
  to,
  otpCode,
}: {
  to: string;
  otpCode: string;
}) {
  console.log(`[EMAIL_HUB] Attempting to send OTP email to: ${to}`);
  try {
    console.log(`[EMAIL_HUB] Rendering OTP template...`);
    const html = await render(OTPEmailTemplate({ otpCode }));

    console.log(`[EMAIL_HUB] SMTP Handshake initiated...`);
    const info = await transporter.sendMail({
      from: fromEmail,
      to,
      subject: `[VERIFY] Identity Code: ${otpCode}`,
      html,
    });

    console.log(`[EMAIL_HUB] ✅ OTP email sent! MessageID: ${info.messageId}`);
    return { data: info };
  } catch (err) {
    console.error('[EMAIL_HUB] ❌ Critical OTP Error:', err);
    return { error: err };
  }
}
