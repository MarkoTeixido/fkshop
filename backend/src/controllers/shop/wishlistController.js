const wishlistService = require('../../services/shop/wishlistService');
const asyncHandler = require('../../utils/asyncHandler');

const wishlistController = {
    // Get Wishlist
    getWishlist: asyncHandler(async (req, res) => {
        const wishlist = await wishlistService.getWishlist(req.user.id);
        res.json(wishlist);
    }),

    // Get Wishlist IDs
    getWishlistIds: asyncHandler(async (req, res) => {
        const wishlistIds = await wishlistService.getWishlistIds(req.user.id);
        res.json(wishlistIds);
    }),

    // Add to Wishlist
    addToWishlist: asyncHandler(async (req, res) => {
        const { product_id } = req.body;
        await wishlistService.addToWishlist(req.user.id, product_id);
        res.json({ success: true, message: 'Producto agregado a favoritos' });
    }),

    // Remove from Wishlist
    removeFromWishlist: asyncHandler(async (req, res) => {
        const { productId } = req.params;
        await wishlistService.removeFromWishlist(req.user.id, productId);
        res.json({ success: true, message: 'Producto eliminado de favoritos' });
    })
};

module.exports = wishlistController;
