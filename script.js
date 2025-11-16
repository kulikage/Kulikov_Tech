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
