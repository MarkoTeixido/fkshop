const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/admin/dashboardController');
const orderController = require('../../controllers/admin/orderController');
const productController = require('../../controllers/admin/productController');
const { verifyToken, isAdmin } = require('../../middlewares/auth');

// Auth Middleware Chain
const authChain = [verifyToken, isAdmin];

// Dashboard & Stats Routes
router.get('/dashboard', authChain, productController.getAllProducts);
router.get('/activity', authChain, dashboardController.getActivity);
router.get('/notifications', authChain, dashboardController.getNotifications);
router.get('/reports', authChain, orderController.getReports);

module.exports = router;
