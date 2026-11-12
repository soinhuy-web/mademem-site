/* Shared progressive enhancements. Initial page content remains usable without JS. */
(() => {
  'use strict';
  const config = window.MADEMEM;
  const spanish = document.documentElement.lang === 'es-US';
  const prefix = spanish ? '/es' : '';
  const translations = spanish ? window.MADEMEM_ES || {} : {};
  const t = text => translations[text] || text;
  const localPath = path => prefix + path;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const announce = message => { $('#global-status').textContent = message; };
  const storage = {
    get(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } },
    remove(key) { try { localStorage.removeItem(key); return true; } catch { return false; } }
  };

  const heroFilm = $('#hero-film');
  const heroPlay = $('.hero-play');
  if (heroFilm && heroPlay) {
    const source = heroFilm.querySelector('source[src]');
    if (source) {
      heroFilm.hidden = false;
      const fallback = $('.hero-fallback');
      if (fallback) fallback.hidden = true;
      const playLabel = heroPlay.getAttribute('data-play-label') || 'Play film';
      const pauseLabel = heroPlay.getAttribute('data-pause-label') || 'Pause film';
      const sync = () => {
        const paused = heroFilm.paused;
        heroPlay.textContent = paused ? playLabel : pauseLabel;
        heroPlay.setAttribute('aria-pressed', paused ? 'false' : 'true');
      };
      heroPlay.hidden = false;
      heroPlay.addEventListener('click', () => { if (heroFilm.paused) heroFilm.play(); else heroFilm.pause(); });
      heroFilm.addEventListener('play', sync);
      heroFilm.addEventListener('pause', sync);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) heroFilm.pause();
      sync();
    }
  }

  document.body.classList.toggle('show-media-labels', config.SHOW_MEDIA_LABELS);
  $$('[data-email]').forEach(link => { link.textContent = config.EMAIL; link.href = `mailto:${config.EMAIL}`; });
  $$('[data-whatsapp]').forEach(node => { node.textContent = config.WHATSAPP; });
  $$('[data-legal-name]').forEach(node => { node.textContent = config.LEGAL_NAME; });
  $$('[data-operator]').forEach(node => { node.textContent = `${t('Operated by')} ${config.LEGAL_NAME}`; });
  const navToggle = $('.nav-toggle');
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    $('#primary-nav').classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      navToggle.setAttribute('aria-expanded', 'false'); $('#primary-nav').classList.remove('is-open'); navToggle.focus();
    }
  });

  // Tags remain completely dark until a non-empty ID and matching consent exist.
  const gpc = navigator.globalPrivacyControl === true;
  const ids = config.PIXELS;
  const savedConsent = storage.get('mademem-consent');
  let consent = savedConsent && typeof savedConsent === 'object'
    ? { analytics: savedConsent.analytics === true, marketing: savedConsent.marketing === true }
    : { analytics: false, marketing: false };
  if (gpc) consent.marketing = false;
  const loaded = { google: false, meta: false, tiktok: false };
  function loadScript(src) {
    const script = document.createElement('script'); script.async = true; script.src = src; document.head.append(script);
  }
  function track(name) {
    // No visitor-supplied text or contact details enter analytics payloads.
    if (consent.analytics && ids.GOOGLE && loaded.google) window.gtag('event', name);
    if (consent.marketing && !gpc && ids.META && loaded.meta) window.fbq('trackCustom', name);
    if (consent.marketing && !gpc && ids.TIKTOK && loaded.tiktok) window.ttq.track(name);
  }
  function loadTags() {
    if (consent.analytics && ids.GOOGLE && !loaded.google) {
      loaded.google = true;
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag('js', new Date());
      window.gtag('config', ids.GOOGLE, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
      loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.GOOGLE)}`);
      window.gtag('event', 'page_view');
    }
    if (consent.marketing && !gpc && ids.META && !loaded.meta) {
      loaded.meta = true;
      const fbq = function () { fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments); };
      fbq.queue = []; fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0';
      window.fbq = fbq; window._fbq = fbq; fbq('init', ids.META);
      loadScript('https://connect.facebook.net/en_US/fbevents.js'); fbq('trackCustom', 'page_view');
    }
    if (consent.marketing && !gpc && ids.TIKTOK && !loaded.tiktok) {
      loaded.tiktok = true;
      window.TiktokAnalyticsObject = 'ttq';
      const ttq = window.ttq = window.ttq || [];
      ttq.methods = ['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];
      const defer = (target, method) => { target[method] = function () { target.push([method, ...arguments]); }; };
      ttq.methods.forEach(method => defer(ttq, method));
      ttq.instance = key => {
        const instance = (ttq._i || {})[key] || []; ttq.methods.forEach(method => defer(instance, method)); return instance;
      };
      ttq._i = ttq._i || {}; ttq._i[ids.TIKTOK] = []; ttq._i[ids.TIKTOK]._u = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._t = ttq._t || {}; ttq._t[ids.TIKTOK] = +new Date();
      ttq._o = ttq._o || {}; ttq._o[ids.TIKTOK] = {};
      loadScript(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(ids.TIKTOK)}&lib=ttq`);
      ttq.track('page_view');
    }
  }
  function setConsent(value) {
    const revoke = (loaded.google && !value.analytics) || ((loaded.meta || loaded.tiktok) && (!value.marketing || gpc));
    consent = { analytics: value.analytics, marketing: value.marketing && !gpc, updated: new Date().toISOString() };
    const saved = storage.set('mademem-consent', consent);
    $('#cookie-banner').hidden = true;
    announce(saved ? t("Privacy preference saved in this browser.") : t("Privacy preference applied for this visit. Browser storage is unavailable."));
    if (revoke) { location.reload(); return; }
    loadTags();
  }
  $('#cookie-banner').hidden = !!storage.get('mademem-consent');
  $('#gpc-notice').hidden = !gpc;
  $$('[data-cookie-settings]').forEach(button => button.addEventListener('click', () => {
    $('#cookie-banner').hidden = false; $('[data-consent="decline"]').focus();
  }));
  $$('[data-consent]').forEach(button => button.addEventListener('click', () => setConsent({ analytics: button.dataset.consent !== 'decline', marketing: button.dataset.consent === 'all' })));
  if ($('#privacy-opt-out')) $('#privacy-opt-out').addEventListener('click', () => {
    setConsent({ analytics: consent.analytics, marketing: false });
    $('#privacy-status').textContent = t("Advertising is off for this browser. Global Privacy Control is also honored.");
  });
  loadTags();
  $$('[data-event]').forEach(link => link.addEventListener('click', () => track(link.dataset.event)));

  // Number display and copying only.
  function closeWhatsApp() { $('#whatsapp-panel').hidden = true; $('[data-open-whatsapp]').setAttribute('aria-expanded', 'false'); }
  $('[data-open-whatsapp]').addEventListener('click', () => {
    const open = $('#whatsapp-panel').hidden;
    $('#whatsapp-panel').hidden = !open;
    $('[data-open-whatsapp]').setAttribute('aria-expanded', String(open));
    if (open) track('whatsapp_click');
  });
  $('[data-close-whatsapp]').addEventListener('click', closeWhatsApp);
  $('.dock-collapse').addEventListener('click', event => {
    const actions = $('#dock-actions'); const collapse = !actions.hidden;
    actions.hidden = collapse; closeWhatsApp();
    $('.contact-dock').classList.toggle('is-collapsed', collapse);
    event.currentTarget.setAttribute('aria-expanded', String(!collapse));
    event.currentTarget.textContent = collapse ? t("Open contact") : t("Collapse contact");
  });
  $$('[data-copy]').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(config.WHATSAPP);
      const old = button.textContent; button.textContent = t("Copied"); announce(t("WhatsApp number copied."));
      setTimeout(() => { button.textContent = old; }, 2200);
    } catch { announce((spanish ? `No se pudo copiar. Seleccione el número ${config.WHATSAPP} para copiarlo.` : `Copy unavailable. Select the displayed number ${config.WHATSAPP} to copy it.`)); }
    track('whatsapp_click');
  }));

  // Native dialogs restore focus to their opener on close.
  let lastOpener;
  function openDialog(id, button, focus) {
    lastOpener = button; $(id).showModal(); if (focus) $(focus).focus();
  }
  $$('dialog').forEach(dialog => {
    $('[data-close-dialog]', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => { if (lastOpener) lastOpener.focus(); });
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
  });
  $('[data-open-search]').addEventListener('click', event => openDialog('#search-dialog', event.currentTarget, '#search-input'));
  $('[data-open-save]').addEventListener('click', event => openDialog('#save-dialog', event.currentTarget, '#save-email'));
  function mail(subject, body, status) {
    status.replaceChildren(document.createTextNode(t("Your email app should open. Attach your photo there if needed and send the email yourself. If it does not open, write to ")));
    const link = document.createElement('a'); link.href = `mailto:${config.EMAIL}`; link.textContent = config.EMAIL; status.append(link, '.');
    location.href = `mailto:${config.EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  $('#save-form').addEventListener('submit', event => {
    event.preventDefault();
    mail(t("Save my design conversation"), (spanish ? `Mi correo: ${$('#save-email').value}\nQuisiera incluir esta página en nuestra conversación de diseño.\n${config.ORIGIN}${location.pathname}\nEnviaré este mensaje desde mi correo.` : `My email: ${$('#save-email').value}\nI would like to keep this page in our design conversation.\n${config.ORIGIN}${location.pathname}\nI will send this message from my mailbox.`), $('.form-status', event.currentTarget));
  });
  const params = new URLSearchParams(location.search);
  if ($('#inquiry-form')) {
    if (params.has('need')) $('#inquiry-need').value = params.get('need') === 'no-photo' ? (spanish ? 'No tengo foto y quisiera ayuda con el diseño.' : 'I do not have a photo and would like help with the design.') : t(params.get('need'));
    if (['pet','human','living','clinic'].includes(params.get('audience'))) $('#inquiry-audience').value = params.get('audience');
    $('#inquiry-form').addEventListener('submit', event => {
      event.preventDefault(); const data = new FormData(event.currentTarget); track('preview_start');
      mail(t("MadeMem preview inquiry"), (spanish ? `Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nPara: ${t({pet:'Pet memorial',human:'Human memorial',living:'Living pet',clinic:'Clinic inquiry'}[data.get('audience')])}\nConsulta: ${data.get('need')}\n\n${data.get('message')}\n\nAdjuntaré mi foto en este correo antes de enviarlo.` : `Name: ${data.get('name')}\nEmail: ${data.get('email')}\nFor: ${data.get('audience')}\nNeed: ${data.get('need')}\n\n${data.get('message')}\n\nI will attach my photograph in this email before sending.`), $('.form-status', event.currentTarget));
    });
  }
  if ($('#preview-name')) {
    $('#preview-name').addEventListener('input', event => { $('#mock-name').textContent = event.target.value || t("A name you choose"); });
    $('#preview-dates').addEventListener('input', event => { $('#mock-dates').textContent = event.target.value || t("Your words here"); });
  }
  if ($('#capacity-weight')) $('#capacity-weight').addEventListener('input', event => {
    const weight = Number(event.target.value);
    const minimum = Number(event.target.dataset.minCapacity) || 1;
    const estimate = Math.max(Math.ceil(weight), minimum);
    $('#capacity-result').textContent = weight > 0 && Number.isFinite(weight) ? (spanish ? `Estimación orientativa de unas ${estimate} pulgadas cúbicas. Confirme con el crematorio. El tamaño se confirma por escrito en su propuesta. Si ese tamaño confirmado es incorrecto, rehacemos la pieza sin cargo.` : `Planning estimate — about ${estimate} cubic inches. Confirm with your crematory. The size is confirmed in writing in your preview. If that confirmed size is wrong, we remake it at no charge.`) : t("Enter a positive weight for a planning estimate. We confirm the final size in writing.");
  });

  // Local memorial demo. File objects are never sent or persisted.
  if ($('#memorial-form')) {
    const fields = ['name','dates','words']; let photoURL;
    const draft = storage.get('mademem-memory') || {};
    fields.forEach(field => { if (typeof draft[field] === 'string') $(`#memory-${field}`).value = draft[field]; });
    function updateMemory() {
      $('#memory-title').textContent = $('#memory-name').value || t("A name you remember");
      $('#memory-line').textContent = $('#memory-dates').value;
      $('#memory-text').textContent = $('#memory-words').value || t("An ordinary moment. A familiar place. Your own words.");
    }
    fields.forEach(field => $(`#memory-${field}`).addEventListener('input', updateMemory)); updateMemory();
    $('#memorial-form').addEventListener('submit', event => {
      event.preventDefault();
      const saved = storage.set('mademem-memory', Object.fromEntries(fields.map(field => [field, $(`#memory-${field}`).value])));
      $('#memory-status').textContent = saved ? t("Text saved only in this browser. Nothing was uploaded.") : t("Browser storage is unavailable. Your draft is visible for this visit only.");
    });
    $('#memory-photo').addEventListener('change', event => {
      if (photoURL) URL.revokeObjectURL(photoURL);
      const file = event.target.files[0]; const preview = $('#memory-photo-preview');
      preview.hidden = true;
      if (!file) return;
      if (!file.type.startsWith('image/')) { $('#memory-status').textContent = t("Please choose an image file."); return; }
      photoURL = URL.createObjectURL(file); preview.src = photoURL;
      preview.onload = () => { preview.hidden = false; };
      preview.onerror = () => { preview.hidden = true; $('#memory-status').textContent = t("This image could not be displayed. Try another image format."); };
    });
    $('#clear-memory').addEventListener('click', () => {
      const cleared = storage.remove('mademem-memory'); $('#memorial-form').reset();
      if (photoURL) URL.revokeObjectURL(photoURL);
      $('#memory-photo-preview').hidden = true; $('#memory-photo-preview').removeAttribute('src'); updateMemory();
      $('#memory-status').textContent = cleared ? t("Draft cleared from this browser.") : t("Visible draft cleared. Browser storage could not be accessed.");
    });
  }

  let searchData;
  async function getSearch() {
    if (!searchData) searchData = fetch(`/assets/js/data/search${spanish ? '-es' : ''}.json`).then(response => { if (!response.ok) throw new Error('Search unavailable'); return response.json(); }).catch(error => { searchData = null; throw error; });
    return searchData;
  }
  let searchSequence = 0;
  async function runSearch(query, status, results) {
    const sequence = ++searchSequence;
    results.replaceChildren(); const clean = query.trim();
    if (!clean) { status.textContent = t("Type a material, package name, or question."); return; }
    status.textContent = t("Looking through the collection…");
    try {
      const data = await getSearch(); if (sequence !== searchSequence) return;
      const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const words = normalize(clean).split(/\s+/);
      const found = data.filter(item => words.every(word => normalize(`${item.title} ${item.text}`).includes(word)));
      const unique = [...new Map(found.map(item => [item.url, item])).values()];
      status.textContent = unique.length ? (spanish ? `${unique.length} ${unique.length === 1 ? 'página encontrada' : 'páginas encontradas'}.` : `${unique.length} matching ${unique.length === 1 ? 'page' : 'pages'}.`) : t("No matching pages. Try a material such as acrylic, a package name, or shipping.");
      unique.forEach(item => {
        const li = document.createElement('li'); const link = document.createElement('a'); link.href = item.url; link.textContent = item.title;
        const text = document.createElement('p'); text.textContent = item.text.slice(0, 160); li.append(link, text); results.append(li);
      });
      track('search');
    } catch { if (sequence === searchSequence) status.textContent = t("Search could not load. Please try again, or use the Shop and FAQ links."); }
  }
  $('#search-form').addEventListener('submit', event => { event.preventDefault(); runSearch($('#search-input').value, $('#search-status'), $('#search-results')); });
  if ($('#page-search-form')) {
    $('#page-search-input').value = params.get('q') || '';
    if (params.get('q')) runSearch(params.get('q'), $('#page-search-status'), $('#page-search-results'));
    $('#page-search-form').addEventListener('submit', event => {
      event.preventDefault(); const query = $('#page-search-input').value;
      const url = new URL(location.href); url.searchParams.set('q', query); history.replaceState(null, '', url);
      runSearch(query, $('#page-search-status'), $('#page-search-results'));
    });
  }

  // Catalog audience changes navigate to a separate collection, retaining applicable filters.
  const filterForm = $('#catalog-filters');
  if (filterForm) {
    function filter() {
      const material = filterForm.elements.material.value; const use = filterForm.elements.use.value;
      const cards = $$('#catalog-grid .product-card'); let count = 0;
      cards.forEach(card => {
        const match = (!material || card.dataset.materials.split('|').includes(material)) && (!use || card.dataset.uses.split('|').includes(use));
        card.hidden = !match; if (match) count++;
      });
      $('#filter-count').textContent = (spanish ? `${count} ${count === 1 ? 'pieza' : 'piezas'} en esta colección.` : `${count} ${count === 1 ? 'piece' : 'pieces'} in this collection.`); $('#filter-empty').hidden = count > 0;
      const url = new URL(location.href);
      material ? url.searchParams.set('material', material) : url.searchParams.delete('material');
      use ? url.searchParams.set('use', use) : url.searchParams.delete('use');
      history.replaceState(null, '', url);
    }
    for (const key of ['material','use']) if ([...filterForm.elements[key].options].some(option => option.value === params.get(key))) filterForm.elements[key].value = params.get(key);
    filterForm.elements.audience.addEventListener('change', event => { location.href = localPath(`/shop/${event.target.value}/`); });
    filterForm.elements.material.addEventListener('change', filter); filterForm.elements.use.addEventListener('change', filter);
    const originalAudience = filterForm.elements.audience.value;
    filterForm.addEventListener('reset', () => { setTimeout(() => { filterForm.elements.audience.value = originalAudience; filter(); }, 0); });
    filter();
  }
  // The JSON catalog powers all enhanced cards, filters, and catalog schema.
  const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  function catalogPrice(product) {
    if (product.price !== null) return `$${product.price}${product.audience === 'clinic' ? t(" / 5 pets") : ''}`;
    return product.handle === 'human-suzhou' ? t("From $999+, custom quote") : t("Custom quote — see preview first");
  }
  function hydrateCard(card, product) {
    card.dataset.materials = product.materials.join('|');
    card.dataset.uses = product.use.join('|');
    if (!(Array.isArray(product.lines) && product.lines.length > 1)) card.dataset.audience = product.audience;
    const title = escapeHTML(t(product.name));
    let body = product.recommended ? `<span class="badge">${t('Recommended')}</span>` : '';
    body += `<h2><a href="${localPath(product.url)}">${title}</a></h2><p class="price">${catalogPrice(product)}</p>`;
    if (card.dataset.mode === 'pricing') {
      body += `<h3>${t('You get')}</h3><ul>` + product.includes.map(item => `<li>${escapeHTML(t(item))}</li>`).join('') + '</ul>';
      body += `<h3>${spanish ? 'Por qué cuesta' : 'Why'} $${product.price}</h3><p>${escapeHTML(t(product.why))}</p><h3>${t('When it ships')}</h3><p>${escapeHTML(t(product.ship))}</p>`;
    } else {
      const facts = [
        [t("Made of"), product.materials.map(t).join(', ') || t("Materials confirmed in your preview.")],
        [t("Why"), product.why], [t("Lives"), product.lives], [t("Means"), product.means]
      ];
      body += '<dl class="card-facts">' + facts.map(([label, value]) => `<dt>${label}</dt><dd>${escapeHTML(t(value))}</dd>`).join('') + '</dl>';
    }
    body += `<a class="text-link" href="${localPath(product.url)}">${t('Explore')} ${title} <span aria-hidden="true">↗</span></a>`;
    $('.card-body', card).innerHTML = body;
    const image = $('img', card);
    if (!image.dataset.slot) { image.src = product.image; image.alt = t(product.name); }
  }
  fetch('/assets/js/data/products.json').then(response => {
    if (!response.ok) throw new Error('Catalog unavailable');
    return response.json();
  }).then(products => {
    $$('.product-card').forEach(card => {
      const product = products.find(item => localPath(item.url) === $('h2 a', card).getAttribute('href'));
      if (product) hydrateCard(card, product);
    });
    if (filterForm) filterForm.elements.material.dispatchEvent(new Event('change'));
    const current = products.find(product => localPath(product.url) === location.pathname);
    if (current) {
      $('.product-info .price').textContent = catalogPrice(current);
      const heading = $$('.product-info h2').find(node => node.textContent === t("You get"));
      const list = heading && heading.nextElementSibling;
      if (list && current.includes.length) {
        list.replaceChildren(...current.includes.map(text => {
          const item = document.createElement('li'); item.textContent = t(text); return item;
        }));
      }
      if (current.price !== null) {
        const schema = $$('script[type="application/ld+json"]').find(script => {
          try { return JSON.parse(script.textContent)['@type'] === 'Product'; } catch { return false; }
        });
        if (schema) {
          const data = JSON.parse(schema.textContent);
          data.offers.price = current.price; data.name = t(current.name);
          schema.textContent = JSON.stringify(data);
        }
      }
    }
    const listingSchema = $$('script[type="application/ld+json"]').find(script => {
      try { return JSON.parse(script.textContent)['@type'] === 'ItemList'; } catch { return false; }
    });
    if (listingSchema && filterForm) {
      const audience = filterForm.elements.audience.value;
      listingSchema.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ItemList',
        itemListElement: products.filter(product => Array.isArray(product.lines) ? product.lines.includes(audience) : product.audience === audience).map((product, index) => ({
          '@type': 'ListItem', position: index + 1, name: t(product.name), url: config.ORIGIN + localPath(product.url)
        }))
      });
    }
  }).catch(() => { /* Complete static fallback remains available when enhancement data cannot load. */ });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('fade-in'); observer.unobserve(entry.target); } }), { threshold: 0.05 });
    $$('.materials-grid article,.product-card,.gallery-grid article').forEach(card => observer.observe(card));
  }
})();
