class CartManager {
  constructor() {
    this.cart = [];
    this.init();
  }

  init() {
    this.loadCartFromStorage();
    this.bindAddToCartButtons();
    setTimeout(() => this.updateCartBadge(), 100);
  }

  loadCartFromStorage() {
    try {
      const savedCart = localStorage.getItem('shopping_cart');
      if (savedCart) {
        this.cart = JSON.parse(savedCart);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      this.cart = [];
    }
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
      this.updateCartBadge();
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }

  updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    const cartLink = document.querySelector('.cart-link');
    const quantity = this.getTotalQuantity();
    
    if (quantity > 0) {
      if (cartBadge) {
        cartBadge.textContent = quantity;
      } else if (cartLink) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = quantity;
        cartLink.appendChild(badge);
      }
    } else {
      if (cartBadge) {
        cartBadge.remove();
      }
    }
  }

  /**
   * Get available stock for a product (total stock - quantity already in cart)
   * @param {string} productId - Product ID
   * @param {number} totalStock - Total stock of the product
   * @returns {number} Available stock
   */
  getAvailableStock(productId, totalStock) {
    const existingItem = this.cart.find(item => item.productId === productId);
    const quantityInCart = existingItem ? existingItem.quantity : 0;
    return totalStock - quantityInCart;
  }

  /**
   * Add product to cart
   * @param {string} productId - Product ID
   * @param {number} quantity - Quantity to add
   * @returns {boolean} Success status
   */
  async addToCart(productId, quantity = 1) {
    try {
      const product = await window.ApiService.getProductById(productId);
      
      if (!product) {
        alert('Producto no encontrado');
        return false;
      }

      if (!product.inStock) {
        alert('Producto sin stock');
        return false;
      }

      const availableStock = this.getAvailableStock(productId, product.stock);
      
      if (availableStock <= 0) {
        alert(`Ya tienes todo el stock disponible de "${product.name}" en tu carrito`);
        return false;
      }

      if (quantity > availableStock) {
        alert(`Solo quedan ${availableStock} unidades disponibles de "${product.name}" (ya tienes algunas en el carrito)`);
        return false;
      }

      const existingItem = this.cart.find(item => item.productId === productId);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cart.push({
          productId: productId,
          name: product.name,
          price: product.price,
          formattedPrice: product.formattedPrice,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      }

      this.saveCartToStorage();
      
      this.updateStockDisplaysIfAvailable();
      
      const remainingStock = availableStock - quantity;
      let message = `${product.name} agregado al carrito`;
      if (remainingStock > 0) {
        message += ` (quedan ${remainingStock} disponibles)`;
      } else {
        message += ` (stock agotado)`;
      }
      
      alert(message);
      return true;
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar producto');
      return false;
    }
  }

  /**
   * Remove product from cart
   * @param {string} productId - Product ID to remove
   */
  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCartToStorage();
      this.updateStockDisplaysIfAvailable();
      return true;
    }
    return false;
  }

  /**
   * Clear entire cart
   */
  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
    this.updateStockDisplaysIfAvailable();
  }

  /**
   * Get all cart products
   */
  getCartItems() {
    return this.cart;
  }

  /**
   * Get cart total quantity
   * @returns {number} Total items count
   */
  getTotalQuantity() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Get cart total price
   * @returns {number} Total price
   */
  getTotalPrice() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  /**
   * Update stock displays if the function is available
   */
  updateStockDisplaysIfAvailable() {
    if (typeof updateStockDisplays === 'function') {
      setTimeout(() => updateStockDisplays(), 100);
    }
  }

  /**
   * Bind event listeners to add-to-cart buttons
   */
  bindAddToCartButtons() {
    document.addEventListener('click', async (e) => {
      const addButton = e.target.closest('.btn-add-to-cart');
      if (!addButton) return;

      e.preventDefault();

      const productCard = addButton.closest('.product-card, .home-product-card');
      if (!productCard) return;

      const productId = productCard.dataset.productId;
      const quantityInput = productCard.querySelector('.quantity-input');
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

      addButton.disabled = true;
      addButton.textContent = 'Agregando...';

      const success = await this.addToCart(productId, quantity);

      setTimeout(() => {
        addButton.disabled = false;
        addButton.textContent = 'Agregar al Carrito';
      }, 1000);

      if (success && quantityInput) {
        quantityInput.value = 1;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.CartManager = new CartManager();
}); 