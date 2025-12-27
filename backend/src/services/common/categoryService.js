const categoryRepository = require('../../repositories/common/categoryRepository');

class CategoryService {
    async getAllCategory() {
        try {
            return await categoryRepository.findAll();
        } catch (e) {
            throw new Error(`Error al recuperar categorías: ${e.message}`);
        }
    }

    async getCategoryById(categoryId) {
        try {
            return await categoryRepository.findById(categoryId);
        } catch (e) {
            throw new Error(`Error al recuperar la categoría con ID ${categoryId}: ${e.message}`);
        }
    }
}

module.exports = new CategoryService();
