// ── Navbar scroll shadow ──
window.addEventListener('scroll', function() {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
}, {passive: true});

// ── Mobile menu ──
function toggleMob() {
  var m = document.getElementById('mob');
  var b = document.getElementById('burger');
  m.classList.toggle('open');
  b.classList.toggle('open');
}
function closeMob() {
  document.getElementById('mob').classList.remove('open');
  document.getElementById('burger').classList.remove('open');
}
document.addEventListener('click', function(e) {
  var nav = document.getElementById('nav');
  if (!nav.contains(e.target)) closeMob();
});

// ── Copy button ──
function cp(id, btn) {
  var el = document.getElementById(id);
  if (!el) return;
  var text = el.textContent.trim();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(function() { cpDone(btn); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch(e){}
    document.body.removeChild(ta);
    cpDone(btn);
  }
}
function cpDone(btn) {
  var orig = btn.textContent;
  btn.textContent = 'Copied!'; btn.classList.add('ok');
  setTimeout(function(){ btn.textContent = orig; btn.classList.remove('ok'); }, 2000);
}

// ── Form ──
function sendForm(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#237a4e';
  setTimeout(function(){ btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3200);
}

// ── Progress bar ──
function animPbar() {
  var el = document.getElementById('pbar');
  if (!el) return;
  el.style.width = '0';
  setTimeout(function(){ el.style.width = '65%'; }, 80);
}

// ── Scroll reveal ──
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('up');
      revealObserver.unobserve(e.target);
    }
  });
}, {threshold: 0.1, rootMargin: '0px 0px -30px 0px'});

function runReveal() {
  var els = document.querySelectorAll('.fade:not(.up), .fade-l:not(.up), .fade-r:not(.up)');
  els.forEach(function(el){ revealObserver.observe(el); });
}

// ── Logo fallback: show monogram "K" if logo fails to load ──
function initLogo() {
  var logoImgs = document.querySelectorAll('.logo-gem img, .f-gem img');
  logoImgs.forEach(function(img) {
    img.onerror = function() {
      this.style.display = 'none';
      var mono = this.nextElementSibling;
      if (mono) mono.style.display = 'flex';
    };
  });
}

// ── Init on DOM ready ──
document.addEventListener('DOMContentLoaded', function() {
  initLogo();
  runReveal();
  // Progress bar on donate page
  if (window.location.pathname.indexOf('donate') !== -1) {
    setTimeout(animPbar, 400);
  }
});
