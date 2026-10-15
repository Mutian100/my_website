// top bar is always visible — no hamburger / sidebar needed

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// counters
const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count; let cur = 0;
  const t = setInterval(() => { cur += Math.ceil(end / 40); if (cur >= end) { cur = end; clearInterval(t); } el.textContent = cur + '+'; }, 40);
  cio.unobserve(el);
}));
document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

// typewriter
const words = ['software engineer.', 'AI tinkerer.', 'design systems nerd.', 'storyteller in pixels.'];
const tw = document.getElementById('typewriter');
if (tw) {
  let w = 0, c = 0, del = false;
  (function tick() {
    const word = words[w];
    tw.textContent = word.slice(0, c);
    if (!del && c < word.length) { c++; setTimeout(tick, 55); }
    else if (!del) { del = true; setTimeout(tick, 1400); }
    else if (c > 0) { c--; setTimeout(tick, 28); }
    else { del = false; w = (w + 1) % words.length; setTimeout(tick, 300); }
  })();
}

// stardust particles
const cv = document.getElementById('stardust');
if (cv) {
  const ctx = cv.getContext('2d'); let P = [];
  function size() { cv.width = innerWidth; cv.height = innerHeight; }
  size(); addEventListener('resize', size);
  for (let i = 0; i < 70; i++) P.push({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 2 + .4, s: Math.random() * .4 + .1, o: Math.random() * .6 + .2 });
  (function draw() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    P.forEach(p => { p.y -= p.s; if (p.y < 0) p.y = innerHeight;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fillStyle = `rgba(139,135,126,${p.o * .45})`; ctx.fill(); });
    requestAnimationFrame(draw);
  })();
}

// tilt
const tilt = document.getElementById('tiltCard');
if (tilt) tilt.addEventListener('mousemove', e => {
  const r = tilt.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  tilt.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
});
if (tilt) tilt.addEventListener('mouseleave', () => tilt.style.transform = '');

// resume accordion
document.querySelectorAll('.job-head').forEach(h => h.addEventListener('click', () => {
  h.parentElement.classList.toggle('open');
}));
const expAll = document.getElementById('expandAll');
if (expAll) expAll.onclick = () => {
  const jobs = [...document.querySelectorAll('.job')];
  const anyClosed = jobs.some(j => !j.classList.contains('open'));
  jobs.forEach(j => j.classList.toggle('open', anyClosed));
  expAll.textContent = anyClosed ? 'Collapse all' : 'Expand all';
};

// carousel
const slides = [...document.querySelectorAll('#slides .slide')];
const dotsWrap = document.getElementById('dots');
let idx = 0, timer;
if (slides.length && dotsWrap) {
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    if (i === 0) d.classList.add('active');
    d.onclick = () => go(i);
    dotsWrap.appendChild(d);
  });
  const dots = [...dotsWrap.children];
  function go(i) {
    slides[idx].classList.remove('active'); dots[idx].classList.remove('active');
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add('active'); dots[idx].classList.add('active');
    restart();
  }
  function restart() { clearInterval(timer); timer = setInterval(() => go(idx + 1), 5000); }
  document.getElementById('prevBtn').onclick = () => go(idx - 1);
  document.getElementById('nextBtn').onclick = () => go(idx + 1);
  restart();
}

function sendDemo(e) {
  e.preventDefault();
  document.getElementById('formNote').textContent = 'Message received! (Demo — connect to Formspree to go live.)';
  e.target.reset();
  return false;
}
