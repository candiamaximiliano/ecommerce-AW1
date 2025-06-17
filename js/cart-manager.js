class CartManager {
  constructor() {
    this.cart = [];
    this.init();
  }

  init() {
    this.bindAddToCartButtons();
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

      alert(`${product.name} agregado al carrito`);
      return true;
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar producto');
      return false;
    }
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