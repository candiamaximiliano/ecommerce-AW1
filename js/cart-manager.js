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
      console.error('Error cargando carrito:', error);
      this.cart = [];
    }
  }

  saveCartToStorage() {
    try {
      localStorage.setItem('shopping_cart', JSON.stringify(this.cart));
      this.updateCartBadge();
    } catch (error) {
      console.error('Error guardando carrito:', error);
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

      const existingItem = this.cart.find(item => item.productId === productId);
      
      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        
        if (newQuantity > product.stock) {
          alert(`Solo hay ${product.stock} unidades disponibles`);
          return false;
        }
        
        existingItem.quantity = newQuantity;
      } else {
        if (quantity > product.stock) {
          alert(`Solo hay ${product.stock} unidades disponibles`);
          return false;
        }
        
        this.cart.push({
          productId: productId,
          name: product.name,
          price: product.price,
          formattedPrice: product.formattedPrice,
          imageUrl: product.imageUrl,
          quantity: quantity
        });
      }

      // Guardar en localStorage después de cada cambio
      this.saveCartToStorage();
      alert(`${product.name} agregado al carrito`);
      return true;
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar producto');
      return false;
    }
  }

  /**
   * Remover producto del carrito
   * @param {string} productId - ID del producto a remover
   */
  removeFromCart(productId) {
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index > -1) {
      this.cart.splice(index, 1);
      this.saveCartToStorage();
      return true;
    }
    return false;
  }

  /**
   * Limpiar carrito completo
   */
  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
  }

  /**
   * Obtener todos los productos del carrito
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