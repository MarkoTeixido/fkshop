const Cart = require('../models/model_cart');
const CartItem = require('../models/model_cart_item');
const { product } = require('../models/model_product');

class CartRepository {
    async findByUserId(userId) {
        return await Cart.findOne({
            where: { user_id: userId },
            include: [{
                model: CartItem,
                include: [product]
            }]
        });
    }

    async create(userId) {
        return await Cart.create({ user_id: userId });
    }

    async findItem(cartId, productId) {
        return await CartItem.findOne({
            where: { cart_id: cartId, product_id: productId }
        });
    }

    async addItem(data) {
        return await CartItem.create(data);
    }

    async updateItemQuantity(itemId, quantity) {
        const item = await CartItem.findByPk(itemId); // assuming itemId is unique or composed
        // But the model wrapper usually uses composed keys or simple IDs. 
        // In the controller code: `existingItem.save()`. 
        // Here I will assume I have the item instance or I fetch it.
        // The calling code (Service) might just use findItem then save().
        // For Repository pattern, I should expose atomic operations or methods.
    }

    // Better approach for Repo:
    async saveItem(item) {
        return await item.save();
    }

    async removeItem(cartId, productId) {
        return await CartItem.destroy({
            where: { cart_id: cartId, product_id: productId }
        });
    }

    async clearCart(cartId, transaction) {
        return await CartItem.destroy({
            where: { cart_id: cartId },
            transaction
        });
    }
}

module.exports = new CartRepository();
