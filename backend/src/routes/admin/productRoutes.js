const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');
const { verifyToken, isAdmin } = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validationMiddleware');
const { productValidation } = require('../../validators/admin/productValidator');

// Auth Middleware Chain
const authChain = [verifyToken, isAdmin];

// Product Validation Chain - Extended
const validateCreateProduct = [
    ...productValidation,
    validateRequest
];

const validateEditProduct = [
    ...productValidation,
    validateRequest
];

// Product Management Routes
router.post('/', authChain, validateCreateProduct, productController.createProduct);
router.get('/:id', authChain, productController.getProductById);
router.put('/:id', authChain, validateEditProduct, productController.editProduct);
router.delete('/:id', authChain, productController.deleteProduct);

module.exports = router;
