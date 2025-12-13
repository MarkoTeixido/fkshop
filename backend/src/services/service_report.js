const reportRepository = require('../repositories/reportRepository');

class ReportService {
    async getSalesByProduct() {
        return await reportRepository.getSalesByProduct();
    }

    async getOrderSummary() {
        return await reportRepository.getOrderSummary();
    }
}

module.exports = new ReportService();
