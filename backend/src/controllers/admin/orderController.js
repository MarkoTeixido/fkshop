const orderService = require('../../services/admin/orderService');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');
const { HTTP_CODES } = require('../../utils/constants');

const orderController = {
    // Get All Orders
    getOrders: asyncHandler(async (req, res) => {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    }),

    // Update Order Status
    updateOrderStatus: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];
        if (!status || !validStatuses.includes(status)) {
            throw new AppError('Estado inválido', HTTP_CODES.BAD_REQUEST);
        }

        await orderService.updateStatus(id, status);
        res.json({ success: true, message: 'Estado del pedido actualizado' });
    }),

    // Delete Order
    deleteOrder: asyncHandler(async (req, res) => {
        const { id } = req.params;
        await orderService.deleteOrder(id);
        res.json({ success: true, message: 'Pedido eliminado correctamente' });
    }),

    // Get Reports
    getReports: asyncHandler(async (req, res) => {
        const { period } = req.query;
        const orders = await orderService.getOrdersForReport(period);
        res.json(orders);
    })
};

module.exports = orderController;
