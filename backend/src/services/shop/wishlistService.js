const wishlistRepository = require('../../repositories/shop/wishlistRepository');
const productRepository = require('../../repositories/common/productRepository');

class WishlistService {
    async getWishlist(userId) {
        try {
            return await wishlistRepository.findByUserId(userId);
        } catch (e) {
            throw new Error(`Error getting wishlist: ${e.message}`);
        }
    }

    async getWishlistIds(userId) {
        try {
            const rows = await wishlistRepository.findByUserId(userId);
            return rows.map(item => item.product_id);
        } catch (e) {
            throw new Error(`Error getting wishlist IDs: ${e.message}`);
        }
    }

    async addToWishlist(userId, productId) {
        try {
            // Check if product exists
            const product = await productRepository.findById(productId);
            if (!product) {
                throw new Error('El producto no existe');
            }

            // Check if already in wishlist
            const existing = await wishlistRepository.findOne(userId, productId);
            if (existing) {
                return existing; // Already added, idempotent success
            }

            return await wishlistRepository.create(userId, productId);
        } catch (e) {
            throw new Error(`Error adding to wishlist: ${e.message}`);
        }
    }

    async removeFromWishlist(userId, productId) {
        try {
            return await wishlistRepository.delete(userId, productId);
        } catch (e) {
            throw new Error(`Error removing from wishlist: ${e.message}`);
        }
    }
}

module.exports = new WishlistService();
