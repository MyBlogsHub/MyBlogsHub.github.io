document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const mobileToggle = document.getElementById('mobileToggle');
  const navList = document.querySelector('.nav-list');
  const registerForm = document.getElementById('registerForm');
  const registerMessage = document.getElementById('registerMessage');

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

  // register form demo
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const confirm = document.getElementById('confirm-password').value.trim();

      if (!name || !email || !password || !confirm) {
        registerMessage.textContent = '❌ Please fill in all fields.';
        registerMessage.style.color = 'red';
        return;
      }

      if (password !== confirm) {
        registerMessage.textContent = '❌ Passwords do not match.';
        registerMessage.style.color = 'red';
        return;
      }

      if (password.length < 6) {
        registerMessage.textContent = '❌ Password must be at least 6 characters.';
        registerMessage.style.color = 'red';
        return;
      }

      // demo success
      registerMessage.textContent = '✅ Account created! (demo) Redirecting...';
      registerMessage.style.color = 'green';
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }
});
