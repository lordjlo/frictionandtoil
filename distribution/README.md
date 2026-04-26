# Distribution — The Shift

Operating files for the 10-item distribution strategy across the two Shift articles.

| File | Item | Status |
| ---- | ---- | ------ |
| (see commit b847e53) | 1. robots.txt expansion (12 AI bots, explicit allow blocks) | DONE |
| `../web-intelligence/the-shift/*/index.html` | 2. Schema validation — Article + FAQPage JSON-LD on both pieces | DONE (validate live with schema.org validator) |
| `ai-submission-queue.md` (§1, §2) | 3. Bing Webmaster + GSC submission | QUEUED — auth required |
| (see commit b847e53) | 4. OG/Twitter Card metadata on all three Shift articles | DONE — bespoke headline-rendered OGs flagged as follow-up |
| `x-cadence.md` | 5. X cadence — 10 tweets × 30 days | DRAFTED |
| `instagram-carousels.md` | 6. Instagram carousels — 4 briefs | DRAFTED |
| `outreach.md` | 7. Direct outreach — V1/V2 templates + 10-slot recipient framework | DRAFTED — recipient names TBC |
| `ai-submission-queue.md` | 8. AI submission tools — Perplexity / Brave / You.com / IndexNow / HN | DRAFTED — execution auth-gated |
| (see commit b847e53) | 9. Internal cross-linking — Cost of Not Knowing → Citation Graph read-next | DONE |
| `weekly-discoverability-tracker.md` | 10. Weekly LLM discoverability test — 5 queries × 5 models × 12 weeks | TEMPLATE READY — Week 1 starts on next Friday |

## What needs the user
1. Recipient names for the 10 outreach slots (`outreach.md`).
2. GSC + Bing Webmaster submissions — both auth-gated, both 30 min total.
3. First Friday discoverability run — establishes the baseline.
4. Bespoke OG image renders per article (currently using the generic `web-intelligence-og.png` fallback).

## What runs without the user
- robots.txt + schema + cross-linking — already shipped to production.
- X cadence and IG carousels can be queued in Buffer / Later when the user is ready.
- Outreach templates can be customised and sent in batches of 3/day once names are added.
