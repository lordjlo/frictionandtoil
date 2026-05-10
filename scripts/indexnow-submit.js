#!/usr/bin/env node
// Submit URLs to IndexNow.
//
// Usage:
//   node scripts/indexnow-submit.js                  (reads sitemap.xml, submits all)
//   node scripts/indexnow-submit.js url1 url2 ...    (submits explicit URLs)
//
// Pings api.indexnow.org directly — does not call our /api/indexnow.js wrapper.
// One ping notifies Bing, Yandex, Seznam, and Naver simultaneously.

const fs = require('fs');
const https = require('https');
const path = require('path');

const HOST = 'frictionandtoil.com';
const KEY = '0291b772f13c86b73350faea3e7b2723';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function readSitemapUrls() {
  const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    throw new Error(`sitemap.xml not found at ${sitemapPath}`);
  }
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const matches = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)];
  return matches
    .map((m) => m[1].trim())
    .filter((u) => u.startsWith(`https://${HOST}/`));
}

function submit(urls) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  });
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: 'api.indexnow.org',
        path: '/IndexNow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => resolve({ status: res.statusCode, body }));
      }
    );
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function main() {
  const argv = process.argv.slice(2);
  let urls;
  if (argv.length > 0) {
    urls = argv;
  } else {
    urls = readSitemapUrls();
    console.log(`Read ${urls.length} URLs from sitemap.xml`);
  }
  if (urls.length === 0) {
    console.error('No URLs to submit.');
    process.exit(1);
  }
  console.log(`Submitting ${urls.length} URL(s) to IndexNow...`);
  urls.forEach((u) => console.log(`  - ${u}`));
  const result = await submit(urls);
  console.log(`\nIndexNow status: ${result.status}`);
  if (result.body) console.log(`Body: ${result.body}`);
  if (result.status === 200 || result.status === 202) {
    console.log('\nAccepted. Bing, Yandex, Seznam, and Naver will recrawl shortly.');
  } else {
    console.error('\nNon-success status — check key file is reachable at:');
    console.error(`  ${KEY_LOCATION}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error('Failed:', e.message);
  process.exit(1);
});
