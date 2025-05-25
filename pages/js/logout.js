document.addEventListener('DOMContentLoaded', () => {
  const logoutButtons = document.querySelectorAll('.endSession');

  logoutButtons.forEach(button => {
    button.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  });
}); 