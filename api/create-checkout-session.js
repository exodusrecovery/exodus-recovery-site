import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

function getDomain() {
  const raw = (process.env.DOMAIN || "").trim();
  if (!raw) return "https://www.exodusrecovery.org";
  if (/^https?:\/\//i.test(raw)) return raw.replace(/\/+$/, "");
  return `https://${raw.replace(/\/+$/, "")}`;
}

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: { message: "Method not allowed" } });
    }

    const { mode, price_id, amount, currency = "usd" } = req.body || {};
    const DOMAIN = getDomain();
    let session;

    if (mode === "subscription") {
      if (!price_id) throw new Error("price_id is required for subscription");
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: price_id, quantity: 1 }],
        success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/donate/canceled`,
      });
    } else if (mode === "payment") {
      if (!amount) throw new Error("amount (in cents) is required for one-time payment");
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price_data: {
              currency,
              product_data: { name: "One-time Donation" },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${DOMAIN}/donate/canceled`,
      });
    } else {
      throw new Error("Invalid mode. Use 'payment' or 'subscription'.");
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("create-checkout-session error:", err && err.message ? err.message : err);
    return res.status(500).json({ error: { message: (err && err.message) || String(err) } });
  }
}
