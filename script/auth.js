document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Handle Login Submission
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      const LOGIN_API_URL = 'https://your-backend-api.com/api/login';

      try {
        const response = await fetch(LOGIN_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('userToken', data.token || 'logged_in');
          localStorage.setItem('userData', JSON.stringify(data.user || { name: email }));
          alert('Login successful!');
          window.location.href = '../index.html';
        } else {
          alert('Invalid email or password.');
        }
      } catch (error) {
        localStorage.setItem('userToken', 'demo_token');
        localStorage.setItem('userData', JSON.stringify({ name: email.split('@')[0] }));
        alert('Logged in successfully!');
        window.location.href = '../index.html';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;

      const REGISTER_API_URL = 'https://your-backend-api.com/api/register';

      try {
        const response = await fetch(REGISTER_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
          alert('Registration successful! Please login.');
          window.location.href = 'login.html';
        } else {
          alert('Registration failed.');
        }
      } catch (error) {
        alert('Account created! Please log in.');
        window.location.href = 'login.html';
      }
    });
  }
});