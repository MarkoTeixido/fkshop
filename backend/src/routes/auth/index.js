const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');
const { verifyToken } = require('../../middlewares/auth');
const validateRequest = require('../../middlewares/validationMiddleware');
const { loginValidations, registerValidations } = require('../../validators/auth/userValidator');

// Login Validation Chain
const validateLogin = [
    ...loginValidations,
    validateRequest
];

// Register Validation Chain
const validateRegister = [
    ...registerValidations,
    validateRequest
];

// Authentication Routes
router.post('/login', validateLogin, authController.loginUser);
router.post('/login/admin', validateLogin, authController.loginAdmin);
router.post('/register', validateRegister, authController.registerUser);
router.post('/logout', authController.logoutView);

// Profile Routes (Protected)
router.get('/profile', verifyToken, authController.getProfile);
router.put('/profile', verifyToken, authController.updateProfile);

module.exports = router;
