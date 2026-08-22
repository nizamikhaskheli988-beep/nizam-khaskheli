(function () {
  "use strict";

  /* Mobile nav toggle */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  /* Scroll-triggered reveal animations */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Slim header on scroll (subtle, not intrusive) */
  var header = document.getElementById("site-header");
  var lastScroll = 0;
  window.addEventListener(
    "scroll",
    function () {
      var current = window.pageYOffset;
      if (header) {
        header.style.boxShadow = current > 40 ? "0 8px 24px rgba(0,0,0,0.18)" : "none";
      }
      lastScroll = current;
    },
    { passive: true }
  );
})();
