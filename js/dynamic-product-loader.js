document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ApiService === 'undefined') {
        console.error('ApiService no disponible');
        showErrorMessage('Error: Servicio no disponible');
        return;
    }

    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) {
        return;
    }

    showLoadingState(cardsContainer);

    try {
        const pageCategory = getCurrentPageCategory();
        
        if (!pageCategory) {
            console.warn('No se pudo determinar la categoría');
            return;
        }

        const products = await window.ApiService.getProductsByCategory(pageCategory);
        
        if (!products || products.length === 0) {
            showEmptyState(cardsContainer, pageCategory);
            return;
        }

        renderProducts(cardsContainer, products);
        initializeProductInteractions();
        
    } catch (error) {
        console.error('Error loading products:', error);
        showErrorMessage(error.message);
    }
});

function getCurrentPageCategory() {
    const pagePath = window.location.pathname.split('/').pop();
    
    if (pagePath.includes('trajes.html')) return 'trajes';
    if (pagePath.includes('antiparras.html')) return 'antiparras';
    if (pagePath.includes('gorras.html')) return 'gorras';
    
    return null;
}

function showLoadingState(container) {
    container.innerHTML = '<div class="loading-state"><p>Cargando productos...</p></div>';
}

function showErrorMessage(message) {
    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) return;
    
    cardsContainer.innerHTML = `
        <div class="error-state">
            <h3>Error al cargar productos</h3>
            <p>${message}</p>
            <button class="btn-primary" onclick="location.reload()">Reintentar</button>
        </div>
    `;
}

function showEmptyState(container, category) {
    container.innerHTML = `
        <div class="empty-state">
            <h3>No hay productos disponibles</h3>
            <p>No se encontraron productos en la categoría "${category}".</p>
            <a href="../index.html" class="btn-primary">Volver al inicio</a>
        </div>
    `;
}

function renderProducts(container, products) {
    let cardsHTML = '';

    products.forEach(product => {
        cardsHTML += createProductCard(product);
    });

    container.innerHTML = cardsHTML;
}

function createProductCard(product) {
    const stockClass = product.inStock ? 'in-stock' : 'out-of-stock';
    const cardStockClass = product.inStock ? '' : 'product-out-of-stock';
    const stockText = product.inStock ? `Stock: ${product.stock}` : 'Sin stock';
    
    return `
        <article class="product-card ${cardStockClass}" id="${product.id}" data-product-id="${product.id}">
            <img src="${product.imageUrl}" alt="${product.imageAlt}" class="product-image" loading="lazy">
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price-stock-container">
                    <p class="product-price">${product.formattedPrice}</p>
                    <span class="stock-info ${stockClass}">${stockText}</span>
                </div>
                <div class="quantity-controls">
                    <button type="button" class="quantity-btn quantity-decrease" ${!product.inStock ? 'disabled' : ''}>-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" readonly>
                    <button type="button" class="quantity-btn quantity-increase" ${!product.inStock ? 'disabled' : ''}>+</button>
                </div>
                <button class="btn-add-to-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
                    ${product.inStock ? 'Añadir al carrito' : 'Sin Stock'}
                </button>
            </div>
        </article>
    `;
}

function initializeProductInteractions() {
    const event = new CustomEvent('productsLoaded');
    document.dispatchEvent(event);
} 