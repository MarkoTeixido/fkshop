const userRepository = require('../../repositories/auth/userRepository');
const refreshTokenRepository = require('../../repositories/auth/refreshTokenRepository');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');
const bcryptjs = require("bcryptjs");
const AppError = require('../../utils/AppError');
const { HTTP_CODES, ROLES } = require('../../utils/constants');

// To strictly follow pattern, I should create RefreshTokenRepository. 
// But let's assume direct access here inside Service is acceptable if it's "Data Access" logic masked as Service 
// OR I create the Repo. Let's create `refreshTokenRepository.js` for perfection.
// Actually, for speed, I will use Model here but comment that it should be a Repo.
// User wanted "Professional", so Repo is better.

class AuthService {
    async login(email, password, requiredRole = null) {
        console.log('🔐 [AuthService.login] Starting login process...');
        console.log('  Email:', email);
        console.log('  Password length:', password?.length);
        console.log('  Required role:', requiredRole);

        const user = await userRepository.findByEmail(email);
        console.log('  User found:', user ? `Yes (ID: ${user.id}, Role: ${user.role})` : 'No');

        if (!user) {
            console.log('  ❌ Login failed: User not found');
            throw new AppError('Credenciales inválidas', HTTP_CODES.UNAUTHORIZED);
        }

        const passwordMatch = await bcryptjs.compare(password, user.password);
        console.log('  Password match:', passwordMatch ? '✅ Yes' : '❌ No');

        if (!passwordMatch) {
            console.log('  ❌ Login failed: Invalid password');
            throw new AppError('Credenciales inválidas', HTTP_CODES.UNAUTHORIZED);
        }

        if (requiredRole && user.role !== requiredRole) {
            console.log('  ❌ Login failed: Role mismatch');
            console.log('    User role:', user.role);
            console.log('    Required role:', requiredRole);
            throw new AppError('Acceso denegado', HTTP_CODES.UNAUTHORIZED);
        }

        console.log('  ✅ Login successful!');

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Save Refresh Token
        await refreshTokenRepository.create({
            user_id: user.id,
            token: refreshToken,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return {
            accessToken,
            refreshToken,
            user: { id: user.id, name: user.name, lastname: user.lastname, email: user.email, role: user.role }
        };
    }

    async register(userData) {
        console.log('📝 [AuthService.register] Registering new user...');
        const { name, lastname, email, password } = userData;

        // Check availability
        const existingUser = await userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppError('El email ya está registrado', HTTP_CODES.BAD_REQUEST);
        }

        // Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create User
        // Note: address_id is not handled here yet, assumed null. Role default is 'user' or 'client' (DB schema default?)
        // Let's force 'client' per business logic if needed, or let Repo/DB handle default.
        const newUser = await userRepository.create({
            name,
            lastname,
            email,
            password: hashedPassword,
            role: ROLES.CLIENT || 'client' // Ensure we have a default
        });

        console.log('  ✅ User registered:', newUser.id);

        // Generate Tokens
        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        await refreshTokenRepository.create({
            user_id: newUser.id,
            token: refreshToken,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return {
            accessToken,
            refreshToken,
            user: { id: newUser.id, name: newUser.name, lastname: newUser.lastname, email: newUser.email, role: newUser.role }
        };
    }

    async logout(refreshToken) {
        if (refreshToken) {
            await refreshTokenRepository.deleteByToken(refreshToken);
        }
    }
}

module.exports = new AuthService();
