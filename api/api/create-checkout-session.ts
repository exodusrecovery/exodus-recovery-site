import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });
const DOMAIN = process.env.DOMAIN || 'https://www.exodusrecovery.org';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: { message: 'Method not allowed' } });

    const {
      mode,          // 'payment' | 'subscription'
      price_id,      // для подписки
      amount,        // для разового (центах)
      currency = 'usd',
      success_url = `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url  = `${DOMAIN}/donate/canceled`,
    } = req.body || {};

    if (mode === 'subscription') {
      if (!price_id) throw new Error('price_id обязателен для подписки');
      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: price_id, quantity: 1 }],
        success_url, cancel_url,
      });
      return res.json({ url: session.url });
    }

    if (mode === 'payment') {
      if (!amount) throw new Error('amount (в центах) обязателен для разового платежа');
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{
          price_data: { currency, product_data: { name: 'One-time Donation' }, unit_amount: amount },
          quantity: 1,
        }],
        success_url, cancel_url,
      });
      return res.json({ url: session.url });
    }

    throw new Error("Неверный mode. Используй 'payment' или 'subscription'.");
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: { message: err.message } });
  }
}