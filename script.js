/* =========================================================
   AIF — core interactions only (page renders fully loaded;
   no scroll reveals, no count-ups)
   ========================================================= */

/* ---- Navbar scroll effect (glassy on scroll) ---- */
const navbar = document.querySelector('.navbar');
if (navbar) {
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile menu ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.style.display === 'flex';
    mobileMenu.style.display = isOpen ? 'none' : 'flex';
    hamburger.classList.toggle('open', !isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = 'none';
      hamburger.classList.remove('open');
    });
  });
}

/* ---- Active nav link ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar-links a, .mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---- Contact form ---- */
const form = document.getElementById('joinForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Submitted!';
    btn.disabled = true;
    btn.style.background = '#2D6A4F';
    btn.style.borderColor = '#2D6A4F';
    setTimeout(() => {
      btn.textContent = 'Submit Interest Form';
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
      form.reset();
    }, 3000);
  });
}

/* ---- Partner / speaker outreach form -> opens email to the club ---- */
const partnerForm = document.getElementById('partnerForm');
if (partnerForm) {
  // TODO: replace with the club's real email once it's set up
  const AIF_EMAIL = 'aifinanceclub.umn@gmail.com';
  partnerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name  = document.getElementById('pName').value.trim();
    const org   = document.getElementById('pOrg').value.trim();
    const email = document.getElementById('pEmail').value.trim();
    const msg   = document.getElementById('pMsg').value.trim();
    if (!name || !email || !msg) { partnerForm.reportValidity?.(); return; }

    const subject = `Partnership / speaker inquiry — ${name}${org ? ' (' + org + ')' : ''}`;
    const body =
      `Name: ${name}\n` +
      `Company/Organization: ${org || '—'}\n` +
      `Email: ${email}\n\n` +
      `Message:\n${msg}\n`;
    window.location.href =
      `mailto:${AIF_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
