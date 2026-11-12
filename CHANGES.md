# Changes

## November 11, 2026 — acceptance fixes

- M1: Tightened the pricing introduction, heading sizes, column spacing, and paragraph spacing in both languages, with bottom padding on the advantages section. Kept the contact dock in its reserved row. The required three advantages remain complete in HTML. First-paint clearance still requires browser measurement at 1440×900 and 1280×800; it is not claimed as visually verified.
- M2: Added stable material and use values to every Spanish shop filter, retaining translated labels on all four collections. Tests now read actual HTML options and card attributes rather than supplying assumed values.
- M3: Changed all 47 Spanish header Search controls to “Buscar en el sitio,” which contains the visible label “Buscar.”
- m1: Removed the extra punctuation appended to the configured legal name. Both live operator strings now end with one period.
- m2: Rebuilt both 52-entry search indexes from unique page titles and meta descriptions plus six curated material summaries. Related-product cards, navigation, and filter chrome are excluded. Acrylic / acrílico / acrilico return only the corresponding Comfort URL. Documented the indexing rule in README.
- m3: Reworded the Spanish hero to “Le ayudamos a mantener vivo su recuerdo, con delicadeza y solo cuando usted lo desee.” The proof timing and formal usted voice remain intact.
- m4: Removed mobile hero text backgrounds and box shadows. The continuous mobile overlay is 70–72%, lighter than the desktop text-side 80%, with text shadow and light text. Calculated minimum text contrast is 5.30:1 even over a pure-white poster, without counting the shadow.

### Current self-check results

- PASS: 94 HTML pages, 5,115 local file and fragment references, 92 sitemap URLs and reciprocal alternates, 92 unique media slots, metadata uniqueness, one H1, image dimensions/alternatives, static contact/operator facts, valid JSON-LD, all visible FAQ/schema pairs, fixed-price eligibility, Spanish legal governance statements, and prohibited-claim/link scans. These are source checks, not an HTTP crawl.
- PASS: Syntax for all three JavaScript files and 148 executed source-function checks covering bilingual catalog cards, filters, search, consent, empty pixel IDs, and GPC.
- PASS: 224 additional filter combinations executed with values parsed from all eight English/Spanish catalog HTML files; Spanish Acrylic yields “1 pieza en esta colección.” Wood, urn use, combined filters, and empty results agree with the cards.
- PASS: All 47 Spanish Search accessible names contain the visible label. Both executed operator assignments produce exactly one final period. Both language indexes restrict acrylic queries to Comfort.
- PASS: Mobile hero contrast calculation is 5.30:1 at the lightest overlay stop over white. Body and muted text contrast remain 13.87:1 and 5.98:1 on oat.
- UNVERIFIED: HTTP/browser console and network checks, exact viewport clearance, responsive screenshots, print rendering, keyboard/clipboard interactions, axe, and Lighthouse. The HTTP server cannot bind (Operation not permitted), the browser access host is unavailable, and native Chrome access was denied by the computer-use tool. No new browser scores or screenshots are claimed.
- PASS: No brief/review copied, dependencies or build step added, git push, remote changes, or deployment performed. Business facts and outstanding confirmations remain unchanged.

The earlier verification section and checklist below describe the previous revision. The current results above supersede its filter/search/hero claims and retain its browser-dependent checks as unverified. TODO lists the remaining launch verification and business facts.

## November 11, 2026 — bilingual launch revision

- Added a full US Spanish version of all 47 English pages under `/es/`, retaining the English slugs. The site now has 94 HTML pages, including both error pages, 12 complete journal articles, and 14 substantive legal pages.
- Translated static copy, image alternatives, form labels, metadata, structured-data text, search, catalog displays, consent controls, mailto drafts, and interactive feedback. Spanish uses usted and retains MadeMem and the six package names. Spanish legal pages state that English governs inconsistencies.
- Added matching-page language switches to every header and footer, self-referencing canonicals, and en-US, es-US, and English x-default alternates. The sitemap contains all 92 indexable URLs with language alternates. Added Spanish links and facts to llms.txt.
- Kept prices and catalog facts in the shared products.json file. Added the Spanish display dictionary and language-specific search index. Search supports accented and unaccented queries and keeps result links within the current language.
- Filled every static operator, legal-name, email, and WhatsApp fallback. Email links have usable mailto destinations before JavaScript runs. README documents the exact site-wide mailbox replacement token and the files it updates.
- Added static Organization data to every page and WebSite with SearchAction to both home and search pages. Removed runtime Organization and WebSite injection to prevent duplicates. Translated article headlines and breadcrumb labels in Spanish schema.
- Removed the unrelated plush-sizing sentence from the Suzhou product page in both languages while preserving the import and fiber-content wording.
- Gave the desktop contact dock reserved viewport space below the scrollable page. Its panel also occupies reserved space. Mobile retains its separate contact row. The dock cannot paint over page paragraphs.
- Reduced cookie-banner width, padding, text, and button spacing, retained all three consent choices and both policy links, and positioned it above the contact row. Empty pixel IDs, category consent, and GPC gates remain in force.
- Tightened mobile hero spacing and headline sizing. The mobile image overlay now ranges from 45% to 52% opacity. Added text backing and a translucent header to preserve contrast against bright image areas.
- Kept the footer visible in print so the operator and contact facts print with policies and products.
- Updated README and TODO. Work remains local. The site folder contains no copied brief or review.

## Verification performed

The final Python audit passed across 94 HTML pages, 5,115 local reference checks, 92 sitemap URLs, and 92 unique media slots. It checked language pairs, switch destinations, title and description uniqueness, canonicals, OG and Twitter tags, one H1, image dimensions and alternatives, static contact facts, JSON-LD parsing, schema text translations, price eligibility, all 34 FAQ question-and-answer pairs per language, legal governance lines, gallery counts, and prohibited claims and links.

JavaScriptCore accepted all three shipped JavaScript files. Another 148 source-function checks passed for both languages, including all 17 catalog cards, six pricing cards, material and use filters, reset and empty states, audience paths, USD prices, clinic and custom-quote wording, accent-insensitive search, language-contained results, and consent behavior. Consent tests covered empty IDs before and after consent, populated IDs before consent, GPC, analytics-only consent, marketing consent, and duplicate loading.

Calculated contrast is 13.87 to 1 for charcoal body text on oat and 5.98 to 1 for muted text. The mobile hero text backing over a white frame with the lightest image-overlay stop yields 10.98 to 1 for its light text.

Browser verification remains blocked in this execution environment. The local HTTP server returned `Operation not permitted` when binding its port, browser access reported an unavailable host, and headless Chrome exited with status 134 without producing a screenshot. Required screenshots, browser console checks, viewport measurements, axe, print rendering, and Lighthouse results remain unverified. The prior review’s scores describe the earlier version.

## Acceptance checklist for English and US Spanish

| Item | English | US Spanish | Verification note |
| --- | --- | --- | --- |
| Required routes and internal references | PASS | PASS | Every English page has a Spanish counterpart. All 5,115 checked references resolve to local files. HTTP serving remains unverified. |
| Unique metadata and canonical URLs | PASS | PASS | All 94 titles and descriptions are unique. Canonicals, OG and Twitter tags, and three language alternates are present. |
| Home order, expanded content, and responsive hero | FAIL — visual check blocked | FAIL — visual check blocked | Source order and responsive rules checked. Lighter overlay, text contrast, and reserved contact space implemented. Screenshots at 320, 375, and 390px remain pending. |
| Working filters and separated audiences | PASS — source functions | PASS — source functions | Acrylic, wood, urn use, empty results, reset, and audience destinations pass. Living-pet collections stay separate. |
| Gallery links and 15 + 12 unique slots | PASS | PASS | Gallery targets resolve. Shared manifest has 15 reference slots and 12 empty lifestyle slots with distinct IDs. |
| Search for packages, materials, and pages | PASS — source functions | PASS — source functions | Acrylic, Classic, shipping, and ceramic queries reach the expected pages. Spanish accent handling and local-language results pass. |
| Honest inquiry and design-saving forms | PASS — source | PASS — source | Mailto drafts instruct the visitor to attach and send photos. Spanish drafts and feedback are translated. Actual email-app launch remains unverified. |
| WhatsApp display and copy only | PASS — source | PASS — source | Static number and copy controls present. No chat deep links found. Clipboard interaction remains unverified. |
| Shared public configuration | PASS | PASS | Shared runtime settings and numeric catalog facts retained. Required static fallbacks use the documented global email token. |
| Brand hygiene and static operator facts | PASS | PASS | Every page includes the operator, email, and WhatsApp in HTML. No secondary brand presentation, street address, or secondary-domain web link. |
| Prices, DDP, China origin, proofs, and timing | PASS — source | PASS — source | USD amounts match the catalog. Default and longer ship-out windows, transit-at-order, and US business days in Eastern Time retained. |
| Comfort inclusions | PASS | PASS | Only acrylic suncatcher, sympathy card, and gift box in its inclusion list. |
| Custom quotes and schema prices | PASS | PASS | Six pet prices and clinic trial are the only Product offers. Suzhou retains its $999+ quote floor. |
| Clinic offer | PASS | PASS | Only $149 for 5 pets is confirmed. Contents, postage, timing, and commercial terms remain to be confirmed. |
| Reviews and promotional claims | PASS | PASS | No fabricated reviews, rating schema, popularity claims, discount claims, or prohibited brand and origin claims found. |
| Adapted stories and complete articles | PASS | PASS | Three labeled adapted stories and six complete articles per language. Spanish labels use Historia de ejemplo — adaptada. |
| Memorial feature and retention wording | PASS — source | PASS — source | Private hosted feature and hosting period to be confirmed. Local demo contains no upload path or indefinite-hosting claim. |
| At-home filling and special projects | PASS | PASS | Standard urns and vials are filled at home. Special projects use contact-only wording. |
| Complete legal pages | PASS — source | PASS — source | Seven policies per language cover shipping, after-sales, privacy, consent, and GPC. Spanish includes English-governs statements. |
| Compact consent banner and gated pixels | PASS — source functions | PASS — source functions | Three choices and policy links preserved. All consent and GPC function checks pass. Browser network behavior remains unverified. |
| Structured data and visible FAQ consistency | PASS | PASS | All blocks parse. FAQ questions and answers match visible text. Organization and home/search WebSite blocks are static and unique. |
| Sitemap, robots, llms, error pages, headers, redirects, manifest | PASS — files | PASS — files | Required files present. Sitemap includes 92 indexable URLs and alternates. Hosted headers and unknown-route status await deployment. |
| Media labels default off | PASS | PASS | Shared SHOW_MEDIA_LABELS remains false. |
| Language, headings, alt text, motion, contrast | PASS — source and calculations | PASS — source and calculations | Language and one H1 checked on every page. Reduced-motion rules retained. Keyboard and assistive-technology behavior remain unverified. |
| Browser console smoke checks | FAIL — blocked | FAIL — blocked | Home, shop, product, pricing, contact, and article checks could not run in a browser. Syntax and 148 source-function checks pass. |
| No horizontal overflow at 320–390px | FAIL — unverified | FAIL — unverified | Responsive rules inspected. Actual viewport and 200% zoom measurements remain pending. |
| Public repository hygiene | PASS | PASS | No brief, review, research, costs, supplier lists, credentials, or personal address added. |
| CHANGES and TODO | PASS | PASS | Updated for bilingual launch and current verification limits. |

## N/A items

Real-video playback and VideoObject remain N/A while the film is absent. Live checkout, backend uploads, and hosted memorial accounts remain outside this static implementation.
