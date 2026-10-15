/* ============================================================
   LUXURY FARM HOUSE — Shared JavaScript
   Navigation, scroll animations, parallax, reveal-on-scroll
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initScrollReveal();
  initParallax();
});

/* --- Header scroll effect --- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollThreshold = 60;

  function handleScroll() {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // initial check
}

/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  const mobileLinks = document.querySelectorAll('.nav-mobile__link');

  if (!hamburger || !mobileNav) return;

  function openNav() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeNav();
    }
  });

  // Close when tapping outside the menu on mobile
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && !mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      closeNav();
    }
  });
}

/* --- Scroll Reveal (Intersection Observer) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealElements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: '0px 0px -20px 0px'
    }
  );

  revealElements.forEach(el => observer.observe(el));
}

/* --- Subtle Parallax --- */
function initParallax() {
  const parallaxImages = document.querySelectorAll('.parallax-image');
  if (parallaxImages.length === 0) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.scrollY;

    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementCenter = elementTop + rect.height / 2;
      const viewportCenter = scrollY + window.innerHeight / 2;
      const offset = (viewportCenter - elementCenter) * 0.08;

      img.style.transform = `translateY(${offset}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* --- Helper: Smooth scroll to element --- */
function scrollToElement(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
