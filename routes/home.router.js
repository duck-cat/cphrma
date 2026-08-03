const express = require('express');
const router = express.Router();
const homeController = require('../controller/home');

router.route("/home").get(homeController.getHome);
//router.route("/home").post(homeController.createHome);
module.exports = router;