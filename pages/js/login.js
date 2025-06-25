function saveUserSession(userData) {
  sessionStorage.setItem('currentUser', JSON.stringify(userData));
}

function getCurrentUser() {
  const userData = sessionStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = '../index.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      if (!email || !password) {
        alert('Por favor completa todos los campos');
        return;
      }
      
      const userData = {
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
      };
      
      saveUserSession(userData);
      alert(`¡Bienvenido ${userData.name}!`);
      window.location.href = '../index.html';
    });
  }
}); 