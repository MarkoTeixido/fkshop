const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');
const { verifyToken } = require('../middlewares/auth');
const validateRequest = require('../middlewares/validationMiddleware');
const { body } = require('express-validator');

// Validation Chains
const loginValidation = [
    body('email').isEmail().withMessage('Ingrese un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    validateRequest
];

const registerValidation = [
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    body('lastname').notEmpty().withMessage('El apellido es obligatorio'),
    body('email').isEmail().withMessage('Ingrese un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validateRequest // Check errors before controller
];

router.post('/login', loginValidation, authControllers.loginUser);
router.post('/register', registerValidation, authControllers.registerUser);
router.post('/logout', authControllers.logoutView);

// Admin Login (Optional separate route found in original)
router.post('/login/admin', loginValidation, authControllers.loginAdmin);

// Profile
// verifyToken is middleware that might not be in the chain variable but imported
router.get('/profile', verifyToken, authControllers.getProfile);
router.put('/profile', verifyToken, authControllers.updateProfile);

module.exports = router;