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

  /* Direction-aware scroll reveals: down reveals from below, up reveals from above. */
  var revealEls = document.querySelectorAll("[data-reveal]");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var lastScrollY = window.pageYOffset || 0;
  var scrollDirection = "down";
  var ticking = false;

  var groupCounters = new WeakMap();
  revealEls.forEach(function (el) {
    var parent = el.parentElement;
    var count = groupCounters.get(parent) || 0;
    el.style.setProperty("--i", count);
    groupCounters.set(parent, count + 1);
  });

  function updateScrollDirection() {
    var current = window.pageYOffset || 0;
    scrollDirection = current > lastScrollY ? "down" : "up";
    lastScrollY = current;
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  }, { passive:true });

  function prepareReveal(el) {
    el.classList.remove("reveal-from-top", "reveal-from-bottom");
    el.classList.add(scrollDirection === "up" ? "reveal-from-top" : "reveal-from-bottom");
  }

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          prepareReveal(entry.target);
          requestAnimationFrame(function () {
            entry.target.classList.add("is-visible");
          });
        } else {
          entry.target.classList.remove("is-visible");
          prepareReveal(entry.target);
        }
      });
    }, { threshold:0.12, rootMargin:"-30px 0px -40px 0px" });
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
