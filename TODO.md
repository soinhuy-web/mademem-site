# Outstanding work and facts to confirm

## Verification still pending

All seven acceptance fixes are implemented in English and US Spanish where applicable. Source and JavaScript checks pass; the visual fixes are not yet browser-accepted.

- **UNVERIFIED — pricing first-paint clearance (M1).** Capture English and Spanish `/pricing/` at 1440×900 and 1280×800 with cookies dismissed. All three “Before you choose” paragraphs, including the private digital memorial-page sentence, must finish above the reserved contact row without scrolling. The intro and advantages spacing have been tightened; retain the reserved row when making any further adjustment.
- **UNVERIFIED — responsive screenshots and hero (m4).** Capture Spanish home at 1440×900 and 375×812 and English pricing at 1440×900 on a first visit. Capture home with cookies dismissed at 320, 375, and 390px, checking both CTAs and the entire process caption above the contact row. Check overflow and 200% zoom in both languages. Mobile hero boxes are removed; calculated worst-case contrast is 5.30:1.
- **UNVERIFIED — browser acceptance and accessibility.** Recheck actual Spanish Acrílico (Comfort only, “1 pieza en esta colección.”), Madera, Urnas, reset, and search. Run axe on `/es/` and key pages, then Lighthouse on both home pages. Check home, shop, product, pricing, contact, article, FAQ, memorial, gallery, living, and legal pages for console errors, missing resources, and optional-tag requests with empty IDs. Static checks cover every Spanish Search accessible name; 224 tests now use actual HTML filter options, and 148 other source-function checks pass.
- **UNVERIFIED — remaining browser interactions.** Exercise keyboard navigation, dialogs and focus return, language switches, clipboard fallback, mailto drafts, capacity helper, memorial persistence/clearing, consent reopening, and GPC. Check static fallbacks with JavaScript disabled and print a policy and product in both languages. Executed operator assignments in both languages have one final period.
- **Environment limitation on this revision:** local HTTP binding fails with `Operation not permitted`; the browser access host is unavailable; native Chrome access was denied (“Computer Use was not approved to use Google Chrome”). No new screenshots, axe results, Lighthouse scores, or HTTP crawl are claimed. Repeat these checks in a browser-enabled environment.
- **TBC — deployed responses.** After authorized deployment, check security headers, language directory URLs, sitemap, and genuine unknown-route 404 responses. Root 404 links to its Spanish counterpart. Language-specific routing for arbitrary unknown Spanish URLs depends on the host. No deployment or git push was performed.

## Public settings and media

- Replace the temporary mailbox `info@teruu.com` when the MadeMem mailbox exists. Use the exact site-wide find-and-replace token documented in README to update `assets/js/config.js`, `llms.txt`, English and Spanish HTML fallbacks and Organization data, any search-index contact mentions, and this note together.
- Supply real product, scale, urn-opening, workshop, making, quality-check, and packing photographs. Replace each slot according to `images-manifest.json`.
- Supply twelve verified CC0 lifestyle photographs with recorded provenance. The current lifestyle slots contain no licensed photos. Preserve the required lifestyle captions and related-product names.
- Supply the 15-second process film and final poster. Add a muted player with visible pause/play and phone playback only when the file exists, then add matching VideoObject metadata. Preserve the process-illustration caption.
- **TBC — visible media-label decision.** The shared `SHOW_MEDIA_LABELS` hook is ready and defaults to false.
- Optional pixel IDs remain empty. Activate only approved IDs, verify vendor network behavior and the documented CSP, and retain consent and GPC gates.

## Making, delivery, and specifications

- **TBC — measured transit times.** Confirm substantiated delivery information and update copy consistently with the stated-time delay-or-cancel policy.
- **TBC — dispatch city.** Only China is published as dispatch origin.
- **TBC — supplier-confirmed dimensions and usable capacities**, openings and closures, wood species, textile fiber content and labels, and plush sizes. Current sizes require written preview confirmation. Full-size human urns must remain at least 200 cubic inches.
- **TBC — individual custom quotes and making windows.** Confirm stand-alone oil portrait timing, plush timing, Suzhou scheduling, Legacy scheduling, and each custom add-on in the preview.
- **TBC — hand-painted porcelain packing tests and timing.** Keep it inquiry-only until packaging is verified.
- **TBC — holiday and birthday order cut-offs.** No unconfirmed holiday shipping deadline is published.

## Service terms and future features

- **TBC — memorial-page hosting length, retention, access controls, and moderation rules.** The current demo is on-device only. Agree hosted terms before offering the hosted service. Keep copies of words and photographs outside the hosted page.
- **TBC — retention of proofs, photos, production files, and inquiry correspondence.** Update the privacy policy when the retention approach is confirmed.
- **TBC — live payment channel.** Replace the placeholder only after the approved invoice or other payment method is ready. Confirm the exact post-approval instructions by email.
- **TBC — clinic trial contents and terms.** Only $149 / 5 pets is confirmed. Confirm post-trial pricing, monthly fees, minimum order, postage, delivery timing, payment terms, and any clinic-logo card option.
- **TBC — governing law.** Confirm before orders proceed and update Terms. Any statutory privacy-business classification also remains unclaimed pending review.
- **TBC — returns routing if a return is arranged.** No US returns address exists or is published. Customers are not required to prepay a return to China for quality or transit damage.
- **BLOCKED — special custom ash/hair mailing.** Compliance review is required before any public process instructions. The site provides contact-only wording for special plans.
- **TBC — future voice-linked hardware.** It is not a featured SKU. Electronics and implementation details remain unconfirmed.
- Spanish for United States customers is implemented under `/es/` with the same USD prices and US delivery policies. Browser verification for the bilingual launch remains pending as listed above; no Mexico-specific version is planned in this phase.

Cloudflare Pages supplies the required SPA-less 404 through root `404.html`. `_redirects` intentionally documents that native fallback, because its rule format does not support a 404-status rewrite. Verify the hosted 404 response when deployment is authorized. [Official documentation](https://developers.cloudflare.com/pages/configuration/serving-pages/)
