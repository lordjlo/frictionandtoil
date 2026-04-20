const https = require('https');

function stripePost(path, params, secretKey) {
  const body = new URLSearchParams(params).toString();
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.stripe.com',
        path,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${secretKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(body),
          'Stripe-Version': '2023-10-16',
        },
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            reject(new Error('Invalid JSON from Stripe'));
          }
        });
      }
    );
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      res.status(500).json({ error: 'Missing Stripe key' });
      return;
    }

    const origin = req.headers.origin || 'https://frictionandtoil.com';

    const params = {
      mode: 'payment',
      currency: 'gbp',
      'line_items[0][price_data][currency]': 'gbp',
      'line_items[0][price_data][unit_amount]': '75000',
      'line_items[0][price_data][product_data][name]': 'Web Intelligence Report',
      'line_items[0][price_data][product_data][description]':
        'Five-dimension website intelligence report — Search, Design, Brand, Competitive position, and Growth. Delivered within 48 hours.',
      'line_items[0][quantity]': '1',
      allow_promotion_codes: 'true',
      'custom_fields[0][key]': 'website_url',
      'custom_fields[0][label][type]': 'custom',
      'custom_fields[0][label][custom]': 'Your website URL',
      'custom_fields[0][type]': 'text',
      'custom_text[submit][message]':
        'After payment we will be in touch within 24 hours to gather any additional context before delivering your report.',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/web-intelligence/`,
    };

    const { status, body } = await stripePost('/v1/checkout/sessions', params, key);

    if (status !== 200) {
      console.error('Stripe error:', JSON.stringify(body));
      res.status(status).json({ error: body.error?.message || 'Stripe error' });
      return;
    }

    res.status(200).json({ url: body.url });
  } catch (err) {
    console.error('Handler error:', err.name, err.message, err.stack);
    res.status(500).json({ error: err.message, name: err.name });
  }
};
