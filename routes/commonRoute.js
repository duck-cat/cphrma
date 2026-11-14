const commonController=require('../controller/commonController');
const express = require('express');
const router = express.Router();


router.route('/medicines/:index').get(commonController.getAllMedicine);
router.route("/supplierinfo").get(commonController.getSupplierInfo);
module.exports = router;