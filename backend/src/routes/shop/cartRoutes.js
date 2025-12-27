const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/shop/cartController');
const { verifyToken } = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validationMiddleware');
const { body } = require('express-validator');

// Cart Add Validation
const cartAddValidation = [
    body('product_id').custom((value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 1) {
            throw new Error('ID de producto inválido');
        }
        return true;
    }),
    body('quantity').custom((value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 1) {
            throw new Error('La cantidad debe ser mayor a 0');
        }
        return true;
    }),
    validateRequest
];

// All cart routes require authentication
router.use(verifyToken);

// Cart Routes
router.get('/', cartController.getCart);
router.post('/', cartAddValidation, cartController.addToCart);
router.put('/:id', cartController.updateItem);
router.delete('/:id', cartController.removeItem);

module.exports = router;
