// ── NAV SCROLL ──
const nav  = document.getElementById('mainNav');
const secs = document.querySelectorAll('section[id]');
const nls  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
  let cur = '';
  secs.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
  nls.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
  runReveal();
  animateBars();
});

// ── SCROLL REVEAL ──
function runReveal() {
  document.querySelectorAll('.appear:not(.show)').forEach((el, i) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40)
      setTimeout(() => el.classList.add('show'), i * 50);
  });
}
window.addEventListener('DOMContentLoaded', () => {
  [60, 250, 500, 1000].forEach(ms => setTimeout(runReveal, ms));
});

// ── HAMBURGER ──
const hamburger = document.getElementById('navHamburger');
const mobileNav = document.getElementById('navMobile');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

// ── EXPERIENCE TABS ──
function switchExpTab(id, btn) {
  document.querySelectorAll('.exp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.exp-tab').forEach(b => b.classList.remove('active'));
  document.getElementById('exp-' + id).classList.add('active');
  btn.classList.add('active');
  setTimeout(runReveal, 50);
}

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Honeypot check — bots fill this, humans don't see it
    const honeypot = contactForm.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) {
      const success = document.getElementById('cfSuccess');
      contactForm.style.display = 'none';
      success.removeAttribute('hidden');
      success.classList.add('visible');
      return;
    }

    const btn = contactForm.querySelector('.cf-btn');
    btn.classList.add('loading');
    btn.disabled = true;

    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        const success = document.getElementById('cfSuccess');
        contactForm.style.display = 'none';
        success.removeAttribute('hidden');
        success.classList.add('visible');
      } else {
        btn.classList.remove('loading');
        btn.disabled = false;
      }
    } catch {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  });
}

// ── PROFICIENCY BARS ──
let barsAnimated = false;
function animateBars() {
  if (barsAnimated) return;
  const stackSec = document.getElementById('stack');
  if (!stackSec) return;
  const r = stackSec.getBoundingClientRect();
  if (r.top < window.innerHeight - 100) {
    barsAnimated = true;
    document.querySelectorAll('.prof-fill').forEach(bar => {
      const w = bar.getAttribute('data-w');
      setTimeout(() => bar.style.width = w + '%', 200);
    });
  }
}
