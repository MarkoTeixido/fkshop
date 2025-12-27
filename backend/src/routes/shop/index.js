const express = require('express');
const router = express.Router();

// Import product routes (public)
const productRoutes = require('./productRoutes');

// Import protected routes
const cartRoutes = require('./cartRoutes');
const orderRoutes = require('./orderRoutes');
const wishlistRoutes = require('./wishlistRoutes');

// Mount product routes at root level
router.use('/', productRoutes);

// Mount protected routes
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);

module.exports = router;
