const productRepository = require('../repositories/productRepository');

class ProductService {
  async getAllProducts() {
    const products = await productRepository.findAll();
    // Transform data if necessary to match frontend expectations (flattening objects)
    return products.map(p => {
      const plain = p.get({ plain: true });
      return {
        ...plain,
        licence: plain.licence ? plain.licence.licence_name : null, // Flattening
        category: plain.category ? plain.category.category_name : null
      };
    });
  }

  async getProductById(id) {
    const product = await productRepository.findById(id);
    if (!product) return null;

    const plain = product.get({ plain: true });
    return {
      ...plain,
      licence: plain.licence ? plain.licence.licence_name : null,
      category: plain.category ? plain.category.category_name : null
    };
  }

  async createProduct(data) {
    // Business Logic: Check if SKU exists? (Repository might throw unique constraint error)
    // For now, simple pass-through
    return await productRepository.create(data);
  }

  async updateProduct(id, data) {
    return await productRepository.update(id, data);
  }

  async deleteProduct(id) {
    return await productRepository.delete(id);
  }
}

module.exports = new ProductService();