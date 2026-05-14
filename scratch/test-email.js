const nodemailer = require('nodemailer');
require('dotenv').config();

async function test() {
  console.log("Attempting to connect to SMTP...");
  console.log("User:", process.env.SMTP_USER);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Connection Success! Your SMTP credentials are correct.");
  } catch (error) {
    console.error("❌ Connection Failed!");
    console.error(error);
  }
}

test();
