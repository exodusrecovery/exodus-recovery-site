import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: { message: "Method not allowed" } });
    }

    const { mode, price_id, amount } = req.body;

    let session;

    if (mode === "subscription") {
      session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: price_id, quantity: 1 }],
        success_url: `${process.env.DOMAIN}/donate/success`,
        cancel_url: `${process.env.DOMAIN}/donate/canceled`,
      });
    } else if (mode === "payment") {
      session = await stripe.checkout.sessions.create({
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
        success_url: `${process.env.DOMAIN}/donate/success`,
        cancel_url: `${process.env.DOMAIN}/donate/canceled`,
      });
    }

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: { message: err.message } });
  }
}