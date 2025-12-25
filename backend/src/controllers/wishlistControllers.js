const wishlistService = require('../services/service_wishlist');
const asyncHandler = require('../utils/asyncHandler');
const { HTTP_CODES, MESSAGES } = require('../utils/constants');

const wishlistControllers = {
    getWishlist: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const items = await wishlistService.getUserWishlist(userId);
        res.json(items);
    }),

    addToWishlist: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const { product_id } = req.body;

        await wishlistService.addItem(userId, product_id);

        res.status(HTTP_CODES.CREATED).json({
            success: true,
            message: 'Producto agregado a deseos'
        });
    }),

    removeFromWishlist: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const productId = req.params.productId;

        await wishlistService.removeItem(userId, productId);

        res.json({
            success: true,
            message: 'Producto eliminado de deseos'
        });
    }),

    // Quick check for IDs (useful for frontend initialization)
    getWishlistIds: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const ids = await wishlistService.getWishlistProductIds(userId);
        res.json(ids);
    })
};

module.exports = wishlistControllers;
