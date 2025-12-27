const orderRepository = require('../../repositories/common/orderRepository');
const userRepository = require('../../repositories/auth/userRepository');
const productRepository = require('../../repositories/common/productRepository');
const { ORDER_STATUS, ROLES } = require('../../utils/constants');

class DashboardService {
    async getDashboardStats() {
        const [pendingOrders, completedOrders, totalUsers, recentSales] = await Promise.all([
            orderRepository.countByStatus(ORDER_STATUS.PENDING),
            orderRepository.countByStatus(ORDER_STATUS.PROCESSING),
            userRepository.countByRole(ROLES.USER),
            orderRepository.findRecent(5)
        ]);

        return {
            pendingOrders,
            completedOrders,
            totalUsers,
            recentSales
        };
    }

    async getLowStockCount() {
        return await productRepository.countLowStock(3);
    }
}

module.exports = new DashboardService();
