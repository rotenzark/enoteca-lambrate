/* ===== ENOTECA LAMBRATE · main.js ===== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var intro = document.getElementById('intro');
  function closeIntro() { if (intro) { intro.classList.add('done'); setTimeout(function () { intro.style.display = 'none'; }, 750); } }
  if (intro) { if (reduce) intro.style.display = 'none'; else { document.getElementById('intro-skip').addEventListener('click', closeIntro); setTimeout(closeIntro, 2600); } }

  var header = document.getElementById('site-header');
  function onScroll() { header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger'), nav = document.querySelector('.nav');
  burger.addEventListener('click', function () { var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o); document.body.style.overflow = o ? 'hidden' : ''; });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); burger.setAttribute('aria-expanded', false); document.body.style.overflow = ''; }); });

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (r) { io.observe(r); });
    setTimeout(function () { reveals.forEach(function (r) { if (r.getBoundingClientRect().top < window.innerHeight) r.classList.add('in'); }); }, 1500);
  } else reveals.forEach(function (r) { r.classList.add('in'); });

  // hours: Tue–Fri 10–20, Sat 10–13 & 15:30–20, Mon 15:30–20, Sun closed
  var TABLE = { 1: [[15.5, 20]], 2: [[10, 20]], 3: [[10, 20]], 4: [[10, 20]], 5: [[10, 20]], 6: [[10, 13], [15.5, 20]] };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function fmt(h) { var H = Math.floor(h), M = Math.round((h - H) * 60); return H + ':' + (M >= 30 ? '30' : '00'); }
  function romeNow() { return new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' })); }
  function openClose(d) { var w = TABLE[d.getDay()] || [], h = d.getHours() + d.getMinutes() / 60; for (var i = 0; i < w.length; i++) if (h >= w[i][0] && h < w[i][1]) return w[i][1]; return null; }
  function updateLive() {
    var d = romeNow(), close = openClose(d), dot = document.getElementById('live-dot'), txt = document.getElementById('live-text');
    if (!dot) return; var en = LANG === 'en', day = d.getDay(), h = d.getHours() + d.getMinutes() / 60;
    if (close !== null) { dot.className = 'open'; txt.textContent = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + fmt(close); return; }
    dot.className = 'closed'; var info = null, w = TABLE[day] || [];
    for (var i = 0; i < w.length; i++) if (h < w[i][0]) { info = { d: day, t: w[i][0], off: 0 }; break; }
    if (!info) for (var k = 1; k <= 7; k++) { var nd = (day + k) % 7; if (TABLE[nd]) { info = { d: nd, t: TABLE[nd][0][0], off: k }; break; } }
    var name = info.off === 0 ? (en ? 'today' : 'oggi') : (en ? DAYS_EN[info.d] : DAYS_IT[info.d]);
    txt.textContent = (en ? 'Closed · opens ' + name + ' at ' : 'Chiuso · apre ' + name + ' alle ') + fmt(info.t);
  }

  var LANG = 'it';
  var EN = {
    'intro.skip': 'Enter →', 'brand.sub': 'Wine · Spirits · Beer',
    'nav.ciro': 'Meet Ciro', 'nav.trovi': "What's inside", 'nav.prezzo': 'At every price', 'nav.banco': 'At the counter', 'nav.dove': 'Find us', 'cta.call': 'Call',
    'hero.kicker': 'Wine shop · Wine · Spirits · Beer · Lambrate',
    'hero.title': 'The right bottle,<br><em>at every price.</em>',
    'hero.sub': "A little neighbourhood institution on Via Porpora, corner of Via Teodosio. Selected wines of every range, bubbles, spirits and craft beers — with Ciro's genuine expertise, no airs.",
    'hero.cta1': 'Ask Ciro', 'hero.cta2': "What's inside", 'hero.live': 'Checking hours…', 'hero.f2': '★ 4.7 · 117 reviews',
    'ciro.kicker': 'Meet Ciro', 'ciro.h2': 'Your trusted<br>wine shop.',
    'ciro.p1': "Behind the counter there's <b>Ciro</b>: deeply knowledgeable, kind, with a genuine expertise you feel at once. He listens, understands what you're after and guides you to the right bottle — <em>without ever making you feel</em> how much you want to spend.",
    'ciro.p2': "That's the philosophy: a range of selected wines at every price, recommended with the same care. Be it a gift, tonight's dinner or a discovery just for you.",
    'trovi.kicker': "What's inside", 'trovi.h2': 'Small outside,<br>vast inside.',
    'c.1t': 'Wines', 'c.1p': 'Reds, whites and Italian terroirs: labels chosen one by one, at every price range.',
    'c.2t': 'Bubbles &amp; rosé', 'c.2p': 'Metodo classico, prosecco and fresh rosés — chilled and ready for tonight.',
    'c.3t': 'Spirits', 'c.3p': 'Grappa, whisky, rum, gin and amari: a surprising selection for such a small shop.',
    'c.4t': 'Craft beers', 'c.4p': 'A fridge always stocked with craft beers, for every taste. Wine and beer, chilled.',
    'trovi.note': 'Looking for a gift idea? Ciro puts together the right package, from the everyday bottle to the special one.',
    'prezzo.kicker': 'The philosophy', 'prezzo.h2': 'The same advice,<br>at every price.',
    'prezzo.l1': 'Everyday', 'prezzo.l2': 'To share', 'prezzo.l3': 'To gift', 'prezzo.l4': 'To collect',
    'prezzo.note': "Selected with the same care, all excellent. From the table bottle to the important one, you get the same honest advice.",
    'banco.kicker': 'At the counter', 'banco.h2': 'A glass, right here,<br>no rush.',
    'banco.p1': "Enoteca Lambrate isn't only for takeaway: you can stop for a good <b>glass</b> on the spot, perhaps with something to go with it and a bit of a chat. The mood is that of a shop that knows its customers.",
    'banco.cta': 'Call the wine shop',
    'rev.kicker': 'Voices from the neighbourhood', 'rev.h2': "4.7 ★ · «our trusted wine shop»",
    'dove.kicker': 'Find us', 'dove.h2': 'Via Porpora 140,<br>corner of Via Teodosio.',
    'dove.addr': 'Address', 'dove.addr2': '(entrance on the corner of Via Teodosio)', 'dove.hours': 'Hours', 'dove.hoursv': 'Tue–Fri 10–20 · Sat 10–13 & 15:30–20 · Mon 15:30–20 · Sun closed', 'dove.phone': 'Phone', 'dove.route': 'Get directions', 'dove.call': 'Call',
    'faq.h2': 'Frequently asked',
    'faq.q1': 'Where is Enoteca Lambrate?', 'faq.a1': 'At Via Nicola Antonio Porpora 140, entrance on the corner of Via Teodosio, in Milan (Lambrate / Città Studi area).',
    'faq.q2': 'When are you open?', 'faq.a2': 'Tuesday to Friday 10–20, Saturday 10–13 and 15:30–20, Monday 15:30–20. Closed Sunday.',
    'faq.q3': 'What can I find?', 'faq.a3': 'Selected wines at every price range, bubbles and rosé, spirits and craft beers. Perfect for a gift or the right bottle for a dinner.',
    'faq.q4': 'Can I have a glass on the spot?', 'faq.a4': "Yes: on-site consumption is available. A good glass and a chat, with Ciro's advice.",
    'foot.sub': 'Wine · Spirits · Beer · Milan', 'foot.where': 'Where', 'foot.hours': 'Hours', 'foot.hours2': 'Sat 10–13 / 15:30–20 · Mon 15:30–20 · Sun closed', 'foot.contact': 'Contact',
    'foot.disclaimer': 'Demo website. Content and photos gathered from public sources (Google Maps, Facebook); hours, availability and prices are indicative, to be confirmed in the shop. Alcohol abuse is harmful to health — drink responsibly, 18+.',
    'ab.call': 'Call', 'ab.trovi': "What's inside", 'ab.route': 'Directions'
  };
  var IT = {};
  document.querySelectorAll('[data-i18n]').forEach(function (el) { IT[el.getAttribute('data-i18n')] = el.innerHTML; });
  function setLang(lang) {
    LANG = lang; var dict = lang === 'en' ? EN : IT;
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'), v = dict[k]; if (v == null && lang === 'en') v = IT[k]; if (v != null) el.innerHTML = v; });
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang button').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === lang); });
    updateLive();
  }
  document.querySelectorAll('.lang button').forEach(function (b) { b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); }); });
  updateLive(); setInterval(updateLive, 60000);
})();
