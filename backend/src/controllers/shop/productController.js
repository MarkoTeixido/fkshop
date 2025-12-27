const shopService = require('../../services/shop/productService');
const productService = require('../../services/admin/productService');
const licenceService = require('../../services/common/licenceService');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');
const { HTTP_CODES, MESSAGES } = require('../../utils/constants');

const productController = {
    // Get Categories (Licences)
    getCategories: asyncHandler(async (req, res) => {
        const categories = await licenceService.getAllLicence();
        res.json(categories);
    }),

    // Shop View (Filtering/Search)
    shopView: asyncHandler(async (req, res) => {
        const collections = await shopService.getShopProducts(req.query);
        res.json(collections);
    }),

    // Product Details
    getProductDetails: asyncHandler(async (req, res) => {
        const item = await productService.getProductById(req.params.id);
        if (!item) throw new AppError(MESSAGES.NOT_FOUND, HTTP_CODES.NOT_FOUND);

        const related = await productService.getRelatedProducts(item.product_id, item.category_id);

        res.json({ product: item, related });
    })
};

module.exports = productController;
