/* script.js - interactions: boot, particles, cursor, CLI demo, typing founder message,
   signature animation, theme toggle, read/copy, contact mock, keyboard shortcuts, confetti. */

document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('yr').textContent = new Date().getFullYear();

  // Boot progress simulation
  const boot = document.getElementById('boot');
  const bootBar = document.getElementById('boot-bar');
  let p = 0;
  const bootInt = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18);
    bootBar.style.width = p + '%';
    if (p >= 100) {
      clearInterval(bootInt);
      setTimeout(() => boot.style.display = 'none', 600);
    }
  }, 350);

  // Particles background
  initParticles('bg-canvas');

  // Custom cursor
  initCursor();

  // Theme toggle
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('zt-theme');
  if (savedTheme === 'light') document.body.classList.add('light');
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    localStorage.setItem('zt-theme', document.body.classList.contains('light') ? 'light' : 'dark');
  });

  // CLI demo
  initCLI();

  // Typed Founder message
  const founderText = `Welcome to Zerotech.

When I first started exploring the world of cybersecurity, it wasn't about tools or profit — it was about curiosity, trust, and the drive to understand how the digital world truly works.
That curiosity became passion, and that passion became Zerotech.

At Zerotech, we build more than code; we build trust. Our mission is to push boundaries, design next-gen security, and create a future where technology empowers everyone.

This is only the beginning.

– Renato Sahani
Founder & Visionary, Zerotech`;
  startTyping(document.getElementById('typed'), founderText);

  // Signature animation
  document.getElementById('sig-play').addEventListener('click', animateSignature);

  // Read aloud & copy & confetti
  document.getElementById('read-btn').addEventListener('click', () => speakText(founderText));
  document.getElementById('copy-btn').addEventListener('click', async () => {
    await navigator.clipboard.writeText(founderText);
    alert('Message copied to clipboard.');
  });
  document.getElementById('confetti-btn').addEventListener('click', () => launchConfetti());

  // Accent color change
  const accent = document.getElementById('accent');
  accent.addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--accent1', e.target.value);
  });

  // Download report (mock)
  document.getElementById('dl-report').addEventListener('click', () => {
    const txt = 'Zerotech - Demo Report\nTarget: example.com\nDate: ' + new Date().toISOString();
    const b = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sahanix-report.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Contact form mock
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('form-status').textContent = 'Sending...';
    setTimeout(() => {
      document.getElementById('form-status').textContent = 'Message sent — we will reply within 48 hours.';
      e.target.reset();
    }, 900);
  });

  // Keyboard shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.key === 't') themeBtn.click();
    if (e.key === 'r') document.getElementById('read-btn').click();
    if (e.key === 'c') document.getElementById('copy-btn').click();
    if (e.key === 'g') document.getElementById('confetti-btn').click();
    if (e.key === '/') { e.preventDefault(); document.getElementById('cli-input').focus(); }
  });

  // mock stats increment
  setInterval(() => {
    const scans = document.getElementById('stat-scans');
    const users = document.getElementById('stat-users');
    scans.textContent = Number(scans.textContent || 0) + Math.floor(Math.random() * 3);
    users.textContent = Number(users.textContent || 0) + (Math.random() < 0.25 ? 1 : 0);
  }, 2500);
});

/* ----------------- Particles ----------------- */
function initParticles(id) {
  const c = document.getElementById(id);
  if (!c) return;
  const ctx = c.getContext('2d');
  let w = c.width = innerWidth, h = c.height = innerHeight;
  window.addEventListener('resize', () => { w = c.width = innerWidth; h = c.height = innerHeight; });
  const N = Math.round((w * h) / 80000);
  const pts = Array.from({ length: N }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3, r: Math.random() * 1.8 + 0.6 }));
  let mx = -9999, my = -9999;
  window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      for (let j = i + 1; j < pts.length; j++) {
        const b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 16000) {
          ctx.strokeStyle = 'rgba(124,77,255,' + (0.12 * (1 - d2 / 16000)) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      // mouse repel
      const mdx = a.x - mx, mdy = a.y - my, md2 = mdx * mdx + mdy * mdy;
      if (md2 < 10000) { a.vx += mdx / 80000; a.vy += mdy / 80000; }
      a.x += a.vx; a.y += a.vy;
      if (a.x < 0 || a.x > w) a.vx *= -1;
      if (a.y < 0 || a.y > h) a.vy *= -1;
      ctx.fillStyle = '#7c4dff'; ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();
}

/* ----------------- Cursor ----------------- */
function initCursor() {
  const cur = document.getElementById('cursor');
  if (!cur) return;
  window.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';
  });
  // enlarge on interactive elements
  document.addEventListener('mouseover', (e) => {
    const t = e.target;
    if (t.tagName === 'A' || t.tagName === 'BUTTON' || t.closest('.btn-primary')) cur.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  document.addEventListener('mouseout', (e) => { cur.style.transform = 'translate(-50%,-50%) scale(1)'; });
}

/* ----------------- CLI demo ----------------- */
function initCLI() {
  const out = document.getElementById('cli-output');
  const form = document.getElementById('cli-form');
  const input = document.getElementById('cli-input');
  function push(txt, cls) { const d = document.createElement('div'); d.textContent = txt; if (cls) d.className = cls; out.appendChild(d); out.scrollTop = out.scrollHeight; }
  function fakeScan(target) {
    push(`> initializing scan on ${target}...`);
    setTimeout(() => push('• resolving DNS... OK'), 700);
    setTimeout(() => push('• checking headers... OK'), 1200);
    setTimeout(() => push('• scanning common vulnerabilities...'), 1800);
    setTimeout(() => push('! found HIGH: outdated-plugin (cvss:8.1)'), 3000);
    setTimeout(() => push('scan complete — 1 high, 0 medium, 2 low'), 3800);
  }
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const cmd = input.value.trim();
    if (!cmd) return;
    push('$ ' + cmd, 'cmd');
    if (/scan\s+([^\s]+)/i.test(cmd)) fakeScan(cmd.match(/scan\s+([^\s]+)/i)[1]);
    else if (/help/i.test(cmd)) push('commands: scan <host>, help, clear');
    else if (/clear/i.test(cmd)) out.innerHTML = '';
    else push('unknown command — type "help"');
    input.value = '';
  });
}

/* ----------------- Typing effect ----------------- */
function startTyping(el, text) {
  el.textContent = '';
  let i = 0;
  const cursor = document.getElementById('ty-cursor');
  cursor.style.display = 'inline-block';
  function step() {
    if (i < text.length) {
      el.textContent += text[i++];
      el.parentElement.scrollTop = el.parentElement.scrollHeight;
      setTimeout(step, (text[i - 1] === '\n' ? 140 : 18 + Math.random() * 30));
    } else {
      cursor.style.display = 'none';
    }
  }
  setTimeout(step, 600);
}

/* ----------------- Signature animation ----------------- */
function animateSignature() {
  const path = document.getElementById('sig-path');
  if (!path) return;
  const L = path.getTotalLength();
  path.style.transition = 'none';
  path.style.strokeDasharray = L;
  path.style.strokeDashoffset = L;
  requestAnimationFrame(() => {
    path.style.transition = 'stroke-dashoffset 1.6s ease-in-out';
    path.style.strokeDashoffset = '0';
  });
}

/* ----------------- Speak ----------------- */
function speakText(txt) {
  if (!('speechSynthesis' in window)) { alert('Speech not supported'); return; }
  const u = new SpeechSynthesisUtterance(txt);
  u.lang = 'en-US'; u.rate = 1; u.pitch = 1;
  window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
}

/* ----------------- Confetti (simple) ----------------- */
function launchConfetti() {
  const N = 40;
  for (let i = 0; i < N; i++) {
    const el = document.createElement('div'); el.className = '__cf';
    el.style.position = 'fixed'; el.style.left = (50 + (Math.random() - 0.5) * 40) + '%';
    el.style.top = (10 + Math.random() * 30) + '%';
    el.style.width = el.style.height = '10px';
    el.style.background = ['#4fc3f7', '#7c4dff', '#ffb86b'][Math.floor(Math.random() * 3)];
    el.style.borderRadius = '2px'; el.style.opacity = '0.95'; el.style.zIndex = 99999;
    document.body.appendChild(el);
    const dx = (Math.random() - 0.5) * 200, dy = 200 + Math.random() * 300;
    el.animate([{ transform: 'translateY(0) translateX(0)', opacity: 1 }, { transform: `translateY(${dy}px) translateX(${dx}px)`, opacity: 0 }], { duration: 1200 + Math.random() * 800, easing: 'cubic-bezier(.2,.8,.2,1)' });
    setTimeout(() => el.remove(), 2200);
  }
}

/* ----------------- LOGIN DEMO ----------------- */
function login() {
  const user = document.getElementById("login-user").value;
  if (!user) return alert("Enter username");
  alert("Logged in as " + user + " (demo)");
  closeLogin();
}
function closeLogin() { document.getElementById("login-modal").style.display = "none"; }
function openLogin() { document.getElementById("login-modal").style.display = "flex"; }

/* ----------------- Shop reservation ----------------- */
function reserveItem(productName) {
  const userName = prompt(`Enter your name to reserve "${productName}":`);
  if (!userName) return alert('Reservation cancelled.');
  const userEmail = prompt('Enter your email:');
  if (!userEmail) return alert('Reservation cancelled.');
  alert(`Thank you ${userName}! Your reservation for "${productName}" has been received. You will be notified soon.`);
}