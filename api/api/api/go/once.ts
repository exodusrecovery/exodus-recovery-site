import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });
const DOMAIN = process.env.DOMAIN || 'https://www.exodusrecovery.org';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const amount = Number(req.query.amount || 0);
    if (!Number.isFinite(amount) || amount <= 0) throw new Error("Query 'amount' (in cents) is required and must be > 0");

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: { currency: 'usd', product_data: { name: 'One-time Donation' }, unit_amount: amount },
        quantity: 1,
      }],
      success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${DOMAIN}/donate/canceled`,
    });

    res.redirect(303, session.url!);
  } catch (err: any) {
    console.error(err);
    res.status(400).send(err.message || 'Stripe error');
  }
}