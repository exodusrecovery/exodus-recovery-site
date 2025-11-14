// api/send-contact.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { name, email, phone, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.ZOHO_SMTP_HOST || "smtppro.zoho.com",
      port: Number(process.env.ZOHO_SMTP_PORT || 465),
      secure: true,
      auth: {
        user: process.env.ZOHO_SMTP_USER,
        pass: process.env.ZOHO_SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL || process.env.ZOHO_SMTP_USER,
      subject: `Website contact from ${name}`,
      text: `From: ${name} <${email}>\n\nPhone: ${phone || ""}\n\n${message}`,
      html: `<p>From: <strong>${name}</strong> &lt;${email}&gt;</p>
             <p>Phone: ${phone || ""}</p>
             <p>${(message || "").replace(/\n/g, "<br>")}</p>`,
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("send-contact error:", err);
    return res.status(500).json({ error: err?.message || "Send failed" });
  }
}