# MadeMem

Static English (en-US) and US Spanish (es-US) catalog. HTML, CSS, and vanilla JavaScript. No build or dependencies.

## Preview

Run `python3 -m http.server 8080 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:8080/`. Any static server supporting directory indexes works. Root-relative assets require a server.

## Pages

- `/` introduces materials, process, adapted stories, and packages.
- `/shop/`, `/shop/pet/`, `/shop/human/`, `/shop/clinic/` provide separate memorial catalogs and working filters.
- `/living/` has its own collection. `/products/<handle>/` contains all 17 package and inquiry pages.
- `/pricing/`, `/gallery/`, `/how/`, `/stories/`, `/about/`, `/faq/`, `/contact/`, `/memorial/` explain choices and care.
- `/blog/` links to six complete guides. `/legal/` contains seven policy pages.
- `/search/?q=acrylic` is a shareable client-side search URL. Header search also opens an accessible dialog.
- `/404.html` is the custom error page. `/es/404.html` is the Spanish error page.

## Languages

Every English page has a matching `/es/` page with the same slug. Header and footer switches link to the corresponding page. Both versions have self-referencing canonicals and en-US, es-US, and English x-default alternates. The sitemap lists 92 indexable URLs with language alternates. Spanish serves US customers with USD prices and the same US delivery terms. Spanish legal pages state that English governs inconsistencies.

Translate static copy, alt text, metadata, and schema together when updating a page. Preserve the matching English and Spanish FAQ answers in visible HTML and FAQPage data. Keep both search indexes synchronized with each page’s unique title and meta description. Index only page summaries and the six curated material summaries; do not scrape related cards, menus, or filter labels. Search normalizes accents and stays in the current language. Spanish filters retain stable English data keys while presenting translated labels. The memorial demo and consent preference share the same browser storage across languages.

## Public settings and catalog

Use the exact token `info@teruu.com` for one site-wide find-and-replace when the mailbox changes. This updates `assets/js/config.js`, `llms.txt`, every English and Spanish static HTML contact fallback and Organization JSON-LD block, and the Spanish search index. Keep the token identical everywhere. Runtime enhancements continue to read the `EMAIL` constant from `assets/js/config.js`. The same file holds brand, legal name, contact number, canonical origin, the `SHOW_MEDIA_LABELS` flag (default false), and optional pixel IDs. Static canonical tags already target the public domain. `llms.txt` repeats the required contact facts for machine readers and should be kept synchronized when those facts change. All catalog facts are in `assets/js/data/products.json`. Static cards and product schema are rendered from those facts by shared browser code, and complete initial content is also in HTML for visitors without JavaScript. When editing catalog facts, update the corresponding static HTML fallback and metadata as well. The English search data is in `assets/js/data/search.json`. Spanish search uses `assets/js/data/search-es.json`. The Spanish display dictionary is `assets/js/locale-es.js`. Shared numeric prices and filter keys remain in `products.json`.

## Forms and local storage

Inquiry and Save my design open a `mailto` draft to the configured contact. The visitor attaches photos and sends from their own mailbox. The site does not receive, upload, or acknowledge a submission. Save my design collects only an email and includes the current page in the draft.

The memorial demo saves text in localStorage only after a visitor chooses Save. Its photo stays in browser memory for the session. Clear draft removes both. No backend or hosted memorial service is implemented.

## Consent and empty analytics slots

Optional IDs in `config.js` stay empty until approved. Google tag requires analytics consent. Meta and TikTok require marketing consent. GPC overrides marketing. No tag requests occur with empty IDs. Prewired events are `page_view`, `preview_start`, `whatsapp_click`, and `search`. No contact data or draft content is sent. Withdrawal reloads the page if a tag had loaded. The CSP in `_headers` explicitly permits only the documented tag vendors, local assets, and Google Fonts. JSON-LD blocks are inert structured data and use no executable inline script.

## Media

`images-manifest.json` records all uniquely named image slots, their intended final use, dimensions, and captions. Twelve lifestyle slots have no supplied CC0 files. No real workshop film is present, so no video player or VideoObject is emitted. Switch `SHOW_MEDIA_LABELS` to true to enable the shared short media label. Labels default off.

## Cloudflare Pages

Publish the repository root with no build command. `_headers` sets security policy. `_redirects` documents the SPA-less native fallback supplied by root `404.html`. Cloudflare does not support a 404-status redirect rule, so the file has comments only. See the [official serving-pages documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/) and [redirect status support](https://developers.cloudflare.com/pages/configuration/redirects/). Verify response headers and unknown-route status after deployment. No push or deployment is performed here.

This repository is public. Do not add secrets, private research, supplier lists, personal addresses, or credentials.
