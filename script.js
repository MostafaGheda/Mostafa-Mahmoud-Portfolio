// ── IMAGE DATA (base64 encoded dashboard screenshots) ──
// These are injected by the build process — see README note below.
// To use your own images, replace the strings in the imgData array with
// your own base64-encoded PNG strings, or change the src attributes in
// index.html to relative file paths (e.g. "images/dashboard1.png").

const imgData = [
  window.IMG_CAPTURE4 || '',
  window.IMG_CAPTURE5 || '',
  window.IMG_CAPTURE6 || ''
];

// ── INJECT GALLERY IMAGES ──
function loadGalleryImages() {
  imgData.forEach((b64, i) => {
    const el = document.getElementById('gi' + i);
    if (el && b64) {
      el.src = 'data:image/png;base64,' + b64;
    }
  });
}

// ── LIGHTBOX ──
let currentLb = 0;

function openLb(i) {
  currentLb = i;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  img.src = imgData[i] ? 'data:image/png;base64,' + imgData[i] : '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function lbBgClose(e) {
  if (e.target === document.getElementById('lightbox')) closeLb();
}

function navLb(dir) {
  currentLb = (currentLb + dir + imgData.length) % imgData.length;
  const img = document.getElementById('lb-img');
  img.src = imgData[currentLb] ? 'data:image/png;base64,' + imgData[currentLb] : '';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowRight') navLb(1);
  if (e.key === 'ArrowLeft') navLb(-1);
});

// ── MOBILE NAV ──
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('navLinks').classList.remove('open');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
    closeMenu();
  }
});

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  loadGalleryImages();
  initScrollReveal();
});

// ── PROFILE PHOTO ──
// If you have a profile photo, set window.PROFILE_PHOTO to its base64 string,
// or replace the <img id="hero-photo"> src with a relative image path like "photo.jpg"
(function initPhoto() {
  const img = document.getElementById('hero-photo');
  const placeholder = document.getElementById('hero-placeholder');
  if (!img || !placeholder) return;

  if (window.PROFILE_PHOTO) {
    img.src = 'data:image/jpeg;base64,' + window.PROFILE_PHOTO;
    img.classList.add('loaded');
    placeholder.classList.add('hidden');
  }
  // If no photo is set, the initials placeholder stays visible
})();
