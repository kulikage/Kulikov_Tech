// kulikov.tech — small progressive enhancements. The site works without JS.

// 1. Mobile navigation
(() => {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setOpen(false); toggle.focus(); }
  });
})();

// 2. Footer year
(() => {
  const el = document.getElementById('y');
  if (el) el.textContent = String(new Date().getFullYear());
})();

// 3. Theme: light by default, dark on request. The choice is remembered.
(() => {
  const btn = document.getElementById('themeBtn');
  if (!btn) return;
  const root = document.documentElement;
  const key = 'kt-theme';
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = (theme) => {
    if (theme === 'dark') root.dataset.theme = 'dark';
    else delete root.dataset.theme;
    const dark = theme === 'dark';
    btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.setAttribute('aria-pressed', String(dark));
    if (meta) meta.setAttribute('content', dark ? '#0e131b' : '#f6f8fb');
  };

  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

  btn.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(key, next); } catch (e) { /* storage unavailable */ }
  });
})();

// 4. Contact form: send via Formspree without leaving the page
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const btn = document.getElementById('sendBtn');
  const status = form.querySelector('.form-status');
  const label = btn ? btn.textContent : 'Send message';

  const show = (text, kind) => {
    if (!status) return;
    status.textContent = text;
    status.className = 'form-status' + (kind ? ' ' + kind : '');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    show('', '');
    if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        show('Message sent. I will reply by email.', 'success');
      } else {
        show('The form could not send your message. Please email nikolai@kulikov.tech instead.', 'error');
      }
    } catch (err) {
      show('No connection to the form service. Check your connection and try again, or email nikolai@kulikov.tech.', 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = label; }
    }
  });
})();
