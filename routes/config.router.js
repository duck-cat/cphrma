const express = require('express');
const router = express.Router();
const configController = require('../controller/config');

router.route('/config').get(configController.getAllConfig);
router.route('/config').post(configController.createConfig);
//router.route('/config/:index').get(configController.);
router.route('/config/:index').put(configController.updateConfig);
router.route('/config/:index').delete(configController.deleteConfig);

module.exports = router;
