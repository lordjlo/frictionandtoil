# AI Submission Queue

Auth-gated submission targets. These cannot be done by an autonomous agent. Each requires browser login and human approval. Queued for the user to execute in one focused 30-minute pass.

URLs to submit (both pieces, every channel):
- https://frictionandtoil.com/web-intelligence/the-shift/
- https://frictionandtoil.com/web-intelligence/the-shift/citation-graph/

---

## 1. Google Search Console: IndexNow / URL Inspection
**URL:** https://search.google.com/search-console
**Property:** frictionandtoil.com
**Action per URL:**
1. URL Inspection tool → paste URL
2. Click "Request Indexing"
3. Wait for confirmation (~10 seconds)
**Time:** 2 min × 2 URLs = 4 min
**Note:** This does not guarantee indexing but signals freshness. Repeat any time the article is materially updated.

## 2. Bing Webmaster Tools: URL Submission
**URL:** https://www.bing.com/webmasters
**Property:** frictionandtoil.com (verify ownership first if not already done: DNS TXT record or HTML file upload)
**Action per URL:**
1. Configure My Site → Submit URLs → paste both
2. Submit
**Time:** 5 min one-time setup + 2 min ongoing
**Why it matters:** Bing index feeds ChatGPT search and browse mode. This is the single highest-leverage submission for OpenAI-surface visibility.

## 3. IndexNow (programmatic, optional)
**URL:** https://www.indexnow.org/
**Action:** Generate API key, host at `frictionandtoil.com/[key].txt`, then POST URL list to `https://api.indexnow.org/indexnow`. One-time setup; future articles can be submitted in a single curl call.
**Time:** 20 min setup, 30 sec per future submission
**Reach:** Bing + Yandex + Naver + Seznam (so: ChatGPT search and browse mode, plus Eastern European discovery).

## 4. Perplexity: direct submission
**URL:** https://www.perplexity.ai/
**Action per URL:**
1. Open Perplexity, ask: "Read this article and summarise its argument: [URL]"
2. The act of asking ingests the page and adds it to the model's recent-citation pool for ~7 days.
3. Repeat with 3–4 query variations: "what does [URL] say about AI visibility", "summarise the maturity curve from [URL]", etc.
**Time:** 10 min per URL
**Note:** Not an official submission API. This is the practical workaround the AI-SEO community uses. Effect is short-lived but real.

## 5. Brave Search: Sitemap ping
**URL:** https://search.brave.com/help/webmaster-tools (Brave does not have public webmaster console as of 2026-04; sitemap auto-discovery via robots.txt is the path)
**Action:** Verify `Sitemap: https://frictionandtoil.com/sitemap.xml` is present in robots.txt (it is, line 55).
**Time:** 0. Already done.
**Verify:** Test query in Brave AI for both pieces in 7 days.

## 6. You.com: direct submission
**URL:** https://you.com/
**Action:** Same workaround as Perplexity: ask the model to read the URL. You.com's discovery is more dependent on Bing index, so step 2 is the higher-leverage move.
**Time:** 5 min per URL

## 7. ChatGPT (OpenAI): discovery test, not submission
**URL:** https://chat.openai.com/ (with web browsing enabled)
**Action:**
1. Ask: "Search the web for the F&T AI Visibility Maturity Curve and tell me what it says."
2. If the model finds it → indexing is working. If it doesn't → check robots.txt allows OAI-SearchBot (it does, line 9–10) and check Bing index status.
**Time:** 5 min per URL

## 8. Anthropic Claude: discovery test
**URL:** https://claude.ai/ (with web search enabled)
**Action:** Same as ChatGPT: test discoverability, do not "submit." Claude's web search uses Brave under the hood, so this validates the Brave path.

## 9. Reddit cross-posts (audience-aware, not spam)
**Subreddits:**
- r/SEO: Maturity Curve framework angle
- r/marketing: Citation Graph editorial angle
- r/bigseo: both
**Format:** Plain link + 2-paragraph excerpt + question. Never marketing copy.
**Risk:** Self-promotion ban in some subreddits. Comment-history requirement on others. Pre-flight check: post comments on existing threads for a week before submitting your own link.
**Time:** 30 min per post + 60 min/week comment hygiene for 2 weeks before posting.

## 10. Hacker News (Show HN-adjacent)
**URL:** https://news.ycombinator.com/submit
**Action:** Submit Citation Graph piece (the more contrarian of the two) on a Tuesday or Wednesday morning UK time (12:00 PT US showup window).
**Title:** "The Citation Graph Doesn't Read Your Drafts". No editorial flair, no emoji.
**Time:** 1 min submission + 60 min monitoring/responding to comments if it gains traction.
**Note:** HN voting is mercurial. One submission per piece, ever. If it dies on the new page, do not resubmit.

---

## Execution order (recommended)
1. **Today:** GSC + Bing Webmaster (auth-gated, highest leverage). 30 min total.
2. **Today:** Perplexity + ChatGPT discovery tests. 20 min.
3. **This week:** Hacker News submission (Citation Graph only). 1 min + monitoring.
4. **Next week:** IndexNow API setup. 20 min.
5. **Throughout:** Reddit comment hygiene before any post. 2 weeks lead time.
