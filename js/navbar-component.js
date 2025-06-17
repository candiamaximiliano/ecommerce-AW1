document.addEventListener('DOMContentLoaded', () => {
    if (typeof sitePages === 'undefined') {
        console.error('sitePages no está definido');
        return;
    }

    const navElement = document.querySelector('header nav');
    if (!navElement) {
        console.error('No se encontró el elemento nav');
        return;
    }

    const isRoot = !window.location.pathname.includes('/pages/');
    const basePath = isRoot ? '' : '../';

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

    const loginPath = isRoot ? 'pages/login.html' : 'login.html';
    navHTML += `<li><a href="${loginPath}">Iniciar Sesión</a></li>`;

    navHTML += `
        <li><button class="endSession" title="Cerrar Sesión">
            <img src="${basePath}assets/EndSession.svg" alt="Cerrar Sesión" width="20px">
        </button></li>
        </ul>
    `;

    navElement.innerHTML = navHTML;
}); 