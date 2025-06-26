class CartPage {
  constructor() {
    this.cartItems = [];
    this.init();
  }

  init() {
    this.loadCartItems();
    this.renderCart();
  }

  loadCartItems() {
    try {
      const savedCart = localStorage.getItem('shopping_cart');
      this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cartItems = [];
    }
  }

  renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');

    if (this.cartItems.length === 0) {
      this.renderEmptyCart(cartItemsContainer, cartSummaryContainer);
    } else {
      this.renderCartItems(cartItemsContainer);
      this.renderCartSummary(cartSummaryContainer);
    }
  }

  renderEmptyCart(itemsContainer, summaryContainer) {
    itemsContainer.innerHTML = `
      <div class="empty-cart">
        <h3>Tu carrito está vacío</h3>
        <p>¡Agrega algunos productos para comenzar!</p>
        <a href="../index.html" class="btn-primary">Seguir Comprando</a>
      </div>
    `;
    summaryContainer.innerHTML = '';
  }

  renderCartItems(container) {
    let html = '<div class="cart-items-list">';
    
    this.cartItems.forEach(item => {
      const subtotal = item.price * item.quantity;
      
      html += `
        <div class="cart-item" data-product-id="${item.productId}">
          <div class="cart-item-image">
            <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">Precio unitario: ${item.formattedPrice}</p>
            <div class="cart-item-quantity">
              <label>Cantidad:</label>
              <div class="quantity-controls">
                <button class="quantity-btn btn-decrease" data-product-id="${item.productId}">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn btn-increase" data-product-id="${item.productId}">+</button>
              </div>
            </div>
            <p class="cart-item-subtotal">Subtotal: $${subtotal.toLocaleString()}</p>
          </div>
          <div class="cart-item-actions">
            <button class="btn-remove-item" data-product-id="${item.productId}" title="Eliminar producto">
              🗑️ Eliminar
            </button>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    container.innerHTML = html;

    this.bindRemoveButtons();
    this.bindQuantityButtons();
  }

  renderCartSummary(container) {
    const totalQuantity = this.getTotalQuantity();
    const totalPrice = this.getTotalPrice();

    container.innerHTML = `
      <div class="cart-summary-content">
        <h3>Resumen del Pedido</h3>
        <div class="summary-line">
          <span>Productos:</span>
          <span>${totalQuantity} ${totalQuantity === 1 ? 'artículo' : 'artículos'}</span>
        </div>
        <div class="summary-line total">
          <span>Total:</span>
          <span class="total-price">$${this.formatPrice(totalPrice)}</span>
        </div>
        <div class="cart-actions">
          <button class="btn-clear-cart">🗑️ Vaciar Carrito</button>
          <button class="btn-checkout">💳 Proceder al Pago</button>
        </div>
      </div>
    `;

    this.bindSummaryButtons();
  }

  formatPrice(price) {
    return price.toLocaleString('es-AR');
  }

  getTotalQuantity() {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  bindRemoveButtons() {
    const removeButtons = document.querySelectorAll('.btn-remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        this.removeItem(productId);
      });
    });
  }

  bindQuantityButtons() {
    const decreaseButtons = document.querySelectorAll('.btn-decrease');
    const increaseButtons = document.querySelectorAll('.btn-increase');

    decreaseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        this.updateQuantity(productId, -1);
      });
    });

    increaseButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        this.updateQuantity(productId, 1);
      });
    });
  }

  async updateQuantity(productId, change) {
    const item = this.cartItems.find(item => item.productId === productId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
      if (confirm(`¿Quieres eliminar "${item.name}" del carrito?`)) {
        this.removeItem(productId);
      }
      return;
    }

    if (change > 0) {
      try {
        const product = await window.ApiService.getProductById(productId);
        if (product) {
          const availableStock = product.stock;
          
          if (newQuantity > availableStock) {
            this.showMessage(`Solo hay ${availableStock} unidades disponibles de "${item.name}"`, 'info');
            return;
          }
        }
      } catch (error) {
        console.error('Error validating stock:', error);
        this.showMessage('Error al validar stock disponible', 'info');
        return;
      }
    }
    
    item.quantity = newQuantity;
    this.saveCartToStorage();
    this.renderCart();
    this.syncWithCartManager();
  }

  bindSummaryButtons() {
    const clearButton = document.querySelector('.btn-clear-cart');
    const checkoutButton = document.querySelector('.btn-checkout');

    if (clearButton) {
      clearButton.addEventListener('click', () => this.clearCart());
    }

    if (checkoutButton) {
      checkoutButton.addEventListener('click', () => this.proceedToCheckout());
    }
  }

  removeItem(productId) {
    const item = this.cartItems.find(item => item.productId === productId);
    const productName = item ? item.name : 'este producto';
    
    if (confirm(`¿Estás seguro de que quieres eliminar "${productName}" del carrito?`)) {
      this.cartItems = this.cartItems.filter(item => item.productId !== productId);
      this.saveCartToStorage();
      this.renderCart();
      this.syncWithCartManager();
      
      this.showMessage(`"${productName}" ha sido eliminado del carrito`, 'success');
    }
  }

  clearCart() {
    const itemCount = this.cartItems.length;
    if (confirm(`¿Estás seguro de que quieres eliminar todos los ${itemCount} productos del carrito?`)) {
      this.cartItems = [];
      this.saveCartToStorage();
      this.renderCart();
      this.syncWithCartManager();
      
      this.showMessage('El carrito ha sido vaciado completamente', 'success');
    }
  }

  syncWithCartManager() {
    if (window.CartManager) {
      window.CartManager.cart = this.cartItems;
      window.CartManager.updateCartBadge();
      window.CartManager.updateStockDisplaysIfAvailable();
    }
  }

  proceedToCheckout() {
    if (this.cartItems.length === 0) {
      alert('Tu carrito está vacío. Agrega algunos productos antes de proceder al pago.');
      return;
    }
    
    const totalItems = this.getTotalQuantity();
    const totalPrice = this.getTotalPrice();
    
    alert(`Funcionalidad de pago no implementada en esta versión.\n\nResumen:\n- ${totalItems} productos\n- Total: $${totalPrice.toLocaleString()}`);
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(this.cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  showMessage(text, type = 'info') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `cart-message cart-message-${type}`;
    messageDiv.textContent = text;
    
    const cartSection = document.querySelector('.cart-section');
    cartSection.insertBefore(messageDiv, cartSection.firstChild);
    
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.remove();
      }
    }, 3000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.CartPageManager = new CartPage();
}); 