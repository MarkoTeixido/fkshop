const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');
const { verifyToken, isAdmin } = require('../../middlewares/auth');

// Auth Middleware Chain
const authChain = [verifyToken, isAdmin];

// Order Management Routes
router.get('/', authChain, orderController.getOrders);
router.put('/:id/status', authChain, orderController.updateOrderStatus);
router.delete('/:id', authChain, orderController.deleteOrder);

module.exports = router;
