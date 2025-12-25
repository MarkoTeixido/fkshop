const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistControllers');
// Assuming user must be logged in for wishlist
// Assuming user must be logged in for wishlist
const { verifyToken } = require('../middlewares/auth');

// Check if isLoggedIn works or if we need to implement/import it
// Based on history, auth middleware likely exists.

router.get('/', verifyToken, wishlistController.getWishlist);
router.get('/ids', verifyToken, wishlistController.getWishlistIds);
router.post('/add', verifyToken, wishlistController.addToWishlist);
router.delete('/:productId', verifyToken, wishlistController.removeFromWishlist);

module.exports = router;
