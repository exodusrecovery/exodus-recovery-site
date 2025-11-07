// server.mjs
import 'dotenv/config';
import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';

const app = express();

// === Настройки окружения ===
const DOMAIN = process.env.DOMAIN || 'http://localhost:5173';
const PORT = Number(process.env.PORT || 4242);

// === CORS ===
app.use(cors({
  origin: [DOMAIN, 'http://localhost:5173'],
  credentials: false,
}));
app.use(express.json());

// === Stripe (фиксируем apiVersion) ===
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-06-20',
});

// === Универсальный Checkout: разовый платёж / подписка ===
app.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      mode,           // "payment" | "subscription"
      price_id,       // для подписки
      amount,         // для разового (в центах)
      currency = 'usd',
      success_url = `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url  = `${DOMAIN}/donate/canceled`,
    } = req.body;

    // ЛОГИ (без эмодзи)
    console.log('body from client:', req.body);
    console.log('success_url:', success_url);
    console.log('cancel_url :', cancel_url);

    if (mode === 'subscription') {
      if (!price_id) throw new Error('price_id обязателен для подписки');

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: price_id, quantity: 1 }],
        success_url,
        cancel_url,
      });

      return res.json({ url: session.url });
    }

    if (mode === 'payment') {
      if (!amount) throw new Error('amount (в центах) обязателен для разового платежа');

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: 'One-time Donation' },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url,
        cancel_url,
      });

      return res.json({ url: session.url });
    }

    throw new Error("Неверный mode. Используй 'payment' или 'subscription'.");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: { message: err.message } });
  }
});

// === Customer Portal ===
app.post('/create-portal-session', async (req, res) => {
  try {
    const { session_id, return_url = DOMAIN } = req.body;
    if (!session_id) throw new Error('session_id обязателен');

    const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);
    const portal = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer,
      return_url,
    });

    res.json({ url: portal.url });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: { message: err.message } });
  }
});
// ===== Прямые ссылки с редиректом на Stripe (новая вкладка) =====

// Разовый платёж: /go/once?amount=5000  (сумма в ЦЕНТАХ)
app.get("/go/once", async (req, res) => {
  try {
    const amount = Number(req.query.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error("Query 'amount' (in cents) is required and must be > 0");
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "One-time Donation" },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/donate/canceled`,
    });

    // 303 чтобы гарантированно открыть URL в новой вкладке
    return res.redirect(303, session.url);
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Stripe error");
  }
});

// Подписка: /go/monthly?price_id=price_xxx
app.get("/go/monthly", async (req, res) => {
  try {
    const price_id = String(req.query.price_id || "");
    if (!price_id) throw new Error("Query 'price_id' is required");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${DOMAIN}/donate/canceled`,
    });

    return res.redirect(303, session.url);
  } catch (err) {
    console.error(err);
    res.status(400).send(err?.message || "Stripe error");
  }
});
app.listen(PORT, () => {
  console.log(`Stripe server running → http://localhost:${PORT}`);
  console.log(`DOMAIN for redirects  → ${DOMAIN}`);
});