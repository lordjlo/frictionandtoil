// IndexNow ping endpoint.
//
// Submits one or more URLs to the IndexNow protocol. A single ping notifies
// Bing, Yandex, Seznam, and Naver simultaneously. Bing's index also feeds
// ChatGPT search and Microsoft Copilot, so this is the single highest-leverage
// instant-indexation surface after Google Search Console.
//
// Usage (POST, JSON body):
//   { "urls": ["https://frictionandtoil.com/the-shift/new-article/", "..."] }
//
// Or single URL:
//   { "url": "https://frictionandtoil.com/the-shift/new-article/" }
//
// Authentication:
//   Set INDEXNOW_TRIGGER_TOKEN in Vercel env vars and pass as
//   Authorization: Bearer <token> header to prevent open submission.
//   If the env var is unset, the endpoint accepts any caller (dev mode).
//
// Response: forwards IndexNow's HTTP status (200/202 = accepted, 4xx = invalid).

const https = require('https');

const HOST = 'frictionandtoil.com';
const KEY = '0291b772f13c86b73350faea3e7b2723';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT_HOST = 'api.indexnow.org';
const ENDPOINT_PATH = '/IndexNow';

function postIndexNow(urls) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: ENDPOINT_HOST,
        path: ENDPOINT_PATH,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function isValidUrl(u) {
  if (typeof u !== 'string' || !u.startsWith(`https://${HOST}/`)) return false;
  try {
    new URL(u);
    return true;
  } catch {
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'POST only' });
  }

  const requiredToken = process.env.INDEXNOW_TRIGGER_TOKEN;
  if (requiredToken) {
    const provided = (req.headers.authorization || '').replace(/^Bearer\s+/i, '');
    if (provided !== requiredToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: 'Invalid JSON body' });
    }
  }
  body = body || {};

  let urls = Array.isArray(body.urls) ? body.urls : [];
  if (typeof body.url === 'string') urls.push(body.url);
  urls = [...new Set(urls.map((u) => u && u.trim()).filter(Boolean))];

  if (urls.length === 0) {
    return res.status(400).json({ error: 'Provide "url" or "urls" array' });
  }
  if (urls.length > 10000) {
    return res.status(400).json({ error: 'Max 10000 URLs per submission' });
  }

  const invalid = urls.filter((u) => !isValidUrl(u));
  if (invalid.length > 0) {
    return res.status(400).json({
      error: `URLs must start with https://${HOST}/`,
      invalid,
    });
  }

  try {
    const result = await postIndexNow(urls);
    return res.status(result.status).json({
      submitted: urls.length,
      indexnowStatus: result.status,
      indexnowBody: result.body || null,
      meta: {
        host: HOST,
        keyLocation: KEY_LOCATION,
        notifies: ['Bing', 'Yandex', 'Seznam', 'Naver'],
      },
    });
  } catch (err) {
    return res.status(502).json({
      error: 'IndexNow request failed',
      detail: err.message,
    });
  }
};
