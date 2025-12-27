const SalesByProduct = require('../../models/shop/viewSales');
const OrderSummary = require('../../models/shop/viewOrders');

class ReportRepository {
    async getSalesByProduct() {
        return await SalesByProduct.findAll();
    }

    async getOrderSummary() {
        return await OrderSummary.findAll();
    }
}

module.exports = new ReportRepository();
