import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import nodemailer from "nodemailer";
import type { VercelRequest, VercelResponse } from "@vercel/node";

function withTimeout<T>(p: Promise<T>, ms: number) {
  return Promise.race([
    p,
    new Promise<T>((_, rej) =>
      setTimeout(() => rej(new Error("Operation timed out")), ms)
    ),
  ]);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log("send-contact invoked");
    console.log("ENV USER =", process.env.ZOHO_SMTP_USER);
    console.log("ENV PASS EXISTS =", !!process.env.ZOHO_SMTP_PASS);
    console.log("ENV HOST =", process.env.ZOHO_SMTP_HOST);
    console.log("ENV PORT =", process.env.ZOHO_SMTP_PORT);
    console.log("CONTACT_TO_EMAIL =", process.env.CONTACT_TO_EMAIL);

    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }

    const { name, email, phone, message } = req.body || {};

    if (!message || !name || !email) {
      res.status(400).json({ error: "Missing fields" });
      return;
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

    try {
      await withTimeout(transporter.verify(), 10000);
      console.log("transporter verify: OK");
    } catch (vErr: any) {
      console.error("transporter verify failed:", vErr && vErr.message ? vErr.message : vErr);
      res.status(500).json({ error: "SMTP verify failed: " + (vErr?.message || String(vErr)) });
      return;
    }

    try {
      await withTimeout(
        transporter.sendMail({
          from: process.env.ZOHO_SMTP_USER,
          to: process.env.CONTACT_TO_EMAIL || process.env.ZOHO_SMTP_USER,
          subject: `Website contact from ${name}`,
          text: `From: ${name} <${email}>${phone ? "\\nPhone: " + phone : ""}\n\n${message}`,
          html: `<p>From: <strong>${name}</strong> &lt;${email}&gt;</p>` +
                (phone ? `<p>Phone: ${phone}</p>` : "") +
                `<p>${(message || "").replace(/\n/g, "<br>")}</p>`,
        }),
        15000
      );
      console.log("sendMail: OK");
    } catch (sErr: any) {
      console.error("sendMail failed:", sErr && sErr.message ? sErr.message : sErr);
      res.status(500).json({ error: "SMTP send failed: " + (sErr?.message || String(sErr)) });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("send-contact error:", err && err.message ? err.message : err);
    res.status(500).json({ error: err?.message || "Send failed" });
  }
}
