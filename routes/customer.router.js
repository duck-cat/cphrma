const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer');

router.route('/customer').get(customerController.getAllcustomer);
router.route('/customer').post(customerController.createcustomer);
router.route('/customer/:index').get(customerController.getcustomerByIndex);
router.route('/customer/:index').put(customerController.updatecustomer);
router.route('/customer/:index').delete(customerController.deletecustomer);

module.exports = router;
