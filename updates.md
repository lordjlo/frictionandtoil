# F&T Web — Change Log

## 2026-04-18 — Typography + copy pass (commit `e263c8d`)

**File:** `web-intelligence/index.html`

Three decisions locked in this pass:
- **Cormorant Garamond** for all display headlines
- **48 hours** everywhere — hero, FAQ, bottom CTA, JSON-LD schema
- **"Order your report"** as button text (price moved into guarantee lines)

### Change 1 — Cormorant Garamond font import + --serif variable
- Added `Cormorant+Garamond:wght@300;400;500;600;700` to the Google Fonts import link
- Added `--serif: 'Cormorant Garamond', 'Times New Roman', serif;` to `:root`

### Change 2 — Serif applied to display headlines
Three rules switched from `var(--display)` (Space Grotesk) to `var(--serif)`. Font size bumped ~20% since Cormorant runs smaller visually. Weight dropped to 500 because Cormorant reads heavier at the same weight.

| Selector | Old size | New size |
| :--- | :--- | :--- |
| `.section-heading` | `clamp(2rem, 4.5vw, 3.25rem)` | `clamp(2.4rem, 5.4vw, 3.9rem)` |
| `.hero h1` | `clamp(2.5rem, 7.5vw, 68px)` | `clamp(3rem, 9vw, 82px)` |
| `.bottom-headline` | `clamp(2.25rem, 6vw, 4.5rem)` | `clamp(2.7rem, 7.2vw, 5.4rem)` |

Body copy, sub-lines, card titles (`.flip-title`, `.intel-title`), eyebrow labels and buttons all kept on Space Grotesk / Inter.

### Change 3 — Turnaround copy: "Five working days" → "48 hours"
- JSON-LD Product `description`: "within 5 working days" → "within 48 hours"
- FAQPage JSON-LD `acceptedAnswer`: "Five working days from briefing to delivery." → "48 hours from receipt of your briefing."
- Visible FAQ answer: same string updated
- Zero remaining hits for "working days" in the file

### Change 4 — CTA button text
Both CTAs changed from `Order your report — £500` to `Order your report`.
- Hero CTA (`.btn.btn-white`)
- Bottom CTA (`.btn.btn-amber`)

Price (`£500`) is no longer on the button itself — it lives in the guarantee line beneath each button.

### Change 5 — Guarantee lines updated
**Hero guarantee** (under hero CTA):
> £500 · Delivered within 48 hours · 14-day money-back guarantee

**Bottom CTA small text**:
> £500 · 14-day money-back guarantee · hello@frictionandtoil.com

### Commit + push
- Commit: `e263c8d` on `main`
- Range: `be5ebf9..e263c8d`
- Diff: 22 insertions / 21 deletions in one file
- Pushed to `https://github.com/lordjlo/frictionandtoil`

---

## 2026-04-18 — v4 rebuild of web-intelligence landing (commit `be5ebf9`)

**File:** `web-intelligence/index.html`

Complete content rebuild. Retained: CSS variables, fonts, nav, sticky header, scroll animations, JSON-LD schemas, footer, Five Dimensions section, Why £500 section, Sample section, Testimonials section, FAQ section.

### New / rebuilt sections
- **Hero** — new copy: "Your website is losing you money right now." + amber sub "You just don't know how much."
- **The Pain** — 4 red-left-border impact cards ("The internet changed. Most websites didn't.")
- **Negative Impacts** — 5 red-top-border cards ("Five ways your website is working against you.")
- **Solution Flip** — 5 emerald-top-border cards ("One report. Complete picture. Clear priorities.")
- **What We Look At** — 8-card 4×2 grid with inline SVG icons ("We go further than any SEO tool.")
- **Bottom CTA** — pure black bg with amber radial gradient overlay

### CTAs
All Stripe placeholders removed. Both CTAs now use:
`mailto:hello@frictionandtoil.com?subject=Web%20Intelligence%20Report%20Order&body=Website%20URL:%0ABusiness%20type:%0AFocus%20areas:`

### Commit + push
- Commit: `be5ebf9` on `main`
- Diff: 383 insertions / 30 deletions in one file

---

## 2026-04-18 — Global nav across pages

Added a fixed top nav (56px, dark translucent with backdrop-blur) to three pages for consistency:

- `index.html` (root homepage) — nav inserted after `<body>`, "COMING SOON" replaced with "Strategic Intelligence Systems", added `padding-top: 56px` to main wrapper
- `web-intelligence/index.html` — replaced old sticky `.site-header` with the global nav (avoided visual duplication)
- `web-intelligence/wedding-venues/index.html` — nav inserted before existing `.global-header` with 56px spacer div

**Nav links:** Web Intelligence · Strategic Intelligence Systems · Experiments · Contact

---

## 2026-04-18 — Repo push + .gitignore

- Created `.gitignore` with `.DS_Store`
- Initial push of entire `F&T web` repo to `https://github.com/lordjlo/frictionandtoil`

---

## 2026-04-18 — Wedding venue demo anonymisation

**File:** `web-intelligence/wedding-venues/index.html`

Three replacement passes (all `replace_all=true`):
- `/gillyflower/` → `/the-hall/` (19 URL path instances)
- `RIBA Stirling Prize` → `national architecture award`
- `RIBA` → `national architecture award` (35 instances)

Post-edit verification: 0 hits for all 11 target terms (Gillyflower, RIBA, Elmore, Guise, Gloucestershire, GL2, Anselm, Pauntley, Hyde House, £6,600, 1274).

---

## Known inconsistencies / deferred items

- None currently. The "Five working days" vs "48 hours" contradiction was resolved in commit `e263c8d`.
