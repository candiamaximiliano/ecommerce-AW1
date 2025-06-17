/**
 * API Service for loading products from JSON
 * Handles caching, error management, and data fetching
 */
class ApiService {
  constructor() {
    this.baseUrl = 'https://candiamaximiliano.github.io/ecommerce-AW1/data/products.json';
  }

  /**
   * Fetch all products data from JSON
   * @returns {Promise<Object>} Products data
   */
  async fetchProducts() {
    try {
      const response = await fetch(this.baseUrl);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      return await response.json();
      
    } catch (error) {
      console.error('Error al cargar productos:', error);
      throw new Error(`No se pudieron cargar los productos: ${error.message}`);
    }
  }

  /**
   * Get products by category
   * @param {string} category - Category name (trajes, antiparras, gorras)
   * @returns {Promise<Array>} Array of products
   */
  async getProductsByCategory(category) {
    try {
      const data = await this.fetchProducts();
      
      if (!data.categories || !data.categories[category]) {
        throw new Error(`Categoría "${category}" no encontrada`);
      }
      
      return data.categories[category].products;
    } catch (error) {
      console.error(`Error al obtener productos de "${category}":`, error);
      throw error;
    }
  }

  /**
   * Get featured products for home page
   * @param {number} maxPerCategory - Maximum products per category
   * @returns {Promise<Object>} Object with featured products by category
   */
  async getFeaturedProducts(maxPerCategory = 2) {
    try {
      const data = await this.fetchProducts();
      const featuredProducts = {};
      
      Object.keys(data.categories).forEach(categoryKey => {
        const category = data.categories[categoryKey];
        featuredProducts[categoryKey] = {
          name: category.name,
          products: category.products
            .filter(product => product.featured)
            .slice(0, maxPerCategory)
        };
      });
      
      return featuredProducts;
    } catch (error) {
      console.error('Error al obtener productos destacados:', error);
      throw error;
    }
  }

  /**
   * Get product by ID
   * @param {string} productId - Product ID
   * @returns {Promise<Object|null>} Product object or null if not found
   */
  async getProductById(productId) {
    try {
      const data = await this.fetchProducts();
      
      for (const categoryKey of Object.keys(data.categories)) {
        const product = data.categories[categoryKey].products.find(p => p.id === productId);
        if (product) {
          return product;
        }
      }
      
      return null;
    } catch (error) {
      console.error(`Error al obtener producto "${productId}":`, error);
      throw error;
    }
  }
}

const apiService = new ApiService();
window.ApiService = apiService; 