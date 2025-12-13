const SalesByProduct = require('../models/model_view_sales');
const OrderSummary = require('../models/model_view_orders');

class ReportRepository {
    async getSalesByProduct() {
        return await SalesByProduct.findAll();
    }

    async getOrderSummary() {
        return await OrderSummary.findAll();
    }
}

module.exports = new ReportRepository();
