// src/components/ContactForm.tsx
import React, { useState } from "react";

export default function ContactForm(): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitContact(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }
    setLoading(true);
    try {
      const payload = { name, email, phone, message };
     const endpoint = "/api/send-contact";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        alert("Your message has been sent successfully.");
      } else {
        const data = await res.json().catch(() => ({ error: "unknown", detail: "" }));

        console.error("send-contact error:", data);

        alert(
          "Error sending message.\n" +
            "Error: " +
            (data?.error || "unknown") +
            (data?.detail ? "\nDetails: " + data.detail : "")
        );
      }
    } catch (err: any) {
      alert("Sending error: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submitContact} className="space-y-4" aria-label="Contact form">
      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          className="w-full rounded-md border px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          className="w-full rounded-md border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone (optional)</label>
        <input
          type="tel"
          className="w-full rounded-md border px-3 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          className="w-full rounded-md border px-3 py-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="How can we help you?"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#2d2846] text-white px-6 py-2 font-semibold hover:opacity-90 transition"
        >
          {loading ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}