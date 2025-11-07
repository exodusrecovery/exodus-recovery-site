import type { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: '2024-06-20' });
const DOMAIN = process.env.DOMAIN || 'https://www.exodusrecovery.org';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const price_id = String(req.query.price_id || '');
    if (!price_id) throw new Error("Query 'price_id' is required");

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: price_id, quantity: 1 }],
      success_url: `${DOMAIN}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${DOMAIN}/donate/canceled`,
    });

    res.redirect(303, session.url!);
  } catch (err: any) {
    console.error(err);
    res.status(400).send(err.message || 'Stripe error');
  }
}