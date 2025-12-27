const categoryService = require('../../services/common/categoryService');
const licenceService = require('../../services/common/licenceService');
const asyncHandler = require('../../utils/asyncHandler');

const catalogController = {
    // Get All Categories
    getCategories: asyncHandler(async (req, res) => {
        const categories = await categoryService.getAllCategory();
        res.json(categories);
    }),

    // Get All Licences
    getLicences: asyncHandler(async (req, res) => {
        const licences = await licenceService.getAllLicence();
        res.json(licences);
    })
};

module.exports = catalogController;
