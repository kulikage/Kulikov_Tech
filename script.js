// mobile nav
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggle) {
  navToggle.addEventListener('click', () => siteNav.classList.toggle('open'));
}

// footer year
document.getElementById('y').textContent = new Date().getFullYear();

// CTA form -> mailto
const form = document.getElementById('ctaForm');
const msgInput = document.getElementById('ctaMsg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(msgInput.value.trim() || 'Hi! I would like to discuss a project.');
    window.location.href = `mailto:nikolai@kulikov.tech?subject=Inquiry%20via%20kulikov.tech&body=${msg}`;
  });
}
