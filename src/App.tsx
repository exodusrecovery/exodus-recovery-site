import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useAnimation } from "framer-motion";

// Components
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import BeforeAfter from "@/components/BeforeAfter";
import LazyYouTube from "@/components/LazyYouTube";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Lucide icons
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
  AlertTriangle,
  HeartHandshake,
  HeartPulse,
  Briefcase,
  History as HistoryIcon,
  MessageCircle,
  ClipboardCheck,
  // Icons for Admissions
  PhoneCall,
  ClipboardList,
  Home,
  ChevronDown, 
} from "lucide-react";

// ==== Motion presets ====
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

// Only ONE default export!
  function ContactMailto(): React.ReactElement {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Пожалуйста, заполните имя, email и сообщение.");
      return;
    }
    setLoading(true);
    try {
      const endpoint = `${window.location.origin}/api/send-contact`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormData({ name: "", email: "", message: "" });
        alert("Сообщение отправлено.");
      } else {
        const data = await res.json().catch(() => ({ error: "unknown" }));
        alert("Ошибка: " + (data?.error || "send failed"));
      }
    } catch (err: any) {
      alert("Ошибка отправки: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#2d2846] text-white px-6 py-2 font-semibold hover:opacity-90"
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </div>
    </form>
  );
}

export default function RehabWebsite() {
// ------------------------- Stripe helpers (working implementation) -------------------------
  const [oneTimeInput, setOneTimeInput] = useState<string>("");
  const [selectedPriceId, setSelectedPriceId] = useState<string>("price_1SQdWEBrWBoIIHjWnOeeyFNE");
const [openFaq, setOpenFaq] = useState<number | null>(null);

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
      // если окно заблокировано, просто перенаправляем текущую страницу
      createSession()
        .then((url) => (window.location.href = url))
        .catch((e) => alert(e.message || "Stripe error"));
      return;
    }

    // временное сообщение пока создаётся сессия
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
    const cleaned = val.replace(/\$/g, "").replace(/,/g, "");
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

  const handleDonateMonthly = (priceOrAmount: string | number) => {
  let resolvedPriceId: string | undefined;

  if (typeof priceOrAmount === "string" && priceOrAmount.startsWith("price_")) {
    resolvedPriceId = priceOrAmount;
  } else {
    const amt = typeof priceOrAmount === "string" ? Number(priceOrAmount) : priceOrAmount;

    switch (amt) {
      case 25:
        resolvedPriceId = import.meta.env.VITE_STRIPE_PRICE_25;
        break;
      case 50:
        resolvedPriceId = import.meta.env.VITE_STRIPE_PRICE_50;
        break;
      case 100:
        resolvedPriceId = import.meta.env.VITE_STRIPE_PRICE_100;
        break;
      case 200:
        resolvedPriceId = import.meta.env.VITE_STRIPE_PRICE_200;
        break;
      case 500:
        resolvedPriceId = import.meta.env.VITE_STRIPE_PRICE_500;
        break;
      default:
        alert("No price selected");
        return;
    }
  }

  if (!resolvedPriceId) {
    alert("Price ID not configured");
    return;
  }

  openStripeInNewTab(() =>
    createCheckoutSession({
      mode: "subscription",
      price_id: resolvedPriceId,
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
<section
  id="hero"
  className="relative overflow-hidden border-b border-slate-200"
  aria-labelledby="hero-title"
>
  {/* Мягкий фон-градиент */}
  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#f4f5ff] via-white to-[#f7fbff]" />

  <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
    {/* LEFT — текст + CTA */}
    <div>
      {/* бейдж сверху */}
      <div className="inline-flex items-center gap-2 rounded-full bg-[var(--brand)]/8 text-[var(--brand)] px-3 py-1 text-xs font-semibold mb-4">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand)] text-white text-[10px]">
          ✓
        </span>
        Faith-based long-term recovery
      </div>

      <h1
        id="hero-title"
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.05] text-slate-900 tracking-tight"
      >
        A new life{" "}
        <span className="text-[var(--brand)]">
          starts today
        </span>.
      </h1>

      <p className="mt-5 text-lg md:text-xl text-slate-600 max-w-xl">
        Confidential, judgment-free recovery with structure, community, and hope.
        Real change begins with one step — you don’t have to walk it alone.
      </p>

      {/* hotline */}
      <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-[11px]">
          📞
        </span>
        <span className="text-slate-700 text-sm">
          Need help now?{" "}
          <strong className="font-semibold">
            (571) 982-2395
          </strong>
          {" • "}
          <span className="text-emerald-600 font-medium">
            Call 24/7
          </span>
        </span>
      </div>

      {/* CTAs */}
      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href="#contact"
          className="btn-brand"
        >
          Get Help Now
        </a>
        <a
          href="#programs"
          className="btn-outline-brand"
        >
          Explore Programs
        </a>
      </div>

      {/* trust line */}
      <div className="mt-5 flex flex-wrap items-center gap-3 text-slate-500 text-sm">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[11px]">
          ✓
        </span>
        <span>Faith-based 501(c)(3) nonprofit</span>
        <span className="hidden md:inline-block text-slate-300">•</span>
        <span>Confidential • Long-term residential & outpatient care</span>
      </div>

      {/* мини-пункты */}
      <ul className="mt-6 space-y-2 text-slate-700 text-[15px]">
        <li className="flex items-start gap-2">
          <span className="text-emerald-600 mt-1">✔</span>
          Stage 1: 6-month residential program
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-600 mt-1">✔</span>
          Stage 2: 12-month social resocialization
        </li>
        <li className="flex items-start gap-2">
          <span className="text-emerald-600 mt-1">✔</span>
          Outpatient & co-dependency courses for families
        </li>
      </ul>
    </div>

    {/* RIGHT — карточка с видео */}
    <div className="relative">
      {/* лёгкая подсветка под карточкой */}
      <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-[var(--brand)]/10 via-transparent to-[var(--accent)]/10 blur-2xl -z-10" />

      <div className="relative rounded-3xl bg-slate-100/80 border border-slate-200 overflow-hidden shadow-[0_18px_50px_rgba(15,23,42,0.18)]">
        {/* бейдж поверх */}
        <div className="absolute left-4 top-4 z-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-black/65 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            Real story • 2 min
          </span>
        </div>

        {/* lazy YouTube */}
        <div className="aspect-video">
          <LazyYouTube videoId="rf4kmI2G7RU" />
        </div>

        {/* подпись под видео */}
        <div className="border-t border-slate-200 bg-white/90 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="text-xs md:text-sm text-slate-600">
            <span className="font-semibold text-slate-800">
              Real people. Real change.
            </span>{" "}
            — filmed with alumni of Exodus Recovery.
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-[11px]">
              ✓
            </span>
            <span>100+ lives impacted</span>
          </div>
        </div>
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
              role: "Free for 10 years • Graduate • Mentor",
              quote:
  "God gave me freedom and a new life. Today I am 10 years clean and helping others find the same hope.",
              img: "/images/people/feliks.jpg",
            },
            {
              name: "Jessica Steinacker",
              role: "Graduate • 8 year sober",
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

      {/* ===== Styled Support / Donate (заменить существующий блок) ===== */}
<Section
  id="support"
  title="Support the Mission"
  subtitle="Your generosity helps us bring hope, freedom, and restoration through the ministry of Church of God Exodus."
>
  <div className="relative py-16">

    {/* Decorative glows */}
    <div className="absolute -top-12 -left-12 h-56 w-56 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
    <div className="absolute -bottom-12 -right-20 h-72 w-72 rounded-full bg-indigo-100/40 blur-3xl pointer-events-none" />

    <motion.div
      className="relative mx-auto max-w-3xl rounded-3xl bg-white p-10 shadow-2xl ring-1 ring-gray-200 text-center"
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >

      {/* ✅ Текст теперь сверху */}
      <h3 className="text-3xl font-bold text-slate-900 mb-3">
        Give to Exodus Recovery
      </h3>

      <p className="text-slate-600 text-lg leading-relaxed mb-4">
        Your gift supports our ministry and outreach to people seeking freedom and a new life in Christ.
      </p>

      <p className="text-sm text-slate-500 mb-10">
        All donations are securely processed by Stripe.
      </p>

      {/* ----- TWO CARDS BELOW ----- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* One-time donation */}
        <div className="rounded-2xl border border-slate-100 p-6 bg-gradient-to-b from-white to-slate-50 shadow-md">
          <div className="flex flex-col h-full items-center justify-between">
            <div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--brand)] text-white text-lg font-semibold mb-3">
                $
              </div>
              <label className="text-sm text-slate-600 mb-2 block">One-time donation</label>
            </div>

            <div className="flex items-center gap-3 w-full mt-4">
              <Input
                value={oneTimeInput}
                onChange={(e) => setOneTimeInput(e.target.value)}
                placeholder="Amount (e.g. 25)"
                aria-label="One time amount"
                className="w-full"
              />
              <button
                type="button"
                onClick={handleDonateOnce}
                className="whitespace-nowrap rounded-xl bg-[var(--brand)] text-white px-4 py-2 font-semibold shadow hover:bg-[var(--brand-dark)] transition"
              >
                Give
              </button>
            </div>
          </div>
        </div>

        {/* Monthly donation */}
        <div className="rounded-2xl border border-slate-100 p-6 bg-white shadow-md">
          <div className="flex flex-col h-full items-center justify-between">
            <div>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[var(--accent)] text-white text-lg font-semibold mb-3">
                ↻
              </div>
              <label className="text-sm text-slate-600 mb-2 block">Monthly support</label>
            </div>

            <div className="flex items-center gap-3 w-full mt-4">
              <select
  value={selectedPriceId}
  onChange={(e) => setSelectedPriceId(e.target.value)}
  className="px-3 py-2 rounded-xl border w-full"
>
  <option value="price_1SQdWEBrWBoIIHjWnOeeyFNE">$25 / month</option>
  <option value="price_1SQdWEBrWBoIIHjWpWfpPtzs">$50 / month</option>
  <option value="price_1SQdWEBrWBoIIHjW4nXcPcBM">$100 / month</option>
  <option value="price_1SQdWEBrWBoIIHjWnHMtdv84">$200 / month</option>
  <option value="price_1SQdWEBrWBoIIHjWqHoNPT0i">$500 / month</option>
</select>

<button
  type="button"
  onClick={() => handleDonateMonthly(selectedPriceId)}
  className="whitespace-nowrap rounded-xl bg-black text-white px-4 py-2 font-semibold shadow hover:bg-gray-800 transition"
>
  Subscribe
</button>
            </div>
          </div>
        </div>
      </div>
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
      <Section
  id="admissions"
  title="Admissions"
  subtitle="A clear and compassionate path to get started."
>
  <div className="grid md:grid-cols-3 gap-6">
    {/* Step 1 */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex items-center gap-3">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: BRAND.colors.muted }}
        >
          <MessageCircle className="h-6 w-6" style={{ color: BRAND.colors.primary }} />
        </span>
        <CardTitle>Free Consultation</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-700 space-y-2">
        <p>
          Call us or submit a form. We’ll help you choose inpatient or outpatient care and explain
          every step in detail.
        </p>
      </CardContent>
    </Card>

    {/* Step 2 */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex items-center gap-3">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: BRAND.colors.muted }}
        >
          <ClipboardCheck className="h-6 w-6" style={{ color: BRAND.colors.primary }} />
        </span>
        <CardTitle>Assessment & Plan</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-700 space-y-2">
        <p>
          A full clinical and spiritual assessment, goal-setting, treatment plan, and scheduling.
        </p>
      </CardContent>
    </Card>

    {/* Step 3 */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex items-center gap-3">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: BRAND.colors.muted }}
        >
          <HeartHandshake className="h-6 w-6" style={{ color: BRAND.colors.primary }} />
        </span>
        <CardTitle>Start Treatment</CardTitle>
      </CardHeader>
      <CardContent className="text-slate-700 space-y-2">
        <p>
          You begin your program with full support, community connection, and structured daily
          guidance.
        </p>
      </CardContent>
    </Card>
  </div>

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

            {/* FAQ */}
      <Section
        id="faq"
        title="Frequently Asked Questions"
        subtitle="Honest answers to common questions about Exodus Recovery."
      >
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              q: "Who is Exodus Recovery for?",
              a: "We serve men and women who are struggling with addiction and are ready to commit to a structured, faith-based program and take responsibility for change.",
            },
            {
              q: "Do I have to be religious to come?",
              a: "No. We welcome anyone who is open to a Christ-centered environment. You will never be forced to believe, but you will be invited to explore faith and ask questions.",
            },
            {
              q: "How long is the program?",
              a: "Our core residential program is approximately 6 months, followed by a 12-month social resocialization phase. We also offer outpatient support and co-dependency courses.",
            },
            {
              q: "Do you work with families?",
              a: "Yes. We offer co-dependency and family education, help rebuild trust, and give loved ones tools to support healthy recovery without enabling addiction.",
            },
            {
              q: "Is my information confidential?",
              a: "Yes. We treat every call, message, and application with strict confidentiality and are committed to protecting your privacy.",
            },
            {
              q: "What is the first step to get help?",
              a: "The first step is simple: reach out. Call us or fill out the contact form. Our team will listen without judgment and help you understand your next step.",
            },
            {
              q: "What do you believe about healing and transformation?",
              a: "We believe that true and lasting freedom is possible for anyone who trusts God. What is impossible for people is possible with God. As Jesus said in John 8:31–32: “If you continue in My word, you are truly My disciples, and you will know the truth, and the truth will set you free.”",
            },
            {
              q: "How do you see God’s role in the recovery process?",
              a: "We believe that God works powerfully through people. He restores what is broken and gives strength to rebuild what seemed destroyed. As written in Isaiah 58:12: “You will rebuild the ancient ruins and will raise up the age-old foundations.” We simply join Him in this work — helping people rebuild their lives with hope, dignity, and purpose.",
            },
          ].map((item, i) => {
            const isOpen = openFaq === i;

            return (
              <Card
                key={i}
                className="rounded-2xl shadow-sm border border-slate-200 bg-white"
              >
                {/* Кнопка-вопрос */}
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full text-left"
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-1">
                        <MessageCircle className="h-5 w-5 text-[var(--brand)]" />
                      </span>
                      <CardTitle className="text-base md:text-lg">
                        {item.q}
                      </CardTitle>
                    </div>
                    <ChevronDown
                      className={
                        "h-5 w-5 text-slate-400 transition-transform duration-200" +
                        (isOpen ? " rotate-180" : "")
                      }
                    />
                  </CardHeader>
                </button>

                {/* Ответ – показываем только если открыт */}
                {isOpen && (
                  <CardContent className="pt-0 pb-4 px-6 text-slate-700 text-sm md:text-[15px] leading-relaxed">
                    {item.a}
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </Section>
      
      {/* Contact */}
<Section id="contact" title="Contact">
  <div className="grid md:grid-cols-2 gap-6 items-start">
    {/* Left: Contact Form */}
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Contact us</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4">
        {/* 💥 НАСТОЯЩАЯ РАБОЧАЯ ФОРМА */}
        <ContactForm />

        <div className="text-sm text-slate-600">
          or call{" "}
          <a className="underline" href={`tel:${BRAND.phone}`}>
            {BRAND.phone}
          </a>
        </div>
      </CardContent>
    </Card>

    {/* Right: Find us */}
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

      {/** Footer */}
<footer className="mt-10 border-t border-slate-200">
  <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
    <div>
      <div className="flex items-center gap-4">
        <img
          src="/logo-exodus.svg"
          alt="Exodus Recovery"
          className="h-20 md:h-28 w-auto"
          style={{ display: "block" }}
        />
        <span className="font-semibold text-lg">{BRAND.name}</span>
      </div>

      <p className="mt-3 text-slate-600">
        Addiction is not the end of the story. With the right support, a new beginning is possible.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div>
        <p className="font-medium text-slate-800">Navigate</p>
        <ul className="mt-2 space-y-2">
          <li><a className="hover:opacity-70" href="#about">About</a></li>
          <li><a className="hover:opacity-70" href="#programs">Programs</a></li>
          <li><a className="hover:opacity-70" href="#approach">Approach</a></li>
          <li><a className="hover:opacity-70" href="#admissions">Admissions</a></li>
        </ul>
      </div>

      <div>
        <p className="font-medium text-slate-800">Help</p>
        <ul className="mt-2 space-y-2">
          <li><a className="hover:opacity-70" href="#testimonials">Stories</a></li>
          <li><a className="hover:opacity-70" href="#contact">Contact</a></li>
        </ul>
      </div>
    </div>

    <div>
      <p>
        © {new Date().getFullYear()} {BRAND.name}. A faith-based 501(c)(3) nonprofit. All rights reserved.
      </p>
      <p className="mt-2">*Disclaimer: This site does not provide medical advice. In emergencies call 911.</p>
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
