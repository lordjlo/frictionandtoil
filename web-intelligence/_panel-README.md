# Web Intelligence — shared hamburger panel

The hamburger nav at the top-right of every Web Intelligence sub-page
is hand-duplicated across each page (the project is plain HTML — no
build step, no template engine). When the panel changes, drift is the
default outcome unless we follow the rule below.

## The rule

1. Update [`_panel-canonical.html`](./_panel-canonical.html) **first**.
2. Then sync the seven consuming pages listed below.
3. Each page's `<nav class="wi-nav">` block is preceded by a one-line
   marker comment pointing at the canonical file. Do not remove it.

## Pages that consume the panel

| Page | File | Variant |
| :--- | :--- | :--- |
| Hub | `web-intelligence/index.html` | A (hub) |
| Multi-Index Live demo | `web-intelligence/multi-index-live/index.html` | A + B |
| The Shift index | `web-intelligence/the-shift/index.html` | B |
| Multi-Index Problem | `web-intelligence/the-shift/multi-index-problem/index.html` | B |
| Cost of Not Knowing | `web-intelligence/the-shift/cost-of-not-knowing/index.html` | B |
| Citation Graph | `web-intelligence/the-shift/citation-graph/index.html` | B |
| AI Search Visibility Audit UK | `web-intelligence/the-shift/ai-search-visibility-audit-uk/index.html` | B |
| How to Rank in ChatGPT | `web-intelligence/the-shift/how-to-rank-in-chatgpt/index.html` | B |
| AI Overview Visibility | `web-intelligence/the-shift/ai-overview-visibility/index.html` | B |
| Perplexity Citation Audit | `web-intelligence/the-shift/perplexity-citation-audit/index.html` | B |
| Real-Life Stories | `web-intelligence/real-life-stories/index.html` | B |

**Variants** (defined inline in the canonical file):

- **A** — includes the "On this page" group with page-local anchors.
- **B** — includes the "Web Intelligence hub" group of 8 entry points.
- Pages may use **both** A and B (multi-index-live does this).
- The hub uses A only (it cannot link to itself as a hub entry point).
- All five article pages use B only.

## Per-page marker

Mark exactly one link with `class="wi-current" aria-current="page"`
to indicate the current page in the open panel. Every consuming page
has exactly one `wi-current` marker.

## What is NOT in the canonical file

The CSS rules (`.wi-panel`, `.wi-panel-group`, `.wi-panel-title`,
`.wi-panel a`, `.wi-current`, `body.wi-panel-locked`, the mobile
media query) and the JavaScript that opens/closes the panel
(`wiMenuBtn` handler) live inside each page's own `<style>` and
`<script>` blocks. They have not drifted between pages — the
historical drift was strictly in the `<div class="wi-panel">` markup.
If a CSS or JS change becomes necessary, document it here too.

## History

The drift this file addresses came from the May 2026 refactor that
consolidated four Real-Life Stories sub-pages into one anchored page
(commit `de0957c`); the refactor's panel template was stale and
overwrote the alignment fix from `26f9bb0`, requiring re-application
in `72d47cc`. The full sweep landed in `9d93c9b`.
