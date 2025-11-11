import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS
  }
});

export default async function (req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing fields' });
      return;
    }

    const to = process.env.CONTACT_TO_EMAIL || process.env.ZOHO_SMTP_USER;
    const mailOptions = {
      from: `${name} <${email}>`,
      to,
      subject: `Contact form — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g,'<br/>')}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ ok: true, info });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Server error' });
  }
}