import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export default function ContactForm(): React.ReactElement {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Заполните имя, email и сообщение.");
      return;
    }

    setSending(true);
    try {
      const payload = { name, email, phone, message };
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        alert("Сообщение отправлено!");
      } else {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        alert("Ошибка: " + (data?.error || "send failed"));
      }
    } catch (err: any) {
      alert("Ошибка отправки: " + (err?.message || String(err)));
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Contact us</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Your name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Briefly describe your situation"
              required
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              type="submit"
              disabled={sending}
              className="rounded-xl px-6 text-base flex items-center"
              style={{ background: "#2d2846", color: "white" }}
            >
              {sending ? "Отправка..." : "Send request"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <div className="text-sm text-slate-600">
              or call{" "}
              <a
                className="underline"
                href={`tel:${import.meta.env.VITE_PHONE || ""}`}
              >
                {import.meta.env.VITE_PHONE || ""}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}