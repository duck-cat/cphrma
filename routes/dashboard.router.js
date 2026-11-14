const express = require('express');
const router = express.Router();
const dashboardController = require('../controller/dashboard');

router.route('/dashboard/inventory-expiry-summary').get(dashboardController.getInventoryExpirySummary);
router.route('/dashboard/supplier-sales-summary').get(dashboardController.getSupplierSalesSummary);
router.route('/dashboard/customer-summary').get(dashboardController.getCustomerSummary);
router.route('/dashboard/orders-billing-summary').get(dashboardController.getOrdersBillingSummary);

module.exports = router;
