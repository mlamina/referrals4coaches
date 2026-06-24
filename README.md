# Referrals4Coaches

A tiny, static site that turns a coach's network into warm referrals.

**The idea:** a coach builds a simple profile, then hands each friend / former
client / peer a personal **referral link**. The friend saves that link as a field
on the coach's contact card in their phone. When they meet someone who could use
the coach, they open the link — a clean page with the coach's photo, name, title,
and a **big QR code**. The other person scans it, lands on the coach's full profile
+ a friend's endorsement, and leaves their details. A warm intro, not a cold lead.

## Pages

| File | Who sees it | What it is |
|---|---|---|
| `index.html` | coaches (marketing) | landing page explaining the idea |
| `referral.html` | the referring friend | "show this" screen — coach photo + name + title + a **real, scannable QR** |
| `profile.html` | the referred person | full coach profile + endorsement + contact form |

### Links
- Referral link (give to a friend): `referral.html?coach=<slug>&from=<friend>`
- The QR on that page encodes: `profile.html?coach=<slug>&from=<friend>`
- With no params, everything falls back to the demo coach.

Coach + endorsement data lives in **`coaches.js`** (a plain JS object keyed by slug).
To add a real coach, add an entry there and hand each ally their referral link.

## Stack & status

- Pure static HTML/CSS + vanilla JS. **No build step, no backend.** Hosts on GitHub Pages.
- QR codes are generated client-side via [`node-qrcode`](https://github.com/soldair/node-qrcode) loaded from jsDelivr.
- The **contact form is a mock** — it shows a confirmation but does not send anything
  yet (same as the original prototype this was cloned from). Wire it to a backend,
  Formspree, or a Google Form when you're ready to collect real submissions.
- The **photos are placeholders** reused from a sibling project — swap in real ones in `images/`.
- The **waitlist button** on `index.html` points to a placeholder (`#ask`). Drop in your
  own Google Form / Formspree / email link (look for the `TODO` comment).

## Run locally

```sh
python3 -m http.server 8765
# open http://localhost:8765/index.html
# the QR demo: http://localhost:8765/referral.html?coach=daniel&from=julie
```

Cloned and re-skinned from a sibling static-site prototype.
