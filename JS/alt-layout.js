/* QUALITY.LOG — interactions for the alternative layout */
(function () {
  'use strict';

  /* Preloader: type out the fake test run, then slide the curtain up */
  const preloader = document.getElementById('preloader');
  const lines = document.querySelectorAll('.pre-line');
  lines.forEach(function (line, i) {
    setTimeout(function () { line.classList.add('show'); }, 260 * (i + 1));
  });
  setTimeout(function () {
    preloader.classList.add('done');
    setTimeout(function () { preloader.remove(); }, 800);
  }, 260 * (lines.length + 2));

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
})();
