const userRepository = require('../repositories/userRepository');
const AppError = require('../utils/AppError');
const { HTTP_CODES } = require('../utils/constants');

class UserService {
  async createUser(userData) {
    // existing check
    const existing = await userRepository.findByEmail(userData.email);
    if (existing) {
      throw new AppError('El email ya está registrado', HTTP_CODES.BAD_REQUEST);
    }
    return await userRepository.create(userData);
  }

  async getUserProfile(userId) {
    const user = await userRepository.findById(userId);
    if (!user) throw new AppError('Usuario no encontrado', HTTP_CODES.NOT_FOUND);
    return user;
  }

  async updateProfile(userId, data) {
    const success = await userRepository.update(userId, data);
    if (!success) throw new AppError('No se pudo actualizar el perfil', HTTP_CODES.BAD_REQUEST);
    return await this.getUserProfile(userId);
  }
}

module.exports = new UserService();
