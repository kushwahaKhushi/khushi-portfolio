/**
 * ================================================
 *  KHUSHI KUSHWAHA — PORTFOLIO SCRIPT
 *  Vanilla JavaScript | No dependencies
 * ================================================
 *
 *  Features:
 *  1.  Mobile navigation menu
 *  2.  Sticky navbar + background on scroll
 *  3.  Active nav link while scrolling (IntersectionObserver)
 *  4.  Smooth scrolling (CSS handles it; JS fallback here)
 *  5.  Scroll reveal animations (IntersectionObserver)
 *  6.  Project filtering
 *  7.  Dark / light theme toggle (persisted in localStorage)
 *  8.  Animated typing text in hero
 *  9.  Back-to-top button
 * 10.  Contact form validation + Formspree / mailto fallback
 * 11.  Dynamic current year in footer
 * 12.  Skill bar + language bar animation on scroll
 * 13.  GitHub public API stats (no auth required)
 * 14.  Contribution grid decorative visualisation
 * 15.  Keyboard-accessible navigation
 */

'use strict';

/* ================================================
   CONFIGURATION — edit these values to customise
   ================================================ */
const CONFIG = {
  // REPLACE: Your GitHub username (used for the public GitHub API call)
  githubUsername: 'khushikushwaha',

  // Typing animation — roles shown in the hero section
  typingRoles: [
    'B.Tech CSE Student',
    'Aspiring Software Developer',
    'Web Developer',
    'Problem Solver',
    'Open Source Enthusiast',
  ],

  // Typing speeds (ms)
  typeSpeed:   80,
  deleteSpeed: 45,
  pauseAfterType:   1800,
  pauseAfterDelete: 400,

  // Contact form — set to 'formspree' or 'mailto'
  // If Formspree action URL is already set on the <form> element this is ignored.
  contactFallback: 'mailto',

  // REPLACE: Your email for the mailto fallback
  contactEmail: 'khushi@example.com',
};

/* ================================================
   DOM READY — entry point
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initActiveNavLinks();
  initTypingAnimation();
  initProjectFilter();
  initSkillBars();
  initContribGrid();
  initGitHubStats();
  initContactForm();
  initBackToTop();
  initFooterYear();
});

/* ================================================
   1. THEME TOGGLE (dark / light)
   ================================================ */
function initTheme() {
  const toggle   = document.getElementById('themeToggle');
  const icon     = document.getElementById('themeIcon');
  const body     = document.body;

  // Load persisted preference; fall back to dark
  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  toggle.addEventListener('click', () => {
    const next = body.classList.contains('dark-theme') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      icon.textContent = '☀️';
      toggle.setAttribute('aria-label', 'Switch to dark theme');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      icon.textContent = '🌙';
      toggle.setAttribute('aria-label', 'Switch to light theme');
    }
  }
}

/* ================================================
   2. NAVBAR — sticky + background on scroll
   ================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  const onScroll = throttle(() => {
    const y = window.scrollY;

    // Add/remove scrolled class for bg blur
    navbar.classList.toggle('scrolled', y > 20);

    // Hide navbar on fast scroll down, show on scroll up
    if (y > 400) {
      if (y > lastScroll + 5) {
        navbar.style.transform = 'translateY(-100%)';
      } else if (y < lastScroll - 5) {
        navbar.style.transform = 'translateY(0)';
      }
    } else {
      navbar.style.transform = 'translateY(0)';
    }

    lastScroll = y;
  }, 100);

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ================================================
   3. MOBILE MENU
   ================================================ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  const navItems  = navLinks.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', toggleMenu);

  // Close when a link is clicked
  navItems.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  // Keyboard: close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function toggleMenu() {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

/* ================================================
   4. SMOOTH SCROLL (JS fallback for older browsers)
   ================================================ */
function initSmoothScroll() {
  // CSS scroll-behavior: smooth handles modern browsers.
  // This JS fallback catches browsers that ignore the CSS property.
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* ================================================
   5. SCROLL REVEAL ANIMATIONS
   ================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect reduced-motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ================================================
   6. ACTIVE NAV LINK (IntersectionObserver)
   ================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    {
      threshold: 0,
      rootMargin: `-${Math.floor(window.innerHeight * 0.35)}px 0px -${Math.floor(window.innerHeight * 0.55)}px 0px`,
    }
  );

  sections.forEach(s => observer.observe(s));
}

/* ================================================
   7. TYPING ANIMATION (hero section)
   ================================================ */
function initTypingAnimation() {
  const el = document.getElementById('typedText');
  if (!el) return;

  // Respect reduced-motion: just show first role statically
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = CONFIG.typingRoles[0];
    return;
  }

  const roles  = CONFIG.typingRoles;
  let roleIdx  = 0;
  let charIdx  = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIdx];

    if (!deleting) {
      // Type
      charIdx++;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === current.length) {
        // Finished typing — pause then delete
        deleting = true;
        setTimeout(tick, CONFIG.pauseAfterType);
        return;
      }
      setTimeout(tick, CONFIG.typeSpeed);
    } else {
      // Delete
      charIdx--;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === 0) {
        // Finished deleting — move to next role
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
        setTimeout(tick, CONFIG.pauseAfterDelete);
        return;
      }
      setTimeout(tick, CONFIG.deleteSpeed);
    }
  }

  // Start after a short delay so the page has rendered
  setTimeout(tick, 800);
}

/* ================================================
   8. PROJECT FILTERING
   ================================================ */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const category = card.dataset.category || '';
        const show = filter === 'all' || category === filter;

        if (show) {
          card.classList.remove('hidden');
          // Re-trigger reveal if not yet visible
          if (!card.classList.contains('visible')) {
            card.classList.add('visible');
          }
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Set initial aria-pressed on "All" button
  const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allBtn) allBtn.setAttribute('aria-pressed', 'true');
}

/* ================================================
   9. SKILL BARS + LANGUAGE BARS ANIMATION
   ================================================ */
function initSkillBars() {
  // Animate .skill-fill bars
  const skillFills = document.querySelectorAll('.skill-fill');
  // Animate .lang-bar-fill bars
  const langFills  = document.querySelectorAll('.lang-bar-fill');

  if (!skillFills.length && !langFills.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skillFills.forEach(f => f.classList.add('animated'));
    langFills.forEach(f => f.classList.add('animated'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillFills.forEach(f => observer.observe(f));
  langFills.forEach(f => observer.observe(f));
}

/* ================================================
   10. CONTRIBUTION GRID (decorative)
   ================================================ */
function initContribGrid() {
  const grid = document.getElementById('contribGrid');
  if (!grid) return;

  const totalCells = 52 * 7; // 52 weeks × 7 days

  // Weight distribution for realistic-looking contribution density
  const weights = [
    { level: 0, weight: 45 },
    { level: 1, weight: 25 },
    { level: 2, weight: 15 },
    { level: 3, weight: 10 },
    { level: 4, weight: 5  },
  ];

  const pool = [];
  weights.forEach(({ level, weight }) => {
    for (let i = 0; i < weight; i++) pool.push(level);
  });

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    const level = pool[Math.floor(Math.random() * pool.length)];
    cell.className = `contrib-cell${level > 0 ? ' level-' + level : ''}`;
    cell.setAttribute('aria-hidden', 'true');
    fragment.appendChild(cell);
  }

  grid.appendChild(fragment);
}

/* ================================================
   11. GITHUB PUBLIC API STATS
   Uses GitHub's unauthenticated public API —
   no secret key needed, 60 req/hr rate limit.
   ================================================ */
function initGitHubStats() {
  const repoEl      = document.getElementById('repoCount');
  const followerEl  = document.getElementById('followerCount');
  const followingEl = document.getElementById('followingCount');

  if (!repoEl && !followerEl && !followingEl) return;

  const username = CONFIG.githubUsername;
  const url      = `https://api.github.com/users/${username}`;

  fetch(url, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })
    .then(res => {
      if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (repoEl)      animateCounter(repoEl,      data.public_repos  || 0);
      if (followerEl)  animateCounter(followerEl,  data.followers     || 0);
      if (followingEl) animateCounter(followingEl, data.following     || 0);
    })
    .catch(() => {
      // Silently show dashes if the API call fails (offline, rate-limit, etc.)
      if (repoEl)      repoEl.textContent      = '—';
      if (followerEl)  followerEl.textContent  = '—';
      if (followingEl) followingEl.textContent = '—';
    });
}

/* Animate a number from 0 to target */
function animateCounter(el, target) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target;
    return;
  }

  const duration = 1200;
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

/* ================================================
   12. CONTACT FORM VALIDATION & SUBMISSION
   ================================================ */
function initContactForm() {
  const form      = document.getElementById('contactForm');
  if (!form) return;

  const nameInput    = document.getElementById('name');
  const emailInput   = document.getElementById('email');
  const messageInput = document.getElementById('message');
  const submitBtn    = document.getElementById('submitBtn');
  const submitText   = document.getElementById('submitText');
  const successMsg   = document.getElementById('formSuccess');

  // Real-time inline validation on blur
  [nameInput, emailInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('blur',  () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all required fields
    const nameOk    = validateField(nameInput);
    const emailOk   = validateField(emailInput);
    const messageOk = validateField(messageInput);

    if (!nameOk || !emailOk || !messageOk) return;

    const action = form.getAttribute('action') || '';
    const isFormspree = action.includes('formspree.io') && !action.includes('YOUR_FORM_ID');

    if (isFormspree) {
      await submitToFormspree(form, submitBtn, submitText, successMsg);
    } else {
      submitViaMail(nameInput, emailInput, messageInput, successMsg);
    }
  });
}

/* Field validator — returns true if valid */
function validateField(input) {
  if (!input) return true;
  const id    = input.id;
  const value = input.value.trim();
  const errEl = document.getElementById(`${id}Error`);
  let   msg   = '';

  if (input.required && !value) {
    msg = 'This field is required.';
  } else if (id === 'email' && value) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRe.test(value)) msg = 'Please enter a valid email address.';
  } else if (id === 'name' && value.length < 2) {
    msg = 'Name must be at least 2 characters.';
  } else if (id === 'message' && value.length < 10) {
    msg = 'Message must be at least 10 characters.';
  }

  input.classList.toggle('error', !!msg);
  if (errEl) errEl.textContent = msg;

  return !msg;
}

/* Submit via Formspree using fetch */
async function submitToFormspree(form, btn, text, successMsg) {
  setLoading(btn, text, true);

  try {
    const data = new FormData(form);
    const res  = await fetch(form.action, {
      method:  'POST',
      body:    data,
      headers: { Accept: 'application/json' },
    });

    if (res.ok) {
      showSuccess(form, successMsg);
    } else {
      const json = await res.json().catch(() => ({}));
      const msg  = json.errors
        ? json.errors.map(e => e.message).join(', ')
        : 'Something went wrong. Please try again.';
      alert(msg);
    }
  } catch {
    alert('Network error. Please check your connection and try again.');
  } finally {
    setLoading(btn, text, false);
  }
}

/* Mailto fallback */
function submitViaMail(nameInput, emailInput, messageInput, successMsg) {
  const subject = encodeURIComponent('Portfolio Contact — ' + nameInput.value.trim());
  const body    = encodeURIComponent(
    `Name: ${nameInput.value.trim()}\nEmail: ${emailInput.value.trim()}\n\n${messageInput.value.trim()}`
  );
  window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  showSuccess(nameInput.closest('form'), successMsg);
}

function setLoading(btn, text, loading) {
  btn.classList.toggle('btn-loading', loading);
  btn.disabled = loading;
  if (text) text.style.visibility = loading ? 'hidden' : 'visible';
}

function showSuccess(form, successMsg) {
  form.reset();
  if (successMsg) {
    successMsg.style.display = 'flex';
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Auto-hide after 6 s
    setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
  }
}

/* ================================================
   13. BACK TO TOP BUTTON
   ================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  const onScroll = throttle(() => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, 150);

  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Keyboard support
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
}

/* ================================================
   14. FOOTER YEAR
   ================================================ */
function initFooterYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ================================================
   UTILITIES
   ================================================ */

/**
 * Throttle a function to run at most once per `limit` ms.
 * @param {Function} fn
 * @param {number} limit
 * @returns {Function}
 */
function throttle(fn, limit) {
  let lastRan = 0;
  let timer   = null;

  return function (...args) {
    const now = Date.now();
    if (now - lastRan >= limit) {
      lastRan = now;
      fn.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastRan = Date.now();
        fn.apply(this, args);
      }, limit - (now - lastRan));
    }
  };
}

/**
 * Debounce a function.
 * @param {Function} fn
 * @param {number} delay
 * @returns {Function}
 */
function debounce(fn, delay) { // eslint-disable-line no-unused-vars
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
