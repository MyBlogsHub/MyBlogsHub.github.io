document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.querySelector('.nav-list');
  const loginForm = document.getElementById('loginForm');
  const loginMessage = document.getElementById('loginMessage');

  // theme
  const savedTheme = localStorage.getItem('myblogshub_theme');
  if (savedTheme) {
    body.className = savedTheme;
    updateToggleButton(savedTheme);
  }

  function updateToggleButton(theme) {
    if (theme === 'dark-theme') {
      themeToggle.textContent = 'Light';
    } else {
      themeToggle.textContent = 'Dark';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('myblogshub_theme', 'dark-theme');
        updateToggleButton('dark-theme');
      } else {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('myblogshub_theme', 'light-theme');
        updateToggleButton('light-theme');
      }
    });
  }

  // mobile menu
  if (mobileToggle && navList) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navList.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
      if (!navList.contains(e.target) && !mobileToggle.contains(e.target) && navList.classList.contains('active')) {
        navList.classList.remove('active');
      }
    });

    document.querySelectorAll('.nav-list a').forEach(link => {
      link.addEventListener('click', () => navList.classList.remove('active'));
    });
  }

  // login form demo
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      if (email && password) {
        loginMessage.textContent = '✅ Demo: login successful (no backend)';
        loginMessage.style.color = 'green';
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1500);
      } else {
        loginMessage.textContent = '❌ Please fill in both fields.';
        loginMessage.style.color = 'red';
      }
    });
  }
});
