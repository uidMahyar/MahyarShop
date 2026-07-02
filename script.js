// ══════════════════════════════════════════════════════════
// MahyarShop — script.js
// ══════════════════════════════════════════════════════════

(function () {
  'use strict';

  // ---- منوی موبایل ----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('active');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // بستن منو بعد از کلیک روی هر لینک (تجربه بهتر در موبایل)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- انیمیشن ظاهر شدن کارت‌های محصول هنگام اسکرول ----
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var cards = document.querySelectorAll('.product-card');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    // اگر کاربر انیمیشن کمتر می‌خواد یا مرورگر قدیمیه، مستقیم نمایش بده
    cards.forEach(function (card) { card.classList.add('in-view'); });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(function (card) { observer.observe(card); });
  }
})();
