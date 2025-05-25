document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const isAuthenticated = true; 

      if (isAuthenticated) {
        window.location.href = '../index.html'; 
      } else {
        alert('Email o contraseña incorrectos.');
      }
    });
  }
}); 