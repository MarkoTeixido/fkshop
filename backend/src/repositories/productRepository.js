const { product } = require('../models/model_product');
const { category } = require('../models/model_category');
const { licence } = require('../models/model_licence');
const { sequelize } = require('../config/conn');

class ProductRepository {
    async findAll(options = {}) {
        return await product.findAll({
            where: options.where || {},
            include: [
                { model: category, attributes: ['category_name'] },
                { model: licence, attributes: ['licence_name'] }
            ],
            order: options.order || [],
            limit: options.limit,
            offset: options.offset
        });
    }

    async findById(id) {
        return await product.findByPk(id, {
            include: [
                { model: category, attributes: ['category_name'] },
                { model: licence, attributes: ['licence_name'] }
            ]
        });
    }

    async create(data) {
        return await product.create(data);
    }

    async update(id, data) {
        const [updatedRows] = await product.update(data, {
            where: { product_id: id }
        });
        return updatedRows > 0;
    }

    async delete(id) {
        return await product.destroy({
            where: { product_id: id }
        });
    }

    async decreaseStock(productId, quantity, transaction) {
        const productInstance = await product.findByPk(productId, { transaction });
        if (productInstance) {
            productInstance.stock -= quantity;
            await productInstance.save({ transaction });
        }
    }

    async countLowStock(threshold = 3) {
        return await product.count({
            where: {
                stock: { [sequelize.Sequelize.Op.lte]: threshold }
            }
        });
    }
}

module.exports = new ProductRepository();
