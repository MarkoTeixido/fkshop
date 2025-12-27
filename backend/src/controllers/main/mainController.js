const asyncHandler = require('../../utils/asyncHandler');

const shopService = require('../../services/shop/productService');

const mainController = {
    // Default View
    defaultView: asyncHandler(async (req, res) => {
        res.json({ message: 'Funkoshop API - Welcome' });
    }),

    // Home View
    homeView: asyncHandler(async (req, res) => {
        const result = await shopService.getShopProducts({ limit: 9, sort: 'alpha-ascending' });
        res.json(result);
    }),

    // Contact View
    contactView: asyncHandler(async (req, res) => {
        res.json({ message: 'Contact' });
    }),

    // About View
    aboutView: asyncHandler(async (req, res) => {
        res.json({ message: 'About Us' });
    }),

    // FAQs View
    faqsView: asyncHandler(async (req, res) => {
        res.json({ message: 'FAQs' });
    })
};

module.exports = mainController;
