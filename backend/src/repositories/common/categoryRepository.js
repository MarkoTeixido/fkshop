const { category } = require('../../models/common/category');

class CategoryRepository {
    async findAll() {
        return await category.findAll();
    }

    async findById(id) {
        return await category.findByPk(id);
    }
}

module.exports = new CategoryRepository();
