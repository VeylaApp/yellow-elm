// /pages/api/contact.js

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message, "h-captcha-response": captchaToken } = req.body;

  // 1. Verify hCaptcha
  const captchaVerify = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      response: captchaToken,
      secret: "BADKEY",
    }),
  });

  const captchaResult = await captchaVerify.json();
  if (!captchaResult.success) {
    return res.status(400).json({ message: "Captcha verification failed." });
  }

  // 2. Set up Zoho SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: REMOVEINFO
      pass: REMOVESKEY, // your app password
    },
  });

  // 3. Build and send the message
  try {
    await transporter.sendMail({
      from: '"Yellow Elm Contact Form" <kellina@yellowelm.org>',
      to: "kellina@yellowelm.org",
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email send error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
}
