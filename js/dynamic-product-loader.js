document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ApiService === 'undefined') {
        console.error('ApiService not available');
        showErrorMessage('Error: Service not available');
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
            console.warn('Could not determine category');
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
    container.innerHTML = '<div class="loading-state"><p>Loading products...</p></div>';
}

function showErrorMessage(message) {
    const cardsContainer = document.querySelector('.cards-container');
    if (!cardsContainer) return;
    
    cardsContainer.innerHTML = `
        <div class="error-state">
            <h3>Error loading products</h3>
            <p>${message}</p>
            <button class="btn-primary" onclick="location.reload()">Retry</button>
        </div>
    `;
}

function showEmptyState(container, category) {
    container.innerHTML = `
        <div class="empty-state">
            <h3>No products available</h3>
            <p>No products found in category "${category}".</p>
            <a href="../index.html" class="btn-primary">Back to home</a>
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
    const availableStock = getAvailableStockForProduct(product.id, product.stock);
    const stockClass = availableStock > 0 ? 'in-stock' : 'out-of-stock';
    const cardStockClass = availableStock > 0 ? '' : 'product-out-of-stock';
    const stockText = availableStock > 0 ? `Stock disponible: ${availableStock}` : 'Sin stock disponible';
    
    return `
        <article class="product-card ${cardStockClass}" id="${product.id}" data-product-id="${product.id}">
            <img src="${product.imageUrl}" alt="${product.imageAlt}" class="product-image" loading="lazy">
            <div class="product-card-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="price-stock-container">
                    <p class="product-price">${product.formattedPrice}</p>
                    <span class="stock-info ${stockClass}" data-product-id="${product.id}">${stockText}</span>
                </div>
                <div class="quantity-controls">
                    <button type="button" class="quantity-btn quantity-decrease" ${availableStock <= 0 ? 'disabled' : ''}>-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="${Math.max(1, availableStock)}" readonly>
                    <button type="button" class="quantity-btn quantity-increase" ${availableStock <= 0 ? 'disabled' : ''}>+</button>
                </div>
                <button class="btn-add-to-cart" data-product-id="${product.id}" ${availableStock <= 0 ? 'disabled' : ''}>
                    ${availableStock > 0 ? 'Añadir al carrito' : 'Sin Stock Disponible'}
                </button>
            </div>
        </article>
    `;
}

/**
 * Get available stock for a product (total - quantity in cart)
 */
function getAvailableStockForProduct(productId, totalStock) {
    try {
        const savedCart = localStorage.getItem('shopping_cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const existingItem = cart.find(item => item.productId === productId);
            const quantityInCart = existingItem ? existingItem.quantity : 0;
            return Math.max(0, totalStock - quantityInCart);
        }
    } catch (error) {
        console.error('Error calculating available stock:', error);
    }
    return totalStock;
}

/**
 * Update stock displays in real time
 */
function updateStockDisplays() {
    const stockInfoElements = document.querySelectorAll('.stock-info[data-product-id]');
    
    stockInfoElements.forEach(async (element) => {
        const productId = element.dataset.productId;
        const productCard = element.closest('.product-card');
        
        try {
            const product = await window.ApiService.getProductById(productId);
            if (product) {
                const availableStock = getAvailableStockForProduct(productId, product.stock);
                const stockClass = availableStock > 0 ? 'in-stock' : 'out-of-stock';
                const stockText = availableStock > 0 ? `Stock disponible: ${availableStock}` : 'Sin stock disponible';
                
                element.textContent = stockText;
                element.className = `stock-info ${stockClass}`;
                
                if (availableStock <= 0) {
                    productCard.classList.add('product-out-of-stock');
                } else {
                    productCard.classList.remove('product-out-of-stock');
                }
                
                const decreaseBtn = productCard.querySelector('.quantity-decrease');
                const increaseBtn = productCard.querySelector('.quantity-increase');
                const quantityInput = productCard.querySelector('.quantity-input');
                const addButton = productCard.querySelector('.btn-add-to-cart');
                
                if (availableStock <= 0) {
                    decreaseBtn.disabled = true;
                    increaseBtn.disabled = true;
                    addButton.disabled = true;
                    addButton.textContent = 'Sin Stock Disponible';
                    quantityInput.max = 1;
                } else {
                    decreaseBtn.disabled = false;
                    increaseBtn.disabled = false;
                    addButton.disabled = false;
                    addButton.textContent = 'Añadir al carrito';
                    quantityInput.max = availableStock;
                    
                    if (parseInt(quantityInput.value) > availableStock) {
                        quantityInput.value = availableStock;
                    }
                }
            }
        } catch (error) {
            console.error('Error updating stock display:', error);
        }
    });
}

function initializeProductInteractions() {
    const event = new CustomEvent('productsLoaded');
    document.dispatchEvent(event);
}

window.updateStockDisplays = updateStockDisplays; 