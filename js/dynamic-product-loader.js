document.addEventListener('DOMContentLoaded', () => {
    if (typeof productsData === 'undefined') {
        console.error('Los datos de productos (productsData) no están definidos. Asegúrate de que el script product-data.js se cargue primero.');
        return;
    }

    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) {
        return;
    }

    let pageCategory = '';
    const pagePath = window.location.pathname.split('/').pop();

    if (pagePath.includes('trajes.html')) pageCategory = 'trajes';
    else if (pagePath.includes('antiparras.html')) pageCategory = 'antiparras';
    else if (pagePath.includes('gorras.html')) pageCategory = 'gorras';

    if (pageCategory && productsData[pageCategory]) {
        const products = productsData[pageCategory];
        let cardsHTML = '';

        products.forEach(product => {
            cardsHTML += `
                <article class="product-card" id="${product.id}">
                    <img src="${product.imageSrc}" alt="${product.altText}" class="product-image">
                    <div class="product-card-content">
                        <h3 class="product-title">${product.title}</h3>
                        <p class="description">${product.description}</p>
                        <p class="price">${product.price}</p>
                        <div class="product-quantity-controls">
                            <button type="button" class="quantity-decrease" aria-label="Disminuir cantidad">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" aria-label="Cantidad del producto" readonly>
                            <button type="button" class="quantity-increase" aria-label="Aumentar cantidad">+</button>
                        </div>
                        <a href="#" class="btn-card btn-add-to-cart">Añadir al Carrito</a>
                    </div>
                </article>
            `;
        });
        cardsContainer.innerHTML = cardsHTML;
    } else if (pageCategory) {
        console.warn(`No se encontraron datos de productos para la categoría: ${pageCategory}`);
    }
}); 