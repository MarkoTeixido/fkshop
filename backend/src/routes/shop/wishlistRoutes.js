const express = require('express');
const router = express.Router();
const wishlistController = require('../../controllers/shop/wishlistController');
const { verifyToken } = require('../../middlewares/auth');

// All wishlist routes require authentication
router.use(verifyToken);

// Wishlist Routes
router.get('/', wishlistController.getWishlist);
router.get('/ids', wishlistController.getWishlistIds);
router.post('/add', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;
