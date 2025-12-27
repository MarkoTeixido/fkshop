const RefreshToken = require('../../models/auth/refreshToken');

class RefreshTokenRepository {
    async create(data) {
        return await RefreshToken.create(data);
    }

    async deleteByToken(token) {
        return await RefreshToken.destroy({
            where: { token }
        });
    }

    async findByToken(token) {
        return await RefreshToken.findOne({
            where: { token }
        });
    }
}

module.exports = new RefreshTokenRepository();
