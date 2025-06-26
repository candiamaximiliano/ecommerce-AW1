document.addEventListener('DOMContentLoaded', () => {
    if (typeof sitePages === 'undefined') {
        console.error('sitePages is not defined');
        return;
    }

    const navElement = document.querySelector('header nav');
    if (!navElement) {
        console.error('Nav element not found');
        return;
    }

    const isRoot = !window.location.pathname.includes('/pages/');
    const basePath = isRoot ? '' : '../';

    const currentUser = sessionStorage.getItem('currentUser');
    const isLoggedIn = currentUser !== null;
    const userData = isLoggedIn ? JSON.parse(currentUser) : null;

    const getCartQuantity = () => {
        try {
            const savedCart = localStorage.getItem('shopping_cart');
            if (savedCart) {
                const cart = JSON.parse(savedCart);
                return cart.reduce((total, item) => total + item.quantity, 0);
            }
        } catch (error) {
            console.error('Error leyendo carrito:', error);
        }
        return 0;
    };

    let navHTML = `
        <a href="${basePath}index.html">
            <img class="logo" src="${basePath}assets/AquaSwim.png" width="200px" alt="Logo AquaSwim">
        </a>
        <ul>
    `;

    sitePages.forEach(page => {
        if (page.path.includes('login.html') || page.path.includes('registro.html')) {
            return;
        }

        let linkPath = page.path;
        let linkText = page.title.replace(' - AquaSwim', '').replace('AquaSwim - ', '');

        if (page.path === 'index.html') {
            linkText = "Inicio";
            linkPath = basePath + 'index.html';
        } else if (isRoot) {
            linkPath = page.path;
        } else {
            linkPath = page.path.replace('pages/', '');
        }

        navHTML += `<li><a href="${linkPath}">${linkText}</a></li>`;
    });

    const cartPath = isRoot ? 'pages/carrito.html' : 'carrito.html';
    const cartQuantity = getCartQuantity();
    const cartBadge = cartQuantity > 0 ? `<span class="cart-badge">${cartQuantity}</span>` : '';
    navHTML += `<li><a href="${cartPath}" class="cart-link">Carrito ${cartBadge}</a></li>`;

    if (isLoggedIn) {
        navHTML += `<li><span class="user-welcome">¡Hola ${userData.name}!</span></li>`;
        navHTML += `<li><button class="btn-logout" title="Cerrar Sesión">Cerrar Sesión</button></li>`;
    } else {
        const loginPath = isRoot ? 'pages/login.html' : 'login.html';
        navHTML += `<li><a href="${loginPath}">Iniciar Sesión</a></li>`;
    }

    navHTML += `</ul>`;

    navElement.innerHTML = navHTML;

    if (isLoggedIn) {
        const logoutBtn = navElement.querySelector('.btn-logout');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                sessionStorage.removeItem('currentUser');
                alert('Sesión cerrada exitosamente');
                window.location.reload();
            });
        }
    }
}); 