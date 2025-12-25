const { wishlist } = require('../models/model_wishlist');
const { product } = require('../models/model_product');
const { licence } = require('../models/model_licence');

class WishlistService {
    async getUserWishlist(userId) {
        return await wishlist.findAll({
            where: { user_id: userId },
            include: [{
                model: product,
                include: [{ model: licence }]
            }]
        });
    }

    async addItem(userId, productId) {
        // Use findOrCreate to prevent duplicates
        const [item, created] = await wishlist.findOrCreate({
            where: { user_id: userId, product_id: productId }
        });
        return created;
    }

    async removeItem(userId, productId) {
        return await wishlist.destroy({
            where: { user_id: userId, product_id: productId }
        });
    }

    // Helper to get array of product IDs in wishlist
    async getWishlistProductIds(userId) {
        const items = await wishlist.findAll({
            where: { user_id: userId },
            attributes: ['product_id']
        });
        return items.map(item => item.product_id);
    }
}

module.exports = new WishlistService();
