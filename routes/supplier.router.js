const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplier');

router.route('/supplier').get(supplierController.getAllsupplier);
router.route('/supplier').post(supplierController.createsupplier);
router.route('/supplier/:index').get(supplierController.getsupplierByIndex);
router.route('/supplier/:index').put(supplierController.updatesupplier);
router.route('/supplier/:index').delete(supplierController.deletesupplier);

module.exports = router;
