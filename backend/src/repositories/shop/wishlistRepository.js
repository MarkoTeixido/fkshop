const { wishlist } = require('../../models/shop/wishlist');
const { product } = require('../../models/common/product');
const { licence } = require('../../models/common/licence');

class WishlistRepository {
    async findByUserId(userId) {
        return await wishlist.findAll({
            where: { user_id: userId },
            include: [{
                model: product,
                include: [{ model: licence, attributes: ['licence_name'] }]
            }]
        });
    }

    async findOne(userId, productId) {
        return await wishlist.findOne({
            where: {
                user_id: userId,
                product_id: productId
            }
        });
    }

    async create(userId, productId) {
        return await wishlist.create({
            user_id: userId,
            product_id: productId
        });
    }

    async delete(userId, productId) {
        return await wishlist.destroy({
            where: {
                user_id: userId,
                product_id: productId
            }
        });
    }
}

module.exports = new WishlistRepository();
