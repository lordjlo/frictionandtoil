# Future-upgrade reference — 2×2 spacious card grid

Saved 2026-05-08 as a design reference. The current `index.html` uses a compact 4-column TOC at top with all four stories inlined on a single long page (briefing-format consistency). This file captures an alternative we built and stepped away from: a gallery-style 2×2 hub linking out to four sub-pages.

## What looked smart

- 2-column × 2-row grid, generous gap (~1.5rem)
- Cards much taller than usual (~300–340px min-height) — let the hook breathe
- Heavy interior padding: `2.5rem 2.25rem`
- Subtle elevated card: `bg-card` + 1px border, radius 10px
- Hover: border to gold `#c9963a`, lift 3px, background to `bg-card-hover`
- Vertical rhythm inside the card:
  1. Mono `NO. 0X` label (0.7rem, letter-spacing 0.2em, muted)
  2. Cormorant title (1.7–2.1rem, weight 400, line-height 1.18)
  3. Italic serif hook (1.08rem, line-height 1.5, secondary colour)
  4. Pushed to bottom: gold `Read story →` (0.82rem, weight 600)
- The bottom CTA is anchored by `flex: 1` on the hook so the action sits at the foot of every card regardless of hook length

## Exact CSS that produced it

```css
.story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 800px) { .story-grid { grid-template-columns: 1fr; } }
.story-card {
  display: flex; flex-direction: column;
  padding: 2.5rem 2.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 10px;
  min-height: 300px;
  transition: border-color 0.2s, transform 0.2s, background 0.2s;
}
.story-card:hover { border-color: var(--design); transform: translateY(-3px); background: var(--bg-card-hover); }
.story-card-tag {
  display: block;
  font-family: var(--mono);
  font-size: 0.7rem; font-weight: 600;
  letter-spacing: 0.2em; text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 1rem;
}
.story-card h2 {
  font-family: var(--serif);
  font-weight: 400;
  font-size: clamp(1.7rem, 2.6vw, 2.1rem);
  line-height: 1.18;
  letter-spacing: -0.005em;
  color: var(--text);
  margin-bottom: 1.25rem;
}
.story-card-hook {
  font-family: var(--serif); font-style: italic;
  font-size: 1.08rem; line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 1.75rem;
  flex: 1;
}
.story-card-arrow {
  font-family: var(--body);
  font-size: 0.82rem; font-weight: 600;
  color: var(--design);
  letter-spacing: 0.04em;
}
```

## Card markup pattern

```html
<a href="…" class="story-card">
  <span class="story-card-tag">No. 01</span>
  <h2>The Invisible Landmark</h2>
  <p class="story-card-hook">If your reputation isn't doing the selling anymore, what is?</p>
  <span class="story-card-arrow">Read story &rarr;</span>
</a>
```

## When to revert to this pattern

Use this layout if the stories grow beyond ~4 (the single-page format gets long), if each story acquires its own commentary/postscript section that warrants a dedicated page, or if we want story-level OG/social sharing (each story gets its own canonical URL + meta tags).

## Why we currently don't use it

The user asked for briefing-format consistency: stories live as anchor sections on one page, matching `/the-shift/`'s long-form structure. That made the 2×2 hub redundant. Sub-pages were deleted; only `real-life-stories/index.html` remains.
