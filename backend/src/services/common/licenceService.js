const licenceRepository = require('../../repositories/common/licenceRepository');

class LicenceService {
    async getAllLicence() {
        try {
            return await licenceRepository.findAll();
        } catch (e) {
            throw new Error(`Error al recuperar licencias: ${e.message}`);
        }
    }

    async getLicenceById(licenceId) {
        try {
            return await licenceRepository.findById(licenceId);
        } catch (e) {
            throw new Error(`Error al recuperar la licencia con ID ${licenceId}: ${e.message}`);
        }
    }
}

module.exports = new LicenceService();
