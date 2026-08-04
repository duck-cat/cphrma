const express = require('express');
const router = express.Router();
const inventoryController = require('../controller/inventory');

router.route('/inventory').get(inventoryController.getAllInventory);
router.route('/inventory').post(inventoryController.createInventory);
router.route('/inventory/:index').get(inventoryController.getInventoryByIndex);
router.route('/inventory/:index').put(inventoryController.updateInventory);
router.route('/inventory/:index').delete(inventoryController.deleteInventory);

module.exports = router;
