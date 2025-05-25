document.addEventListener('DOMContentLoaded', () => {
    if (typeof sitePages === 'undefined') {
        console.error('La estructura sitePages no está definida. Asegúrate de que el script site-structure.js se cargue primero.');
        return;
    }

    const navElement = document.querySelector('header nav');
    if (!navElement) {
        console.error('No se encontró el elemento nav dentro del header.');
        return;
    }

    const currentPathname = window.location.pathname;
    const pathSegments = currentPathname.split('/').filter(segment => segment !== '');
    const currentPageFile = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'index.html';
    
    const isRoot = !currentPathname.includes('/pages/');

    let logoPath = isRoot ? 'assets/AquaSwim.png' : '../assets/AquaSwim.png';
    let homePath = isRoot ? 'index.html' : '../index.html';
    let endSessionIconPath = isRoot ? 'assets/EndSession.svg' : '../assets/EndSession.svg';

    let navHTML = `
        <a href="${homePath}">
            <img class="logo" src="${logoPath}" width="200px" alt="Logo AquaSwim">
        </a>
        <ul>
    `;

    sitePages.forEach(page => {
        if (page.path === 'pages/login.html' || page.path === 'pages/registro.html') {
            return;
        }

        let linkPath;
        let linkText = page.title.replace(' - AquaSwim', '').replace('AquaSwim - ', '');

        if (page.path === 'index.html') {
            linkText = "Inicio";
            linkPath = homePath;
        } else {
            if (isRoot) {
                linkPath = page.path;
            } else {
                if (page.path.startsWith('pages/')) {
                    linkPath = page.path.substring('pages/'.length);
                } else {
                    linkPath = page.path;
                }
            }
        }
        navHTML += `<li><a href="${linkPath}">${linkText}</a></li>`;
    });

    let loginLinkPath = isRoot ? 'pages/login.html' : 'login.html';
    navHTML += `<li><a href="${loginLinkPath}">Iniciar Sesión</a></li>`;

    navHTML += `
        <li><button class="endSession" title="Cerrar Sesión"><img src="${endSessionIconPath}" alt="Cerrar Sesión" width="20px"></button></li>
        </ul>
    `;

    navElement.innerHTML = navHTML;
}); 