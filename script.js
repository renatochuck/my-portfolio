// Intro fade and reveal main content
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.getElementById('intro').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('main-content').style.display = 'block';
    }, 1000);
  }, 2500); // intro duration
});