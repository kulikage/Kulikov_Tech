// mobile nav
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle) navToggle.addEventListener('click', ()=> siteNav.classList.toggle('open'));

// footer year
document.getElementById('y').textContent = new Date().getFullYear();

// theme toggle (light/dark)
const btn = document.getElementById('themeBtn');
if (btn){
  const key='kulikov-theme';
  const set = (mode)=> document.documentElement.dataset.theme = mode;
  const saved = localStorage.getItem(key);
  if (saved) set(saved);
  btn.addEventListener('click', ()=>{
    const next = (document.documentElement.dataset.theme==='light') ? 'dark' : 'light';
    set(next); localStorage.setItem(key,next);
  });
}

// показать fallback только если фото не загрузилось
const pf = document.querySelector('.portrait-frame');
const img = pf ? pf.querySelector('img') : null;
if (img && pf){
  const showFallback = ()=> pf.classList.add('noimg');
  img.addEventListener('error', showFallback);
  if (!img.complete || img.naturalWidth === 0) showFallback();
}

// Formspree async submit
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('sendBtn');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (status) { status.textContent = ''; status.className = 'form-status'; }

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        if (status) { status.textContent = 'Thank you! I will get back to you shortly.'; status.classList.add('success'); }
      } else {
        if (status) { status.textContent = 'Sorry, the form could not be sent. Please email me directly: nikolai@kulikov.tech'; status.classList.add('error'); }
      }
    } catch (err) {
      if (status) { status.textContent = 'Network error. Please try again later or email me directly.'; status.classList.add('error'); }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
})();
