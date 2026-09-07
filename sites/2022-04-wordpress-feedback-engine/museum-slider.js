/* Museum-only. Stands in for the Slider Revolution testimonial carousel that was
   deleted before publication; see museum.css and index.html for the why. */
(() => {
  const root = document.querySelector('[data-museum-slider]');
  if (!root) return;

  const viewport = root.querySelector('.ms-viewport');
  const track = root.querySelector('.ms-track');
  const slides = [...track.children];
  const autoplay = !matchMedia('(prefers-reduced-motion: reduce)').matches;
  let index = 0;
  let timer;

  const arrow = (name, label) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `ms-arrow ms-${name}`;
    b.setAttribute('aria-label', label);
    viewport.appendChild(b);
    return b;
  };

  const dots = document.createElement('div');
  dots.className = 'ms-dots';
  const prev = arrow('prev', 'Previous testimonial');
  const next = arrow('next', 'Next testimonial');
  root.appendChild(dots);

  const show = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.setProperty('--i', index);
    slides.forEach((s, n) => s.classList.toggle('is-current', n === index));
    [...dots.children].forEach((d, n) => d.setAttribute('aria-current', n === index));
  };

  const rearm = () => {
    clearInterval(timer);
    if (autoplay) timer = setInterval(() => show(index + 1), 6000);
  };

  const step = (delta) => { show(index + delta); rearm(); };

  slides.forEach((_, n) => {
    const d = document.createElement('button');
    d.type = 'button';
    d.setAttribute('aria-label', `Testimonial ${n + 1}`);
    d.addEventListener('click', () => step(n - index));
    dots.appendChild(d);
  });

  prev.addEventListener('click', () => step(-1));
  next.addEventListener('click', () => step(1));
  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') step(-1);
    else if (e.key === 'ArrowRight') step(1);
  });
  root.addEventListener('pointerenter', () => clearInterval(timer));
  root.addEventListener('pointerleave', rearm);
  root.addEventListener('focusin', () => clearInterval(timer));
  root.addEventListener('focusout', rearm);

  show(0);
  rearm();
})();
