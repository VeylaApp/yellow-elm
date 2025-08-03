import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { first_name, last_name, email } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER, // <- match the working account
      pass: process.env.ZMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Yellow Elm Lead Mailing List" <${process.env.ZMAIL_USER}>`, // <- fixed `ffrom` typo
    to: 'kellina@yellowelm.org',
    subject: 'New Mailing List Signup',
    text: `
New mailing list signup:

First Name: ${first_name}
Last Name: ${last_name}
Email: ${email}
    `.trim()
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
}
