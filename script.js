/* ================= ZEROTECH SCRIPT (FIXED & CLEAN) ================= */

document.addEventListener('DOMContentLoaded', () => {

  /* -------- YEAR -------- */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* -------- BOOT -------- */
  const boot = document.getElementById('boot');
  const bootBar = document.getElementById('boot-bar');

  if (boot && bootBar) {
    let p = 0;
    const bootInt = setInterval(() => {
      p = Math.min(100, p + Math.random() * 18);
      bootBar.style.width = p + '%';
      if (p >= 100) {
        clearInterval(bootInt);
        setTimeout(() => boot.style.display = 'none', 600);
      }
    }, 350);
  }

  /* -------- PARTICLES -------- */
  initParticles('bg-canvas');

  /* -------- THEME -------- */
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    const savedTheme = localStorage.getItem('zt-theme');
    if (savedTheme === 'light') document.body.classList.add('light');

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      localStorage.setItem(
        'zt-theme',
        document.body.classList.contains('light') ? 'light' : 'dark'
      );
    });
  }

  /* -------- CLI -------- */
  initCLI();

  /* -------- FOUNDER TYPING -------- */
  const founderText = `Welcome to Zerotech.

When I first started exploring the world of cybersecurity, it wasn't about tools or profit — it was about curiosity, trust, and the drive to understand how the digital world truly works.
That curiosity became passion, and that passion became Zerotech.

At Zerotech, we build more than code; we build trust.

– Renato Sahani
Founder & Visionary, Zerotech`;

  const typed = document.getElementById('typed');
  if (typed) startTyping(typed, founderText);

  /* -------- DASHBOARD -------- */
  updateDashboard();
});

/* ================= PARTICLES ================= */
function initParticles(id) {
  const c = document.getElementById(id);
  if (!c) return;

  const ctx = c.getContext('2d');
  let w = c.width = innerWidth;
  let h = c.height = innerHeight;

  window.addEventListener('resize', () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  });

  const pts = Array.from({ length: Math.round((w * h) / 80000) }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.8 + 0.6
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach(a => {
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.fillStyle = '#7c4dff';
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ================= CLI ================= */
function initCLI() {
  const out = document.getElementById('cli-output');
  const form = document.getElementById('cli-form');
  const input = document.getElementById('cli-input');
  if (!out || !form || !input) return;

  const push = t => {
    const d = document.createElement('div');
    d.textContent = t;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (!cmd) return;
    push('$ ' + cmd);
    if (cmd.startsWith('scan')) push('Scan complete — demo result.');
    else push('Unknown command');
    input.value = '';
  });
}

/* ================= TYPING ================= */
function startTyping(el, text) {
  let i = 0;
  el.textContent = '';
  const step = () => {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(step, 20);
    }
  };
  step();
}

/* ================= LOGIN ================= */
function login() {
  const user = document.getElementById('login-user').value;
  if (!user) return alert('Enter username');

  localStorage.setItem('zt-username', user);
  localStorage.setItem('zt-joined', new Date().toLocaleDateString());

  updateDashboard();
  closeLogin();
}

function openLogin() {
  document.getElementById('login-modal').style.display = 'flex';
}
function closeLogin() {
  document.getElementById('login-modal').style.display = 'none';
}

/* ================= MEMBERSHIP ================= */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('membership-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('member-name').value;
    localStorage.setItem('zt-membership', 'Member');
    updateDashboard();
    document.getElementById('membership-status').textContent =
      `🎉 Welcome ${name}! Membership activated.`;
    form.reset();
  });
});

/* ================= SHOP ================= */
function reserveItem(product) {
  const name = prompt(`Enter your name to reserve "${product}"`);
  if (!name) return;
  alert(`✅ Thank you ${name}! Reservation received.`);
}

/* ================= DASHBOARD ================= */
function updateDashboard() {
  const dash = document.getElementById('user-dashboard');
  if (!dash) return;

  const username = localStorage.getItem('zt-username');
  if (!username) return;

  dash.style.display = 'block';
  document.getElementById('dash-username').textContent = username;
  document.getElementById('dash-membership').textContent =
    localStorage.getItem('zt-membership') || 'Free';
  document.getElementById('dash-joined').textContent =
    localStorage.getItem('zt-joined') || '-';
}