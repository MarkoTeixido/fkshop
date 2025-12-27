const express = require('express');
const router = express.Router();
const catalogController = require('../../controllers/admin/catalogController');
const { verifyToken, isAdmin } = require('../../middlewares/auth');

// Auth Middleware Chain
const authChain = [verifyToken, isAdmin];

// Catalog Management Routes (Categories & Licences)
router.get('/categories', authChain, catalogController.getCategories);
router.get('/licences', authChain, catalogController.getLicences);

module.exports = router;
