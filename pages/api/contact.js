// /pages/api/contact.js

require('dotenv').config(); // ✅ IMPORTANT: Make absolutely sure this is the VERY FIRST LINE

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, "h-captcha-response": captchaToken } = req.body;

  // --- Validate environment variables for hCaptcha ---
  if (!process.env.HCAPTCHA_SECRET_KEY) {
    console.error('ERROR: HCAPTCHA_SECRET_KEY is not set in environment variables.');
    return res.status(500).json({ message: "Server configuration error: hCaptcha secret key missing." });
  }

  // 1. Verify hCaptcha
  try {
    const captchaVerify = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        response: captchaToken,
        secret: process.env.HCAPTCHA_SECRET_KEY, // ✅ Correctly using env var
      }),
    });

    const captchaResult = await captchaVerify.json();
    if (!captchaResult.success) {
      console.warn('hCaptcha verification failed:', captchaResult); // Log details for debugging
      return res.status(400).json({ message: "hCaptcha verification failed." });
    }
  } catch (captchaError) {
    console.error('Error during hCaptcha verification:', captchaError);
    return res.status(500).json({ message: "Error verifying hCaptcha." });
  }

  // --- Validate environment variables for Zoho SMTP ---
  if (!process.env.ZOHO_SMTP_USER || !process.env.ZOHO_SMTP_PASS) {
    console.error('ERROR: ZOHO_SMTP_USER or ZOHO_SMTP_PASS not set in environment variables.');
    return res.status(500).json({ message: "Server configuration error: Email credentials missing." });
  }

  // 2. Set up Zoho SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER, // ✅ Correctly using env var
      pass: process.env.ZOHO_SMTP_PASS, // ✅ Correctly using env var
    },
  });

  // 3. Build and send the message
  try {
    await transporter.sendMail({
      from: '"Yellow Elm Contact Form" <kellina@yellowelm.org>', // Ensure this "from" email is configured in your Zoho Mail SMTP settings
      to: "kellina@yellowelm.org",
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    // ⚠️ IMPORTANT: Log the full error object from Nodemailer for debugging
    // Nodemailer errors often have a 'code' or 'response' property with more details.
    if (error.response) {
      console.error('Nodemailer response:', error.response);
    }
    return res.status(500).json({ message: "Failed to send message." });
  }
}