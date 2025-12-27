const express = require('express');
const router = express.Router();
const productController = require('../../controllers/shop/productController');

// Public Product Routes
router.get('/', productController.shopView);
router.get('/categories', productController.getCategories);
router.get('/item/:id', productController.getProductDetails);

module.exports = router;
