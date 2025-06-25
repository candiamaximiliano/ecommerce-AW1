class SessionManager {
  constructor() {
    this.currentUser = this.getCurrentUser();
  }

  getCurrentUser() {
    const userData = sessionStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUser = null;
    window.location.reload();
  }

  getUserDisplayName() {
    return this.isLoggedIn() ? this.currentUser.name : null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.SessionManager = new SessionManager();
}); 