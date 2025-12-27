const cartService = require('../../services/shop/cartService');
const asyncHandler = require('../../utils/asyncHandler');

const cartController = {
    // Get Cart
    getCart: asyncHandler(async (req, res) => {
        const cart = await cartService.getCart(req.user.id);
        res.json(cart);
    }),

    // Add to Cart
    addToCart: asyncHandler(async (req, res) => {
        console.log('🛒 [addToCart Controller] Request received');
        console.log('  User ID:', req.user?.id);
        console.log('  Body:', req.body);
        const { product_id, quantity } = req.body;
        await cartService.addToCart(req.user.id, product_id, quantity);
        console.log('  ✅ Product added successfully');
        res.json({ success: true, message: 'Producto agregado al carrito' });
    }),

    // Update Cart Item
    updateItem: asyncHandler(async (req, res) => {
        const { quantity } = req.body;
        await cartService.updateItem(req.user.id, req.params.id, quantity);
        res.json({ success: true });
    }),

    // Remove Cart Item
    removeItem: asyncHandler(async (req, res) => {
        await cartService.removeItem(req.user.id, req.params.id);
        res.json({ success: true, message: 'Producto eliminado del carrito' });
    }),

    // Checkout
    checkout: asyncHandler(async (req, res) => {
        const orderId = await cartService.checkout(req.user.id, req.body);
        res.json({ success: true, message: 'Orden creada exitosamente', orderId });
    })
};

module.exports = cartController;
