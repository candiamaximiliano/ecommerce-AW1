class HomeProductsManager {
  constructor() {
    this.featuredContainer = null;
    this.maxProductsPerCategory = 2;
  }

  async init() {
    if (!this.isHomePage()) {
      return;
    }

    if (typeof window.ApiService === 'undefined') {
      console.error('ApiService no disponible');
      return;
    }

    this.featuredContainer = this.getFeaturedContainer();
    if (!this.featuredContainer) {
              console.warn('Products container not found');
      return;
    }

    await this.loadFeaturedProducts();
  }

  /**
   * Check if current page is home
   * @returns {boolean}
   */
  isHomePage() {
    const path = window.location.pathname;
    return path === '/' || path.endsWith('/index.html') || path.endsWith('/ecommerce-AW1/');
  }

  /**
   * Get or create featured products container
   * @returns {HTMLElement|null}
   */
  getFeaturedContainer() {
    let container = document.querySelector('.featured-products-container');
    
    if (!container) {
      const main = document.querySelector('main');
      if (main) {
        container = this.createFeaturedContainer();
        main.appendChild(container);
      }
    }
    
    return container;
  }

  /**
   * Create featured products container
   * @returns {HTMLElement}
   */
  createFeaturedContainer() {
    const container = document.createElement('section');
    container.className = 'featured-products-container';
    container.innerHTML = `
      <div class="featured-products-header">
        <h2>Productos Destacados</h2>
        <p>Descubre lo mejor de cada categoría</p>
      </div>
      <div class="featured-products-content">
      </div>
    `;
    return container;
  }

  /**
   * Load and display featured products
   */
  async loadFeaturedProducts() {
    const contentContainer = this.featuredContainer.querySelector('.featured-products-content');
    
    this.showLoadingState(contentContainer);

    try {
      const featuredProducts = await window.ApiService.getFeaturedProducts(this.maxProductsPerCategory);
      
      if (this.isEmpty(featuredProducts)) {
        this.showEmptyState(contentContainer);
        return;
      }

      this.renderFeaturedProducts(contentContainer, featuredProducts);
      this.initializeInteractions();
      
    } catch (error) {
      console.error('Error loading featured products:', error);
      this.showErrorState(contentContainer);
    }
  }

  /**
   * Check if featured products object is empty
   * @param {Object} featuredProducts 
   * @returns {boolean}
   */
  isEmpty(featuredProducts) {
    return !featuredProducts || Object.keys(featuredProducts).length === 0 ||
           Object.values(featuredProducts).every(category => !category.products || category.products.length === 0);
  }

  /**
   * Show loading state
   * @param {HTMLElement} container 
   */
  showLoadingState(container) {
    container.innerHTML = '<div class="loading-state"><p>Cargando productos destacados...</p></div>';
  }

  /**
   * Show error state
   * @param {HTMLElement} container 
   */
  showErrorState(container) {
    container.innerHTML = `
      <div class="error-state">
        <h3>No pudimos cargar los productos</h3>
        <p>Por favor, inténtalo de nuevo más tarde.</p>
        <button class="btn-primary" onclick="location.reload()">Reintentar</button>
      </div>
    `;
  }

  /**
   * Show empty state
   * @param {HTMLElement} container 
   */
  showEmptyState(container) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>No hay productos destacados</h3>
        <p>Explora nuestras categorías para ver todos los productos disponibles.</p>
        <div class="category-links">
          <a href="pages/trajes.html" class="btn-primary">Ver Trajes</a>
          <a href="pages/antiparras.html" class="btn-primary">Ver Antiparras</a>
          <a href="pages/gorras.html" class="btn-primary">Ver Gorras</a>
        </div>
      </div>
    `;
  }

  /**
   * Render featured products
   * @param {HTMLElement} container 
   * @param {Object} featuredProducts 
   */
  renderFeaturedProducts(container, featuredProducts) {
    let htmlContent = '';

    Object.keys(featuredProducts).forEach(categoryKey => {
      const category = featuredProducts[categoryKey];
      
      if (category.products && category.products.length > 0) {
        htmlContent += this.renderCategorySection(categoryKey, category);
      }
    });

    container.innerHTML = htmlContent;
  }

  /**
   * Render a category section
   * @param {string} categoryKey 
   * @param {Object} category 
   * @returns {string}
   */
  renderCategorySection(categoryKey, category) {
    const categoryLinks = {
      'trajes': 'pages/trajes.html',
      'antiparras': 'pages/antiparras.html',
      'gorras': 'pages/gorras.html'
    };

    return `
      <div class="featured-category" data-category="${categoryKey}">
        <div class="category-header">
          <h3>${category.name}</h3>
          <a href="${categoryLinks[categoryKey]}" class="view-all-link">Ver todos →</a>
        </div>
        <div class="category-products">
          ${category.products.map(product => this.createHomeProductCard(product)).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Create a home product card
   * @param {Object} product 
   * @returns {string}
   */
  createHomeProductCard(product) {
    const stockClass = product.inStock ? '' : 'product-out-of-stock';
    
    return `
      <article class="product-card home-variant ${stockClass}" data-product-id="${product.id}">
        <div class="product-image-container">
          <img src="${product.imageUrl}" alt="${product.imageAlt}" class="product-image" loading="lazy">
          ${product.featured ? '<span class="featured-badge">Destacado</span>' : ''}
        </div>
        <div class="product-card-content home-variant">
          <h4 class="product-title home-variant">${product.name}</h4>
          <p class="product-price home-variant">${product.formattedPrice}</p>
          <div class="product-actions">
            <div class="quantity-controls">
              <button type="button" class="quantity-btn quantity-decrease" ${!product.inStock ? 'disabled' : ''}>-</button>
              <input type="number" class="quantity-input" value="1" min="1" max="${product.stock}" readonly>
              <button type="button" class="quantity-btn quantity-increase" ${!product.inStock ? 'disabled' : ''}>+</button>
            </div>
            <button class="btn-add-to-cart" data-product-id="${product.id}" ${!product.inStock ? 'disabled' : ''}>
              ${product.inStock ? 'Añadir al carrito' : 'Sin Stock'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Initialize product interactions
   */
  initializeInteractions() {
    const quantityInputs = this.featuredContainer.querySelectorAll('.quantity-input');
    
    quantityInputs.forEach(input => {
      const card = input.closest('.product-card');
      const decreaseBtn = card.querySelector('.quantity-btn.quantity-decrease');
      const increaseBtn = card.querySelector('.quantity-btn.quantity-increase');
      
      decreaseBtn?.addEventListener('click', () => this.handleQuantityChange(input, -1));
      increaseBtn?.addEventListener('click', () => this.handleQuantityChange(input, 1));
    });
  }

  /**
   * Handle quantity changes
   * @param {HTMLInputElement} input 
   * @param {number} change 
   */
  handleQuantityChange(input, change) {
    const currentValue = parseInt(input.value);
    const min = parseInt(input.min);
    const max = parseInt(input.max);
    const newValue = currentValue + change;
    
    if (newValue >= min && newValue <= max) {
      input.value = newValue;
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const homeProductsManager = new HomeProductsManager();
  await homeProductsManager.init();
});

window.HomeProductsManager = HomeProductsManager; 