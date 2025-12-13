const reportService = require('../services/service_report');
const asyncHandler = require('../utils/asyncHandler');

const reportControllers = {
    getSalesReport: asyncHandler(async (req, res) => {
        const data = await reportService.getSalesByProduct();
        res.json(data);
    }),

    getOrderReport: asyncHandler(async (req, res) => {
        const data = await reportService.getOrderSummary();
        res.json(data);
    })
};

module.exports = reportControllers;
