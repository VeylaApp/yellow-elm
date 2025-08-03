import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const {
    first_name,
    last_name,
    email,
    phone,
    birthday,
    sex,
    pronouns,
    preferred_contact,
    address_street,
    address_city,
    address_state,
    address_zip,
    reason,
    affirmation,
    subscribe,
    donate,
    volunteer,
    volunteer_info,
  } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.ZMAIL_HOST,
    port: parseInt(process.env.ZMAIL_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.ZMAIL_USER,
      pass: process.env.ZMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Yellow Elm Membership" <${process.env.ZMAIL_USER}>`,
    to: 'kellina@yellowelm.org',
    subject: 'New Membership Form Submission',
    text: `
First Name: ${first_name}
Last Name: ${last_name}
Email: ${email}
Phone: ${phone}
Birthday: ${birthday}
Sex: ${sex}
Pronouns: ${pronouns}
Preferred Contact: ${preferred_contact}
Street Address: ${address_street}
City: ${address_city}
State: ${address_state}
Zip: ${address_zip}
Reason for Joining: ${reason}
Affirmation: ${affirmation ? 'Yes' : 'No'}
Subscribe: ${subscribe ? 'Yes' : 'No'}
Donate: ${donate ? 'Yes' : 'No'}
Volunteer: ${volunteer ? 'Yes' : 'No'}
Volunteer Info: ${volunteer_info || 'N/A'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ error: 'Email failed to send.' });
  }
}
