/* ================= MAIN ================= */
document.addEventListener('DOMContentLoaded', () => {

  /* YEAR */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* BOOT */
  const boot = document.getElementById('boot');
  const bootBar = document.getElementById('boot-bar');
  if (boot && bootBar) {
    let p = 0;
    const bootInt = setInterval(() => {
      p = Math.min(100, p + Math.random() * 20);
      bootBar.style.width = p + '%';
      if (p >= 100) {
        clearInterval(bootInt);
        setTimeout(() => boot.style.display = 'none', 500);
      }
    }, 300);
  }

  /* PARTICLES */
  initParticles('bg-canvas');

  /* THEME */
  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) {
    const saved = localStorage.getItem('zt-theme');
    if (saved === 'light') document.body.classList.add('light');
    themeBtn.onclick = () => {
      document.body.classList.toggle('light');
      localStorage.setItem('zt-theme',
        document.body.classList.contains('light') ? 'light' : 'dark'
      );
    };
  }

  /* CLI */
  initCLI();

  /* FOUNDER TYPING */
  const typed = document.getElementById('typed');
  if (typed) {
    const founderText = `Welcome to Zerotech.

This platform is a demo built to showcase cybersecurity tools, creativity,
and next-generation ideas.

– Renato Sahani`;
    startTyping(typed, founderText);
  }

  /* SIGNATURE */
  const sigBtn = document.getElementById('sig-play');
  if (sigBtn) sigBtn.onclick = animateSignature;

  /* CONTACT */
  const contact = document.getElementById('contact-form');
  if (contact) {
    contact.onsubmit = e => {
      e.preventDefault();
      document.getElementById('form-status').textContent = 'Message sent successfully.';
      contact.reset();
    };
  }

  /* MEMBERSHIP */
  const memberForm = document.getElementById('membership-form');
  const memberStatus = document.getElementById('membership-status');

  if (memberForm) {
    const savedUser = localStorage.getItem('zt-username');
    if (savedUser) {
      memberStatus.textContent = `✅ Welcome back, ${savedUser}`;
      updateDashboard();
    }

    memberForm.onsubmit = e => {
      e.preventDefault();
      const name = memberForm['member-name'].value;
      if (!name) return;

      localStorage.setItem('zt-username', name);
      localStorage.setItem('zt-membership', 'Active');
      localStorage.setItem('zt-joined', new Date().toISOString().split('T')[0]);

      memberStatus.textContent = `🎉 Welcome ${name}! Membership activated.`;
      memberForm.reset();
      updateDashboard();
    };
  }

});

/* ================= DASHBOARD ================= */
function updateDashboard() {
  const dash = document.getElementById('user-dashboard');
  if (!dash) return;

  const user = localStorage.getItem('zt-username');
  if (!user) return;

  dash.style.display = 'block';
  document.getElementById('dash-username').textContent = user;
  document.getElementById('dash-membership').textContent =
    localStorage.getItem('zt-membership') || 'Free';
  document.getElementById('dash-joined').textContent =
    localStorage.getItem('zt-joined') || '-';
}

/* ================= LOGIN ================= */
function login() {
  const user = document.getElementById('login-user').value;
  if (!user) return alert('Enter username');

  localStorage.setItem('zt-username', user);
  localStorage.setItem('zt-membership', 'Free');
  localStorage.setItem('zt-joined', new Date().toISOString().split('T')[0]);

  updateDashboard();
  closeLogin();
}
function openLogin() {
  document.getElementById('login-modal').style.display = 'flex';
}
function closeLogin() {
  document.getElementById('login-modal').style.display = 'none';
}

/* ================= SHOP RESERVATION ================= */
function reserveItem(productName) {
  const name = prompt(`Enter your name to reserve "${productName}"`);
  if (!name) return;

  const email = prompt('Enter your email');
  if (!email) return;

  const status = document.getElementById('reserve-status');
  if (status) {
    status.textContent =
      `✅ Thank you ${name}! Your reservation for "${productName}" has been received.`;
  }
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

  form.onsubmit = e => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (!cmd) return;
    push('$ ' + cmd);
    push('Scan complete — demo result');
    input.value = '';
  };
}

/* ================= PARTICLES ================= */
function initParticles(id) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth, h = c.height = innerHeight;
  window.onresize = () => {
    w = c.width = innerWidth;
    h = c.height = innerHeight;
  };

  const pts = Array.from({ length: 60 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - .5) * .3,
    vy: (Math.random() - .5) * .3
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = '#7c4dff';
      ctx.fillRect(p.x, p.y, 2, 2);
    });
    requestAnimationFrame(draw);
  }
  draw();
}

/* ================= TYPING ================= */
function startTyping(el, text) {
  let i = 0;
  el.textContent = '';
  (function type() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(type, 25);
    }
  })();
}

/* ================= SIGNATURE ================= */
function animateSignature() {
  const path = document.getElementById('sig-path');
  if (!path) return;
  const len = path.getTotalLength();
  path.style.strokeDasharray = len;
  path.style.strokeDashoffset = len;
  path.getBoundingClientRect();
  path.style.transition = 'stroke-dashoffset 1.5s ease';
  path.style.strokeDashoffset = '0';
}