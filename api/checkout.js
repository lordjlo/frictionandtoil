const Stripe = require('stripe');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const origin = req.headers.origin || 'https://frictionandtoil.com';

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    currency: 'gbp',
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          unit_amount: 75000,
          product_data: {
            name: 'Web Intelligence Report',
            description:
              'Five-dimension website intelligence report — Search, Design, Brand, Competitive position, and Growth. Delivered as an interactive HTML dashboard within 48 hours.',
          },
        },
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/web-intelligence/`,
    custom_fields: [
      {
        key: 'website_url',
        label: { type: 'custom', custom: 'Your website URL' },
        type: 'text',
      },
    ],
    custom_text: {
      submit: {
        message:
          'After payment you will receive a confirmation email. We will be in touch within 24 hours to gather any additional context before delivering your report.',
      },
    },
  });

  res.status(200).json({ url: session.url });
};
