const orderRepository = require('../../repositories/common/orderRepository');
const productRepository = require('../../repositories/common/productRepository');

class CronService {
    constructor() {
        // 1 minute interval for checking
        this.checkInterval = 60 * 1000;
    }

    start() {
        console.log('[CronService] Service started.');

        // Execute initial run after a short delay to ensure DB is connected
        setTimeout(() => {
            this.runTasks().catch(err => console.error('[CronService] Error in initial run:', err));
        }, 5000);

        // Schedule periodic execution
        setInterval(() => {
            this.runTasks().catch(err => console.error('[CronService] Error in scheduled run:', err));
        }, this.checkInterval);
    }

    async runTasks() {
        try {
            // Task 1: Cancel pending orders older than 24 hours
            // Using 24 * 60 * 60 * 1000 ms
            // For demo purposes, the repository will handle the time logic
            const cancelledCount = await orderRepository.cancelExpiredOrders();
            if (cancelledCount > 0) {
                console.log(`[CronService] Cancelled ${cancelledCount} expired orders.`);
            }

            // Task 2: Complete shipped orders older than 1 hour
            const completedCount = await orderRepository.completeShippedOrders();
            if (completedCount > 0) {
                console.log(`[CronService] Completed ${completedCount} shipped orders.`);
            }

            // Task 3: Move Paid orders to Processing older than 1 hour
            const processingCount = await orderRepository.processPaidOrders();
            if (processingCount > 0) {
                console.log(`[CronService] Processed ${processingCount} paid orders.`);
            }
            // Task 4: Clean up Cancelled Orders > 24h
            const deletedCount = await orderRepository.deleteExpiredCancelledOrders();
            if (deletedCount > 0) {
                console.log(`[CronService] Deleted ${deletedCount} expired cancelled orders.`);
            }

        } catch (error) {
            console.error('[CronService] Error running tasks:', error);
        }
    }
}

module.exports = new CronService();
