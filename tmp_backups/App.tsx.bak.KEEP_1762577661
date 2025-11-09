import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import BeforeAfter from "@/components/BeforeAfter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Heart,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Calendar,
  Shield,
  Users,
  BookOpen,
} from "lucide-react";
import {
  AlertTriangle,
  HeartHandshake,
  HeartPulse,
  Briefcase,
  History as HistoryIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useRef } from "react";
import { useInView, useAnimation } from "framer-motion";

// ==== Motion presets ====
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function Reveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
  const controls = useAnimation();

  React.useEffect(() => {
    if (inView) controls.start("show");
    else controls.start("hidden");
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={controls}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// === Бренд и контакты ===
const BRAND = {
  name: "Exodus Recovery Program",
  colors: {
    primary: "#2d2846",
    primaryDark: "#231e39",
    accent: "#43A047",
    accentDark: "#2E7D32",
    muted: "#F1F5F9",
    text: "#0F172A",
  },
  phone: "+1 (571) 982-2395",
  email: "info@exodusrecovery.org",
  address: "11 Franklin Ave, Feasterville-Trevose, PA 19053",
  serviceArea: "Serving individuals across the USA",
};

// === Галерея (просто список путей) ===
const GALLERY: string[] = [
  "/images/gallery/01.jpg",
  "/images/gallery/02.jpg",
  "/images/gallery/03.jpg",
  "/images/gallery/04.jpg",
  "/images/gallery/05.jpg",
  "/images/gallery/06.jpg",
];
// === Видео свидетельства ===
const VIDEO_TESTIMONIES = [
  {
    id: "feliks",
    title: "Feliks Galkin — Testimony",
    src: "/videos/feliks.mp4",   // файл положи в public/videos/feliks.mp4
    thumb: "/images/people/feliks.jpg",
    duration: "2:37",
  },
  // Добавляй новые записи по этому же шаблону
];
// Общий секшен (с анимацией появления контента)
// Общий секшен (с анимацией появления контента)
const Section = ({ id, title, subtitle, children }: any) => (
  <section id={id} className="py-16 md:py-24" aria-labelledby={id ? `${id}-title` : undefined}>
    <div className="max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {title ? (
            <div className="flex flex-col items-center">
              <h2
                id={id ? `${id}-title` : undefined}
                className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900"
              >
                {title}
              </h2>
              {/* фирменная линия под заголовком */}
              <span className="brand-underline mt-3" aria-hidden="true"></span>
            </div>
          ) : null}

          {subtitle ? (
            <p className="mt-3 text-base md:text-lg text-slate-600">{subtitle}</p>
          ) : null}
        </motion.div>
      )}

      {/* Контент секции плавно появляется при скролле */}
      <motion.div
        className="mt-8 md:mt-12"
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {children}
      </motion.div>
    </div>
  </section>
);

// Карточка программы
const ProgramCard = ({ icon: Icon, title, points }: any) => (
  <Card className="rounded-2xl shadow-sm">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-xl">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl"
          style={{ background: BRAND.colors.muted }}
        >
          <Icon aria-hidden className="h-6 w-6" style={{ color: BRAND.colors.primary }} />
        </span>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {points.map((p: string, i: number) => (
        <p key={i} className="flex items-start gap-2 text-slate-700">
          <Check className="mt-1 h-5 w-5" style={{ color: BRAND.colors.accent }} />
          {p}
        </p>
      ))}
    </CardContent>
  </Card>
);

// Форма связи (mailto)
const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");      // ← добавили телефон
  const [message, setMessage] = useState("");

  const mailto = () => {
    const subject = encodeURIComponent(`[Inquiry] ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );
    return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
  };

  return (
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
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Briefly describe your situation"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={mailto()}>
            <Button
              className="rounded-xl px-6 text-base"
              style={{ background: BRAND.colors.primary }}
            >
              Send request <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <div className="text-sm text-slate-600">
            or call{" "}
            <a className="underline" href={`tel:${BRAND.phone}`}>
              {BRAND.phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RehabWebsite() {
// ------------------------- Stripe helpers (working implementation) -------------------------

  const [oneTimeInput, setOneTimeInput] = useState<string>("");
  const [selectedPriceId, setSelectedPriceId] = useState<string>("price_1SQdWEBrWBoIIHjWnOeeyFNE");

  async function createCheckoutSession(payload: any): Promise<string> {
    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`create-checkout-session failed: ${res.status} ${txt}`);
    }
    const data = await res.json();
    if (!data?.url) throw new Error(data?.error?.message || "Stripe error: no url in response");
    return data.url;
  }

  function openStripeInNewTab(createSession: () => Promise<string>) {
    const win = window.open("", "_blank", "noopener,noreferrer");
    if (!win) {
      createSession()
        .then((url) => (window.location.href = url))
        .catch((e) => alert(e.message || "Stripe error"));
      return;
    }

    win.document.write("<p style='font:16px system-ui;margin:20px'>Redirecting to Stripe…</p>");

    createSession()
      .then((url) => {
        try {
          win.location.href = url;
        } catch (err) {
          win.close();
          alert("Could not open Stripe Checkout.");
        }
      })
      .catch((e) => {
        win.close();
        alert(e.message || "Stripe error");
      });
  }

  const handleDonateOnce = () => {
    const val = (oneTimeInput || "").toString().trim();
    if (!val) { alert("Please enter an amount for one-time donation."); return; }
    const cleaned = val.replace(/\$/g, "");
    const num = Number(cleaned);
    if (!Number.isFinite(num) || num <= 0) { alert("Enter a valid numeric amount."); return; }
    const cents = Math.round(num * 100);
    openStripeInNewTab(() =>
      createCheckoutSession({
        mode: "payment",
        amount: cents,
      })
    );
  };

  const handleDonateMonthly = (priceId?: string) => {
    const pid = priceId || selectedPriceId;
    if (!pid) { alert("No subscription price selected."); return; }
    openStripeInNewTab(() =>
      createCheckoutSession({
        mode: "subscription",
        price_id: pid,
      })
    );
  };

// ------------------------- end Stripe helpers ------------------------------------------------
  const [showFeliks, setShowFeliks] = useState(false);
  const [activeVideo, setActiveVideo] = useState(0);

  // === Stripe test handlers ===
  // ...дальше идёт return(...)
  
  return (
    <div
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-100 to-gray-200"
      style={{ color: BRAND.colors.text }}
    >
      {/* мягкие «ореолы» */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
     <style>{`
     
  :root{
    --brand:${BRAND.colors.primary};
    --brand-dark:${BRAND.colors.primaryDark};
    --accent:${BRAND.colors.accent};
    --accent-dark:${BRAND.colors.accentDark};
    --muted:${BRAND.colors.muted};
    --text:${BRAND.colors.text};
  }

  /* тонкая бренд-полоска под заголовком секции */
  .brand-underline{
    display:inline-block;
    width:96px;height:4px;border-radius:9999px;
    background: linear-gradient(90deg,var(--brand),var(--accent));
  }

  /* универсальная кнопка в фирменном стиле */
  .btn-brand{
    background: var(--brand);
    color:#fff;
    border-radius:0.75rem;
    padding:0.75rem 1.5rem;
    font-weight:600;
    box-shadow: 0 8px 20px rgba(45,40,70,.18);
    transition: transform .15s ease, box-shadow .2s ease, background .2s ease;
  }
  .btn-brand:hover{ background: var(--brand-dark); transform: translateY(-1px); }
  .btn-brand:active{ transform: translateY(0); }
  .btn-outline-brand{
    border:1px solid rgba(15,23,42,.15);
    border-radius:0.75rem;
    padding:0.75rem 1.5rem;
    font-weight:600;
  }
  .btn-outline-brand:hover{ background: rgba(45,40,70,.04); }

  /* красивый фокус для инпутов/селектов/текстареа */
  .brand-focus{
    outline: none;
    box-shadow: 0 0 0 3px rgba(45,40,70,.18);
    border-color: var(--brand);
  }

  /* тонкая цветная полоска сверху у карточек статистики */
  .stat-accent{
    position: relative;
  }
  .stat-accent::before{
    content:"";
    position:absolute;inset:0 0 auto 0;height:3px;border-top-left-radius:1rem;border-top-right-radius:1rem;
    background: linear-gradient(90deg,var(--brand),var(--accent));
  }
`}</style>

     <Header />

      {/* Hero */}
      <section id="hero" className="relative">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-2xl md:text-3xl font-semibold text-[var(--brand)] mb-1">
              Recovery starts with one step
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-slate-900">
              A new life <span className="text-[var(--brand)]">starts today</span>.
            </h1>

            <p className="mt-5 text-lg md:text-xl text-slate-600">
              Confidential, judgment-free recovery with structure, community, and hope.
              Real change begins with one step.
            </p>

            <div className="mt-5 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px]">
                ✓
              </span>
              <span className="text-slate-700 text-sm">
                Need help now? <strong>(571) 982-2395</strong>
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 font-semibold text-white shadow-sm"
              >
                Get Help Now
              </a>
              <a
                href="#programs"
                className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
              >
                Explore Programs
              </a>
            </div>

            <div className="mt-5 flex items-center gap-3 text-slate-500 text-sm">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300">
                ✓
              </span>
              <span>501(c)(3) nonprofit • Confidential • HIPAA-minded</span>
            </div>

            <ul className="mt-6 space-y-2 text-slate-700 text-[15px]">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✔</span> Stage 1: 6-month residential program
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✔</span> Stage 2: 12-month social resocialization
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 mt-1">✔</span> Outpatient + co-dependency courses
              </li>
            </ul>
          </div>

          <div className="relative rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-[0_10px_30px_rgba(2,6,23,0.06)]">
            <div className="aspect-video">
  <iframe
    width="1280"
    height="720"
    src="https://www.youtube.com/embed/rf4kmI2G7RU"
    title="Exodus Recovery story"
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    className="w-full h-full"
  ></iframe>
</div>

            <div className="absolute left-3 top-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Watch a real story (2 min)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stories */}
      <Section
        id="stories"
        title="Real People. Real Change."
        subtitle="Stories of restoration, hope, and freedom."
      >
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {[
            {
              name: "Feliks Galkin",
              role: "Graduate • 1 year sober",
              quote:
                "I grew up in Philadelphia and started using drugs at 12. By 17 I was arrested and lost everything. At Exodus Recovery, God changed my heart and gave me true freedom and purpose.",
              img: "/images/people/feliks.jpg",
            },
            {
              name: "Jessica Steinacker",
              role: "Graduate • 1 year sober",
              quote:
                "For years I searched for something to fill the emptiness inside. Addiction only broke me further. At Exodus Recovery, I met Jesus — He gave me true freedom, hope, and purpose.",
              img: "/images/people/jessica.jpg",
            },
            {
              name: "Andrey Andriyak",
              role: "Graduate • 2 years sober",
              quote:
                "For 15 years I struggled with addiction. At Exodus Recovery I finally found freedom, true friends, and a new family. God gave me purpose and a calling to help others find the same freedom.",
              img: "/images/people/andrey.jpg",
            },
          ].map((p, i) => (
            <motion.div
  key={i}
  variants={fadeInUp}
  whileHover={{ y: -4, scale: 1.01 }}
  transition={{ type: "spring", stiffness: 250, damping: 20 }}
  className={`relative overflow-hidden rounded-2xl shadow-lg group ${p.name === "Feliks Galkin" ? "cursor-pointer" : ""}`}
  onClick={() => { if (p.name === "Feliks Galkin") setShowFeliks(true); }}
  role={p.name === "Feliks Galkin" ? "button" : undefined}
  aria-label={p.name === "Feliks Galkin" ? "Play Feliks video testimony" : undefined}
>
              <img
                src={p.img}
                alt={p.name}
                className="h-80 w-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {p.name === "Feliks Galkin" && (
  <div className="absolute left-3 top-3">
    <span className="inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur">
      <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
      Click to watch
    </span>
  </div>
)}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <p className="text-lg font-semibold">{p.name}</p>
                <p className="text-xs text-white/80">{p.role}</p>
                <p className="mt-2 text-sm leading-snug">“{p.quote}”</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8">
  <Link to="/videos">
  <Button className="rounded-xl px-6 text-base" style={{ background: BRAND.colors.accent }}>
    Watch video testimonies
  </Button>
</Link>
</div>

      </Section>

{/* Gallery */}
<Section id="gallery" title="Recovery Life" subtitle="Photos from our community">
  <motion.div
    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
    variants={stagger}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {[
      "/images/gallery/01.jpg",
      "/images/gallery/02.jpg",
      "/images/gallery/03.jpg",
      "/images/gallery/04.jpg",
      "/images/gallery/05.jpg",
      "/images/gallery/06.jpg",
      "/images/gallery/07.jpg",
      "/images/gallery/08.jpg",
      "/images/gallery/09.jpg",
      "/images/gallery/10.jpg",
      "/images/gallery/11.jpg",
      "/images/gallery/12.jpg",
      "/images/gallery/13.jpg",
      "/images/gallery/14.jpg",
      "/images/gallery/15.jpg",
      "/images/gallery/16.jpg",
      "/images/gallery/17.jpg",
    ]
      .slice(0, 8) // показываем только 8 фото
      .map((src, i) => (
        <motion.div
  key={i}
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  viewport={{ once: true }}
          className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm group"
          style={{ aspectRatio: "4 / 3" }}
        >
          <img
            src={src}
            alt={`Gallery ${i + 1}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      ))}
  </motion.div>

  <div className="mt-10 text-center">
    <a
      href="/gallery"
      className="inline-block rounded-xl bg-[var(--brand)] text-white px-8 py-3 text-lg font-semibold shadow-md hover:bg-[var(--brand-dark)] transition"
    >
      View full gallery →
    </a>
  </div>
</Section>

{/* ===== Modal: Feliks Video ===== */}
      {/* ===== Modal: Feliks Video ===== */}
    
{showFeliks && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
    onClick={() => setShowFeliks(false)}
    aria-modal="true"
    role="dialog"
  >
    <div
      className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close */}
      <button
        onClick={() => setShowFeliks(false)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white"
        aria-label="Close video"
      >
        Close
      </button>

      {/* Video */}
      <div className="aspect-video">
        <video
          className="h-full w-full"
          controls
          preload="metadata"
          poster="/images/people/feliks.jpg"
        >
          <source src="/videos/feliks.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
)}

      {/* Support / Donate section */}
<Section
  id="support"
  title="Support the Mission"
  subtitle="Your generosity helps us bring hope, freedom, and restoration through the ministry of Church of God Exodus."
>
  <div className="relative py-16">
    {/* фон */}
    <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 rounded-3xl" />
    {/* свечение */}
    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" />
    <div className="pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" />

    <motion.div
      className="relative mx-auto max-w-md rounded-2xl bg-white p-10 shadow-2xl ring-1 ring-gray-200 text-center backdrop-blur-sm"
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 120 }}
      viewport={{ once: true, margin: "-80px" }}
    >
      <h4 className="text-3xl font-bold text-gray-900 mb-4">
        Give to Church of God Exodus
      </h4>

      <p className="text-gray-600 mb-6 text-base leading-relaxed">
        Your gift supports our church ministry and outreach to people seeking
        freedom and a new life in Christ.
      </p>

     <div className="mt-6 grid gap-3 sm:grid-cols-2">
  {/* Разовое пожертвование $50 */}
<button
  onClick={() => openStripeInNewTab(() => createCheckoutSession({ mode: "payment", amount: 5000 }))}
  className="inline-block rounded-xl bg-black text-white px-6 py-3 font-semibold shadow-md hover:bg-gray-800 transition"
  type="button"
>
  One-time donation — $50
</button>

{/* Ежемесячная подписка $20 (подставь свой price id) */}
<button
  onClick={() => openStripeInNewTab(() => createCheckoutSession({ mode: "subscription", price_id: "price_1SQdWEBrWBoIIHjWnOeeyFNE" }))}
  className="inline-block rounded-xl bg-[var(--brand)] text-white px-6 py-3 font-semibold shadow-md hover:bg-[var(--brand-dark)] transition"
  type="button"
>
  Subscribe — $20/mo
</button>
</div>

      <p className="mt-6 text-sm text-gray-500 leading-relaxed">
        All donations are securely processed by Stripe. <br />
        Thank you for partnering with us in this ministry.
      </p>
    </motion.div>
  </div>
</Section>

      {/* Programs */}
      <Section id="programs" title="Programs" subtitle="Multi-stage care tailored to your recovery journey.">
        <div className="grid md:grid-cols-2 gap-6">
          <ProgramCard
            icon={Calendar}
            title="Stage 1 - Inpatient (6 months)"
            points={[
              "Residential, structured daily schedule",
              "Discipleship, counseling, work therapy",
              "Relapse-prevention & life skills",
            ]}
          />
          <ProgramCard
            icon={Heart}
            title="Stage 2 - Social Resocialization (12 months)"
            points={[
              "Transitional housing & mentoring",
              "Job readiness & education",
              "Service, church integration, alumni support",
            ]}
          />
          <ProgramCard
            icon={Users}
            title="Outpatient"
            points={[
              "Individual & group sessions",
              "Flexible schedules around work/family",
              "Aftercare planning & accountability",
            ]}
          />
          <ProgramCard
            icon={BookOpen}
            title="Family & Co-dependency Courses"
            points={[
              "Education and boundaries",
              "Support for loved ones",
              "Healthy family recovery plan",
            ]}
          />
        </div>
      </Section>

      {/* IMPACT / STATS */}
      <section
        aria-label="Impact and outcomes"
        className="py-10"
        style={{ background: BRAND.colors.muted }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "People supported", value: "100+" },
              { label: "Typical journey", value: "6–12 mo" },
              { label: "Service area", value: "Nationwide" },
              { label: "Alumni mentors", value: "Growing" },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-bold text-slate-900">{s.value}</div>
                <div className="mt-1 text-sm text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section id="how" title="How It Works" subtitle="A clear, compassionate path from first contact to aftercare.">
        <div className="grid md:grid-cols-5 gap-6">
          {[
            { n: 1, t: "Reach Out", d: "Call or message us. We’ll listen without judgment and explain next steps." },
            { n: 2, t: "Assessment", d: "We review needs, risks, and goals to recommend the right level of care." },
            { n: 3, t: "Plan", d: "Personalized plan: inpatient or outpatient + family/co-dependency support." },
            { n: 4, t: "Care & Community", d: "Counseling, skills, mentoring, peer groups, and routine." },
            { n: 5, t: "Aftercare", d: "Relapse prevention, alumni support, and ongoing accountability." },
          ].map((step) => (
            <div key={step.n} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center font-semibold text-white"
                style={{ background: BRAND.colors.accent }}
              >
                {step.n}
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{step.t}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#contact">
            <Button
              className="rounded-xl px-6 text-base"
              style={{ background: BRAND.colors.primary, color: "white" }}
            >
              Get Help Now
            </Button>
          </a>
          <a href="#admissions">
            <Button variant="outline" className="rounded-xl px-6 text-base border-slate-300">
              Admissions
            </Button>
          </a>
        </div>
      </Section>

      {/* Approach */}
      <Section id="approach" title="Our Approach" subtitle="Whole-person care: body • mind • spirit">
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <CardTitle>National Crisis</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                Over 46 million Americans live with substance use disorders. Exodus Recovery
                provides structured, compassionate programs to meet this need.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <HeartHandshake className="h-6 w-6 text-green-600" />
              <CardTitle>Whole-Person Healing</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                We combine evidence-based therapy, mentoring, and optional faith guidance so
                participants heal emotionally, physically, and spiritually.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              <CardTitle>Family & Community</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                Families are restored through education and support. Graduates mentor new residents and
                volunteer in the community.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-rose-500" />
              <CardTitle>Health & Stability</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                Participants rebuild healthy habits, strengthen resilience, and learn tools for long-term
                sobriety and balance.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-emerald-600" />
              <CardTitle>Work & Purpose</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                Vocational training and mentoring help each person set goals, find employment, and
                live with integrity and purpose.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-2xl shadow-sm">
            <CardHeader className="flex items-center gap-2">
              <HistoryIcon className="h-6 w-6 text-slate-600" />
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent className="text-slate-700 space-y-3">
              <p>
                For more than a decade we’ve helped people move from addiction to purpose—through
                accountability, grace, and community.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Admissions */}
      <Section id="admissions" title="Admissions" subtitle="A clear path to start">
        <ol className="grid md:grid-cols-3 gap-6 list-decimal list-inside text-slate-700">
          <li className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold">1) Free consultation</p>
            <p className="mt-2">
              Call or submit the form—we’ll help you choose inpatient or outpatient and explain stages.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold">2) Assessment & plan</p>
            <p className="mt-2">
              Clinical & spiritual assessment, goals, schedule, and costs/insurance.
            </p>
          </li>
          <li className="rounded-2xl border border-slate-200 p-6">
            <p className="font-semibold">3) Start treatment</p>
            <p className="mt-2">Onboarding coach and community support from day one.</p>
          </li>
        </ol>
        <div className="mt-8 text-slate-600">{BRAND.serviceArea}</div>
        <div className="mt-4">
          <a href="#contact">
            <Button
              className="rounded-xl px-6 text-base"
              style={{ background: BRAND.colors.primary }}
            >
              Start today
            </Button>
          </a>
        </div>
      </Section>

      {/* Contact */}
<Section id="contact" title="Contact">
  <div className="grid md:grid-cols-2 gap-6 items-start">
    {/* Обновлённая форма с телефоном */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Your name</label>
            <Input
              type="text"
              placeholder="John Smith"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {/* Новое поле телефона */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone number</label>
          <Input
            type="tel"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <Textarea
            rows={5}
            placeholder="Briefly describe your situation"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={`mailto:${BRAND.email}`}>
            <Button
              className="rounded-xl px-6 text-base"
              style={{ background: BRAND.colors.primary }}
            >
              Send message <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
          <div className="text-sm text-slate-600">
            or call{" "}
            <a className="underline" href={`tel:${BRAND.phone}`}>
              {BRAND.phone}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>

    {/* Find us — без карты */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Find us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-slate-700">
        <p className="flex items-center gap-2">
          <MapPin className="h-5 w-5" /> {BRAND.address}
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-5 w-5" />{" "}
          <a className="underline" href={`tel:${BRAND.phone}`}>
            {BRAND.phone}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-5 w-5" />{" "}
          <a className="underline" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
        </p>
        <p className="text-sm">{BRAND.serviceArea}</p>
      </CardContent>
    </Card>
  </div>
</Section>

      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo-placeholder.svg" alt="Logo" className="h-8 w-8 rounded-lg" />
              <span className="font-semibold">{BRAND.name}</span>
            </div>
            <p className="mt-3">
              Addiction is not the end of the story. With the right support, a new beginning is possible.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-medium text-slate-800">Navigate</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a className="hover:opacity-70" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:opacity-70" href="#programs">
                    Programs
                  </a>
                </li>
                <li>
                  <a className="hover:opacity-70" href="#approach">
                    Approach
                  </a>
                </li>
                <li>
                  <a className="hover:opacity-70" href="#admissions">
                    Admissions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-800">Help</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a className="hover:opacity-70" href="#testimonials">
                    Stories
                  </a>
                </li>
                <li>
                  <a className="hover:opacity-70" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <p>
              © {new Date().getFullYear()} {BRAND.name}. A faith-based 501(c)(3) nonprofit. All
              rights reserved.
            </p>
            <p className="mt-2">
              *Disclaimer: This site does not provide medical advice. In emergencies call 911.
            </p>
          </div>
        </div>
      </footer>

      {/* Плавающая кнопка звонка */}
      <a href={`tel:${BRAND.phone}`} className="fixed right-4 bottom-4">
        <Button
          className="rounded-full h-14 w-14 shadow-lg"
          style={{ background: BRAND.colors.primaryDark }}
          aria-label="Call us"
        >
          <Phone className="h-6 w-6 text-white" />
        </Button>
      </a>
    </div>
  );
}

// Appended openStripeInNewTab implementation
/* REPLACEMENT: openStripeInNewTab — вставлять вместо старой реализации */
const openStripeInNewTab = async (createSession: () => Promise<{url?: string}>) : Promise<void> => {
  // Попробуем открыть пустое окно немедленно — это уменьшает риск блокировки всплывающего окна.
  let win: Window | null = null;
  try {
    win = window.open("", "_blank");
  } catch (e) {
    win = null;
  }

  try {
    // Создаём сессию (запрос к API). createSession должен вернуть объект { url: "https://checkout..." }
    const session = await createSession();
    const url = session && session.url;

    if (!url) {
      // Если нет url — закроем вспомогательное окно и покажем ошибку
      if (win) try { win.close(); } catch (_) {}
      throw new Error("No checkout URL returned from server");
    }

    // Если у нас есть окно (не заблокировано) — навигируем его на Stripe Checkout
    if (win) {
      try {
        // Попытка безопасно перенаправить новое окно (без редиректа основного окна)
        win.location.href = url;
        try { win.focus(); } catch (_) {}
        return;
      } catch (_) {
        // если не удалось назначить location (редко) — попытаемся открыть ссылку стандартно
        try { window.open(url, "_blank"); return; } catch (e) {}
      }
    }

    // Если окно было заблокировано (win == null) — пробуем открыть checkout в новой вкладке
    try {
      window.open(url, "_blank");
    } catch (e) {
      // Последний резерв — уведомим пользователя и не трогаем основное окно
      alert("Не удалось открыть окно оплаты. Пожалуйста, разрешите всплывающие окна или перейдите по ссылке: " + url);
    }
  } catch (err: any) {
    // Ошибка при создании сессии
    console.error("openStripeInNewTab error:", err);
    if (win) try { win.close(); } catch (_) {}
    const msg = (err && err.message) ? err.message : String(err);
    alert("Ошибка инициации оплаты: " + msg);
  }
};
export { openStripeInNewTab };

