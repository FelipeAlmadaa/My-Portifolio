/* QUALITY.LOG — interactions for the alternative layout */
(function () {
  'use strict';

  /* Preloader: type out the fake test run, then slide the curtain up */
  const preloader = document.getElementById('preloader');
  const lines = document.querySelectorAll('.pre-line');
  const delays = [400, 1200, 1800, 2900, 3400]; // irregular timings for a realistic vibe
  
  lines.forEach(function (line, i) {
    setTimeout(function () { line.classList.add('show'); }, delays[i] || (500 * (i + 1)));
  });
  
  setTimeout(function () {
    preloader.classList.add('done');
    setTimeout(function () { preloader.remove(); }, 800);
  }, 5500);

  /* Reveal-on-scroll */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });

  /* Glass header on scroll */
  const siteHeader = document.getElementById('siteHeader');
  function updateHeaderScroll() {
    siteHeader.classList.toggle('scrolled', window.scrollY > 40);
  }
  if (siteHeader) {
    updateHeaderScroll();
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  }

  /* Local time in the footer bar */
  const clock = document.getElementById('localTime');
  function tick() {
    const now = new Date();
    clock.textContent = 'LOCAL ' + now.toLocaleTimeString('en-GB');
  }
  if (clock) { tick(); setInterval(tick, 1000); }

  /* --- i18n Language Switcher --- */
  const langBtns = document.querySelectorAll('.lang-btn');
  const i18nElements = document.querySelectorAll('[data-i18n]');
  
  function setLanguage(lang) {
    if (!window.translations || !window.translations[lang]) return;
    
    // Update elements
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (window.translations[lang][key]) {
        el.innerHTML = window.translations[lang][key];
      }
    });

    // Update active button state
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Save preference
    localStorage.setItem('flog_lang', lang);
  }

  // Bind click events
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });

  // Load initial language
  const savedLang = localStorage.getItem('flog_lang') || 'en';
  setLanguage(savedLang);

})();
