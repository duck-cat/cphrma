const express = require('express');
const router = express.Router();
const approvalsController = require('../controller/approvals');

router.route('/approval').get(approvalsController.getAllApprovals);
router.route('/approval').post(approvalsController.createApprovals);
router.route('/approval/:index').get(approvalsController.getApprovalsByIndex);
router.route('/approval/:index').put(approvalsController.updateApprovals);
router.route('/approval/:index').delete(approvalsController.deleteApprovals);

module.exports = router;
