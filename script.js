function verifyAccess() {
  const user = document.getElementById('username').value.trim().toLowerCase();
  const pass = document.getElementById('password').value.trim();
  const question = document.getElementById('question').value.trim().toLowerCase();
  const status = document.getElementById('login-status');

  if (user === 'root' && pass === 'toor' && question.includes('apt update')) {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('welcome-terminal').style.display = 'block';

    setTimeout(() => {
      document.getElementById('welcome-terminal').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
    }, 4500);
  } else {
    status.innerText = 'Access Denied. Try again.';
    status.style.color = 'red';
  }
}