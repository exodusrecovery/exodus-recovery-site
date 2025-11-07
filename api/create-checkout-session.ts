// api/create-checkout-session.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-11-15',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { mode, amount, price_id } = req.body || {};

    if (mode === 'subscription') {
      if (!price_id) return res.status(400).json({ error: 'price_id required for subscription' });

      const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        line_items: [{ price: price_id, quantity: 1 }],
        success_url: `${process.env.DOMAIN_ORIGIN || 'https://'+req.headers.host}/?success=1`,
        cancel_url: `${process.env.DOMAIN_ORIGIN || 'https://'+req.headers.host}/?canceled=1`,
      });

      return res.json({ url: session.url });
    }

    // one-time payment
    if (mode === 'payment') {
      if (!amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'amount (in cents) required for payment' });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: { name: 'Donation' },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        success_url: `${process.env.DOMAIN_ORIGIN || 'https://'+req.headers.host}/?success=1`,
        cancel_url: `${process.env.DOMAIN_ORIGIN || 'https://'+req.headers.host}/?canceled=1`,
      });

      return res.json({ url: session.url });
    }

    return res.status(400).json({ error: 'invalid mode' });
  } catch (err: any) {
    console.error('create-checkout-session error:', err);
    return res.status(500).json({ error: err.message || 'internal error' });
  }
}