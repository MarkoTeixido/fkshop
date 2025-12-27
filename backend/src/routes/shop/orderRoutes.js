const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/shop/orderController');
const cartController = require('../../controllers/shop/cartController');
const { verifyToken } = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validationMiddleware');
const { body } = require('express-validator');

// Checkout Validation
const checkoutValidation = [
    body('street').notEmpty(),
    body('city').notEmpty(),
    body('state').notEmpty(),
    body('zip').notEmpty(),
    body('country').notEmpty(),
    validateRequest
];

// All order routes require authentication
router.use(verifyToken);

// Order Routes
router.get('/', orderController.getOrders);
router.put('/:id/cancel', orderController.cancelOrder);
router.post('/checkout', checkoutValidation, cartController.checkout);

module.exports = router;
