# MadeMem

Static English (en-US) and US Spanish (es-US) catalog. HTML, CSS, and vanilla JavaScript. No build or dependencies.

## Preview

Run `python3 -m http.server 8080 --bind 127.0.0.1` from this directory and open `http://127.0.0.1:8080/`. Any static server supporting directory indexes works. Root-relative assets require a server.

## Pages

- `/` introduces materials, process, adapted stories, and packages.
- `/shop/`, `/shop/pet/`, `/shop/human/`, `/shop/clinic/` provide separate memorial catalogs and working filters.
- `/living/` has its own collection. `/products/<handle>/` contains all 21 package and inquiry pages.
- `/pricing/`, `/gallery/`, `/how/`, `/stories/`, `/about/`, `/faq/`, `/contact/`, `/memorial/` explain choices and care.
- `/blog/` links to six complete guides. `/legal/` contains seven policy pages.
- `/search/?q=acrylic` is a shareable client-side search URL. Header search also opens an accessible dialog.
- `/404.html` is the custom error page. `/es/404.html` is the Spanish error page.

## Languages

Every English page has a matching `/es/` page with the same slug. Header and footer switches link to the corresponding page. Both versions have self-referencing canonicals and en-US, es-US, and English x-default alternates. The sitemap lists 100 indexable URLs with language alternates. Spanish serves US customers with USD prices and the same US delivery terms. Spanish legal pages state that English governs inconsistencies.

Translate static copy, alt text, metadata, and schema together when updating a page. Preserve the matching English and Spanish FAQ answers in visible HTML and FAQPage data. Keep both search indexes synchronized with each page’s unique title and meta description. Index only page summaries and the six curated material summaries; do not scrape related cards, menus, or filter labels. Search normalizes accents and stays in the current language. Spanish filters retain stable English data keys while presenting translated labels. The memorial demo and consent preference share the same browser storage across languages.

## Public settings and catalog

Use the exact token `info@teruu.com` for one site-wide find-and-replace when the mailbox changes. This updates `assets/js/config.js`, `llms.txt`, every English and Spanish static HTML contact fallback and Organization JSON-LD block, and the Spanish search index. Keep the token identical everywhere. Runtime enhancements continue to read the `EMAIL` constant from `assets/js/config.js`. The same file holds brand, legal name, contact number, canonical origin, the `SHOW_MEDIA_LABELS` flag (default false), and optional pixel IDs. Static canonical tags already target the public domain. `llms.txt` repeats the required contact facts for machine readers and should be kept synchronized when those facts change. All catalog facts are in `assets/js/data/products.json`. Static cards and product schema are rendered from those facts by shared browser code, and complete initial content is also in HTML for visitors without JavaScript. When editing catalog facts, update the corresponding static HTML fallback and metadata as well. The English search data is in `assets/js/data/search.json`. Spanish search uses `assets/js/data/search-es.json`. The Spanish display dictionary is `assets/js/locale-es.js`. Shared numeric prices and filter keys remain in `products.json`.

## Forms and local storage

Inquiry and Save my design open a `mailto` draft to the configured contact. The visitor attaches photos and sends from their own mailbox. The site does not receive, upload, or acknowledge a submission. Save my design collects only an email and includes the current page in the draft.

The memorial demo saves text in localStorage only after a visitor chooses Save. Its photo stays in browser memory for the session. Clear draft removes both. No backend or hosted memorial service is implemented.

## Consent and empty analytics slots

Optional IDs in `config.js` stay empty until approved. Google tag requires analytics consent. Meta and TikTok require marketing consent. GPC overrides marketing. No tag requests occur with empty IDs. Prewired events are `page_view`, `preview_start`, `whatsapp_click`, and `search`. No contact data or draft content is sent. Withdrawal reloads the page if a tag had loaded. The CSP in `_headers` explicitly permits only the documented tag vendors, local assets, and Google Fonts. JSON-LD blocks are inert structured data and use no executable inline script.

## Media

`images-manifest.json` is the swap list. Each slot has `placeholder_src` (what the page requests now), `final_path` (the file to add), alt text, captions, and the pages that use it. No image file is used in five or more places. Images below the first screen use `loading="lazy"` and explicit width and height.

Ready now:

- Twelve public-domain lifestyle photographs in `assets/img/gallery/lifestyle-01.jpg` through `lifestyle-12.jpg`.
- Two journal photographs in `assets/img/blog/words-for-a-sympathy-card.jpg` and `assets/img/blog/how-to-write-a-memorial-page.jpg`.

Each of those carries the label “Public-domain photo (CC0) · lifestyle scene, not a product photo” (Spanish: “Foto de dominio público (CC0) · escena de la vida cotidiana, no es una foto de producto”) and names the related piece where it is a gallery scene. Credits are on `/about/#photograph-credits` and `/es/about/#photograph-credits`.

| File | Author | Related piece | Source | License |
| --- | --- | --- | --- | --- |
| lifestyle-01.jpg | Joshua Ness | Comfort | https://stocksnap.io/photo/house-home-CLD6T4J9VZ | CC0 1.0 |
| lifestyle-02.jpg | Candace McDaniel | Warmth | https://stocksnap.io/photo/book-interior-KLXLJSBKJI | CC0 1.0 |
| lifestyle-03.jpg | Nathan Fertig | Keepsake | https://stocksnap.io/photo/white-window-LMUGL3LQ7X | CC0 1.0 |
| lifestyle-04.jpg | Burst | Essential | https://stocksnap.io/photo/bedroom-clean-OE0F9BHXJQ | CC0 1.0 |
| lifestyle-05.jpg | Kristin Hardwick | Classic | https://stocksnap.io/photo/picture-frames-0UGJSGMQJL | CC0 1.0 |
| lifestyle-06.jpg | Kristin Hardwick | Legacy | https://stocksnap.io/photo/house-plant-MUNCW5ZFUZ | CC0 1.0 |
| lifestyle-07.jpg | Kristin Hardwick | Pet memorial plush | https://stocksnap.io/photo/interior-dining-VMJ6JJFFWR | CC0 1.0 |
| lifestyle-08.jpg | syoichi | Dafen memorial oil portrait | https://wordpress.org/photos/photo/8476a1846f/ | CC0 1.0 |
| lifestyle-09.jpg | PICSELI | Photo plaque + small sharing box | https://stocksnap.io/photo/flower-vase-TKT8BUD2H6 | CC0 1.0 |
| lifestyle-10.jpg | Socket0 | Full-size urn set | https://commons.wikimedia.org/wiki/File:Antique_china_cabinet.jpg | CC0 1.0. Cropped to the cabinet. |
| lifestyle-11.jpg | Lisa Fotios | Family-sharing set | https://stocksnap.io/photo/lantern-plants-RRHZANVQZM | CC0 1.0 |
| lifestyle-12.jpg | Yam B Chhetri | Portrait set | https://wordpress.org/photos/photo/94684665e8/ | CC0 1.0 |
| words-for-a-sympathy-card.jpg | Freestocks.org | Journal | https://stocksnap.io/photo/invitation-envelope-RMT4LVPJYN | CC0 1.0 |
| how-to-write-a-memorial-page.jpg | Aaron Burden | Journal | https://stocksnap.io/photo/books-reading-CN63QSUO8C | CC0 1.0 |

Pending product, material, gallery-work, About, and How photographs keep a neutral placeholder (`assets/img/placeholders/…svg`) at a 4:3 frame. The visible caption on those slots is “Sample illustration — real product photos to follow” (Spanish: “Ilustración de muestra — fotos reales del producto próximamente”). About and How also show the descriptive caption for the photograph that will replace the placeholder. To publish one, add the file at that slot’s `final_path`, then point the `img` with the matching `data-slot` at it. Do not request a file that is not in the repository.

Switch `SHOW_MEDIA_LABELS` to true to enable the shared short media label. Labels default off.

## Dropping in the film

The home hero is a real `<video>` slot: muted, autoplay, loop, playsinline, `preload="metadata"`, with a play/pause button and a 70% overlay (lighter on small screens). The navigation sits above it. Until the files exist, the page shows the existing still and does not request a missing video or poster.

Add these two files:

- `assets/video/hero-15s.mp4` — the 15-second illustrative film
- `assets/video/hero-poster.jpg` — the poster

Then, in both `index.html` and `es/index.html`:

1. Set `poster="/assets/video/hero-poster.jpg"` on `<video id="hero-film">`.
2. Uncomment the `<source src="/assets/video/hero-15s.mp4" type="video/mp4">` line inside that video.

The script in `assets/js/site.js` shows the player and the play/pause button only when that source is present. It does not fetch the file to test for it.

Do not add VideoObject until the real file is in place and its duration is 15 seconds. Then add this block to both home pages. `description` is the caption; use the Spanish sentence on `/es/`.

```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "MadeMem",
  "description": "Illustrative film — not footage of a specific customer's order",
  "thumbnailUrl": "https://mademem.com/assets/video/hero-poster.jpg",
  "contentUrl": "https://mademem.com/assets/video/hero-15s.mp4",
  "duration": "PT15S"
}
```

Spanish description: “Película ilustrativa — no es la filmación del pedido de un cliente.”

Put that same caption on the page, next to the film, when the file is live. It is not shown while the film is absent.

## Cloudflare Pages

Publish the repository root with no build command. `wrangler.jsonc` is only there so a Workers preview (`npx wrangler preview`) can upload that same root; it does not add a build step. `_headers` sets security policy. `_redirects` documents the SPA-less native fallback supplied by root `404.html`. Cloudflare does not support a 404-status redirect rule, so the file has comments only. See the [official serving-pages documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/) and [redirect status support](https://developers.cloudflare.com/pages/configuration/redirects/). Verify response headers and unknown-route status after deployment. No push or deployment is performed here.

This repository is public. Do not add secrets, private research, supplier lists, personal addresses, or credentials.
