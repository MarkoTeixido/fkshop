const { licence } = require('../../models/common/licence');

class LicenceRepository {
    async findAll() {
        return await licence.findAll();
    }

    async findById(id) {
        return await licence.findByPk(id);
    }
}

module.exports = new LicenceRepository();
