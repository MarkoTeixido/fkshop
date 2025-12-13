const express = require('express');
const router = express.Router();
const shopControllers = require('../controllers/shopControllers');
const { verifyToken } = require('../middlewares/auth');
const validateRequest = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');

// Validation Chains
const cartAddValidation = [
    body('product_id').isInt().withMessage('ID de producto inválido'),
    body('quantity').isInt({ min: 1 }).withMessage('La cantidad debe ser mayor a 0'),
    validateRequest
];

const checkoutValidation = [
    body('street').notEmpty(),
    body('city').notEmpty(),
    body('state').notEmpty(),
    body('zip').notEmpty(),
    body('country').notEmpty(),
    validateRequest
];

router.get('/', shopControllers.shopView);
router.get('/item/:id', shopControllers.idView);

// Protected Routes
router.use(verifyToken); // Apply to all below

router.get('/orders', shopControllers.getOrders);

router.get('/cart', shopControllers.getCart);
router.post('/cart', cartAddValidation, shopControllers.addToCart);
router.put('/cart/:id', shopControllers.updateItem); // Could add validation for body.quantity
router.delete('/cart/:id', shopControllers.removeItem);

router.post('/checkout', checkoutValidation, shopControllers.checkout);

module.exports = router;
