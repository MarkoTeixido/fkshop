const express = require('express');
const router = express.Router();

// Import sub-routes
const dashboardRoutes = require('./dashboardRoutes');
const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const catalogRoutes = require('./catalogRoutes');

// Mount sub-routes
router.use('/', dashboardRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/', catalogRoutes);

module.exports = router;
