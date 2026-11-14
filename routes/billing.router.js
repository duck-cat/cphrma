const express = require('express');
const router = express.Router();
const billingController = require('../controller/billing');

router.route('/billing').get(billingController.getAllbilling);
router.route('/billing').post(billingController.createbilling);
router.route('/billing/:index').get(billingController.getbillingByIndex);
router.route('/billing/:index').put(billingController.updatebilling);
router.route('/billing/:index').delete(billingController.deletebilling);

module.exports = router;
