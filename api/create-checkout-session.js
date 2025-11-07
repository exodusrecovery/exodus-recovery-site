const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });
const DOMAIN = process.env.DOMAIN || "https://www.exodusrecovery.org";

module.exports = async function (req, res) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: { message: "Method not allowed" } });

    const {
      mode,          // 'payment' | 'subscription'
      price_id,      // for subscription
      amount,        // for one-time (in cents)
      currency = "usd",
      success_url = `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url  = `${DOMAIN}/donate/canceled`,
    } = req.body || {};

    if (mode === "subscription") {
      if (!price_id) throw new Error("price_id is required for subscription");
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: price_id, quantity: 1 }],
        success_url,
        cancel_url,
      });
      return res.json({ url: session.url });
    }

    if (mode === "payment") {
      if (!amount) throw new Error("amount (in cents) is required for one-time payments");
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [{
          price_data: { currency, product_data: { name: "One-time Donation" }, unit_amount: amount },
          quantity: 1,
        }],
        success_url,
        cancel_url,
      });
      return res.json({ url: session.url });
    }

    throw new Error("Invalid mode. Use 'payment' or 'subscription'.");
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: { message: err && err.message ? err.message : String(err) } });
  }
};
