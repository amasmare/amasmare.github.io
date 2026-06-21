// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// Project filters
const filters = document.getElementById('filters');
const cards = [...document.querySelectorAll('#projectGrid .card')];
filters.addEventListener('click', e => {
  const btn = e.target.closest('.filter');
  if (!btn) return;
  filters.querySelector('.is-active')?.classList.remove('is-active');
  btn.classList.add('is-active');
  const f = btn.dataset.filter;
  cards.forEach(c => {
    const show = f === 'all' || c.dataset.cat.split(' ').includes(f);
    c.style.display = show ? 'flex' : 'none';
  });
});

// Scroll reveal
const reveals = document.querySelectorAll(
  '.section__title, .about__text, .about__stats, .card, .skillset, .link-card, .contact__lede, .contact__actions'
);
reveals.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver((entries) => {
  entries.forEach((en, i) => {
    if (en.isIntersecting) {
      setTimeout(() => en.target.classList.add('in'), (i % 6) * 60);
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));
