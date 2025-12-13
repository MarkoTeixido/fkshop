const User = require('../models/model_user');

class UserRepository {
    async countByRole(role) {
        return await User.count({
            where: { role }
        });
    }

    async findByEmail(email) {
        return await User.findOne({ where: { email } });
    }

    async findById(id) {
        return await User.findByPk(id, {
            attributes: { exclude: ['password'] }
        });
    }

    async create(data) {
        return await User.create(data);
    }

    async update(id, data) {
        const [updatedRows] = await User.update(data, {
            where: { id }
        });
        return updatedRows > 0;
    }
}

module.exports = new UserRepository();
