# SEO Playbook for abhitiwari.shop

## What's already done (code side)

✅ **Meta tags** — title, description, keywords, robots, geo, language, OG/Twitter cards
✅ **JSON-LD structured data** — Person, WebSite, ProfessionalService, BreadcrumbList schemas (Google rich snippets)
✅ **H1 with name + role** — pre-rendered in HTML, not JS-only (critical for ranking on "Abhishek Tiwari" searches)
✅ **Semantic landmarks** — `<header>`, `<main>`, `<section>` with `aria-labelledby`
✅ **Screen-reader headings** — every section has a descriptive H2 (`sr-only`) so search engines see the page structure even before JS renders
✅ **Image alt text + dimensions** — profile image has keyword-rich alt
✅ **Canonical URL** — points to `https://abhitiwari.shop/`
✅ **sitemap.xml** — all sections + resume listed
✅ **robots.txt** — allows crawlers, blocks admin panel
✅ **manifest.json** — PWA / Add to Home Screen support
✅ **Hreflang** — `en-IN` for India targeting
✅ **Open Graph image** — social previews work on FB / Twitter / LinkedIn / WhatsApp

## Realistic ranking expectations

A personal portfolio **will rank for**:
- "Abhishek Tiwari" (your name)
- "Abhishek Tiwari Android developer"
- "Abhishek Tiwari Katni"
- "Abhishek Tiwari portfolio"
- "Stream Loop developer" (your project name)
- "Android developer Katni MP" (long-tail location)
- "n8n developer India" (long-tail niche)
- "MCA Android developer" (niche)

It **will NOT rank for** generic terms like "Android developer" (millions of sites compete).

---

## What YOU need to do (cannot be automated)

### 1. Submit to Google Search Console (do this FIRST — ~10 min)

1. Go to https://search.google.com/search-console
2. **Add property** → choose **URL prefix** → enter `https://abhitiwari.shop/`
3. Verify via **HTML tag** method:
   - Google gives you a `<meta name="google-site-verification" content="...">` tag
   - Open [`index.html`](index.html), find the line `<!-- <meta name="google-site-verification" content="YOUR_CODE_HERE"> -->`
   - Uncomment it and paste your code
   - Deploy, then click Verify in Search Console
4. Once verified → **Sitemaps** menu → submit `https://abhitiwari.shop/sitemap.xml`
5. Use **URL Inspection** → paste your URL → **Request Indexing** (forces Google to crawl now instead of waiting weeks)

### 2. Submit to Bing Webmaster Tools (~5 min)

1. https://www.bing.com/webmasters → sign in with Microsoft account
2. Add `abhitiwari.shop` → verify via meta tag (same pattern as Google — uncomment `msvalidate.01` in index.html)
3. Submit `https://abhitiwari.shop/sitemap.xml`
4. Bing powers DuckDuckGo, Yahoo, ChatGPT search — covers a big chunk of non-Google traffic

### 3. Build backlinks (THIS is what actually moves rankings)

Google ranks based on **how many quality sites link to you**. Do these in order:

**Easy (do today):**
- [ ] **LinkedIn** → add `abhitiwari.shop` to your profile (Contact section + About section)
- [ ] **GitHub** → add `https://abhitiwari.shop` to GitHub bio + every project README
- [ ] **X/Twitter bio** → add the URL
- [ ] **Instagram bio** if you have one
- [ ] **WhatsApp Business profile** → add as website
- [ ] **Email signature** → add `abhitiwari.shop`

**Medium (do this week):**
- [ ] Answer 5–10 Android/Kotlin/n8n questions on **Stack Overflow** with your URL in profile
- [ ] Comment thoughtfully on 5–10 dev.to / Medium / Hashnode Android posts
- [ ] Add yourself to **directories**: clutch.co, goodfirms.co, dev.to community, Awwwards portfolios
- [ ] List Stream Loop on **Product Hunt** (when ready for launch)
- [ ] Submit Play Store apps to **alternative app directories** (Aptoide, APKPure) with link back

**Hard but huge impact:**
- [ ] Write **guest posts** on Indian dev blogs (geeksforgeeks, scaler, codingninjas) about Android/n8n with byline link
- [ ] Get listed on Indian freelancer directories
- [ ] If you do open-source work, get your repo featured anywhere (HN, awesome-* lists)

### 4. Publish real blog posts

The blog section currently has placeholders. **Real posts = 10x more organic traffic** because each post can rank for its own topic.

Topic ideas that will rank for you (low competition, your niche):
- "How I built Stream Loop with Jetpack Compose"
- "10 n8n workflows every SaaS founder should set up"
- "Migrating from Java to Kotlin: lessons from shipping 3 Android apps"
- "Building internal dashboards without React: a pragmatic approach"
- "Hiring an Android developer in India: what to look for"

Each post should be **800–1500 words**, include your real experience, and target 1–2 keywords.

For now, blog posts in admin link out to `#` — point them to actual posts on:
- **Hashnode** (developer-focused, easy SEO, free)
- **Dev.to** (high domain authority, good for backlinks)
- **Medium** (less SEO juice these days but still discoverable)

### 5. Photo / image SEO

- [ ] Replace `profile.png` with a higher-quality version (ideally 1200×630 for OG sharing)
- [ ] Rename it to something keyword-rich: `abhishek-tiwari-android-developer.png`
- [ ] Add a **square version (512×512)** for the favicon at `/favicon-512.png`
- [ ] If you have project screenshots — add them to project cards with descriptive alts

### 6. Page speed (Tailwind CDN warning)

Currently Tailwind is loaded from CDN (the browser warning you saw). For production this is **slower** and hurts Core Web Vitals (Google ranking factor).

To fix later — pre-compile Tailwind:
```
npm install -D tailwindcss
npx tailwindcss -i ./input.css -o ./assets/css/tailwind.css --minify
```
Then swap the CDN `<script>` for `<link rel="stylesheet" href="./assets/css/tailwind.css">`.

Not urgent — site still works fine, just a bit slower on first load.

### 7. Performance — quick wins

- [ ] Optimise `profile.png` → use https://squoosh.app to compress (often 70% smaller)
- [ ] Consider serving WebP version with `<picture>` fallback
- [ ] Move third-party scripts (Tailwind CDN, fonts) to `async`/`defer` if not already

---

## Tracking what works

Once Search Console is set up (~2–4 weeks after first deploy):

- **Performance** tab → see which queries bring you traffic
- **Pages** tab → see which pages get clicks
- **Coverage** tab → fix indexing errors
- Set up **Google Analytics 4** (your Firebase project already has analytics enabled — `G-7B575QCLEX` measurement ID)

---

## Files in this repo for SEO

| File              | Purpose                                  |
|-------------------|------------------------------------------|
| `index.html`      | Meta + JSON-LD + pre-rendered hero       |
| `sitemap.xml`     | Tells search engines what pages exist    |
| `robots.txt`      | Tells crawlers what to index             |
| `manifest.json`   | PWA / mobile install metadata            |
| `SEO.md`          | This guide                               |

## Timeline — when will I see results?

- **Day 1**: site is technically SEO-perfect
- **Day 3–7**: Google starts crawling (after Search Console request)
- **Week 2–4**: site appears in search for your name
- **Month 2–3**: long-tail keywords (n8n developer India, etc.) start showing impressions
- **Month 6+**: backlinks compound, broader keywords rank

**SEO is a slow game**. The technical work is done — now it's content + backlinks + patience.
