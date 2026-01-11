// 1. Mobile navigation
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open'); // Открывает/закрывает меню
    // Меняем иконку гамбургера на крестик (опционально, если стили это поддерживают)
    navToggle.classList.toggle('active'); 
  });
}

// 2. Footer year
const yearEl = document.getElementById('y');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3. Theme toggle (Light/Dark) - ОБНОВЛЕНО
const themeBtn = document.getElementById('themeBtn');
if (themeBtn) {
  const body = document.body;
  const storageKey = 'kulikov-theme';

  // Функция применения темы
  const applyTheme = (themeName) => {
    if (themeName === 'light') {
      body.classList.add('light-theme');
      body.classList.remove('dark-theme');
      themeBtn.textContent = '☀'; // Иконка солнца
    } else {
      body.classList.add('dark-theme');
      body.classList.remove('light-theme');
      themeBtn.textContent = '☾'; // Иконка луны
    }
    localStorage.setItem(storageKey, themeName);
  };

  // Проверка при загрузке страницы
  const savedTheme = localStorage.getItem(storageKey);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    // Если пользователь уже выбирал тему, используем её
    applyTheme(savedTheme);
  } else {
    // Если нет, используем системную настройку
    // Твой дизайн по умолчанию темный, поэтому если система просит светлую — включаем светлую
    if (!systemPrefersDark) {
       applyTheme('light');
    } else {
       applyTheme('dark');
    }
  }

  // Обработчик клика
  themeBtn.addEventListener('click', () => {
    // Если сейчас светлая, переключаем на темную, и наоборот
    if (body.classList.contains('light-theme')) {
      applyTheme('dark');
    } else {
      applyTheme('light');
    }
  });
}

// 4. Image fallback (показать заглушку, если фото не загрузилось)
const pf = document.querySelector('.portrait-frame');
const img = pf ? pf.querySelector('img') : null;
if (img && pf) {
  const showFallback = () => pf.classList.add('noimg');
  img.addEventListener('error', showFallback);
  if (!img.complete || img.naturalWidth === 0) showFallback();
}

// 5. Formspree async submit
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const btn = document.getElementById('sendBtn');
  const status = form.querySelector('.form-status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Сброс статуса перед отправкой
    if (status) { 
      status.textContent = ''; 
      status.className = 'form-status'; 
    }

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
        if (status) { 
          status.textContent = 'Thank you! I will get back to you shortly.'; 
          status.classList.add('success'); 
        }
      } else {
        if (status) { 
          status.textContent = 'Sorry, the form could not be sent. Please email me directly: nikolai@kulikov.tech'; 
          status.classList.add('error'); 
        }
      }
    } catch (err) {
      if (status) { 
        status.textContent = 'Network error. Please try again later or email me directly.'; 
        status.classList.add('error'); 
      }
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send message';
    }
  });
})();
