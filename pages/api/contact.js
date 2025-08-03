import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER, // use ZMAIL_USER instead of ZOHO_EMAIL
      pass: process.env.ZMAIL_PASS, // use ZMAIL_PASS instead of ZOHO_APP_PASSWORD
    },
  });

  const mailOptions = {
    from: `"Yellow Elm Contact" <${process.env.ZMAIL_USER}>`,
    to: 'kellina@yellowelm.org',
    subject: 'New Contact Form Message',
    text: `
New message from Yellow Elm contact form:

Name: ${name}
Email: ${email}
Message:
${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending contact form email:', err);
    res.status(500).json({ error: 'Failed to send message.' });
  }
}
