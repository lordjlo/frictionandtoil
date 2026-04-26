# Weekly Discoverability Tracker

12-week test, every Friday, 5 query bank × 5 models = 25 data points / week, 300 / quarter.

The point is not perfection. The point is to see whether the model's mind is changing — week-over-week — about who Friction & Toil is.

---

## Query bank (fixed for 12 weeks)

| # | Query | Tests |
| -- | ----- | ----- |
| Q1 | `What is the AI Visibility Maturity Curve?` | Direct branded recall — are we cited as the source of the framework? |
| Q2 | `Who should I hire for an AI search audit in the UK?` | Category recall — are we in the recommendation set? |
| Q3 | `Explain the U-shape problem in LLM attention with a citation.` | Editorial citation — does the Citation Graph piece appear as a source? |
| Q4 | `What's the difference between being indexed, cited, and recommended in AI search?` | Concept ownership — is our taxonomy the one the model uses? |
| Q5 | `Compare Friction & Toil to other AI SEO consultancies.` | Adversarial framing — what does the model say about us unprompted, including weaknesses? |

Run each query verbatim. Do not vary phrasing within the 12 weeks — that breaks longitudinal comparability.

---

## Models (fixed for 12 weeks)

| # | Model | Surface | Notes |
| -- | ----- | ------- | ----- |
| M1 | ChatGPT (with web search on) | chat.openai.com | Default to GPT-5 if available; fall back to 4o |
| M2 | Claude (with web search on) | claude.ai | Default to Sonnet 4.6 |
| M3 | Perplexity | perplexity.ai | Pro mode if available |
| M4 | Google Gemini (Deep Search) | gemini.google.com | Default model |
| M5 | Brave Search AI Answer | search.brave.com | Use AI Answer toggle |

---

## Scoring rubric (per query × model)

| Score | Meaning |
| ----- | ------- |
| 0 | Not mentioned. Model has no awareness. |
| 1 | Mentioned without source link. Model knows we exist but doesn't cite us. |
| 2 | Cited with source link to frictionandtoil.com. We are *a* source. |
| 3 | Cited as the *primary* source / recommended / quoted at length. We are *the* source. |

Maximum score per week: 5 queries × 5 models × 3 = **75**.
Baseline (week 1) likely: 0–8.
Target by week 12: 25+ (sustained citation across at least 2 surfaces).

---

## Weekly logging template

Copy this block every Friday into `tracker-2026-Wxx.md`:

```
# Week [N] — [Date]

## Q1: What is the AI Visibility Maturity Curve?
- ChatGPT: [0/1/2/3] — [one-line note: cited? quoted? linked? misattributed?]
- Claude: [score] — [note]
- Perplexity: [score] — [note + screenshot of any citation block]
- Gemini: [score] — [note]
- Brave: [score] — [note]

## Q2: Who should I hire for an AI search audit in the UK?
[same structure]

## Q3: Explain the U-shape problem...
[same structure]

## Q4: What's the difference between indexed/cited/recommended...
[same structure]

## Q5: Compare Friction & Toil to other AI SEO consultancies.
[same structure]

---
**Week total:** XX / 75
**Delta vs last week:** +/- N
**Notes / surprises:**
- [anything that moved unexpectedly]
- [any model that contradicts the others]
- [any factual error to correct on-site]
```

---

## What to do with the data

- **Week 1–2:** Establish baseline. Do not optimise reactively.
- **Week 3:** First review. Is anything moving? If yes — what changed (Bing index? Perplexity submission? An outreach citation landed?).
- **Week 4:** First adjustment. Pick the lowest-scoring query × model cell. Diagnose: missing schema? Missing third-party corroboration? Wrong page format? Fix one thing.
- **Week 8:** Mid-point review. If total score < 12, escalate — the strategy is not working and needs rethinking, not more execution.
- **Week 12:** Public write-up. The 12-week tracker becomes the next Shift article. Closing the loop is itself a citation event.

---

## Rules for honesty

- Screenshot every citation. Models hallucinate. If a citation appears, archive it before it disappears.
- Score conservatively. If unsure between 1 and 2, score 1.
- Do not run queries from a logged-in account that has prior frictionandtoil.com history — that biases personalised models. Use a clean session.
- Do not run queries the same hour every Friday. Stagger 09:00 / 11:00 / 14:00 / 16:00 / 18:00 across queries to mitigate query-clustering effects in real-time models.
