import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Heart, Phone, Mail, MapPin, ArrowRight, Calendar, Users, BookOpen, } from "lucide-react";
import { AlertTriangle, HeartHandshake, HeartPulse, Briefcase, History as HistoryIcon, } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { useRef } from "react";
import { useInView, useAnimation } from "framer-motion";
// ==== Motion presets ====
const fadeInUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};
function Reveal({ children, className, style, }) {
    const ref = useRef(null);
    const inView = useInView(ref, { margin: "-20% 0px -20% 0px" });
    const controls = useAnimation();
    React.useEffect(() => {
        if (inView)
            controls.start("show");
        else
            controls.start("hidden");
    }, [inView, controls]);
    return (_jsx(motion.div, { ref: ref, variants: fadeInUp, initial: "hidden", animate: controls, className: className, style: style, children: children }));
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
const GALLERY = [
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
        src: "/videos/feliks.mp4", // файл положи в public/videos/feliks.mp4
        thumb: "/images/people/feliks.jpg",
        duration: "2:37",
    },
    // Добавляй новые записи по этому же шаблону
];
// Общий секшен (с анимацией появления контента)
// Общий секшен (с анимацией появления контента)
const Section = ({ id, title, subtitle, children }) => (_jsx("section", { id: id, className: "py-16 md:py-24", "aria-labelledby": id ? `${id}-title` : undefined, children: _jsxs("div", { className: "max-w-6xl md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [(title || subtitle) && (_jsxs(motion.div, { initial: { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 }, className: "text-center", children: [title ? (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("h2", { id: id ? `${id}-title` : undefined, className: "text-3xl md:text-4xl font-bold tracking-tight text-slate-900", children: title }), _jsx("span", { className: "brand-underline mt-3", "aria-hidden": "true" })] })) : null, subtitle ? (_jsx("p", { className: "mt-3 text-base md:text-lg text-slate-600", children: subtitle })) : null] })), _jsx(motion.div, { className: "mt-8 md:mt-12", variants: fadeInUp, initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" }, children: children })] }) }));
// Карточка программы
const ProgramCard = ({ icon: Icon, title, points }) => (_jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-3 text-xl", children: [_jsx("span", { className: "inline-flex h-11 w-11 items-center justify-center rounded-xl", style: { background: BRAND.colors.muted }, children: _jsx(Icon, { "aria-hidden": true, className: "h-6 w-6", style: { color: BRAND.colors.primary } }) }), title] }) }), _jsx(CardContent, { className: "space-y-3", children: points.map((p, i) => (_jsxs("p", { className: "flex items-start gap-2 text-slate-700", children: [_jsx(Check, { className: "mt-1 h-5 w-5", style: { color: BRAND.colors.accent } }), p] }, i))) })] }));
// Форма связи (mailto)
const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState(""); // ← добавили телефон
    const [message, setMessage] = useState("");
    const mailto = () => {
        const subject = encodeURIComponent(`[Inquiry] ${name}`);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
        return `mailto:${BRAND.email}?subject=${subject}&body=${body}`;
    };
    return (_jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Contact us" }) }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Your name" }), _jsx(Input, { value: name, onChange: (e) => setName(e.target.value), placeholder: "John Smith" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx(Input, { type: "email", value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone" }), _jsx(Input, { type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+1 (555) 123-4567" })] }), _jsxs("div", { className: "md:col-span-2", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Message" }), _jsx(Textarea, { value: message, onChange: (e) => setMessage(e.target.value), rows: 5, placeholder: "Briefly describe your situation" })] })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("a", { href: mailto(), children: _jsxs(Button, { className: "rounded-xl px-6 text-base", style: { background: BRAND.colors.primary }, children: ["Send request ", _jsx(ArrowRight, { className: "ml-2 h-5 w-5" })] }) }), _jsxs("div", { className: "text-sm text-slate-600", children: ["or call", " ", _jsx("a", { className: "underline", href: `tel:${BRAND.phone}`, children: BRAND.phone })] })] })] })] }));
};
export default function RehabWebsite() {
    // ------------------------- Stripe helpers (working implementation) -------------------------
    async function createCheckoutSession(payload) {
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
        if (!data?.url)
            throw new Error(data?.error?.message || "Stripe error: no url in response");
        return data.url;
    }
    function openStripeInNewTab(createSession) {
        const win = window.open("", "_blank", "noopener,noreferrer");
        if (!win) {
            createSession()
                .then((url) => { window.location.href = url; })
                .catch((e) => alert(e?.message || "Stripe error"));
            return;
        }
        try {
            win.opener = null;
        }
        catch { }
        try {
            win.document.write("<!doctype html><html><head><meta charset='utf-8'><title>Redirecting…</title></head><body style='font-family:system-ui, -apple-system, Roboto, sans-serif; padding:24px;'><h2>Redirecting to secure payment...</h2><p>If you are not redirected automatically, please wait or close this tab and try again.</p></body></html>");
        }
        catch { }
        createSession()
            .then((url) => {
            try {
                win.location.href = url;
            }
            catch (err) {
                try {
                    win.close();
                }
                catch { }
                alert("Could not open Stripe Checkout in the new tab.");
            }
        })
            .catch((e) => { try {
            win.close();
        }
        catch { } alert(e?.message || "Stripe error"); });
    }
    const handleDonateOnce = (amountCents) => {
        openStripeInNewTab(() => createCheckoutSession({
            mode: "payment",
            amount: amountCents,
        }));
    };
    const handleDonateMonthly = (priceId = "price_1SQdWEBrWBoIIHjWnOeeyFNE") => {
        openStripeInNewTab(() => createCheckoutSession({
            mode: "subscription",
            price_id: priceId,
        }));
    };
    // ------------------------- end Stripe helpers ------------------------------------------------
    const [showFeliks, setShowFeliks] = useState(false);
    const [activeVideo, setActiveVideo] = useState(0);
    // === Stripe test handlers ===
    // ...дальше идёт return(...)
    return (_jsxs("div", { className: "relative overflow-hidden min-h-screen bg-gradient-to-b from-gray-100 to-gray-200", style: { color: BRAND.colors.text }, children: [_jsx("div", { className: "pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/30 blur-3xl" }), _jsx("div", { className: "pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/20 blur-3xl" }), _jsx("style", { children: `
     
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
` }), _jsx(Header, {}), _jsx("section", { id: "hero", className: "relative", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8 items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl md:text-3xl font-semibold text-[var(--brand)] mb-1", children: "Recovery starts with one step" }), _jsxs("h1", { className: "text-4xl md:text-6xl font-extrabold leading-[1.05] text-slate-900", children: ["A new life ", _jsx("span", { className: "text-[var(--brand)]", children: "starts today" }), "."] }), _jsx("p", { className: "mt-5 text-lg md:text-xl text-slate-600", children: "Confidential, judgment-free recovery with structure, community, and hope. Real change begins with one step." }), _jsxs("div", { className: "mt-5 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm", children: [_jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px]", children: "\u2713" }), _jsxs("span", { className: "text-slate-700 text-sm", children: ["Need help now? ", _jsx("strong", { children: "(571) 982-2395" })] })] }), _jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [_jsx("a", { href: "#contact", className: "rounded-xl bg-[var(--brand)] hover:bg-[var(--brand-dark)] px-6 py-3 font-semibold text-white shadow-sm", children: "Get Help Now" }), _jsx("a", { href: "#programs", className: "rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50", children: "Explore Programs" })] }), _jsxs("div", { className: "mt-5 flex items-center gap-3 text-slate-500 text-sm", children: [_jsx("span", { className: "inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300", children: "\u2713" }), _jsx("span", { children: "501(c)(3) nonprofit \u2022 Confidential \u2022 HIPAA-minded" })] }), _jsxs("ul", { className: "mt-6 space-y-2 text-slate-700 text-[15px]", children: [_jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-emerald-600 mt-1", children: "\u2714" }), " Stage 1: 6-month residential program"] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-emerald-600 mt-1", children: "\u2714" }), " Stage 2: 12-month social resocialization"] }), _jsxs("li", { className: "flex items-start gap-2", children: [_jsx("span", { className: "text-emerald-600 mt-1", children: "\u2714" }), " Outpatient + co-dependency courses"] })] })] }), _jsxs("div", { className: "relative rounded-3xl bg-slate-100 border border-slate-200 overflow-hidden shadow-[0_10px_30px_rgba(2,6,23,0.06)]", children: [_jsx("div", { className: "aspect-video", children: _jsx("iframe", { width: "1280", height: "720", src: "https://www.youtube.com/embed/rf4kmI2G7RU", title: "Exodus Recovery story", frameBorder: "0", allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowFullScreen: true, className: "w-full h-full" }) }), _jsx("div", { className: "absolute left-3 top-3", children: _jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur", children: [_jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-emerald-400" }), "Watch a real story (2 min)"] }) })] })] }) }), _jsxs(Section, { id: "stories", title: "Real People. Real Change.", subtitle: "Stories of restoration, hope, and freedom.", children: [_jsx(motion.div, { className: "grid md:grid-cols-3 gap-6", variants: stagger, initial: "hidden", whileInView: "show", viewport: { once: true }, children: [
                            {
                                name: "Feliks Galkin",
                                role: "Graduate • 1 year sober",
                                quote: "I grew up in Philadelphia and started using drugs at 12. By 17 I was arrested and lost everything. At Exodus Recovery, God changed my heart and gave me true freedom and purpose.",
                                img: "/images/people/feliks.jpg",
                            },
                            {
                                name: "Jessica Steinacker",
                                role: "Graduate • 1 year sober",
                                quote: "For years I searched for something to fill the emptiness inside. Addiction only broke me further. At Exodus Recovery, I met Jesus — He gave me true freedom, hope, and purpose.",
                                img: "/images/people/jessica.jpg",
                            },
                            {
                                name: "Andrey Andriyak",
                                role: "Graduate • 2 years sober",
                                quote: "For 15 years I struggled with addiction. At Exodus Recovery I finally found freedom, true friends, and a new family. God gave me purpose and a calling to help others find the same freedom.",
                                img: "/images/people/andrey.jpg",
                            },
                        ].map((p, i) => (_jsxs(motion.div, { variants: fadeInUp, whileHover: { y: -4, scale: 1.01 }, transition: { type: "spring", stiffness: 250, damping: 20 }, className: `relative overflow-hidden rounded-2xl shadow-lg group ${p.name === "Feliks Galkin" ? "cursor-pointer" : ""}`, onClick: () => { if (p.name === "Feliks Galkin")
                                setShowFeliks(true); }, role: p.name === "Feliks Galkin" ? "button" : undefined, "aria-label": p.name === "Feliks Galkin" ? "Play Feliks video testimony" : undefined, children: [_jsx("img", { src: p.img, alt: p.name, className: "h-80 w-full object-contain bg-gray-100 transition-transform duration-500 group-hover:scale-[1.03]", loading: "lazy" }), p.name === "Feliks Galkin" && (_jsx("div", { className: "absolute left-3 top-3", children: _jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-black/60 text-white text-xs md:text-sm px-3 py-1.5 backdrop-blur", children: [_jsx("span", { className: "inline-block h-2 w-2 rounded-full bg-emerald-400" }), "Click to watch"] }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }), _jsxs("div", { className: "absolute bottom-0 left-0 right-0 p-5 text-white", children: [_jsx("p", { className: "text-lg font-semibold", children: p.name }), _jsx("p", { className: "text-xs text-white/80", children: p.role }), _jsxs("p", { className: "mt-2 text-sm leading-snug", children: ["\u201C", p.quote, "\u201D"] })] })] }, i))) }), _jsx("div", { className: "mt-8", children: _jsx(Link, { to: "/videos", children: _jsx(Button, { className: "rounded-xl px-6 text-base", style: { background: BRAND.colors.accent }, children: "Watch video testimonies" }) }) })] }), _jsxs(Section, { id: "gallery", title: "Recovery Life", subtitle: "Photos from our community", children: [_jsx(motion.div, { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4", variants: stagger, initial: "hidden", whileInView: "show", viewport: { once: true }, children: [
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
                            .map((src, i) => (_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, whileHover: { scale: 1.05 }, transition: { duration: 0.4, ease: "easeOut" }, viewport: { once: true }, className: "relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm group", style: { aspectRatio: "4 / 3" }, children: [_jsx("img", { src: src, alt: `Gallery ${i + 1}`, className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", loading: "lazy" }), _jsx("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })] }, i))) }), _jsx("div", { className: "mt-10 text-center", children: _jsx("a", { href: "/gallery", className: "inline-block rounded-xl bg-[var(--brand)] text-white px-8 py-3 text-lg font-semibold shadow-md hover:bg-[var(--brand-dark)] transition", children: "View full gallery \u2192" }) })] }), showFeliks && (_jsx("div", { className: "fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4", onClick: () => setShowFeliks(false), "aria-modal": "true", role: "dialog", children: _jsxs("div", { className: "relative w-full max-w-3xl rounded-2xl overflow-hidden bg-black shadow-2xl", onClick: (e) => e.stopPropagation(), children: [_jsx("button", { onClick: () => setShowFeliks(false), className: "absolute right-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-sm font-medium shadow hover:bg-white", "aria-label": "Close video", children: "Close" }), _jsx("div", { className: "aspect-video", children: _jsxs("video", { className: "h-full w-full", controls: true, preload: "metadata", poster: "/images/people/feliks.jpg", children: [_jsx("source", { src: "/videos/feliks.mp4", type: "video/mp4" }), "Your browser does not support the video tag."] }) })] }) })), _jsx(Section, { id: "support", title: "Support the Mission", subtitle: "Your generosity helps us bring hope, freedom, and restoration through the ministry of Church of God Exodus.", children: _jsxs("div", { className: "relative py-16", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 rounded-3xl" }), _jsx("div", { className: "pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-emerald-100/40 blur-3xl" }), _jsx("div", { className: "pointer-events-none absolute bottom-0 right-1/3 h-64 w-64 rounded-full bg-indigo-100/40 blur-3xl" }), _jsxs(motion.div, { className: "relative mx-auto max-w-md rounded-2xl bg-white p-10 shadow-2xl ring-1 ring-gray-200 text-center backdrop-blur-sm", variants: fadeInUp, initial: "hidden", whileInView: "show", whileHover: { scale: 1.02 }, transition: { type: "spring", stiffness: 120 }, viewport: { once: true, margin: "-80px" }, children: [_jsx("h4", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Give to Church of God Exodus" }), _jsx("p", { className: "text-gray-600 mb-6 text-base leading-relaxed", children: "Your gift supports our church ministry and outreach to people seeking freedom and a new life in Christ." }), _jsxs("div", { className: "mt-6 grid gap-3 sm:grid-cols-2", children: [_jsx("button", { onClick: () => openStripeInNewTab(() => createCheckoutSession({ mode: "payment", amount: 5000 })), className: "inline-block rounded-xl bg-black text-white px-6 py-3 font-semibold shadow-md hover:bg-gray-800 transition", type: "button", children: "One-time donation \u2014 $50" }), _jsx("button", { onClick: () => openStripeInNewTab(() => createCheckoutSession({ mode: "subscription", price_id: "price_1SQdWEBrWBoIIHjWnOeeyFNE" })), className: "inline-block rounded-xl bg-[var(--brand)] text-white px-6 py-3 font-semibold shadow-md hover:bg-[var(--brand-dark)] transition", type: "button", children: "Subscribe \u2014 $20/mo" })] }), _jsxs("p", { className: "mt-6 text-sm text-gray-500 leading-relaxed", children: ["All donations are securely processed by Stripe. ", _jsx("br", {}), "Thank you for partnering with us in this ministry."] })] })] }) }), _jsx(Section, { id: "programs", title: "Programs", subtitle: "Multi-stage care tailored to your recovery journey.", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [_jsx(ProgramCard, { icon: Calendar, title: "Stage 1 - Inpatient (6 months)", points: [
                                "Residential, structured daily schedule",
                                "Discipleship, counseling, work therapy",
                                "Relapse-prevention & life skills",
                            ] }), _jsx(ProgramCard, { icon: Heart, title: "Stage 2 - Social Resocialization (12 months)", points: [
                                "Transitional housing & mentoring",
                                "Job readiness & education",
                                "Service, church integration, alumni support",
                            ] }), _jsx(ProgramCard, { icon: Users, title: "Outpatient", points: [
                                "Individual & group sessions",
                                "Flexible schedules around work/family",
                                "Aftercare planning & accountability",
                            ] }), _jsx(ProgramCard, { icon: BookOpen, title: "Family & Co-dependency Courses", points: [
                                "Education and boundaries",
                                "Support for loved ones",
                                "Healthy family recovery plan",
                            ] })] }) }), _jsx("section", { "aria-label": "Impact and outcomes", className: "py-10", style: { background: BRAND.colors.muted }, children: _jsx("div", { className: "max-w-6xl mx-auto px-4", children: _jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4", children: [
                            { label: "People supported", value: "100+" },
                            { label: "Typical journey", value: "6–12 mo" },
                            { label: "Service area", value: "Nationwide" },
                            { label: "Alumni mentors", value: "Growing" },
                        ].map((s, i) => (_jsxs("div", { className: "rounded-2xl bg-white border border-slate-200 p-6 text-center shadow-sm", children: [_jsx("div", { className: "text-3xl font-bold text-slate-900", children: s.value }), _jsx("div", { className: "mt-1 text-sm text-slate-600", children: s.label })] }, i))) }) }) }), _jsxs(Section, { id: "how", title: "How It Works", subtitle: "A clear, compassionate path from first contact to aftercare.", children: [_jsx("div", { className: "grid md:grid-cols-5 gap-6", children: [
                            { n: 1, t: "Reach Out", d: "Call or message us. We’ll listen without judgment and explain next steps." },
                            { n: 2, t: "Assessment", d: "We review needs, risks, and goals to recommend the right level of care." },
                            { n: 3, t: "Plan", d: "Personalized plan: inpatient or outpatient + family/co-dependency support." },
                            { n: 4, t: "Care & Community", d: "Counseling, skills, mentoring, peer groups, and routine." },
                            { n: 5, t: "Aftercare", d: "Relapse prevention, alumni support, and ongoing accountability." },
                        ].map((step) => (_jsxs("div", { className: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", children: [_jsx("div", { className: "h-9 w-9 rounded-full flex items-center justify-center font-semibold text-white", style: { background: BRAND.colors.accent }, children: step.n }), _jsx("h3", { className: "mt-3 font-semibold text-slate-900", children: step.t }), _jsx("p", { className: "mt-2 text-sm text-slate-600", children: step.d })] }, step.n))) }), _jsxs("div", { className: "mt-8 flex flex-wrap gap-3", children: [_jsx("a", { href: "#contact", children: _jsx(Button, { className: "rounded-xl px-6 text-base", style: { background: BRAND.colors.primary, color: "white" }, children: "Get Help Now" }) }), _jsx("a", { href: "#admissions", children: _jsx(Button, { variant: "outline", className: "rounded-xl px-6 text-base border-slate-300", children: "Admissions" }) })] })] }), _jsx(Section, { id: "approach", title: "Our Approach", subtitle: "Whole-person care: body \u2022 mind \u2022 spirit", children: _jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-6 w-6 text-amber-500" }), _jsx(CardTitle, { children: "National Crisis" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "Over 46 million Americans live with substance use disorders. Exodus Recovery provides structured, compassionate programs to meet this need." }) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(HeartHandshake, { className: "h-6 w-6 text-green-600" }), _jsx(CardTitle, { children: "Whole-Person Healing" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "We combine evidence-based therapy, mentoring, and optional faith guidance so participants heal emotionally, physically, and spiritually." }) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-6 w-6 text-blue-600" }), _jsx(CardTitle, { children: "Family & Community" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "Families are restored through education and support. Graduates mentor new residents and volunteer in the community." }) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(HeartPulse, { className: "h-6 w-6 text-rose-500" }), _jsx(CardTitle, { children: "Health & Stability" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "Participants rebuild healthy habits, strengthen resilience, and learn tools for long-term sobriety and balance." }) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(Briefcase, { className: "h-6 w-6 text-emerald-600" }), _jsx(CardTitle, { children: "Work & Purpose" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "Vocational training and mentoring help each person set goals, find employment, and live with integrity and purpose." }) })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsxs(CardHeader, { className: "flex items-center gap-2", children: [_jsx(HistoryIcon, { className: "h-6 w-6 text-slate-600" }), _jsx(CardTitle, { children: "Our Commitment" })] }), _jsx(CardContent, { className: "text-slate-700 space-y-3", children: _jsx("p", { children: "For more than a decade we\u2019ve helped people move from addiction to purpose\u2014through accountability, grace, and community." }) })] })] }) }), _jsxs(Section, { id: "admissions", title: "Admissions", subtitle: "A clear path to start", children: [_jsxs("ol", { className: "grid md:grid-cols-3 gap-6 list-decimal list-inside text-slate-700", children: [_jsxs("li", { className: "rounded-2xl border border-slate-200 p-6", children: [_jsx("p", { className: "font-semibold", children: "1) Free consultation" }), _jsx("p", { className: "mt-2", children: "Call or submit the form\u2014we\u2019ll help you choose inpatient or outpatient and explain stages." })] }), _jsxs("li", { className: "rounded-2xl border border-slate-200 p-6", children: [_jsx("p", { className: "font-semibold", children: "2) Assessment & plan" }), _jsx("p", { className: "mt-2", children: "Clinical & spiritual assessment, goals, schedule, and costs/insurance." })] }), _jsxs("li", { className: "rounded-2xl border border-slate-200 p-6", children: [_jsx("p", { className: "font-semibold", children: "3) Start treatment" }), _jsx("p", { className: "mt-2", children: "Onboarding coach and community support from day one." })] })] }), _jsx("div", { className: "mt-8 text-slate-600", children: BRAND.serviceArea }), _jsx("div", { className: "mt-4", children: _jsx("a", { href: "#contact", children: _jsx(Button, { className: "rounded-xl px-6 text-base", style: { background: BRAND.colors.primary }, children: "Start today" }) }) })] }), _jsx(Section, { id: "contact", title: "Contact", children: _jsxs("div", { className: "grid md:grid-cols-2 gap-6 items-start", children: [_jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Contact us" }) }), _jsxs(CardContent, { className: "grid gap-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Your name" }), _jsx(Input, { type: "text", placeholder: "John Smith" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Email" }), _jsx(Input, { type: "email", placeholder: "you@example.com" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Phone number" }), _jsx(Input, { type: "tel", placeholder: "+1 (555) 123-4567" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Message" }), _jsx(Textarea, { rows: 5, placeholder: "Briefly describe your situation" })] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("a", { href: `mailto:${BRAND.email}`, children: _jsxs(Button, { className: "rounded-xl px-6 text-base", style: { background: BRAND.colors.primary }, children: ["Send message ", _jsx(ArrowRight, { className: "ml-2 h-5 w-5" })] }) }), _jsxs("div", { className: "text-sm text-slate-600", children: ["or call", " ", _jsx("a", { className: "underline", href: `tel:${BRAND.phone}`, children: BRAND.phone })] })] })] })] }), _jsxs(Card, { className: "rounded-2xl shadow-sm", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Find us" }) }), _jsxs(CardContent, { className: "space-y-3 text-slate-700", children: [_jsxs("p", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-5 w-5" }), " ", BRAND.address] }), _jsxs("p", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-5 w-5" }), " ", _jsx("a", { className: "underline", href: `tel:${BRAND.phone}`, children: BRAND.phone })] }), _jsxs("p", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-5 w-5" }), " ", _jsx("a", { className: "underline", href: `mailto:${BRAND.email}`, children: BRAND.email })] }), _jsx("p", { className: "text-sm", children: BRAND.serviceArea })] })] })] }) }), _jsx("footer", { className: "mt-10 border-t border-slate-200", children: _jsxs("div", { className: "max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-slate-600", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: "/logo-placeholder.svg", alt: "Logo", className: "h-8 w-8 rounded-lg" }), _jsx("span", { className: "font-semibold", children: BRAND.name })] }), _jsx("p", { className: "mt-3", children: "Addiction is not the end of the story. With the right support, a new beginning is possible." })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800", children: "Navigate" }), _jsxs("ul", { className: "mt-2 space-y-2", children: [_jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#about", children: "About" }) }), _jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#programs", children: "Programs" }) }), _jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#approach", children: "Approach" }) }), _jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#admissions", children: "Admissions" }) })] })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-800", children: "Help" }), _jsxs("ul", { className: "mt-2 space-y-2", children: [_jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#testimonials", children: "Stories" }) }), _jsx("li", { children: _jsx("a", { className: "hover:opacity-70", href: "#contact", children: "Contact" }) })] })] })] }), _jsxs("div", { children: [_jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " ", BRAND.name, ". A faith-based 501(c)(3) nonprofit. All rights reserved."] }), _jsx("p", { className: "mt-2", children: "*Disclaimer: This site does not provide medical advice. In emergencies call 911." })] })] }) }), _jsx("a", { href: `tel:${BRAND.phone}`, className: "fixed right-4 bottom-4", children: _jsx(Button, { className: "rounded-full h-14 w-14 shadow-lg", style: { background: BRAND.colors.primaryDark }, "aria-label": "Call us", children: _jsx(Phone, { className: "h-6 w-6 text-white" }) }) })] }));
}
