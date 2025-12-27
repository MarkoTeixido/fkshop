const dashboardService = require('../../services/admin/dashboardService');
const asyncHandler = require('../../utils/asyncHandler');

const dashboardController = {
    // Get Dashboard Stats
    getActivity: asyncHandler(async (req, res) => {
        const stats = await dashboardService.getDashboardStats();
        res.json(stats);
    }),

    // Get Low Stock Notifications
    getNotifications: asyncHandler(async (req, res) => {
        const lowStockCount = await dashboardService.getLowStockCount();
        res.json({ lowStockCount });
    })
};

module.exports = dashboardController;
