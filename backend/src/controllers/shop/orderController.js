const orderService = require('../../services/admin/orderService');
const asyncHandler = require('../../utils/asyncHandler');
const AppError = require('../../utils/AppError');
const { HTTP_CODES } = require('../../utils/constants');

const orderController = {
    // Get User Orders
    getOrders: asyncHandler(async (req, res) => {
        const userId = req.user.id;
        const orders = await orderService.getUserOrders(userId);
        res.json(orders);
    }),

    // Cancel Order
    cancelOrder: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const userId = req.user.id;

        try {
            await orderService.cancelUserOrder(id, userId);
            res.json({ success: true, message: 'Pedido cancelado correctamente' });
        } catch (error) {
            throw new AppError(error.message, HTTP_CODES.BAD_REQUEST);
        }
    })
};

module.exports = orderController;
