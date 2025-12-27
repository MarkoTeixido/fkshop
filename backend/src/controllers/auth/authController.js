const authService = require('../../services/auth/authService');
const userService = require('../../services/auth/userService');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');
const { HTTP_CODES } = require('../../utils/constants');

const authController = {
    // User Login
    loginUser: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password);

        // Session (Legacy support)
        if (req.session) req.session.user = result.user;

        res.json({
            success: true,
            message: 'Login exitoso',
            user: result.user,
            token: result.accessToken,
            refreshToken: result.refreshToken
        });
    }),

    // Admin Login
    loginAdmin: asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        const result = await authService.login(email, password, 'admin');

        // Session (Legacy support)
        if (req.session) req.session.user = result.user;

        res.json({
            success: true,
            message: 'Login de administrador exitoso',
            user: result.user,
            token: result.accessToken,
            refreshToken: result.refreshToken
        });
    }),

    // Register User
    registerUser: asyncHandler(async (req, res) => {
        const result = await authService.register(req.body);

        // Session (Legacy support)
        if (req.session) req.session.user = result.user;

        res.status(HTTP_CODES.CREATED).json({
            success: true,
            message: 'Usuario registrado exitosamente',
            user: result.user,
            token: result.accessToken,
            refreshToken: result.refreshToken
        });
    }),

    // Logout
    logoutView: asyncHandler(async (req, res) => {
        req.session = null;
        res.json({ success: true, message: 'Sesión cerrada' });
    }),

    // Get Profile
    getProfile: asyncHandler(async (req, res) => {
        const user = await userService.getUserById(req.user.id);
        if (!user) {
            throw new AppError('Usuario no encontrado', HTTP_CODES.NOT_FOUND);
        }
        res.json(user);
    }),

    // Update Profile
    updateProfile: asyncHandler(async (req, res) => {
        const updated = await userService.updateUser(req.user.id, req.body);
        if (!updated) {
            throw new AppError('Error al actualizar perfil', HTTP_CODES.BAD_REQUEST);
        }
        res.json({ success: true, message: 'Perfil actualizado correctamente' });
    })
};

module.exports = authController;
