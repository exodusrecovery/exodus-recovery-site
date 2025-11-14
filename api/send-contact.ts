// api/send-contact.ts
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const tag = "[send-contact]";
const safe = (s?: string) => (s ? (s.length > 4 ? s.slice(0, 2) + "...(masked)..." + s.slice(-2) : "...(masked)") : "undefined");

console.log(tag, "inject env from .env.local (visible):");
console.log(tag, "ZOHO_SMTP_HOST =", process.env.ZOHO_SMTP_HOST);
console.log(tag, "ZOHO_SMTP_PORT =", process.env.ZOHO_SMTP_PORT);
console.log(tag, "ZOHO_SMTP_USER =", safe(process.env.ZOHO_SMTP_USER));
console.log(tag, "ZOHO_SMTP_PASS exists =", !!process.env.ZOHO_SMTP_PASS);
console.log(tag, "CONTACT_TO_EMAIL =", process.env.CONTACT_TO_EMAIL);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // quick body check
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const smtpHost = process.env.ZOHO_SMTP_HOST || "smtppro.zoho.com";
  const smtpPort = Number(process.env.ZOHO_SMTP_PORT || 465);
  const smtpUser = process.env.ZOHO_SMTP_USER;
  const smtpPass = process.env.ZOHO_SMTP_PASS;
  const contactTo = process.env.CONTACT_TO_EMAIL || smtpUser;

  // Validate credentials early with explicit error message
  if (!smtpUser || !smtpPass) {
    console.error(tag, "SMTP credentials missing. user:", safe(smtpUser), "pass exists:", !!smtpPass);
    return res.status(500).json({
      error: "SMTP credentials missing on server",
      detail: "Set ZOHO_SMTP_USER and ZOHO_SMTP_PASS in .env.local (dev) and in Vercel Environment Variables (prod)."
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.verify();
    console.log(tag, "transporter.verify: OK");
  } catch (vErr: any) {
    console.error(tag, "transporter.verify failed:", vErr && vErr.message ? vErr.message : vErr);
    return res.status(502).json({ error: "Mail server verify failed", detail: String(vErr?.message || vErr) });
  }

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: contactTo,
      subject: `Website contact from ${name}`,
      text: `From: ${name} <${email}>\nPhone: ${phone || "-"}\n\n${message}`,
      html:
        `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>` +
        `<p><strong>Phone:</strong> ${phone || "-"}</p><hr/>` +
        `<p>${(message || "").replace(/\n/g, "<br>")}</p>`,
    });
    console.log(tag, "email sent OK to", contactTo);
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error(tag, "sendMail error:", err && err.message ? err.message : err);
    return res.status(500).json({ error: "Send failed", detail: String(err?.message || err) });
  }
}