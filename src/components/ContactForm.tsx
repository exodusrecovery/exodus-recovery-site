import nodemailer from "nodemailer";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST || "smtppro.zoho.com",
    port: Number(process.env.ZOHO_SMTP_PORT || 465),
    secure: true, // SSL
    auth: {
      user: process.env.ZOHO_SMTP_USER,
      pass: process.env.ZOHO_SMTP_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("SMTP verify: OK");
  } catch (err: any) {
    console.error("SMTP verify failed:", err.message);
    return res.status(500).json({ error: "SMTP connection failed" });
  }

  try {
    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL || process.env.ZOHO_SMTP_USER,
      subject: `Contact from ${name}`,
      text: `From: ${name} <${email}>\n${phone ? "Phone: " + phone + "\n" : ""}\n${message}`,
      html: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}<p>${message.replace(/\n/g, "<br>")}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Send failed:", err.message);
    return res.status(500).json({ error: "Failed to send email" });
  }
}